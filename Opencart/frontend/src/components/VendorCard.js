// src/components/VendorCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const VendorCard = ({ product }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="h-48 flex items-center justify-center mb-4 bg-gray-100 rounded-lg">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-full max-w-full object-contain"
            onError={(e) => e.target.src = '/images/placeholder-product.png'}
          />
        ) : (
          <span className="text-gray-400">No image available</span>
        )}
      </div>
      <h3 className="font-medium text-lg">{product.name}</h3>
      <p className="text-gray-800 font-bold mt-2">
        ${product.price?.toLocaleString() ?? 'N/A'}
      </p>
      <Link 
        to={`/products/${product.id}`}
        className="mt-4 inline-block text-blue-500 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};

export default VendorCard;