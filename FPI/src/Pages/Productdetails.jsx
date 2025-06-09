import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0f0d1e] text-white flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-xl text-red-400">No product details found.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0d1e] text-white p-8 ">
      <div className="max-w-3xl mx-auto bg-[#1b1a2e] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-400 underline text-center">Product Details</h2>

        <p className="mb-2"><span className="font-semibold text-gray-300">Product Name:</span> {product.name}</p>
        <p className="mb-2"><span className="font-semibold text-gray-300">Product ID:</span> {product.id}</p>
        <p className="mb-2"><span className="font-semibold text-gray-300">Manufacturer:</span> {product.manufacturer}</p>
        <p className="mb-2"><span className="font-semibold text-gray-300">Date Added:</span> {product.date}</p>

        <div className="mt-4 text-green-400 font-semibold text-lg">
          ✅ This product is verified and genuine.
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
