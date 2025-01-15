import React from "react";
import { Clock4 } from "lucide-react";
import { formatDate } from "@/lib/helper";
import { Link } from "@inertiajs/react";

const AbdimasCard = ({ title, description, date, label }) => (
    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-lg flex flex-col gap-2">
        {/* Label */}
        <div className="bg-yellow-500 text-white text-xs px-2 py-0.5 mb-6 rounded-2xl w-max">
            {label}
        </div>
        {/* Konten */}
        <div className="flex flex-col gap-2">
            <h2 className="text-black text-lg font-medium line-clamp-2">
                {title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
            <div className="flex items-center gap-2">
                <Clock4 size={18} className="text-orange-500" />
                <span className="text-orange-500 text-xs font-medium leading-tight">
                    {date}
                </span>
            </div>
        </div>
    </div>
);

const CardAbdimas = ({ data }) => {
    return (
        <div className="relative z-10 py-6 px-8 sm:px-6 lg:px-16">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-black text-2xl font-semibold">
                    Informasi{" "}
                    <span className="text-[#fe632e]">Pengabdian Masyarakat</span>
                </h1>
            </div>
            {/* Konten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.map((abdimas) => (
                    <Link href={"/abdimas/" + abdimas.id} key={abdimas.id}>
                        <AbdimasCard
                            title={abdimas.name}
                            description={abdimas.description}
                            date={formatDate(abdimas.created_at)}
                            label="Abdimas"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardAbdimas;
