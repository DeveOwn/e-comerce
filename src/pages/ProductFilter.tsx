import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaAngleDown } from "react-icons/fa";
import { IoMdFunnel } from "react-icons/io";
import { useState, useEffect } from 'react';
import { Category } from '../interface/CategoryIntefrace';
import axios from 'axios';
import Loading from '../util/Loading';
import { CartInterface } from '../interface/CartInterface';

const sortOptions = [
    { name: 'Price asc', href: '#', current: true },
    { name: 'Price desc', href: '#', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface ProductFilterProps {
    setProducts: (products: CartInterface[]) => void;
    products: CartInterface[];
    setTotalPages: (totalPages: number) => void;
    setIsLoading: (isLoading: boolean) => void;
    currentPage: number;
}

export default function ProductFilter({ setProducts, setTotalPages, currentPage }: ProductFilterProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isFilterering, setIsFiltering] = useState(false);

    // Manejador para cambios en el checkbox
    const handleCheckboxChange = (category: string, isChecked: boolean) => {
        console.log(category, isChecked);
        setSelectedCategories((prevSelected) => {
            if (isChecked) {
                return [...prevSelected, category];
            } else {
                return prevSelected.filter((item) => item !== category);
            }
        });
    };
    useEffect(() => {
        setIsFiltering(true);
        if (selectedCategories.length === 0) {
            const fetchAllProducts = async (page: number) => {
                try {
                    const response = await axios.get(
                        `http://localhost:8080/api/products/all?page=${page}&size=12`
                    );
                    setProducts(response.data.content || []);
                    setTotalPages(response.data.totalPages || 1);
                } catch (error) {
                    console.error("Error fetching products:", error);
                } finally {
                    setIsFiltering(false);
                }
            };
            fetchAllProducts(currentPage);

        }
        try {
            const fetchProducts = async (page: number) => {
                const response = await axios.get(
                    `http://localhost:8080/api/products/filter?category=${selectedCategories.join(',')}&page=${page}&size=12`
                );
                if (response.status === 200 && response.data && response.data.content.length > 0) {
                    setProducts(response.data.content || []);
                    setTotalPages(response.data.totalPages || 1);
                }
            };
            fetchProducts(currentPage);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsFiltering(false);
        }
    }, [selectedCategories]);

    useEffect(() => {
        setIsFiltering(true);
        const getCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories/all');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsFiltering(false);
            }
        }
        getCategories();
    }, []);


    return (
        <div className="bg-white">
            {/* Filters */}
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-b border-t border-gray-200"
            >
                <h2 id="filter-heading" className="sr-only">
                    Filters
                </h2>
                <div className="relative col-start-1 row-start-1 py-4">
                    <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                        <div>
                            <DisclosureButton className="group flex items-center font-medium text-gray-700">
                                <IoMdFunnel
                                    aria-hidden="true"
                                    className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500"
                                />
                                {selectedCategories.length} Filters
                            </DisclosureButton>
                        </div>
                        <div className="pl-6">
                            <button type="button" className="text-gray-500 hover:cursor-pointer" onClick={() => setSelectedCategories([])}>
                                Clear all
                            </button>
                        </div>
                    </div>
                </div>
                <DisclosurePanel className="border-t border-gray-200 py-10">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                        <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                            <fieldset>
                                <legend className="block font-medium">Category</legend>
                                <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                                    {categories.map((option) => (
                                        <div key={option._id} className="flex gap-3">
                                            <div className="flex h-5 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input
                                                        onChange={(e) => handleCheckboxChange(option.category, e.target.checked)}
                                                        checked={selectedCategories.includes(option.category)}
                                                        value={option.category}
                                                        id={`category-${option._id}`}
                                                        name="category[]"
                                                        type="checkbox"
                                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                    />
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                        <path
                                                            d="M3 7H11"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label htmlFor={`category-${option._id}`} className="text-base text-gray-600 sm:text-sm">
                                                {option.category}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </DisclosurePanel>
                <div className="col-start-1 row-start-1 py-4">
                    <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                        <Menu as="div" className="relative inline-block">
                            <div className="flex">
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <FaAngleDown
                                        aria-hidden="true"
                                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <MenuItem key={option.name}>
                                            <a
                                                href={option.href}
                                                className={classNames(
                                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                    'block px-4 py-2 text-sm data-[focus]:bg-gray-100 data-[focus]:outline-none',
                                                )}
                                            >
                                                {option.name}
                                            </a>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </Disclosure>
            {isFilterering &&
                <Loading />
            }
        </div>
    )
}
