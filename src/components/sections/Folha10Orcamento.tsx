"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { SheetBar } from "@/components/ui/SheetBar";
import { waLink, whatsappExibicao } from "@/lib/contato";

const INPUT_CLS =
  "w-full border-0 bg-transparent p-0 font-sans text-base text-ink outline-none placeholder:text-[#6B7789]";

const SERVICES = [
  { value: "E-01", label: "E-01 Instalação" },
  { value: "E-02", label: "E-02 Projeto" },
  { value: "E-03", label: "E-03 Inspeção" },
  { value: "E-04", label: "E-04 Manutenção" },
];

function Field({
  label,
  full = false,
  borderRight = false,
  children,
}: {
  label: string;
  full?: boolean;
  borderRight?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex flex-col gap-1 border-b border-ink px-4 py-3 ${
        full ? "col-span-4" : "col-span-2"
      } ${borderRight ? "border-r" : ""}`}
    >
      <span className="font-mono text-[10px] tracking-[.06em] text-text-3 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function ServiceFieldset() {
  return (
    <fieldset className="col-span-4 m-0 flex flex-col gap-2.5 border-0 border-b border-ink px-4 py-3">
      <legend className="mb-1 font-mono text-[10px] tracking-[.06em] text-text-3 uppercase">
        SERVIÇO
      </legend>
      <div className="flex flex-wrap gap-2">
        {SERVICES.map((s, i) => (
          <label
            key={s.value}
            className="flex min-h-11 items-center gap-2 border-[1.5px] border-ink px-3.5 text-[15px] has-[:checked]:bg-amber has-[:checked]:font-semibold"
          >
            <input
              type="radio"
              name="servico"
              value={s.value}
              defaultChecked={i === 0}
              className="m-0 accent-ink"
            />
            {s.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function handleNomeInvalid(e: React.InvalidEvent<HTMLInputElement>) {
  e.currentTarget.setCustomValidity("Preencha seu nome.");
}

function handleDescricaoInvalid(e: React.InvalidEvent<HTMLTextAreaElement>) {
  e.currentTarget.setCustomValidity("Descreva o problema ou o serviço que você precisa.");
}

function clearCustomValidity(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.setCustomValidity("");
}

function buildMensagem(formData: FormData): string {
  const nome = (formData.get("nome") as string | null)?.trim() ?? "";
  const servicoValor = formData.get("servico") as string | null;
  const servico = SERVICES.find((s) => s.value === servicoValor)?.label ?? "";
  const imovel = (formData.get("imovel") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const descricao = (formData.get("descricao") as string | null)?.trim() ?? "";

  const linhas = [
    "Olá! Quero um orçamento.",
    nome && `Nome: ${nome}`,
    servico && `Serviço: ${servico}`,
    imovel && `Imóvel: ${imovel}`,
    email && `E-mail: ${email}`,
    descricao && `Problema: ${descricao}`,
  ].filter((linha): linha is string => Boolean(linha));

  return linhas.join("\n");
}

function Confirmation({ link, onVoltar }: { link: string; onVoltar: () => void }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 border-2 border-on-ink bg-white px-6 py-14 text-center text-ink shadow-[var(--shadow-form)]">
      <span className="font-mono text-[12px] tracking-[.08em] text-amber-text uppercase">
        WhatsApp aberto
      </span>
      <p className="max-w-[360px] text-[18px] leading-relaxed">
        Abri o WhatsApp com seu pedido pronto. Confira a mensagem e toque em enviar por lá.
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[14px] text-amber-text underline"
      >
        Não abriu? Toque aqui
      </a>
      <button
        type="button"
        onClick={onVoltar}
        className="mt-1 cursor-pointer border-0 bg-transparent font-mono text-[12px] tracking-[.06em] text-text-3 uppercase underline"
      >
        Voltar ao formulário
      </button>
    </div>
  );
}

export function Folha10Orcamento() {
  const [submitted, setSubmitted] = useState(false);
  const [lastLink, setLastLink] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const link = waLink(buildMensagem(formData));
    window.open(link, "_blank", "noopener");
    setLastLink(link);
    setSubmitted(true);
  }

  function handleVoltar() {
    setSubmitted(false);
  }

  return (
    <section id="orcamento" className="bg-grid-night text-on-ink">
      <SheetBar numero="10" titulo="PEDIDO DE ORÇAMENTO" nota="PREENCHA O CARIMBO" dark />

      {/* Computador */}
      <div className="wrap hidden items-start gap-16 py-24 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] md:py-28">
        <div className="flex flex-col gap-7">
          <h2 className="text-display font-bold text-on-ink">
            Sua obra começa <span className="text-amber">nesta folha.</span>
          </h2>
          <p className="text-[18px] leading-relaxed text-on-ink-2">
            Preencha o carimbo ao lado. Respondo em até [PRAZO], por WhatsApp ou e-mail.
          </p>
          <div className="flex flex-col gap-3.5 border-t border-on-ink/30 pt-3 font-mono text-[15px]">
            <a
              href={waLink("Olá! Gostaria de pedir um orçamento.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-3.5 text-on-ink no-underline"
            >
              <span className="w-[90px] text-amber">WHATSAPP</span>{whatsappExibicao()}
            </a>
            <a
              href="mailto:contato@nomeengenharia.com.br"
              className="flex gap-3.5 text-on-ink no-underline"
            >
              <span className="w-[90px] text-amber">E-MAIL</span>contato@nomeengenharia.com.br
            </a>
            <span className="flex gap-3.5">
              <span className="w-[90px] text-amber">ÁREA</span>[CIDADE E REGIÃO]
            </span>
            <span className="flex gap-3.5">
              <span className="w-[90px] text-amber">HORÁRIO</span>[SEG–SEX, 8h–18h]
            </span>
          </div>
        </div>

        {submitted ? (
          <Confirmation link={lastLink} onVoltar={handleVoltar} />
        ) : (
          <form
            aria-label="Pedido de orçamento"
            onSubmit={handleSubmit}
            className="grid grid-cols-4 border-2 border-on-ink bg-white text-ink shadow-[var(--shadow-form)]"
          >
            <div className="col-span-4 flex justify-between border-b-2 border-ink bg-ink px-4 py-3 font-mono text-[12px] text-on-ink">
              <span>[NOME] ENGENHARIA ELÉTRICA · PEDIDO Nº ____</span>
              <span>DATA: __/__/____</span>
            </div>
            <Field label="SOLICITANTE" full>
              <input
                type="text"
                name="nome"
                required
                placeholder="Seu nome"
                className={INPUT_CLS}
                onInvalid={handleNomeInvalid}
                onInput={clearCustomValidity}
              />
            </Field>
            <Field label="E-MAIL" borderRight>
              <input type="email" name="email" placeholder="voce@email.com" className={INPUT_CLS} />
            </Field>
            <Field label="IMÓVEL">
              <select name="imovel" className={INPUT_CLS}>
                <option>Casa</option>
                <option>Comércio</option>
                <option>Empresa / escritório</option>
              </select>
            </Field>
            <ServiceFieldset />
            <Field label="DESCRIÇÃO DO PROBLEMA" full>
              <textarea
                name="descricao"
                required
                rows={3}
                placeholder="Ex.: o disjuntor do chuveiro desarma toda noite"
                className={`${INPUT_CLS} resize-y`}
                onInvalid={handleDescricaoInvalid}
                onInput={clearCustomValidity}
              />
            </Field>
            <div className="col-span-2 flex flex-col justify-center gap-1.5 border-r border-ink px-4 py-3">
              <span className="font-mono text-[10px] tracking-[.06em] text-text-3 uppercase">
                FOTOS DO QUADRO
              </span>
              <span className="text-[13px] text-text-2">
                Envie na conversa do WhatsApp, logo depois desta mensagem.
              </span>
            </div>
            <button
              type="submit"
              className="col-span-2 flex min-h-[72px] items-center justify-between border-0 bg-amber px-5 font-sans text-[17px] font-bold text-ink cursor-pointer"
            >
              Enviar pelo WhatsApp <span aria-hidden="true">→</span>
            </button>
          </form>
        )}
      </div>

      {/* Celular */}
      <div className="wrap flex flex-col gap-6 py-20 md:hidden">
        <h2 className="text-display font-bold text-on-ink">
          Sua obra começa <span className="text-amber">nesta folha.</span>
        </h2>

        {submitted ? (
          <Confirmation link={lastLink} onVoltar={handleVoltar} />
        ) : (
          <form
            aria-label="Pedido de orçamento"
            onSubmit={handleSubmit}
            className="flex flex-col border-2 border-on-ink bg-white text-ink shadow-[var(--shadow-form)]"
          >
            <div className="bg-ink px-3.5 py-2.5 font-mono text-[10px] text-on-ink">
              [NOME] ENG. ELÉTRICA · PEDIDO Nº ____
            </div>
            <Field label="SOLICITANTE" full>
              <input
                type="text"
                name="nome"
                required
                placeholder="Seu nome"
                className={INPUT_CLS}
                onInvalid={handleNomeInvalid}
                onInput={clearCustomValidity}
              />
            </Field>
            <ServiceFieldset />
            <Field label="DESCRIÇÃO" full>
              <textarea
                name="descricao"
                required
                rows={3}
                placeholder="O que está acontecendo?"
                className={`${INPUT_CLS} resize-y`}
                onInvalid={handleDescricaoInvalid}
                onInput={clearCustomValidity}
              />
            </Field>
            <button
              type="submit"
              className="flex min-h-[60px] items-center justify-between border-0 bg-amber px-4 font-sans text-[17px] font-bold text-ink cursor-pointer"
            >
              Enviar pelo WhatsApp <span aria-hidden="true">→</span>
            </button>
          </form>
        )}

        <div className="flex flex-col gap-3 font-mono text-[14px]">
          <a
            href={waLink("Olá! Gostaria de pedir um orçamento.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-3 border-[1.5px] border-on-ink/40 px-3.5 text-on-ink no-underline"
          >
            <span className="text-amber">WHATSAPP</span>{whatsappExibicao()}
          </a>
          <a
            href="mailto:contato@nomeengenharia.com.br"
            className="flex min-h-11 items-center gap-3 border-[1.5px] border-on-ink/40 px-3.5 text-[12px] text-on-ink no-underline"
          >
            <span className="text-amber">E-MAIL</span>contato@nomeengenharia.com.br
          </a>
        </div>
      </div>
    </section>
  );
}
