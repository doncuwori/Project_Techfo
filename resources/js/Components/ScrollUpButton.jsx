import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollUpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div
            className={`fixed bottom-5 right-5 z-50 transform ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10 pointer-events-none"
            } transition-all duration-500`}
        >
            <button
                onClick={scrollToTop}
                className="p-3 bg-white border-2 border-orange-500 rounded-full shadow-md hover:bg-orange-100 transition duration-300"
                aria-label="Scroll to top"
            >
                <ChevronUp className="w-6 h-6 text-orange-500" />
            </button>
        </div>
    );
};

export default ScrollUpButton;
