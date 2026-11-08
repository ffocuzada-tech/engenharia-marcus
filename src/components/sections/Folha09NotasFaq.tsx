import { FaqItem } from "@/components/ui/Faq";
import { SheetBar } from "@/components/ui/SheetBar";

const FIELD_NOTES_DESKTOP = [
  {
    tag: "NOTA DE CAMPO 01 · INSTALAÇÃO · CASA",
    quote: "[Depoimento real de cliente residencial: o problema que tinha e como ficou depois.]",
    author: "[Nome], [bairro]",
    offset: "",
  },
  {
    tag: "NOTA DE CAMPO 02 · MANUTENÇÃO · COMÉRCIO",
    quote: "[Depoimento real de dono de comércio.]",
    author: "[Nome], [empresa]",
    offset: "md:ml-12",
  },
  {
    tag: "NOTA DE CAMPO 03 · LAUDO · ESCRITÓRIO",
    quote: "[Depoimento real de pequena empresa.]",
    author: "[Nome], [empresa]",
    offset: "md:ml-4",
  },
];

const FIELD_NOTES_MOBILE = [
  {
    tag: "NOTA 01 · INSTALAÇÃO",
    quote: "[Depoimento real de cliente residencial.]",
    author: "[Nome], [bairro]",
  },
  {
    tag: "NOTA 02 · MANUTENÇÃO",
    quote: "[Depoimento real de comércio.]",
    author: "[Nome], [empresa]",
  },
];

const FAQ_DESKTOP = [
  {
    q: "Qual a diferença entre eletricista e engenheiro eletricista?",
    a: "O engenheiro pode projetar, calcular e assinar a ART, respondendo tecnicamente pelo serviço. Eu também executo, então quem calcula é quem instala.",
    qLabel: "Q1",
    open: true,
  },
  { q: "A visita técnica é cobrada?", qLabel: "Q2" },
  { q: "Em quanto tempo recebo o orçamento?", qLabel: "Q3" },
  { q: "Faço só o projeto com você e executo com outro?", qLabel: "Q4" },
  { q: "Atende emergências e fins de semana?", qLabel: "Q5" },
  { q: "Quais regiões você atende?", qLabel: "Q6" },
];

const FAQ_MOBILE = [
  {
    q: "Eletricista ou engenheiro eletricista?",
    a: "O engenheiro calcula, projeta e assina a ART. Eu também executo: quem calcula é quem instala.",
    open: true,
  },
  { q: "A visita técnica é cobrada?" },
  { q: "Em quanto tempo recebo o orçamento?" },
  { q: "Atende emergências?" },
  { q: "Quais regiões você atende?" },
];

export function Folha09NotasFaq() {
  return (
    <section>
      <SheetBar numero="09" titulo="NOTAS DE CAMPO E DÚVIDAS" nota="REVISADO COM CLIENTES" />

      <div className="wrap grid grid-cols-1 items-start gap-16 py-20 md:grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] md:py-24">
        <div className="flex flex-col gap-5">
          <h2 className="text-h2 font-bold text-ink">Quem já contratou</h2>

          {/* Computador: 3 notas de campo com leve escalonamento */}
          <div className="hidden flex-col gap-5 md:flex">
            {FIELD_NOTES_DESKTOP.map((note) => (
              <figure
                key={note.tag}
                className={`m-0 flex flex-col gap-3.5 border-[1.5px] border-ink bg-white p-6 shadow-[6px_6px_0_rgba(15,30,51,.1)] ${note.offset}`}
              >
                <span className="font-mono text-[11px] text-amber-text">{note.tag}</span>
                <blockquote className="m-0 text-[18px] leading-relaxed">
                  “{note.quote}”
                </blockquote>
                <figcaption className="font-mono text-[12px] text-text-3">{note.author}</figcaption>
              </figure>
            ))}
          </div>

          {/* Celular: 2 notas em rolagem horizontal */}
          <div className="-mr-5 flex gap-3 overflow-x-auto pr-5 pb-2 md:hidden">
            {FIELD_NOTES_MOBILE.map((note) => (
              <figure
                key={note.tag}
                className="m-0 flex w-[280px] flex-shrink-0 flex-col gap-2.5 border-[1.5px] border-ink bg-white p-[18px]"
              >
                <span className="font-mono text-[10px] text-amber-text">{note.tag}</span>
                <blockquote className="m-0 text-[16px] leading-relaxed">“{note.quote}”</blockquote>
                <figcaption className="font-mono text-[11px] text-text-3">{note.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="mb-6 text-h2 font-bold text-ink">Perguntas frequentes</h2>

          <div className="hidden flex-col md:flex">
            {FAQ_DESKTOP.map((item) => (
              <FaqItem key={item.qLabel} q={item.q} a={item.a} qLabel={item.qLabel} defaultOpen={item.open} />
            ))}
          </div>

          <div className="flex flex-col md:hidden">
            {FAQ_MOBILE.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} defaultOpen={item.open} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
