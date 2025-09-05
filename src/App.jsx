import { useState } from 'react';
import Logo from './components/Logo';
import MenuSection from './components/MenuSection';
import Modal from './components/Modal';
import Cart from './components/Cart';
import Notification from './components/Notification';
import Footer from './components/Footer';
import { menuData } from './data/menuData';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  // Добавление товара в корзину
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.name === item.name);
      
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });

    showNotification(`${item.name} добавлен в заказ!`);
  };

  // Обновление количества товара
  const updateQuantity = (itemName, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.name === itemName) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // Удаление товара из корзины
  const removeFromCart = (itemName) => {
    setCart(prevCart => prevCart.filter(item => item.name !== itemName));
    showNotification('Товар удален из заказа');
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([]);
    showNotification('Заказ очищен');
  };

  // Открытие модального окна
  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Показ уведомления
  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  // Скрытие уведомления
  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="min-h-screen font-sans text-gray-100 antialiased selection:bg-[#ff60a6]/30 selection:text-white">
      {/* Улучшенный фон с современными градиентами */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>
      
      {/* Анимированные световые эффекты */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-[#ff60a6]/20 to-purple-500/20 blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute top-1/4 -right-32 h-80 w-80 rounded-full bg-gradient-to-l from-violet-500/15 to-[#ff60a6]/15 blur-3xl animate-ping" style={{ animationDuration: '12s' }}></div>
        <div className="absolute -bottom-32 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gradient-to-t from-pink-500/10 to-fuchsia-500/10 blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        <div className="absolute top-2/3 left-1/2 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-500/10 blur-3xl animate-bounce" style={{ animationDuration: '15s' }}></div>
      </div>
      
      {/* Текстурный overlay */}
      <div className="fixed inset-0 -z-5 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Контент */}
      <div className="container mx-auto p-6 max-w-4xl relative z-10">
        {/* Логотип и заголовок */}
        <Logo />

        {/* Меню */}
        <div className="max-w-7xl mx-auto">
          {menuData.map((section, index) => (
            <MenuSection
              key={index}
              section={section}
              onAddToCart={addToCart}
              onOpenModal={openModal}
            />
          ))}
        </div>

        {/* Футер */}
        <Footer />
      </div>

      {/* Модальное окно */}
      <Modal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Корзина */}
      <Cart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Уведомления */}
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onHide={hideNotification}
      />
    </div>
  );
}

export default App;