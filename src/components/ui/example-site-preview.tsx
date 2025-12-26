
'use client';

import { motion } from 'framer-motion';

const ExampleSitePreview = () => {
  return (
    <div className="w-full h-full p-2 bg-zinc-900 overflow-hidden">
      <motion.div
        className="w-full h-full bg-black rounded-sm border border-zinc-700/50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Header */}
        <div className="h-4 flex items-center justify-between px-2 border-b border-zinc-800/50">
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 rounded-full bg-purple-500/50" />
            <div className="w-4 h-1 rounded-full bg-zinc-600/50" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1 rounded-full bg-zinc-600/50" />
            <div className="w-3 h-1 rounded-full bg-zinc-600/50" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-2 space-y-2">
          <div className="w-10/12 h-4 rounded-sm bg-gradient-to-r from-purple-500/30 to-purple-500/10 mx-auto" />
          <div className="w-8/12 h-2 rounded-sm bg-zinc-700/50 mx-auto" />
          <div className="w-9/12 h-2 rounded-sm bg-zinc-700/50 mx-auto" />
        </div>
        
        <div className="mt-2 flex justify-center">
            <div className="w-8 h-3 rounded-full bg-purple-500/40" />
        </div>

        {/* Content cards */}
        <div className="p-2 grid grid-cols-2 gap-2 mt-1">
            <div className="h-8 rounded-sm bg-zinc-800/50 border border-zinc-700/50" />
            <div className="h-8 rounded-sm bg-zinc-800/50 border border-zinc-700/50" />
        </div>
      </motion.div>
    </div>
  );
};

export default ExampleSitePreview;
