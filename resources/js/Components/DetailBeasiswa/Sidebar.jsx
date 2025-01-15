import React from "react";

const Sidebar = () => {
    const cardData = [
        {
            title: "INSPACE UI/UX",
            description:
                "Perlombaan UI/UX Design Nasional diadakan oleh Institut Teknologi Kalimantan",
            date: "20 Sep 2024",
            image: "img/logobem.png",
        },
        // Add more card data as needed
    ];

    return (
        <div
            className="md:w-1/3 px-8 py-4 overflow-y-auto"
            style={{ maxHeight: "90vh" }}
        >
            <div className="w-full h-12 flex items-center mb-6">
                <div className="flex-grow flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                    <input
                        className="flex-grow bg-transparent text-gray-700 text-sm placeholder-gray-500 outline-none focus:ring-0 border-none"
                        placeholder="Search"
                        type="text"
                    />
                    <button className="text-gray-500 hover:text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.9 14.32a8 8 0 111.414-1.415l4.387 4.387a1 1 0 01-1.415 1.415l-4.387-4.387zM8 14A6 6 0 108 2a6 6 0 000 12z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="h-[159px] px-3 py-4 bg-white rounded-xl border border-neutral-100 flex gap-2"
                    >
                        <div className="w-[125px] h-[127px] relative">
                            <img
                                src={card.image}
                                alt="Deskripsi gambar"
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-2xl">
                                Lomba
                            </div>
                        </div>
                        <div className="flex flex-col justify-start gap-2 w-[319px]">
                            <div className="text-black text-lg font-medium leading-7">
                                {card.title}
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-tight">
                                {card.description}
                            </div>
                            <div className="flex items-center gap-2">
                                <img
                                    src="img/waktu.png"
                                    alt="Icon"
                                    className="w-4 h-4"
                                />
                                <div className="text-orange-500 text-xs font-medium leading-tight">
                                    {card.date}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
