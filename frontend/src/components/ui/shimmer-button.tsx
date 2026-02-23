import React, { CSSProperties } from "react";

export interface ShimmerButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    shimmerColor?: string;
    shimmerSize?: string;
    borderRadius?: string;
    shimmerDuration?: string;
    background?: string;
    className?: string;
    children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                style={
                    {
                        "--spread": "90deg",
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    } as CSSProperties
                }
                className={`group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] dark:text-black ${className}`}
                ref={ref}
                {...props}
            >
                <div
                    className="-z-30 blur-[2px]"
                    style={
                        {
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            background: `linear-gradient(21deg, transparent 20%, transparent 40%, var(--shimmer-color) 50%, transparent 60%, transparent 80%)`,
                            backgroundSize: "200% auto",
                            animation: "shimmer var(--speed) linear infinite",
                        } as CSSProperties
                    }
                />
                {children}
            </button>
        );
    },
);

ShimmerButton.displayName = "ShimmerButton";

export default ShimmerButton;
