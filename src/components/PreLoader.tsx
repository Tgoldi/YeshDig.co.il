import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PreLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/yes-digital-logo.svg"
                  alt="יש דיגיטל"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              
              {/* Animated ring */}
              <motion.div
                className="absolute inset-0 border-2 border-primary rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{
                  x: ["-200%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}
              />

              {/* Background glow */}
              <div className="absolute -z-10 inset-0 blur-3xl">
                <div
                  className="h-full w-full animate-pulse"
                  style={{
                    background: `radial-gradient(circle at center, hsl(var(--primary)/0.2) 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}