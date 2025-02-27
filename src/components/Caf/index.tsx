import carrinho from "../../assets/car.png";
import { MdDeleteForever, MdEditNote, MdEditAttributes } from "react-icons/md";
import "../Caf/style.css";
import { seedData } from "../../data/seed";
import { CafForm } from "./CafForm";
import { useState } from "react";

export const CAF = () => {
  const [cafs, setCafs] = useState(seedData);
  const [openModal, setOpenModal] = useState(false);

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta CAF?")) {
      setCafs(cafs.filter((item) => item.id !== id));
    }
  };

  const handleAddCaf = (newCaf: any) => {
    setCafs([...cafs, newCaf]);
  };

  return (
    <section>
      <div className="caf__add">
        <button onClick={() => setOpenModal(true)}>Adicionar CAF</button>
      </div>
      <CafForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onAddCaf={handleAddCaf}
      />
      {cafs.map((item) => (
        <li key={item.id} className="caf__container">
          <div className="caf__img">
            <img src={carrinho} alt="carrinho" />
          </div>
          <div className="caf__description">
            <div>
              <p>CAF: {item.caf}</p>
              <p>DATA: {new Date(item.data).toLocaleDateString("pt-BR")}</p>
              <p>CARDS: {item.cards}</p>
              <p>EXP: {item.exp}</p>
              <p>LPT: {item.lpt}</p>
              <p>TOTAL: {item.total}</p>
              <p>VOLUMES: {item.volumes}</p>
              <p>DEVOLUÇÕES: {item.devolucoes}</p>
            </div>
            {/* <div className="caf__insucess">
                <p>INSUCESSOS</p>
                <p>Cards: {item.insucessos.cards}</p>
                <p>Exp: {item.insucessos.exp}</p>
              </div> */}
            <p>VALOR: {item.valor.toFixed(2)}</p>
          </div>
          <div className="caf__buttons">
            <button>
              <MdEditAttributes />
            </button>
            <button>
              <MdEditNote />
            </button>
            <button onClick={() => handleDelete(item.id)}>
              <MdDeleteForever />
            </button>
          </div>
        </li>
      ))}
    </section>
  );
};
