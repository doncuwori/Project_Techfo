import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
    return (
        <div className="w-full max-w-4xl mx-auto relative z-10 px-8">
            {/* Search Box Container */}
            <div className="flex items-center rounded-lg border border-neutral-300 overflow-hidden">
                {/* Input Section */}
                <input
                    type="text"
                    placeholder="Cari informasi lomba, beasiswa, pengabdian masyarakat, dan penelitian..."
                    className="w-full px-4 py-3 text-gray-700 placeholder-gray-400 bg-white border-none focus:outline-none focus:ring-0 focus:border-transparent"
                />
                {/* Search Button */}
                <button className="w-12 h-12 bg-white border-l border-neutral-300 flex items-center justify-center hover:bg-gray-200 transition-all duration-200">
                    <Search
                        size={22}
                        color="grey"
                        className="hover:font-bold hover:scale-110 transition-transform duration-105"
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
