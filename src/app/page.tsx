import { Header } from "@/components/sections/Header";
import { SheetProvider } from "@/components/providers/SheetProvider";
import { SheetStamp } from "@/components/ui/SheetStamp";
import { Folha01Hero } from "@/components/sections/Folha01Hero";
import { Folha02Servicos } from "@/components/sections/Folha02Servicos";
import { Folha03Alerta } from "@/components/sections/Folha03Alerta";
import { Folha04Detalhes } from "@/components/sections/Folha04Detalhes";
import { Folha05Engenheiro } from "@/components/sections/Folha05Engenheiro";
import { Folha06AntesDepois } from "@/components/sections/Folha06AntesDepois";
import { Folha07Trajetoria } from "@/components/sections/Folha07Trajetoria";
import { Folha08Processo } from "@/components/sections/Folha08Processo";
import { Folha09NotasFaq } from "@/components/sections/Folha09NotasFaq";
import { Folha10Orcamento } from "@/components/sections/Folha10Orcamento";
import { Folha11Rodape } from "@/components/sections/Folha11Rodape";

export default function Home() {
  return (
    <SheetProvider>
      <Header />
      <main className="bg-grid-paper flex flex-1 flex-col">
        <Folha01Hero />
        <Folha02Servicos />
        <Folha03Alerta />
        <Folha04Detalhes />
        <Folha05Engenheiro />
        <Folha06AntesDepois />
        <Folha07Trajetoria />
        <Folha08Processo />
        <Folha09NotasFaq />
        <Folha10Orcamento />
      </main>
      <Folha11Rodape />
      <SheetStamp />
    </SheetProvider>
  );
}
