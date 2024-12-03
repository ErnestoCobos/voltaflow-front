"use client";

import React, { FC } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import LoadingAnimation from "@/components/LoadingAnimation";

interface LoadingOverlayProps {
    isLoading: boolean;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({ isLoading }) => (
    <AnimatePresence>
        {isLoading && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4">
                    <LoadingAnimation/>
                    <p className="text-lg font-semibold text-black">Loading...</p>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
)

export default LoadingOverlay;
export type { LoadingOverlayProps };