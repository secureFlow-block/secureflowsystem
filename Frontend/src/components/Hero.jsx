const Hero = () => (
  <section className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-dark to-[#2d1b4d] relative overflow-hidden">
    <div className="blockchain-grid absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
    <div className="max-w-3xl text-center z-10">
      <h1 className="heading text-2xl sm:text-4xl md:text-5xl font-bold mb-4 capitalize">
      segurança blockchain de próxima geração
      </h1>
      <p className="mb-8 text-gray-400 text-base md:text-2xl ">
      Proteja seus ativos digitais com a avançada tecnologia blockchain do SecureFlow. Experimente níveis sem precedentes de segurança, transparência e
      eficiência.
      </p>
      <a
        href="/"
        className="inline-block px-8 py-4 bg-primary text-white rounded-lg font-medium hover:-translate-y-0.5 transition duration-500 shadow-lg hover:bg-secondary shadow-primary/20"
      >
        Iniciar
      </a>
    </div>
  </section>
);

export default Hero;
