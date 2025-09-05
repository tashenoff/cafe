import { useEffect, useState } from 'react';

const Notification = ({ message, isVisible, onHide }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [animationState, setAnimationState] = useState('hidden'); // hidden, entering, visible, leaving

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setAnimationState('entering');
      
      // Показываем уведомление
      const enterTimer = setTimeout(() => {
        setAnimationState('visible');
      }, 50);

      // Начинаем скрытие через 3 секунды
      const hideTimer = setTimeout(() => {
        setAnimationState('leaving');
        setTimeout(() => {
          onHide();
        }, 500);
      }, 3000);

      return () => {
        clearTimeout(enterTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setAnimationState('leaving');
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimationState('hidden');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!shouldRender) return null;

  const getAnimationClasses = () => {
    switch (animationState) {
      case 'entering':
        return '-translate-y-full opacity-0 scale-95';
      case 'visible':
        return 'translate-y-0 opacity-100 scale-100';
      case 'leaving':
        return '-translate-y-full opacity-0 scale-95';
      default:
        return '-translate-y-full opacity-0 scale-95';
    }
  };

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${getAnimationClasses()}`}>
      {/* Световой эффект */}
      <div className="absolute -inset-2 bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-green-600/30 rounded-3xl blur-lg opacity-60 animate-pulse"></div>
      
      <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm overflow-hidden min-w-[350px] max-w-[500px]">
        {/* Блестящий эффект */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
        
        {/* Фоновые частицы */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-4 right-6 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-3 left-8 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-2 right-4 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          {/* Анимированная иконка корзины */}
          <div className="relative">
            <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0V19a2 2 0 002 2h6a2 2 0 002-2v-.5" />
            </svg>
            
            {/* Пульсирующее кольцо */}
            <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping"></div>
          </div>
          
          {/* Текст с анимацией */}
          <span className="font-medium text-base flex-1">
            {message}
          </span>
          
          {/* Галочка успеха */}
          <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Прогресс-бар */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
          <div 
            className="h-full bg-white/60 transition-all duration-3000 ease-linear" 
            style={{ 
              width: animationState === 'visible' ? '0%' : '100%',
              transitionDuration: animationState === 'visible' ? '3000ms' : '0ms'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
