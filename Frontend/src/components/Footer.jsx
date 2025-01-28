const Footer = () => (
  <footer className="bg-dark/90 text-light pt-16 pb-8 px-8">
    <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <path d="M20 5L30 15L20 25L10 15L20 5Z" stroke="currentColor" className="text-secondary" strokeWidth="2" />
            <path d="M20 15L30 25L20 35L10 25L20 15Z" stroke="currentColor" className="text-primary" strokeWidth="2" />
          </svg>
          <span className="text-xl font-bold">SecureFlow</span>
        </div>
        <p className="text-gray-400 mb-4">Construindo o futuro da tecnologia blockchain segura.</p>
        <div className="flex gap-4">
          <a href="#" title="twitter" className="text-gray-400 hover:text-secondary transition hover:-translate-y-1 duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" title="linkedin" className="text-gray-400 hover:text-secondary transition hover:-translate-y-1 duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="#" title="github" className="text-gray-400 hover:text-secondary transition hover:-translate-y-1 duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-4 capitalize">produto</h4>
        <ul className="space-y-2">
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              plataforma
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              soluções
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              preços
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              documentação
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-4 capitalize">empresa</h4>
        <ul className="space-y-2">
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              sobre
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              carreiras
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              Blog
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              imprensa
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-4 capitalize">Suporte</h4>
        <ul className="space-y-2">
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition  capitalize">
              centro de ajuda
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition capitalize">
              Contate-nos
            </a>
          </li>
          <li>
            <a href="/" className="text-gray-400 hover:text-secondary transition  capitalize">
              Status
            </a>
          </li>
          <li className="hover:translate-x-1 duration-300">
            <a href="/" className="text-gray-400 hover:text-secondary transition  capitalize">
              política de privacidade
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-700">
      <p className="text-center text-gray-400">
        &copy; {new Date().getFullYear()} <span className="font-bold"> SecureFlow</span>. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;