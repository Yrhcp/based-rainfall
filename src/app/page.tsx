/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock } from 'lucide-react';

// Топ-20 монет по капе (логотипы с CoinGecko CDN)
const TOKENS = [
  { id: 'btc', name: 'Bitcoin', img: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', points: 100 },
  { id: 'eth', name: 'Ethereum', img: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', points: 50 },
  { id: 'sol', name: 'Solana', img: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', points: 30 },
  { id: 'usdc', name: 'USDC', img: 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png', points: 10 },
  { id: 'bnb', name: 'BNB', img: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', points: 40 },
  { id: 'xrp', name: 'XRP', img: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', points: 20 },
  { id: 'doge', name: 'Dogecoin', img: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', points: 15 },
  { id: 'ada', name: 'Cardano', img: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', points: 10 },
  { id: 'trx', name: 'TRON', img: 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png', points: 10 },
  { id: 'dot', name: 'Polkadot', img: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', points: 25 },
];

export default function Game() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [fallingTokens, setFallingTokens] = useState<{ id: number; type: typeof TOKENS[0]; x: number }[]>([]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameState('playing');
    setFallingTokens([]);
  };

  // Логика падения монет
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('end');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Интервал появления новых монет (очень часто для сложности)
    const spawner = setInterval(() => {
      const randomToken = TOKENS[Math.floor(Math.random() * TOKENS.length)];
      const newToken = {
        id: Date.now() + Math.random(),
        type: randomToken,
        x: Math.floor(Math.random() * 85), // Случайная позиция по горизонтали
      };
      setFallingTokens((prev) => [...prev, newToken]);
    }, 250); // Каждые 250мс падает новая монета

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [gameState]);

  const catchToken = (id: number, points: number) => {
    setScore((prev) => prev + points);
    setFallingTokens((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="relative min-h-screen bg-[#0052FF] overflow-hidden flex flex-col items-center justify-center text-white p-4 font-sans select-none">
      
      {/* Шапка с данными */}
      {gameState === 'playing' && (
        <div className="absolute top-24 left-0 right-0 flex justify-between px-8 z-50">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <Trophy size={20} />
            <span className="text-xl font-bold">{score}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl">
            <Clock size={20} />
            <span className="text-xl font-bold">{timeLeft}s</span>
          </div>
        </div>
      )}

      {/* Начальный экран */}
      {gameState === 'start' && (
        <div className="text-center z-50">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tighter">BASED RAINFALL</h1>
          <p className="text-xl opacity-80 mb-8">Catch Top-20 Crypto! 10 Seconds.</p>
          <button 
            onClick={startGame}
            className="bg-white text-[#0052FF] text-2xl font-black py-5 px-12 rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            START GAME
          </button>
        </div>
      )}

      {/* Игровое поле (Падающие монеты) */}
      <AnimatePresence>
        {gameState === 'playing' && fallingTokens.map((token) => (
          <motion.div
            key={token.id}
            initial={{ y: -100, opacity: 1 }}
            animate={{ y: '110vh' }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 1.8, ease: "linear" }} // Скорость падения
            onPointerDown={() => catchToken(token.id, token.type.points)}
            className="absolute cursor-pointer touch-none"
            style={{ width: '60px', height: '60px', left: `${token.x}%` }}
          >
            <img src={token.type.img} alt={token.type.name} className="w-full h-full object-contain pointer-events-none drop-shadow-lg" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Экран завершения */}
      {gameState === 'end' && (
        <div className="text-center z-50 bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20">
          <h2 className="text-3xl font-bold mb-2">TIME&apos;S UP!</h2>
          <div className="text-6xl font-black mb-6 text-yellow-400">{score}</div>
          <button 
            onClick={startGame}
            className="w-full bg-white text-[#0052FF] font-bold py-4 rounded-2xl mb-4"
          >
            TRY AGAIN
          </button>
          <p className="text-sm opacity-60 italic text-white">Your score will be saved on Base soon...</p>
        </div>
      )}

      <footer className="absolute bottom-6 opacity-40 text-xs tracking-widest uppercase font-bold">
        Powered by Base OnchainKit
      </footer>
    </main>
  );
}
