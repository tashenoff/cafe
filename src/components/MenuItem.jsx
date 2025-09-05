import { useState } from 'react';

const MenuItem = ({ item, onAddToCart, onOpenModal }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    onOpenModal(item);
  };

  return (
    <div className="group relative rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-[#ff60a6]/20 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden">
      {/* Декоративный градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff60a6]/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Анимированная рамка */}
      <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-[#ff60a6]/20 via-purple-500/20 to-[#ff60a6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      <div className="relative z-10 p-6">
        {/* Изображение */}
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-800/50">
          <img
            src={item.image}
            alt={item.name}
            className={`w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#ff60a6] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {/* Цена в правом нижнем углу изображения */}
          <div className="absolute bottom-3 right-3 bg-gradient-to-r from-[#ff60a6] to-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg border border-white/20">
            {item.price}
          </div>
          
          {/* Декоративный overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        {/* Название товара */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2 group-hover:text-[#ff60a6] transition-colors duration-300">
            {item.name}
          </h3>
          
          {/* Декоративная линия */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#ff60a6]/30 to-transparent group-hover:via-[#ff60a6]/60 transition-all duration-300 mt-3"></div>
        </div>
        
        {/* Кнопки */}
        <div className="flex gap-3">
          <button
            onClick={handleOpenModal}
            className="flex-1 flex items-center justify-center rounded-2xl bg-gradient-to-r from-white/10 to-white/5 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-semibold px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-blue-500/40 backdrop-blur-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Подробнее</span>
          </button>
          
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff60a6] to-purple-500 hover:from-[#ff60a6] hover:to-purple-600 text-white text-sm font-semibold px-4 py-3 shadow-lg hover:shadow-xl hover:shadow-[#ff60a6]/50 transition-all duration-300 border border-white/20 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h6a2 2 0 002-2v-.5" />
            </svg>
            <span>В заказ</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
