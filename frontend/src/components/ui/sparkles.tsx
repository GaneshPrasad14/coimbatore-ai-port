import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SparklesProps = {
    id?: string;
    className?: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    speed?: number;
    particleColor?: string;
    particleDensity?: number;
};

export const SparklesCore = (props: SparklesProps) => {
    const {
        id,
        className,
        background,
        minSize,
        maxSize,
        speed,
        particleColor,
        particleDensity,
    } = props;
    const [init, setInit] = useState(false);
    useEffect(() => {
        setInit(true);
    }, []);

    const generateParticles = (count: number) => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * (maxSize || 1.4) + (minSize || 0.6),
            duration: Math.random() * 2 + 1,
            delay: Math.random() * 2,
        }));
    };

    const [particles] = useState(() => generateParticles(particleDensity || 50));

    return (
        <div className={cn("opacity-0 transition-opacity duration-1000 overflow-hidden absolute inset-0", init && "opacity-100", className)}>
            {background && <div className="absolute inset-0 z-0" style={{ background }} />}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: particleColor || "#FFFFFF",
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                        y: [0, -20]
                    }}
                    transition={{
                        duration: p.duration / (speed || 1),
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};
