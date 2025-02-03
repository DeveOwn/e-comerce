import React from "react";
import { GrFormNextLink } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
interface ProductPageableProps {
    handlePrevious: () => void;
    currentPage: number;
    totalPages: number;
    handleNext: () => void;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const ProductPageable: React.FC<ProductPageableProps> = ({
    handlePrevious,
    currentPage,
    totalPages,
    handleNext,
    setCurrentPage
}) => {
    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => {
                        if (i - 1 !== currentPage) {
                            setCurrentPage(i - 1); // Actualizamos directamente el estado
                        }
                    }}
                    aria-current={currentPage + 1 === i ? "page" : undefined}
                    className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium hover:cursor-pointer p-2 mt-1 ${currentPage + 1 === i
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <nav className="flex items-center justify-between border-b border-t border-gray-200 px-4 sm:px-0 p-10 bg-indigo-50">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    className={`inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium  hover:cursor-pointer ${currentPage === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:border-gray-300 hover:text-indigo-700"
                        }`}
                >
                    <GrLinkPrevious aria-hidden="true" className="mr-3 h-5 w-5" />
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                {renderPageNumbers()}
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium hover:cursor-pointer ${currentPage === totalPages - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-500 hover:border-gray-300 hover:text-indigo-700"
                        }`}
                >
                    Next
                    <GrFormNextLink aria-hidden="true" className="ml-3 h-5 w-5" />
                </button>
            </div>
        </nav>
    );
};

export default ProductPageable;
