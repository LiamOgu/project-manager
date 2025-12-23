function Header() {
  return (
    <header className="bg-base-100 border-b border-base-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-xl font-semibold">
            Project Manager
          </a>

          {/* User */}
          <div className="flex items-center gap-4">
            <button className="btn btn-sm btn-ghost">Connexion</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
