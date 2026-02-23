import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring for the trailing ring
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over clickable elements
            const isClickable = target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovered(isClickable);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[99999] overflow-hidden bg-transparent">
            {/* Main Dot - Follows mouse exactly */}
            <motion.div
                className="absolute w-2 h-2 bg-amber-400 rounded-full mix-blend-difference"
                style={{
                    x: cursorX, // Direct tracking for immediate response
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* Trailing Ring - Follows with physics */}
            <motion.div
                className="absolute rounded-full border border-amber-400/50 mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: isHovered ? 64 : 32,
                    height: isHovered ? 64 : 32,
                    borderWidth: isHovered ? 1 : 1.5,
                    borderColor: isHovered ? 'rgba(251, 191, 36, 0.8)' : 'rgba(251, 191, 36, 0.3)',
                    backgroundColor: isHovered ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                }}
            />
        </div>
    );
};

export default CustomCursor;
