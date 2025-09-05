import { useState, useEffect } from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart, onClearCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  const openCart = () => {
    setIsOpen(true);
    setTimeout(() => setIsAnimating(true), 10); // Небольшая задержка для начала анимации
  };

  const closeCart = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Ждем завершения анимации
  };

  const orderViaWhatsApp = () => {
    if (cart.length === 0) return;

    const orderDetails = cart.map(item => 
      `${item.name} - ${item.quantity} шт. - ${item.price}`
    ).join('\n');

    const message = `Здравствуйте! Хочу сделать заказ:\n\n${orderDetails}\n\nИтого: ${totalPrice} руб`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Плавающая кнопка корзины */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={openCart}
          className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#ff60a6] to-purple-500 text-white shadow-2xl shadow-[#ff60a6]/50 hover:shadow-[#ff60a6]/70 hover:scale-110 transition-all duration-300 border-2 border-white/20"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h6a2 2 0 002-2v-.5" />
          </svg>
          
          {/* Счетчик товаров */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white animate-bounce">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Модальное окно корзины */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl transition-all duration-300 ease-out ${
            isAnimating 
              ? 'bg-black/70 opacity-100' 
              : 'bg-black/0 opacity-0'
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeCart();
            }
          }}
        >
          <div className={`relative w-full max-w-2xl h-[90vh] max-h-[600px] rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl text-gray-100 shadow-2xl ring-1 ring-white/20 border border-[#ff60a6]/20 flex flex-col overflow-hidden transition-all duration-300 ease-out transform ${
            isAnimating 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-90 translate-y-8'
          }`}>
            {/* Световой эффект */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ff60a6]/20 via-purple-500/20 to-[#ff60a6]/20 rounded-[2rem] blur opacity-60"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Заголовок */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#ff60a6] via-purple-400 to-violet-400 bg-clip-text text-transparent">
                  Ваш заказ
                </h2>
                <button
                  onClick={closeCart}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-black/30 backdrop-blur-sm text-gray-200 hover:bg-[#ff60a6]/20 hover:text-white transition-all duration-300 border border-white/10"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Список товаров */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h6a2 2 0 002-2v-.5" />
                    </svg>
                    <p className="text-gray-400 text-lg">Корзина пуста</p>
                    <p className="text-gray-500 text-sm mt-2">Добавьте товары из меню</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white text-base leading-snug mb-2">
                              {item.name}
                            </h4>
                            <p className="text-[#ff60a6] text-base font-medium mb-3">
                              {item.price}
                            </p>
                          </div>
                        </div>
                        
                        {/* Отдельная строка для элементов управления */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Группа: Управление количеством - слева */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onUpdateQuantity(item.name, -1)}
                              className="w-9 h-9 rounded-full bg-red-500/20 hover:bg-red-500/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="text-white font-semibold text-lg min-w-[2.5rem] text-center bg-white/10 rounded-xl px-3 py-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.name, 1)}
                              className="w-9 h-9 rounded-full bg-green-500/20 hover:bg-green-500/40 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>

                          {/* Группа: Удаление из корзины - справа */}
                          <button
                            onClick={() => onRemoveFromCart(item.name)}
                            className="w-9 h-9 rounded-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Итого и кнопки */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-semibold text-white">Итого:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#ff60a6] to-purple-500 bg-clip-text text-transparent">
                      {totalPrice} руб
                    </span>
                  </div>
                  <button
                    onClick={orderViaWhatsApp}
                    className="w-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-bold px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 mb-3"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087" />
                    </svg>
                    Заказать через WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
