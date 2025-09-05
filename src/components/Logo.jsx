const Logo = () => {
  return (
    <section className="relative mb-16 overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 shadow-2xl">
      {/* Внутренние световые эффекты */}
      <div className="absolute inset-0 rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff60a6]/10 via-transparent to-violet-500/10 rounded-[2rem]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#ff60a6]/50 to-transparent"></div>
      </div>
      
      {/* Анимированная рамка */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#ff60a6]/20 via-purple-500/20 to-[#ff60a6]/20 p-[1px] animate-pulse" style={{ animationDuration: '4s' }}>
        <div className="w-full h-full rounded-[2rem] bg-transparent"></div>
      </div>
      
      <div className="relative z-20 px-8 py-12 text-center">
        <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <img src="/logo.svg" alt="Логотип" className="mx-auto w-[240px] h-auto object-contain drop-shadow-2xl" />
        </div>
        <p className="text-lg text-gray-300 font-medium tracking-wide">Выбирайте вкусняшки — быстро и удобно</p>
        <div className="mt-4 flex justify-center">
          <div className="h-1 w-24 bg-gradient-to-r from-[#ff60a6] to-violet-500 rounded-full shadow-lg shadow-[#ff60a6]/50"></div>
        </div>
      </div>
    </section>
  );
};

export default Logo;
