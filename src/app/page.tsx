import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0052FF] flex flex-col items-center justify-center text-white p-6 font-sans">
      <h1 className="text-4xl font-bold mb-2">Based Rainfall</h1>
      <p className="text-xl opacity-90 mb-12 text-center">Catch the tokens, build your score!</p>
      
      <div className="w-full max-w-xs space-y-4">
        <button className="w-full bg-white text-[#0052FF] font-bold py-4 rounded-2xl text-xl shadow-lg hover:scale-105 active:scale-95 transition-transform">
          START GAME
        </button>
        
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white/10 border border-white/20 py-3 rounded-xl font-medium backdrop-blur-sm">
            Check-in
          </button>
          <button className="bg-white/10 border border-white/20 py-3 rounded-xl font-medium backdrop-blur-sm">
            Leaderboard
          </button>
        </div>
      </div>
      
      <footer className="mt-auto opacity-60 text-sm">
        Built on Base
      </footer>
    </main>
  );
}
