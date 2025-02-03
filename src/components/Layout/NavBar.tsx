import React, { useState } from "react";
import NavBarSearch from "./NavBarSearch";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useAppContext } from "../../contexts/AppContext";
const NavBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useAppContext();
  return (
    <nav className="bg-gray-950 md:bg-opacity-50 text-white shadow-md fixed top-0 left-0 w-full z-10 py-2 ">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}


        {/* Barra de búsqueda en todas las vistas */}
        <div className="hidden md:block flex-grow mx-4">
          <NavBarSearch />
        </div>

        {/* Menú Desktop */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link
              to="/"
              className="hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className="hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
            >
              Create Product
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/cart"
              className="hover:bg-gray-700 px-3 py-2 rounded-lg flex items-center transition duration-200 relative"
              aria-label="Carrito de compras"
            >
              <IoMdCart className="w-6 h-6" />

              {/* Contador de productos */}
              {cart.length > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-semibold px-1.5 animate-pulse transition-transform duration-300 hover:scale-110">
                    {cart.length}
                  </span>
                  <span className="sr-only">
                    Carrito con {cart.length} productos
                  </span>
                </>
              )}

              {cart.length === 0 && (
                <span className="sr-only">Carrito vacío</span>
              )}
            </Link>
          </li>
        </ul>

        {/* Botón de menú móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden  shadow-lg p-4 space-y-4">
          {/* Barra de búsqueda */}
          <div>
            <NavBarSearch />
          </div>

          {/* Opciones del menú */}
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="block hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="block hover:bg-gray-700 px-3 py-2 rounded-lg transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Create Product
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/cart"
                className="hover:bg-gray-700 px-3 py-2 rounded-lg flex items-center transition duration-200 relative"
                aria-label="Carrito de compras"
              >
                <IoMdCart className="w-6 h-6" />

                {/* Contador de productos */}
                {cart.length > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-semibold px-1.5 animate-pulse transition-transform duration-300 hover:scale-110">
                      {cart.length}
                    </span>
                    <span className="sr-only">
                      Carrito con {cart.length} productos
                    </span>
                  </>
                )}

                {cart.length === 0 && (
                  <span className="sr-only">Empty Cart</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
