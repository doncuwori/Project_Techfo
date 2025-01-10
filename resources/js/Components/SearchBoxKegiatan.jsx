import React from "react";

const SearchWithCategory = () => {
    return (
        <div className="w-full max-w-4xl mx-auto relative z-10">
            <div className="flex items-center border border-neutral-300 rounded-lg">
                {/* Category Selection */}
                <div className="h-12 pl-5 pr-[19px] py-2 bg-[#f0f1f2] rounded-tl-lg rounded-bl-lg border flex items-center gap-2">
                    <div className="text-[#2d3036] text-sm font-medium leading-[21px]">
                        All categories
                    </div>
                    {/* Dropdown Arrow Icon */}
                    <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Search Box */}
                <div className="flex-grow px-2 py-2 bg-white flex items-center">
                    <input
                        type="text"
                        placeholder="Cari informasi lomba, beasiswa, pengabdian masyarakat, dan penelitian..."
                        className="w-full px-2 py-1 text-gray-700 placeholder-gray-400 border-none focus:outline-none focus:ring-0 focus:border-transparent"
                    />
                </div>
                <button className="w-12 h-12 bg-white border-l flex items-center justify-center rounded-tr-lg rounded-br-lg transition duration-200 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2">
                    <img
                        src="/img/search.png"
                        alt="Search Icon"
                        className="w-5 h-5"
                    />
                </button>
            </div>
        </div>
    );
};

export default SearchWithCategory;
