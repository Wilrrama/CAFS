import { useState } from "react";
import "../Nav/style.css";
import { FiEye } from "react-icons/fi";

export const Nav = ({ cafs }: any) => {
  const [showTotal, setShowTotal] = useState(true);

  const totalValor = cafs.reduce(
    (acc: any, item: { valor: any }) => acc + item.valor,
    0
  );
  return (
    <div className="nav__button">
      <button>Cres</button>
      <button>Desc</button>
      <button onClick={() => setShowTotal((prev) => !prev)}>
        <FiEye />
        <span>{showTotal ? ` R$ ${totalValor.toFixed(2)}` : " *****"}</span>
      </button>
    </div>
  );
};
