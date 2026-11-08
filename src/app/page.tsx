import { Header } from "@/components/sections/Header";
import { Folha01Hero } from "@/components/sections/Folha01Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-grid-paper flex flex-1 flex-col">
        <Folha01Hero />
      </main>
    </>
  );
}
