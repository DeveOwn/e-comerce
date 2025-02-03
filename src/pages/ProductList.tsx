import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCart } from "react-icons/io";
import ProductPageable from "../components/product/ProductPageable";
import { useNavigate } from "react-router";
import Loading from "../util/Loading";
import ProductFilter from "./ProductFilter";
import { useAppContext } from "../contexts/AppContext";
import { CartInterface } from "../interface/CartInterface";

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<CartInterface[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const {
        addToCart,
        removeFromCart,
        isProductInCart
    } = useAppContext();

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `https://1ok2k68ij1.execute-api.us-east-1.amazonaws.com/test/products`
            );
            setProducts(response.data.content || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () =>
        setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

    const handleClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    const handleCart = (product: CartInterface) => {
        if (isProductInCart(product.id)) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50">
            <div className="bg-gradient-to-r from-purple-900 via-blue-500 to-purple-900 text-white py-10 text-center">
                <h1 className="text-4xl font-bold mb-4 mt-14">Discover Our Products</h1>
                <p className="text-lg">Explore the best deals and latest arrivals!</p>
            </div>

            <div className="">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="">
                        <ProductFilter setProducts={setProducts} products={products} setTotalPages={setTotalPages} setIsLoading={setIsLoading} currentPage={currentPage} />
                        <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8">
                            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                                {products.map((product) => (
                                    <div
                                        key={product.id}
                                        className="relative hover:cursor-pointer bg-white rounded-lg shadow-md p-4 hover:scale-105"
                                    >

                                        {/* Image Section */}
                                        <div
                                            className="relative h-72 w-full overflow-hidden rounded-lg"
                                            onClick={() => handleClick(product.id)}
                                        >
                                            <img
                                                alt={product.imageUri}
                                                src={product.imageUri}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="relative mt-4">
                                            <h3 className="text-sm font-medium text-gray-900 truncate">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                                                {product.description}
                                            </p>
                                            <br />

                                        </div>
                                        <h3 className="text-md font-medium text-yellow-700 mt-2 absolute bottom-2 left-2">
                                            ${product.price.toFixed(2)}
                                        </h3>
                                        <div className="absolute bottom-0 right-0 bg-gray-900 hover:bg-yellow-700 hover:cursor-pointer rounded-r-lg" onClick={() => handleCart(product)}>
                                            <button className="text-white p-2 hover:cursor-pointer flex items-center justify-items-center" >
                                                {isProductInCart(product.id) ? "Remove" : "Add"}
                                                <IoMdCart className="ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            <ProductPageable
                                handlePrevious={handlePrevious}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handleNext={handleNext}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
