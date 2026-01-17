import { FlaskConical, Github } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-black p-1.5 rounded-lg">
          <FlaskConical className="text-[#D1FF00] w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tighter">VERA <span className="text-gray-400 font-medium">LABS</span></span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <a href="#engine" className="hover:text-black transition">Insight Engine</a>
        <a href="#projects" className="hover:text-black transition">Projects</a>
        <a href="#about" className="hover:text-black transition">About</a>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://github.com" className="p-2 hover:bg-gray-100 rounded-full transition">
          <Github className="w-5 h-5" />
        </a>
        <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
          Contact
        </button>
      </div>
    </nav>
  );
}