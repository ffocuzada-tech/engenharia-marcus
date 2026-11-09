import { cacheLife } from "next/cache";
import { Marca } from "@/components/ui/Marca";
import { whatsappExibicao } from "@/lib/contato";
import { ehMarcador, nomePublico, site } from "@/lib/site";

const COLUNA_SERVICOS = [
  { href: "#servicos", nome: "Instalação elétrica" },
  { href: "#servicos", nome: "Projeto elétrico" },
  { href: "#servicos", nome: "Inspeção e laudo" },
  { href: "#servicos", nome: "Manutenção" },
];

const COLUNA_EMPRESA = [
  { href: "#diferenciais", nome: "Diferenciais" },
  { href: "#solucoes", nome: "Soluções" },
  { href: "#duvidas", nome: "Dúvidas" },
  { href: "#orcamento", nome: "Orçamento" },
];

export async function Rodape() {
  "use cache";
  cacheLife("days");
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-noite-3 text-claro-2">
      <div className="wrap flex flex-col gap-10 py-16">
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="col-span-full flex max-w-[360px] flex-col gap-3.5 lg:col-span-1">
            <Marca escuro />
            <p className="text-[0.93rem] leading-relaxed">
              Instalação, projeto, inspeção e manutenção elétrica para residências, comércios e empresas
              {!ehMarcador(site.cidade) && ` em ${site.cidade}`}.
            </p>
          </div>

          <nav aria-label="Serviços" className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-label font-bold tracking-[0.12em] text-claro uppercase">Serviços</h3>
            {COLUNA_SERVICOS.map((item) => (
              <a key={item.nome} href={item.href} className="no-underline hover:text-white">
                {item.nome}
              </a>
            ))}
          </nav>

          <nav aria-label="Empresa" className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-label font-bold tracking-[0.12em] text-claro uppercase">Empresa</h3>
            {COLUNA_EMPRESA.map((item) => (
              <a key={item.nome} href={item.href} className="no-underline hover:text-white">
                {item.nome}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 text-label font-bold tracking-[0.12em] text-claro uppercase">Contato</h3>
            <span className="font-mono text-[0.93rem]">{whatsappExibicao()}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 text-[0.84rem] text-[#8d9bb0]">
          <span>
            © {ano} {nomePublico()} · Responsável técnico com registro no CREA
          </span>
        </div>
      </div>
    </footer>
  );
}
