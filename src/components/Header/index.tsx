import { GiHamburgerMenu } from "react-icons/gi";
import "../Header/style.css";

interface HeaderProps {
  qtdCafs: number;
}

export const Header = ({ qtdCafs }: HeaderProps) => {
  return (
    <>
      <header>
        <button>
          <GiHamburgerMenu />
        </button>
        <h2>CAFS</h2>
        <h3>QTD: {qtdCafs}</h3>
      </header>
    </>
  );
};
