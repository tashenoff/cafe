import { useEffect } from 'react';

const Modal = ({ item, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl text-gray-100 shadow-2xl ring-1 ring-white/20 transform transition-all duration-300 border border-[#ff60a6]/20 max-h-[90vh] overflow-hidden">
        {/* Световой эффект */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#ff60a6]/20 via-purple-500/20 to-[#ff60a6]/20 rounded-[2rem] blur opacity-60"></div>
        
        <div className="relative z-10">
          {/* Кнопка закрытия в верхнем правом углу */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-black/50 backdrop-blur-sm text-gray-200 hover:bg-[#ff60a6]/20 hover:text-white transition-all duration-300 border border-white/10"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Изображение */}
          <div className="relative h-64 overflow-hidden rounded-t-[2rem]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
          
          {/* Контент */}
          <div className="p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h3 className="text-2xl font-bold text-white leading-tight flex-1">
                {item.name}
              </h3>
              <span className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff60a6] to-purple-500 text-white text-base font-bold px-4 py-2 whitespace-nowrap shadow-lg shadow-[#ff60a6]/30 border border-white/20">
                {item.price}
              </span>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4">
              {item.description}
            </p>
            
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#ff60a6]/20 to-purple-500/20 text-[#ff60a6] border border-[#ff60a6]/30">
              Доступно для заказа
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
