import { motion } from "framer-motion";

export const RetroGrid = () => {
    return (
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 perspective-[200px]">
            {/* Grid */}
            <div className="absolute inset-0 [transform:rotateX(35deg)]">
                <div
                    className={
                        "animate-grid-flow [background-repeat:repeat] [background-size:60px_60px] [height:300%] [margin-left:-50%] [transform-origin:100%_0_0] [width:200%] " +
                        "bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]"
                    }
                />
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%" />
        </div>
    );
};
