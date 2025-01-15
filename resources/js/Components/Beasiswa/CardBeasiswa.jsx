import React from "react";
import { Link } from "@inertiajs/react";
import { Clock4 } from "lucide-react";
import { formatDate } from "@/lib/helper";

const ScholarshipCard = ({ title, description, date, image, label }) => (
    <div className="p-4 bg-white rounded-xl border border-neutral-200 shadow-lg flex flex-col gap-2">
        {/* Gambar */}
        <div
            className="w-full h-44 bg-gray-300 rounded-xl relative bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                {label}
            </div>
        </div>
        {/* Konten */}
        <div className="flex flex-col gap-2">
            <h2 className="text-black text-lg font-medium line-clamp-1">
                {title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
            <div className="flex items-center gap-2">
                <Clock4 size={18} className="text-orange-500" />
                <span className="text-orange-500 text-xs font-medium leading-tight">
                    {date}
                </span>
            </div>
        </div>
    </div>
);

const CardBeasiswa = ({ data }) => {
    return (
        <div className="relative z-10 py-6 px-8 sm:px-6 lg:px-16">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-black text-2xl font-semibold">
                    Informasi <span className="text-[#fe632e]">Beasiswa</span>
                </h1>
            </div>
            {/* Konten */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.map((scholarship) => (
                    <Link href={"/beasiswa/" + scholarship.id} key={scholarship.id}>
                        <ScholarshipCard
                            title={scholarship.name}
                            description={scholarship.description}
                            date={formatDate(scholarship.created_at)}
                            image={scholarship.poster_url}
                            label="Beasiswa"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CardBeasiswa;
