"use client";

import React, { useEffect, useRef, useState } from "react";

interface StarfieldProps {
    speed?: number;
    backgroundColor?: string;
    starColor?: string;
    starCount?: number;
}

export default function Starfield({
    speed = 0.05,
    backgroundColor = "black",
    starColor = "#ffffff",
    starCount = 5000,
}: StarfieldProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<any[]>([]);
    const requestRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const initStars = () => {
            starsRef.current = [];
            for (let i = 0; i < starCount; i++) {
                starsRef.current.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * width,
                });
            }
        };

        const animate = () => {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, width, height);

            starsRef.current.forEach((star) => {
                let { x, y, z } = star;
                // Warp speed Z movement
                z -= speed * 50; // Speed factor

                if (z <= 0) {
                    z = width;
                    x = Math.random() * width - width / 2;
                    y = Math.random() * height - height / 2;
                }

                star.z = z;
                star.x = x;
                star.y = y;

                const screenX = (x / z) * (width / 2) + width / 2;
                const screenY = (y / z) * (height / 2) + height / 2;
                const radius = (1 - z / width) * 2; // Size based on depth

                if (screenX >= 0 && screenX <= width && screenY >= 0 && screenY <= height) {
                    const opacity = (1 - z / width);
                    ctx.fillStyle = starColor;
                    ctx.globalAlpha = opacity;
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, radius > 0 ? radius : 0, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });
            requestRef.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        }

        window.addEventListener("resize", handleResize);
        initStars();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [speed, backgroundColor, starColor, starCount]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
