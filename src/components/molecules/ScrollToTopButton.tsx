"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "../atoms";

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            const halfwayPoint = window.innerHeight / 2;
            const scrollPosition = window.scrollY;

            if (scrollPosition > halfwayPoint) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <button onClick={scrollToTop} className={`fixed bottom-8 right-8 w-14 h-14 bg-gray-200 text-gray-500 border-gray-300 font-bold rounded-md shadow-lg transition-opacity duration-300 flex justify-center items-center ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <ChevronUp strokeWidth={3} />
        </button>
    )
}