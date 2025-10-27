import heroImage from "../../assets/Untitled-design-37.png";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center text-white min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0a1a2f]/70"></div>

      <div className="relative z-10 px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
          Implementing Responsible AI: The Path to Practicality
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-10">
          Empowering developers, leaders, and organizations to build, deploy, and govern AI
          with integrity, intelligence, and impact.
        </p>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition">
          Explore our service
        </button>
      </div>
    </section>
  );
}
