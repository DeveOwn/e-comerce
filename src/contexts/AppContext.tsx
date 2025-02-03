import React, { createContext, useContext, useEffect, useState } from "react";
import { CartInterface } from "../interface/CartInterface";

interface AppContextType {
    cart: CartInterface[];
    addToCart: (product: CartInterface) => void;
    removeFromCart: (productId: string) => void;
    isProductInCart: (productId: string) => boolean;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    // Agrega aquí otros estados globales que necesites
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartInterface[]>([]);

    // Cargar carrito desde localStorage al iniciar
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }else{
            localStorage.setItem("cart", JSON.stringify([]));
        }
    }, []);

    const updateCartItemQuantity = (productId: string, quantity: number) => {
        setCart(prevCart => {
          const itemIndex = prevCart.findIndex(item => item.id === productId);
          if (itemIndex === -1) return prevCart; // Item no encontrado
          
          const updatedCart = [...prevCart];
          updatedCart[itemIndex] = {
            ...updatedCart[itemIndex],
            quantity: Math.max(1, quantity) // Asegura cantidad mínima de 1
          };
          console.log(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      };

    const addToCart = (product: CartInterface) => {
        if(!product.quantity){
            product.quantity = 1;
        }
        console.log(product);
        setCart(prev => [...prev, product]);
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
        localStorage.setItem("cart", JSON.stringify(cart.filter(item => item.id !== productId)));
    };

    const isProductInCart = (productId: string) => {
        return cart.some(item => item.id === productId);
    };

    return (
        <AppContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            isProductInCart,
            updateCartItemQuantity

        }
        }>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext debe usarse dentro de AppProvider");
    }
    return context;
};