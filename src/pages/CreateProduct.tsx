import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | undefined>();
  const [stock, setStock] = useState<number | undefined>();
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para manejo de carga
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image.");
      return;
    }

    try {
      setIsSubmitting(true); // Activar estado de carga
      const formData = new FormData();
      const id = null;
      const imageUri = "";
      formData.append(
        "product",
        JSON.stringify({ id, name, description, price, stock, imageUri })
      );
      formData.append("file", image);

      const response = await axios.post(
        "http://localhost:8080/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/products"); // Redirigir a la lista de productos
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(
        "Failed to create product. Please ensure all fields are filled correctly."
      );
    } finally {
      setIsSubmitting(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create a New Product
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 absolute -top-2.5 left-4 bg-white px-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 transition"
              placeholder="Enter product name"
            />
          </div>

          {/* Description */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 absolute -top-2.5 left-4 bg-white px-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 transition resize-none"
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          {/* Price */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 absolute -top-2.5 left-4 bg-white px-1">
              Price
            </label>
            <input
              type="number"
              value={price || ""}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 transition"
              placeholder="Enter product price"
            />
          </div>

          {/* Stock */}
          <div className="relative">
            <label className="text-sm font-medium text-gray-600 absolute -top-2.5 left-4 bg-white px-1">
              Stock
            </label>
            <input
              type="number"
              value={stock || ""}
              onChange={(e) => setStock(parseFloat(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-blue-400 transition"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-blue-400 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 ${
              isSubmitting ? "bg-blue-300" : "bg-blue-500"
            } text-white font-medium rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400`}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Creating...</span>
              </div>
            ) : (
              "Create Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
