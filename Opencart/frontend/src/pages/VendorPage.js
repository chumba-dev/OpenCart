// src/pages/VendorPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const VendorPage = () => {
  const { vendorId } = useParams();
  const { vendors, products } = useStore();

  const vendor = vendors.find(v => v.id === vendorId);
  const vendorProducts = products.filter(p => vendor?.products.includes(p.id));

  if (!vendor) return <div>Vendor not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/3">
          <img 
            src={vendor.logo} 
            alt={vendor.name} 
            className="w-32 h-32 object-contain rounded-full border-2 border-gray-200"
          />
          <h1 className="text-3xl font-bold mt-4">{vendor.name}</h1>
          <p className="text-gray-600 mt-2">{vendor.description}</p>
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorProducts.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPage;