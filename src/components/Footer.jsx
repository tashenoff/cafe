const Footer = () => {
  return (
    <footer className="mt-20 mb-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md border border-white/10 shadow-2xl">
        {/* Световые эффекты */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff60a6]/5 via-purple-500/5 to-[#ff60a6]/5 rounded-[2rem]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#ff60a6]/40 to-transparent"></div>
        
        <div className="relative z-20 px-8 py-10 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-[#ff60a6]/20 to-purple-500/20 mb-4">
              <svg className="w-6 h-6 text-[#ff60a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#ff60a6] via-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
              Наш адрес
            </h3>
          </div>
          <div className="text-gray-200 space-y-2">
            <p className="text-lg font-medium">Посёлок Джалиль, Лесная 13а</p>
            <p className="text-lg font-medium">второй этаж</p>
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-[#ff60a6] via-purple-500 to-violet-500 rounded-full shadow-lg shadow-[#ff60a6]/40"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
