"use client";

import { useState } from "react";
import Link from "next/link";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-6 z-50">
      {/* The Hamburger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="p-3 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl text-pink-500 hover:bg-neutral-800 transition-all shadow-[0_0_20px_-5px_rgba(236,72,153,0.3)]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            // X icon when open
            <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></>
          ) : (
            // Hamburger icon when closed
            <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>
          )}
        </svg>
      </button>

      {/* The Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl p-2 flex flex-col gap-1 min-w-[180px]">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className="text-white font-medium hover:bg-pink-500/20 px-4 py-3 rounded-xl transition-colors"
          >
            Wordle Tracker
          </Link>
          <Link 
            href="/album" 
            onClick={() => setIsOpen(false)} 
            className="text-pink-400 font-bold hover:bg-pink-500/20 px-4 py-3 rounded-xl transition-colors flex justify-between items-center"
          >
            Album!
          </Link>
        </div>
      )}
    </div>
  );
}