'use client';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-between items-center px-6 max-w-7xl mx-auto"
    >
      <div className="font-extrabold text-2xl tracking-tighter text-white drop-shadow-lg italic">
        BASED RAINFALL
      </div>
      
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2 shadow-xl">
        <Wallet>
          <ConnectWallet className="!bg-[#0052FF] hover:!bg-[#0040C5] !text-white !font-bold !rounded-xl transition-colors">
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </motion.header>
  );
}
