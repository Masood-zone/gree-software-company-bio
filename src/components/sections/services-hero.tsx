export default function ServicesHero() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-5xl lg:text-6xl font-bold">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide comprehensive software development services designed to
            transform your business and drive growth. From web development to
            mobile applications, we have the expertise to bring your vision to
            life.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4</div>
              <div className="text-muted-foreground">Core Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-muted-foreground">Custom Solutions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">Fast</div>
              <div className="text-muted-foreground">Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
