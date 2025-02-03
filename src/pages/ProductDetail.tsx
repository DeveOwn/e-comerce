import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../contexts/AppContext";
import { CartInterface } from "../interface/CartInterface";


const ProductDetail: React.FC = () => {
    const { isProductInCart, addToCart, removeFromCart, } = useAppContext();
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<CartInterface | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/products/find/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleCart = (product: CartInterface) => {
        if (isProductInCart(product.id)) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-600 text-lg">Loading product details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="pb-16 pt-6 sm:pb-24 mt-10 w-full max-w-7xl">
                <nav
                    aria-label="Breadcrumb"
                    className="mx-auto px-4 sm:px-6 lg:px-8 mb-8"
                >
                </nav>

                <div className="flex flex-col lg:flex-row lg:gap-x-8 items-center lg:items-start">
                    {/* Image Section */}
                    <div className="flex-shrink-0 w-full lg:w-1/2">
                        <img
                            alt={product.name}
                            src={product.imageUri}
                            className="rounded-lg shadow-md object-cover w-full h-[500px]" // Altura fija
                        />
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
                        <div className="items-center mb-4 border-t border-gray-200 py-4">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                        </div>

                        {/* Product Description */}
                        <div className="mt-4 border-t border-b border-gray-200 py-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Description
                            </h2>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                            <br />
                            <p className="text-2xl font-bold text-yellow-800">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>

                        <div className="mt-4 border-b border-gray-200 py-4">
                            <h2 className="text-lg font-medium text-gray-900">
                                Stock
                            </h2>
                            <p className="mt-2 text-gray-600">{product.stock}</p>
                            <br />
                        </div>

                        <div className="border-b border-gray-200 py-4">
                            <button
                                onClick={() => handleCart(product)}
                                type="button"
                                className="w-full lg:w-auto px-6 py-3 bg-indigo-600 text-white font-medium text-lg rounded-lg shadow-md 
                                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:cursor-pointer"
                            >
                                {isProductInCart(product.id) ? "Remove" : "Add to cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
