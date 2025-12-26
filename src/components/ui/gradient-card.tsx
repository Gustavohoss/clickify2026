
'use client'
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Spotlight } from "./spotlight";
import Image from "next/image";

interface GradientCardProps {
    title: string;
    description: string;
    imageUrl?: string | null;
    icon?: React.ReactNode;
}

export const GradientCard: React.FC<GradientCardProps> = ({ title, description, imageUrl, icon }) => {
   return (
    <div className={cn(
        "group relative p-6 rounded-2xl overflow-hidden h-full",
        "bg-background/50 border border-primary/20 shadow-[0_0_15px_hsl(var(--primary)/0.3)]",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20"
    )}>
        <Spotlight
            className="-top-20 -left-20 md:left-0 md:-top-10"
            fill="hsl(var(--primary))"
        />
        <motion.div
            className="relative text-center h-full z-10 flex flex-col"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
        >
          <div className="mb-4 flex w-full items-center justify-center rounded-lg border border-primary/20 bg-black overflow-hidden">
            {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt={title}
                    width={300}
                    height={300}
                    className="w-full h-auto"
                />
            ) : (
                <div className="flex items-center justify-center h-48">
                    {icon}
                </div>
            )}
          </div>

          <div className="flex-grow flex flex-col justify-center">
            <h3
              className="text-lg font-semibold text-white"
            >
              {title}
            </h3>
            <p
              className="mt-2 text-sm text-neutral-400"
            >
              {description}
            </p>
          </div>
        </motion.div>
    </div>
  );
};
