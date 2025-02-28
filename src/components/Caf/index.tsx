import carrinho from "../../assets/car.png";
import { MdDeleteForever, MdEditNote, MdEditAttributes } from "react-icons/md";
import "../Caf/style.css";
import { CafForm } from "./CafForm";
import { useEffect, useState } from "react";

interface CafProps {
  cafs: any[];
  setCafs: React.Dispatch<React.SetStateAction<any[]>>;
}

export const CAF = ({ cafs, setCafs }: CafProps) => {
  const [openModal, setOpenModal] = useState(false);

  // Carrega as CAFs do localStorage ao montar o componente
  useEffect(() => {
    const savedCafs = localStorage.getItem("cafs");
    if (savedCafs) {
      setCafs(JSON.parse(savedCafs));
    }
  }, []);

  // Salva as CAFs no localStorage sempre que o array mudar
  useEffect(() => {
    localStorage.setItem("cafs", JSON.stringify(cafs));
  }, [cafs]);

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta CAF?")) {
      const updatedCafs = cafs.filter((item) => item.id !== id);
      setCafs(updatedCafs);
    }
  };

  const handleAddCaf = (newCaf: any) => {
    const updatedCafs = [...cafs, newCaf];
    setCafs(updatedCafs);
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
      {cafs.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
          Nenhuma CAF cadastrada.
        </p>
      ) : (
        <ul>
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
        </ul>
      )}
    </section>
  );
};
