// src/pages/VendorDashboard.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VendorCard from '../components/VendorCard';

// Sample data - replace with your actual data source
const vendors = [
  {
    id: '1',
    name: 'Tech Haven',
    description: 'Premium electronics and gadgets',
    logo: '/images/tech-haven-logo.png',
    products: ['1', '3'],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Home Essentials',
    description: 'Quality home and kitchen products',
    logo: '/images/home-essentials-logo.png',
    products: ['2', '4'],
    rating: 4.2
  }
];

const allProducts = [
  { 
    id: '1', 
    name: 'iPhone 16 Pro Max', 
    price: 999,
    image: '/images/iphone-16.jpg',
    category: 'electronics'
  },
  { 
    id: '2', 
    name: 'Non-Stick Cookware Set', 
    price: 129,
    image: '/images/cookware-set.jpg',
    category: 'kitchen'
  },
  // Add more products as needed
];

const VendorDashboard = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const foundVendor = vendors.find(v => v.id === vendorId);
      if (!foundVendor) {
        throw new Error(`Vendor with ID ${vendorId} not found`);
      }

      const vendorProducts = allProducts.filter(p => 
        foundVendor.products.includes(p.id)
      );

      setVendor({
        ...foundVendor,
        products: vendorProducts
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [vendorId]);

  if (loading) return <div className="text-center py-12">Loading vendor...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!vendor) return <div className="text-center py-12">Vendor not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="md:w-1/3 flex flex-col items-center">
          <img 
            src={vendor.logo} 
            alt={vendor.name}
            className="w-32 h-32 object-contain rounded-full border-2 border-gray-200 mb-4"
            onError={(e) => e.target.src = '/images/default-vendor.png'}
          />
          <h1 className="text-3xl font-bold text-center">{vendor.name}</h1>
          <p className="text-gray-600 mt-2 text-center">{vendor.description}</p>
          <div className="mt-4 flex items-center">
            <span className="text-yellow-500">★★★★☆</span>
            <span className="ml-2 text-gray-600">({vendor.rating})</span>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6">Products ({vendor.products.length})</h2>
          
          {vendor.products.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products available from this vendor.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendor.products.map(product => (
                <VendorCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;