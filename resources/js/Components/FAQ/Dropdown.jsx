import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const Dropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`bg-white shadow-md p-8 border-t border-gray-300 ${
                isOpen ? "rounded-xl" : "rounded-xl"
            }`}
        >
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleDropdown}
            >
                <h3 className="text-2xl font-semibold text-black">{title}</h3>
                <ChevronDown
                    className={`h-5 w-5 transform transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
            </div>
            {isOpen && (
                <ul className="list-decimal mt-6 ml-3 space-y-6">{children}</ul>
            )}
        </div>
    );
};

export default Dropdown;
