import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: string;
    baseVelocity: number;
    className?: string;
}

function ParallaxText({ children, baseVelocity = 100, className }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false,
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on the size of the text and viewport.
     * For the demo, we will simply repeat it enough times to ensure it generates a scroll.
     */
    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className={`font-bold uppercase tracking-tighter flex whitespace-nowrap ${className}`} style={{ x }}>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
                <span className="block mr-8">{children} </span>
            </motion.div>
        </div>
    );
}

export const VelocityScroll = ({ text, defaultVelocity = 5, className }: { text: string, defaultVelocity?: number, className?: string }) => {
    return (
        <section className="relative w-full">
            <ParallaxText baseVelocity={defaultVelocity} className={className}>
                {text}
            </ParallaxText>
            <ParallaxText baseVelocity={-defaultVelocity} className={className}>
                {text}
            </ParallaxText>
        </section>
    );
};
