"use client"

import { useState } from 'react';

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-500 text-white text-center py-2 relative">
      <span>Overcore LTD (Beta Website) - Purchases Enabled - More Content Coming</span>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
        onClick={() => setIsVisible(false)}
      >
        &times;
      </button>
    </div>
  );
};

export default TopBanner;