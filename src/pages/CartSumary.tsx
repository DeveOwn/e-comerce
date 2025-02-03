import { useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { CartInterface } from "../interface/CartInterface";

interface CartSumaryProps {
    cart: CartInterface[];
}

const CartSumary = ({ cart }: CartSumaryProps) => {

    useEffect(() => {
        getSubtotal();
        getTotal();
    }, [cart]);

    const getSubtotal = () => {
        if (cart.length === 0) return 0;
        return cart.reduce((acc: number, product: CartInterface) => (acc + product.price * product.quantity), 0);
    }

    const getTotal = () => {
        if (cart.length === 0) return 0;
        return getSubtotal() + 5.00 + 8.32;
    }


    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-black opacity-85 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-200">
                Order summary
            </h2>

            <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-500">$ {getSubtotal()}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex items-center text-sm text-gray-600">
                        <span>Shipping estimate</span>
                        <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how shipping is calculated</span>
                            <FaQuestionCircle aria-hidden="true" className="size-5" />
                        </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-500">$5.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="flex text-sm text-gray-600">
                        <span>Tax estimate</span>
                        <a href="#" className="ml-2 shrink-0 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Learn more about how tax is calculated</span>
                            <FaQuestionCircle aria-hidden="true" className="size-5" />
                        </a>
                    </dt>
                    <dd className="text-sm font-medium text-gray-200">$8.32</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-200">Order total</dt>
                    <dd className="text-base font-medium text-gray-200">$ {getTotal()}</dd>
                </div>
            </dl>

            <div className="mt-6">
                <button
                    type="submit"
                    className="cursor-pointer w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                    Checkout
                </button>
            </div>
        </section>
    );
};

export default CartSumary;