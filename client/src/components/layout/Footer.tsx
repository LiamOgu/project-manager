function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} Project Manager - LiamOgu Industry Ltd
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-base-content/60 hover:text-base-content"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-base-content/60 hover:text-base-content"
            >
              Projets
            </a>
            <a
              href="#"
              className="text-base-content/60 hover:text-base-content"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
