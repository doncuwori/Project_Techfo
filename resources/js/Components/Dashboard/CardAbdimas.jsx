import React, { useRef, useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Clock4, ArrowRight, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/helper";

const CardAbdimas = ({ data }) => {
    const scrollRef = useRef(null);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (scrollRef.current) {
                const isAtEnd =
                    scrollRef.current.scrollLeft +
                        scrollRef.current.clientWidth >=
                    scrollRef.current.scrollWidth;
                const isAtStart = scrollRef.current.scrollLeft === 0;
                setCanScrollRight(!isAtEnd);
                setCanScrollLeft(!isAtStart);
            }
        };

        const handleResize = () => {
            handleScroll();
        };

        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <div className="relative z-10 py-6 px-8 md:px-16">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-black text-2xl font-semibold">
                    Informasi{" "}
                    <span className="text-[#fe632e]">
                        Pengabdian Masyarakat
                    </span>
                </h1>
                <Link
                    href={route("abdimas")}
                    className="text-orange-500 text-base font-normal hover:font-bold flex items-center justify-end"
                >
                    Lihat Semua
                </Link>
            </div>

            {/* Community Abdimas Cards Section */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-hidden pb-4"
                >
                    {data.map((abdimas, index) => (
                        <Link
                            href={"/abdimas/" + abdimas.id}
                            key={index}
                            className="w-[343px] min-w-[280px] h-[235px] p-4 bg-white rounded-xl border border-neutral-200 shadow-md flex flex-col gap-2"
                        >
                            {/* Image Section */}
                            <div className="bg-yellow-500 text-white text-xs px-2 py-0.5 mb-6 rounded-2xl w-max">
                                Abdimas
                            </div>
                            
                            {/* Content Section */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-black text-lg font-medium line-clamp-2">
                                    {abdimas.name}
                                </h2>
                                <p className="text-gray-500 text-sm line-clamp-3">
                                    {abdimas.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Clock4
                                        size={18}
                                        className="text-orange-500"
                                    />
                                    <span className="text-orange-500 text-xs font-medium leading-tight">
                                        {formatDate(abdimas.event_time_end)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Scroll Left Button */}
                {canScrollLeft && (
                    <button
                        onClick={handleScrollLeft}
                        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full shadow-lg transition transform hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <ArrowLeft size={20} />
                    </button>
                )}

                {/* Scroll Right Button */}
                {canScrollRight && (
                    <button
                        onClick={handleScrollRight}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-orange-500 text-white rounded-full shadow-lg transition transform hover:scale-110 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                        <ArrowRight size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardAbdimas;
