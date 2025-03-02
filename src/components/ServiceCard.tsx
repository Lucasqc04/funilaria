import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500 text-center p-4">
            <p className="font-medium">coloque foto aqui</p>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-blue-900 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;