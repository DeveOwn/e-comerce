import React, { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

interface Product {
    id: string;
    name: string;
    price: number;
    imageUri: string;
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();
    const debouncedQuery = useDebounce(query, 300);

    const handleClick = (id: string) => {
        navigate(`/product/${id}`);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedQuery.trim()) {
                setResults([]);
                setShowResults(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/products/search?q=${debouncedQuery}`
                );
                const fetchedProducts: Product[] = response.data.content || [];
                setResults(fetchedProducts);
                setShowResults(true); // Muestra los resultados incluso si están vacíos
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearchResults();
    }, [debouncedQuery]);

    const handleFocus = () => {
        if (results.length > 0 || isSearching) {
            setShowResults(true);
        }
    };

    const handleBlur = () => {
        setTimeout(() => setShowResults(false), 200);
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Input de búsqueda */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 focus:outline-none"
                />
            </div>

            {/* Resultados del buscador */}
            {showResults && (
                <div className="absolute z-10 bg-white shadow-lg rounded-lg mt-2 w-full max-h-64 overflow-y-auto border border-gray-300">
                    {isSearching ? (
                        <div className="p-4 text-gray-500 text-center">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center p-4 hover:bg-gray-100 transition cursor-pointer"
                                onClick={() => handleClick(product.id)}
                            >
                                <img
                                    src={product.imageUri}
                                    alt={product.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-gray-500 text-center">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
