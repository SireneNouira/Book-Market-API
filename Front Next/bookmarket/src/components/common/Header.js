import { MenuIcon } from "../icons";

function Header() {
  return (
    <>
      <div className="flex justify-center bg-emerald-400 text-white  shadow-lg">
        <p className="text-sm text-emerald-700 flex items-center">
          Achats et Ventes de Livres d'Occasions
        </p>
      </div>
      <header className="flex justify-between items-center pt-2">
        <div className="pl-5 w-3/12 justify-start">
          <a href="#" aria-label="Menu" id="menu" className="">
            <i className="bx bx-menu text-2xl text-emerald-700"></i>
          </a>
        </div>
        <div className=" flex-1 flex justify-center w-6/12 ">
          <h1 className="text-3xl text-emerald-600 max-sm:text-xl">BookMarket</h1>
        </div>

        
      </header>
      <MenuIcon />
    </>
  );
}

export default Header;
