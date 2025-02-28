import { CAF } from "./components/Caf";
import { Header } from "./components/Header";
import { Nav } from "./components/Nav";
import "../src/App.css";
import { useState } from "react";

function App() {
  const [cafs, setCafs] = useState<any[]>([]);
  return (
    <>
      <Header qtdCafs={cafs.length} />
      <Nav cafs={cafs} />
      <CAF cafs={cafs} setCafs={setCafs} />
    </>
  );
}

export default App;
