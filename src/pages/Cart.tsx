import { FaCircleXmark } from "react-icons/fa6";
import { FaCheck, FaClock } from "react-icons/fa";
import { useAppContext } from "../contexts/AppContext";
import CartSumary from "./CartSumary";

export default function Example() {
    const { cart, updateCartItemQuantity, removeFromCart } = useAppContext();

    const handleIncrement = (productId: string) => {
        const item = cart.find(item => item.id === productId);
        if (item) {
            updateCartItemQuantity(productId, item.quantity + 1);
        }
    };

    const handleDecrement = (productId: string) => {
        const item = cart.find(item => item.id === productId);
        if (item && item.quantity > 1) {
            updateCartItemQuantity(productId, item.quantity - 1);
        }
    };

    const handleQuantityChange = (productId: string, newQuantity: number) => {
        const quantity = Math.max(1, newQuantity);
        updateCartItemQuantity(productId, quantity);
    };

    const handleRemove = (productId: string) => {
        removeFromCart(productId);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 mt-20">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {cart.map((product, productIdx) => (
                                <li key={product.id} className="flex py-6 sm:py-10">
                                    <div className="shrink-0">
                                        <img
                                            alt={product.imageUri}
                                            src={product.imageUri}
                                            className="size-24 rounded-md object-cover sm:size-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a href={product.id} className="font-bold text-gray-700 hover:text-gray-800">
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm font-medium text-yellow-700">$ {product.price}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">
                                                <div className="flex items-center gap-2 max-w-32">
                                                    <div className="relative flex items-center w-full">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDecrement(product.id)}
                                                            className="h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-l-md transition-colors"
                                                            aria-label="Decrementar cantidad"
                                                        >
                                                            <span className="text-lg">−</span>
                                                        </button>

                                                        <input
                                                            name={`quantity-${productIdx}`}
                                                            aria-label={`Cantidad, ${product.name}`}
                                                            type="number"
                                                            min="1"
                                                            value={product.quantity}
                                                            onChange={(e) =>
                                                                handleQuantityChange(product.id, parseInt(e.target.value))
                                                            }
                                                            className="h-8 w-12 text-center border-t border-b border-gray-300 focus:outline-none focus:border-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                        />

                                                        <button
                                                            onClick={() => handleIncrement(product.id)}
                                                            type="button"
                                                            className="h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-md transition-colors"
                                                            aria-label="Incrementar cantidad"
                                                        >
                                                            <span className="text-lg">+</span>
                                                        </button>
                                                    </div>

                                                    <div className="ml-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemove(product.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                                                            aria-label="Eliminar producto"
                                                        >
                                                            <FaCircleXmark className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                            <span>Stock: {product.stock}</span>
                                            {product.stock ? (
                                                <FaCheck aria-hidden="true" className="size-5 shrink-0 text-green-500" />
                                            ) : (
                                                <FaClock aria-hidden="true" className="size-5 shrink-0 text-gray-300" />
                                            )}
                                            
                                            <span>{product.stock ? 'In stock' : `Not in stock`}</span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <CartSumary cart={cart} />
                </form>
            </div>
        </div>
    )
}