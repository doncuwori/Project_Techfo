import React from "react";
import { Link } from "@inertiajs/react";

const ProcedureAbdimas = () => {
    const procedures = [
        {
            href: route("faq"),
            imgSrc: "img/prosedurlomba.png",
            imgAlt: "Prosedur Pendaftaran Abdimas",
            title: "Prosedur Pendaftaran Pengabdian Masyarakat",
            description: "Pelajari prosedur lomba agar setiap langkah dalam pencapaianmu selalu tercatat!",
        },
        {
            href: route("faq"),
            imgSrc: "img/prosedurbeasiswa.png",
            imgAlt: "Prosedur Penerimaan Abdimas",
            title: "Prosedur Penerimaan Pengabdian Masyarakat",
            description: "Pelajari prosedur beasiswa agar setiap langkah menuju prestasimu selalu tercatat!",
        },
    ];

    const ProcedureCard = ({ href, imgSrc, imgAlt, title, description }) => (
        <Link href={href} className="CardInformasi">
            <div className="px-6 py-8 bg-white rounded-2xl shadow border flex flex-col items-start gap-3 hover:bg-orange-100 hover:scale-105 transform transition-all duration-300">
                <img className="w-14 h-11 object-contain" src={imgSrc} alt={imgAlt} />
                <div className="Content flex flex-col gap-1">
                    <h3 className="text-gray-900 text-lg font-medium leading-7">{title}</h3>
                    <p className="text-gray-600 text-sm font-normal leading-tight">{description}</p>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="w-full px-8 sm:px-8 md:px-16 py-8 mt-10 mb-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
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

export default ProcedureAbdimas;
