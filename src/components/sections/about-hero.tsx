import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in-left">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                About <span className="gradient-text">Gree Software</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Founded with a vision to transform businesses through innovative
                technology, Gree Software Company has been at the forefront of
                software development, delivering cutting-edge solutions that
                drive growth and efficiency.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 bg-secondary rounded-xl">
                <div className="text-3xl font-bold mb-2">2021</div>
                <div className="text-muted-foreground">Founded</div>
              </div>
              <div className="text-center p-6 bg-secondary rounded-xl">
                <div className="text-3xl font-bold mb-2">Ghana</div>
                <div className="text-muted-foreground">Based in</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center animate-fade-in-right">
            <div className="relative w-96 h-96">
              <Image
                src="/src/assets/images/gree-logo-white.jpg"
                alt="Gree Software Company"
                fill
                className="object-contain dark:hidden"
              />
              <Image
                src="/src/assets/images/gree-logo-black.jpg"
                alt="Gree Software Company"
                fill
                className="object-contain hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
