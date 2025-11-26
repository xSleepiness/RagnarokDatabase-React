const Footer = () => {
  return (
    <footer className="bg-slate-800/95 border-t-2 border-slate-700 py-6 mt-auto">
      <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full lg:w-[70%] max-w-screen-xl text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Ragnarok Database. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Made with ❤️ for Ragnarok Online players
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
