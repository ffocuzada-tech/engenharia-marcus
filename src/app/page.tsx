import { Header } from "@/components/sections/Header";
import { Folha01Hero } from "@/components/sections/Folha01Hero";
import { Folha02Servicos } from "@/components/sections/Folha02Servicos";
import { Folha03Alerta } from "@/components/sections/Folha03Alerta";
import { Folha04Detalhes } from "@/components/sections/Folha04Detalhes";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-grid-paper flex flex-1 flex-col">
        <Folha01Hero />
        <Folha02Servicos />
        <Folha03Alerta />
        <Folha04Detalhes />
      </main>
    </>
  );
}
