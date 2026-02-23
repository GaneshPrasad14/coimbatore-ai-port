import React from "react";
import { HyperText } from "./hyper-text";

export const GoldenStormText = ({ text }: { text: string }) => {
    return (
        <div className="relative inline-block group">
            {/* Background Glow */}
            <div className="absolute inset-0 blur-xl bg-[#FDB931] opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />

            {/* Main Text */}
            <div className="text-golden-storm relative z-10">
                <HyperText text={text} className="" />
            </div>
        </div>
    );
};
