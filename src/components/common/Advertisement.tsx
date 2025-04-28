
import React from 'react';

interface AdvertisementProps {
  type: 'banner' | 'square' | 'skyscraper';
}

const Advertisement: React.FC<AdvertisementProps> = ({ type }) => {
  const getAdSize = () => {
    switch (type) {
      case 'banner':
        return 'h-24 md:h-32';
      case 'square':
        return 'h-60 md:h-72';
      case 'skyscraper':
        return 'h-96 md:h-[500px]';
      default:
        return 'h-24 md:h-32';
    }
  };

  // This would normally be connected to Google AdSense
  return (
    <div className={`bg-news-light border border-dashed border-news-dark flex items-center justify-center w-full ${getAdSize()}`}>
      <div className="text-center">
        <p className="text-news-dark font-medium">Advertisement</p>
        <p className="text-xs text-gray-500">Your ad could be here</p>
      </div>
    </div>
  );
};

export default Advertisement;
