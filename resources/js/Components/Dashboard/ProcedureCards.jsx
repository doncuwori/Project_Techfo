import React from "react";
import { Link } from "@inertiajs/react";

const ProcedureCards = () => {
    const procedures = [
        {
            href: route('faq'),
            imgSrc: "img/prosedurlomba.png",
            imgAlt: "Prosedur Lomba",
            title: "Prosedur Lomba",
            description: "Pelajari prosedur lomba agar setiap langkah dalam pencapaianmu selalu tercatat!",
        },
        {
            href: route('faq'),
            imgSrc: "img/prosedurbeasiswa.png",
            imgAlt: "Prosedur Beasiswa",
            title: "Prosedur Beasiswa",
            description: "Pelajari prosedur beasiswa agar setiap langkahmu selalu tercatat!",
        },
        {
            href: route('faq'),
            imgSrc: "img/prosedurabdimas.png",
            imgAlt: "Prosedur Pengabdian Masyarakat",
            title: "Prosedur Pengabdian Masyarakat",
            description: "Pelajari prosedur pengabdian masyarakat agar proses pendaftaranmu lebih lancar!",
        },
        {
            href: route('faq'),
            imgSrc: "img/prosedurpenelitian.png",
            imgAlt: "Prosedur Penelitian",
            title: "Prosedur Penelitian",
            description: "Pelajari prosedur penelitian agar proses pendaftaranmu lebih lancar!",
        },
    ];

    // Komponen untuk Card prosedur
    const ProcedureCard = ({ href, imgSrc, imgAlt, title, description }) => (
        <Link href={href} className="w-full">
            <div className="px-6 py-8 bg-white rounded-2xl shadow border flex flex-col items-start gap-3 hover:bg-orange-100 hover:scale-105 transform transition-all duration-300">
                <img className="w-14 h-11 object-contain" src={imgSrc} alt={imgAlt} />
                <div className="flex flex-col gap-1">
                    <h3 className="text-gray-900 text-lg font-medium leading-7">{title}</h3>
                    <p className="text-gray-600 text-sm font-normal leading-tight">{description}</p>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="w-full px-8 sm:px-8 md:px-16 py-8 mt-16 mb-12 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {procedures.map((procedure, index) => (
                    <ProcedureCard
                        key={index}
                        href={procedure.href}
                        imgSrc={procedure.imgSrc}
                        imgAlt={procedure.imgAlt}
                        title={procedure.title}
                        description={procedure.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProcedureCards;
