const Stats = () => (
  <section className="py-24 px-8 bg-primary/10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 capitalize">nosso impacto</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
        <div>
          <h4 className="text-4xl font-bold text-primary mb-2">100K+</h4>
          <p className="text-gray-400 capitalize">usuários ativos</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-primary mb-2">$1B+</h4>
          <p className="text-gray-400 capitalize">ativos garantidos</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-primary mb-2">99.9%</h4>
          <p className="text-gray-400 capitalize">tempo de atividade</p>
        </div>
        <div>
          <h4 className="text-4xl font-bold text-primary mb-2">24/7</h4>
          <p className="text-gray-400 capitalize">Suporte</p>
        </div>
      </div>
    </div>
  </section>
);

export default Stats;
