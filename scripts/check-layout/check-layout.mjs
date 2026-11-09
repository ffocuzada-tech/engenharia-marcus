#!/usr/bin/env node
// Verifica estouro horizontal em larguras-chave, toque emulado no celular/tablet
// e o comportamento com prefers-reduced-motion. Roda a cada PR (`npm run check:layout`).
import { chromium } from "playwright";
import http from "node:http";
import { spawn, execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.join(__dirname, "screenshots");

const VIEWPORTS = [
  { name: "360x740-celular", width: 360, height: 740, hasTouch: true, isMobile: true },
  { name: "390x844-celular", width: 390, height: 844, hasTouch: true, isMobile: true },
  { name: "768x1024-tablet", width: 768, height: 1024, hasTouch: true, isMobile: true },
  { name: "1440x900-computador", width: 1440, height: 900, hasTouch: false, isMobile: false },
];

function pingServer(url) {
  return new Promise((resolve) => {
    http
      .get(url, (res) => {
        res.resume();
        resolve(true);
      })
      .on("error", () => resolve(false));
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await pingServer(url)) return;
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timeout esperando o servidor em ${url}`);
}

function killProcessTree(child) {
  if (!child || child.pid == null) return;
  if (process.platform === "win32") {
    try {
      execSync(`taskkill /pid ${child.pid} /t /f`, { stdio: "ignore" });
    } catch {
      // processo já pode ter encerrado
    }
  } else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      // processo já pode ter encerrado
    }
  }
}

async function main() {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const alreadyRunning = await pingServer(BASE_URL);
  let devProcess = null;

  if (!alreadyRunning) {
    console.log(`Nenhum servidor em ${BASE_URL} — iniciando "npm run dev"...`);
    devProcess =
      process.platform === "win32"
        ? spawn("npm run dev", { cwd: ROOT, stdio: "ignore", shell: true })
        : spawn("npm", ["run", "dev"], { cwd: ROOT, stdio: "ignore", detached: true });
    await waitForServer(BASE_URL);
  } else {
    console.log(`Usando servidor já rodando em ${BASE_URL}.`);
  }

  const browser = await chromium.launch({ channel: "msedge" });
  const failures = [];

  async function checarEstouro(page, label) {
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    const overflow = scrollWidth > clientWidth;
    console.log(`[${label}] scrollWidth=${scrollWidth} clientWidth=${clientWidth} -> ${overflow ? "ESTOUROU" : "OK"}`);
    if (overflow) failures.push(`${label}: scrollWidth (${scrollWidth}) > clientWidth (${clientWidth})`);
  }

  function escutarErrosConsole(page, label) {
    page.on("console", (msg) => {
      if (msg.type() === "error") failures.push(`${label}: erro no console — ${msg.text()}`);
    });
    page.on("pageerror", (err) => {
      failures.push(`${label}: exceção na página — ${err.message}`);
    });
  }

  // Interações do rodada 2: menu do celular, diálogo de uma solução e uma pergunta do FAQ.
  async function checarInteracoes(page, vp) {
    if (vp.width === 360) {
      const botaoMenu = page.getByRole("button", { name: "Abrir menu" });
      await botaoMenu.click();
      await page.waitForTimeout(650);
      const menuAberto = await page.evaluate(
        () => document.getElementById("menu-movel")?.classList.contains("nav-menu-movel-aberto") ?? false
      );
      if (!menuAberto) failures.push(`${vp.name}: menu do celular não abriu`);
      await checarEstouro(page, `${vp.name} (menu do celular aberto)`);
      await page.getByRole("button", { name: "Fechar menu" }).click();
      await page.waitForTimeout(650);
    }

    const primeiraSolucao = page.locator('[data-sol-card="0"]').first();
    await primeiraSolucao.scrollIntoViewIfNeeded();
    await primeiraSolucao.click();
    await page.waitForTimeout(750);
    const dialogAberto = await page.evaluate(() => document.querySelector("dialog")?.open ?? false);
    if (!dialogAberto) failures.push(`${vp.name}: diálogo da solução não abriu`);
    await checarEstouro(page, `${vp.name} (diálogo de solução aberto)`);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(650);

    const primeiraPergunta = page.locator(".faq-q").first();
    await primeiraPergunta.scrollIntoViewIfNeeded();
    await primeiraPergunta.click();
    await page.waitForTimeout(450);
    const perguntaAberta = (await primeiraPergunta.getAttribute("aria-expanded")) === "true";
    if (!perguntaAberta) failures.push(`${vp.name}: pergunta do FAQ não abriu`);
    await checarEstouro(page, `${vp.name} (FAQ aberto)`);
  }

  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        hasTouch: vp.hasTouch,
        isMobile: vp.isMobile,
      });
      const page = await context.newPage();
      escutarErrosConsole(page, vp.name);
      await page.goto(BASE_URL, { waitUntil: "networkidle" });

      await checarEstouro(page, vp.name);

      if (vp.width === 360 || vp.width === 1440) {
        await checarInteracoes(page, vp);
      }

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `${vp.name}.png`), fullPage: true });
      await context.close();
    }

    // prefers-reduced-motion: reduce — nada deve se mover, conteúdo aparece direto.
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(BASE_URL, { waitUntil: "networkidle" });

    const { transitionDuration, animationDuration, scrollBehavior } = await page.evaluate(() => {
      const el = document.querySelector("a, button");
      const style = el ? getComputedStyle(el) : null;
      return {
        transitionDuration: style?.transitionDuration ?? null,
        animationDuration: style?.animationDuration ?? null,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
      };
    });

    console.log(
      `[prefers-reduced-motion] transitionDuration=${transitionDuration} animationDuration=${animationDuration} scrollBehavior=${scrollBehavior}`
    );

    const motionOk =
      (transitionDuration === null || transitionDuration === "0s") &&
      (animationDuration === null || animationDuration === "0s") &&
      scrollBehavior === "auto";

    if (!motionOk) {
      failures.push(
        `prefers-reduced-motion: transitionDuration=${transitionDuration} animationDuration=${animationDuration} scrollBehavior=${scrollBehavior}`
      );
    }

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "prefers-reduced-motion.png"), fullPage: true });
    await context.close();
  } finally {
    await browser.close();
    if (devProcess) killProcessTree(devProcess);
  }

  console.log(`\nCapturas salvas em ${SCREENSHOT_DIR}`);

  if (failures.length > 0) {
    console.error("\nFalhas encontradas:");
    for (const f of failures) console.error(` - ${f}`);
    process.exitCode = 1;
    return;
  }

  console.log("\nTudo certo: sem estouro horizontal e prefers-reduced-motion respeitado.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
