import React from 'react';

export default function FlashSaleBanner() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-yellow-500 text-white text-center py-3 px-4 rounded shadow-md animate-pulse mb-6">
      🔥 Flash Sale! Get up to <span className="font-bold">50% OFF</span> on selected items — Limited Time Offer!
    </div>
  );
}
