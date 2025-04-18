export default function Home() {
  return (
    <div
      className="relative flexjustify-center min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] 
           bg-[url('/images/tortueland.jpeg')] bg-cover bg-no-repeat bg-center tortueland"
    >
      <h1
        className="uppercase text-5xl sm:text-7xl md:text-8xl font-extrabold text-white text-center 
                    relative z-10 tracking-wider  pt-24"
        style={{
          textShadow:
            "2px 2px 4px rgba(0, 100, 0, 0.7), -2px -2px 4px rgba(0, 100, 0, 0.7)",
        }}
      >
        Bienvenue sur <span className="text-green-200">Tortue Land</span> !
      </h1>
    </div>
  );
}
