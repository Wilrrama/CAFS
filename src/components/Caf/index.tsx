import carrinho from "../../assets/car.png";
import { MdDeleteForever, MdEditNote } from "react-icons/md";

import { MdEditAttributes } from "react-icons/md";
import "../Caf/style.css";

export const CAF = () => {
  return (
    <section>
      <div className="caf__add">
        <button>Adicionar CAF</button>
      </div>
      <div className="caf__container">
        <div className="caf__img">
          <img src={carrinho} alt="carrinho" />
        </div>
        <div className="caf__description">
          <div>
            <p>CAF: 161820211</p>
            <p>DATA: 17/02/2025</p>
            <p>CARDS: 11</p>
            <p>EXP: 102</p>
            <p>LPT: 0</p>
            <p>VOLUMES:0</p>
          </div>

          <div className="caf__insucess">
            <p>Insucessos</p>
            <p>Cards: 0</p>
            <p>Exp: 0</p>
            <p>Devoluções:0</p>
          </div>
          <p>Valor: 270,00</p>
        </div>
        <div className="caf__buttons">
          <button>
            <MdEditAttributes />
          </button>
          <button>
            <MdEditNote />
          </button>
          <button>
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </section>
  );
};
