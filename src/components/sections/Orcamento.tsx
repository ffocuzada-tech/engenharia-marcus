"use client";

import { useState, type FormEvent, type InvalidEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Etiqueta } from "@/components/ui/Etiqueta";
import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { passos } from "@/content/passos";
import { waLink, whatsappExibicao } from "@/lib/contato";
import { ehMarcador, site } from "@/lib/site";
import "./Orcamento.css";

const INPUT_CLS =
  "w-full rounded-xl border border-claro-2/40 bg-white px-4 py-3 font-sans text-base text-texto outline-none focus-visible:outline-none focus:border-eletrico placeholder:text-texto-3";

const SERVICOS_FORM = [
  { value: "E-01", label: "E-01 Instalação elétrica" },
  { value: "E-02", label: "E-02 Projeto elétrico" },
  { value: "E-03", label: "E-03 Inspeção e laudo" },
  { value: "E-04", label: "E-04 Manutenção" },
];

function Campo({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-label font-semibold text-texto-2">{label}</span>
      {children}
    </label>
  );
}

function ServicoFieldset() {
  return (
    <fieldset className="m-0 flex flex-col gap-2.5 border-0 p-0">
      <legend className="mb-1 text-label font-semibold text-texto-2">Serviço</legend>
      <div className="flex flex-wrap gap-2">
        {SERVICOS_FORM.map((s, i) => (
          <label
            key={s.value}
            className="flex min-h-11 items-center gap-2 rounded-full border border-claro-2/50 px-4 text-[0.92rem] font-semibold text-texto-2 has-[:checked]:border-ambar has-[:checked]:bg-ambar has-[:checked]:text-tinta-ambar"
          >
            <input type="radio" name="servico" value={s.value} defaultChecked={i === 0} className="sr-only" />
            {s.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function handleNomeInvalid(e: InvalidEvent<HTMLInputElement>) {
  e.currentTarget.setCustomValidity("Preencha seu nome.");
}

function handleDescricaoInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
  e.currentTarget.setCustomValidity("Descreva o problema ou o serviço que você precisa.");
}

function clearCustomValidity(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.setCustomValidity("");
}

function buildMensagem(formData: FormData): string {
  const nome = (formData.get("nome") as string | null)?.trim() ?? "";
  const servicoValor = formData.get("servico") as string | null;
  const servico = SERVICOS_FORM.find((s) => s.value === servicoValor)?.label ?? "";
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

function Confirmacao({ link, onVoltar }: { link: string; onVoltar: () => void }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-3 rounded-[22px] bg-white p-10 text-center shadow-2">
      <span className="text-label font-bold uppercase text-ambar-escuro">WhatsApp aberto</span>
      <p className="max-w-[360px] text-[1.05rem] leading-relaxed text-texto">
        Abri o WhatsApp com seu pedido pronto. Confira a mensagem e toque em enviar por lá.
      </p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-[0.9rem] text-eletrico underline">
        Não abriu? Toque aqui
      </a>
      <button
        type="button"
        onClick={onVoltar}
        className="mt-1 cursor-pointer border-0 bg-transparent text-label font-semibold text-texto-3 underline"
      >
        Voltar ao formulário
      </button>
    </div>
  );
}

function FormularioOrcamento() {
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

  if (submitted) {
    return <Confirmacao link={lastLink} onVoltar={() => setSubmitted(false)} />;
  }

  return (
    <form
      aria-label="Pedido de orçamento"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-[22px] bg-white p-6 shadow-2 sm:p-8"
    >
      <Campo label="Seu nome">
        <input
          type="text"
          name="nome"
          required
          placeholder="Seu nome"
          className={INPUT_CLS}
          onInvalid={handleNomeInvalid}
          onInput={clearCustomValidity}
        />
      </Campo>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Campo label="E-mail">
          <input type="email" name="email" placeholder="voce@email.com" className={INPUT_CLS} />
        </Campo>
        <Campo label="Imóvel">
          <select name="imovel" className={INPUT_CLS}>
            <option>Casa</option>
            <option>Comércio</option>
            <option>Empresa / escritório</option>
          </select>
        </Campo>
      </div>

      <ServicoFieldset />

      <Campo label="Descrição do problema">
        <textarea
          name="descricao"
          required
          rows={3}
          placeholder="Ex.: o disjuntor do chuveiro desarma toda noite"
          className={`${INPUT_CLS} resize-y`}
          onInvalid={handleDescricaoInvalid}
          onInput={clearCustomValidity}
        />
      </Campo>

      <p className="text-[0.85rem] text-texto-2">
        Envie as fotos do quadro na conversa do WhatsApp, logo depois desta mensagem.
      </p>

      <Button type="submit" variant="ambar" className="w-full justify-between">
        Enviar pelo WhatsApp
        <Icone nome="seta" className="h-5 w-5" />
      </Button>
    </form>
  );
}

export function Orcamento() {
  const contatos = [
    { label: "WhatsApp", valor: whatsappExibicao(), href: waLink("Olá! Gostaria de pedir um orçamento.") },
    { label: "E-mail", valor: site.email, href: `mailto:${site.email}` },
    { label: "Área", valor: site.cidade, href: undefined },
    { label: "Horário", valor: site.horario, href: undefined },
  ].filter((c) => !ehMarcador(c.valor));

  return (
    <section id="orcamento" data-secao="orcamento" aria-labelledby="cta-titulo" className="cta-section py-[clamp(76px,6rem+3vw,136px)]">
      <div className="wrap cta-grade">
        <div className="cta-coluna-esquerda">
          <Revela className="cta-area-cabecalho flex flex-col gap-[22px]">
            <Etiqueta escuro>Orçamento</Etiqueta>
            <h2 id="cta-titulo" className="font-title text-h2 font-extrabold text-claro">
              Conte o que você precisa. A resposta vem com os próximos passos.
            </h2>
            <p className="max-w-[520px] text-[1.1rem] text-claro-2">
              Descreva o serviço e envie fotos do quadro ou do local. Para orçamentos simples, já respondemos com
              valor. Para obras e projetos, agendamos a visita técnica.
            </p>
          </Revela>

          {contatos.length > 0 && (
            <Revela className="cta-area-contatos flex flex-col gap-3 font-mono text-[0.95rem]">
              {contatos.map((c) =>
                c.href ? (
                  <a key={c.label} href={c.href} target={c.label === "WhatsApp" ? "_blank" : undefined} rel={c.label === "WhatsApp" ? "noopener noreferrer" : undefined} className="flex gap-3.5 text-claro no-underline hover:text-white">
                    <span className="w-[90px] shrink-0 text-ambar-2">{c.label.toUpperCase()}</span>
                    {c.valor}
                  </a>
                ) : (
                  <span key={c.label} className="flex gap-3.5 text-claro">
                    <span className="w-[90px] shrink-0 text-ambar-2">{c.label.toUpperCase()}</span>
                    {c.valor}
                  </span>
                )
              )}
            </Revela>
          )}
        </div>

        <div className="cta-area-formulario">
          <FormularioOrcamento />
        </div>

        <ol className="cta-area-passos" aria-label="Do contato à entrega">
          {passos.map((p, i) => (
            <Revela key={p.numero} as="li" atraso={i * 0.08} className="passo">
              <span className="passo-n">{p.numero}</span>
              <h3 className="font-title text-[1.12rem] text-claro">{p.titulo}</h3>
              <p className="text-[0.93rem] text-claro-2">{p.texto}</p>
            </Revela>
          ))}
        </ol>
      </div>
    </section>
  );
}
