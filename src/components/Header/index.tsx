import { GiHamburgerMenu } from "react-icons/gi";
import "../Header/style.css";

export const Header = () => {
  return (
    <>
      <header>
        <button>
          <GiHamburgerMenu />
        </button>
        <h2>CAFS</h2>
        <h3>QTD</h3>
      </header>
    </>
  );
};
