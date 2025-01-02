import React from "react";
import { EyeIcon, File, FilePenLine } from "lucide-react";
import { Trash } from "lucide-react";
import { formatDate, formatDatetimeToIndonesian } from "@/lib/helper";
import { useForm } from "@inertiajs/react";

const TabelPusatInformasi = ({ data, title }) => {

    return (
        <table className="w-full border-collapse text-sm">
            <thead>
                <tr className="bg-gray-100 text-left text-gray-700 text-center">
                    <th className="border p-2">NO</th>
                    <th className="border p-2">NAMA PROKER</th>
                    <th className="border p-2">HARI & TANGGAL UPLOAD</th>
                    <th className="border p-2">DEADLINE KEGIATAN</th>
                    <th className="border p-2">AKSI</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                        <td className="border p-2">{index + 1}</td>
                        <td className="border p-2">{item.name}</td>
                        <td className="border p-2">
                            {formatDatetimeToIndonesian(item.created_at)}
                        </td>
                        <td className="border p-2">
                            {formatDatetimeToIndonesian(item.event_time_end)}
                        </td>
                        <td className="border p-2">
                            <div className="flex justify-center space-x-2 gap-8 ml-2">
                                {title == "abdimas" ? (
                                    <a
                                        href={route(
                                            "pusatAbdimas.show",
                                            item.id
                                        )}
                                    >
                                        <EyeIcon />
                                    </a>
                                ) : (
                                    ""
                                )}
                                <button className="text-blue-500 hover:text-blue-600 transition">
                                    <FilePenLine />
                                </button>
                                <button className="text-red-500 hover:text-red-600 transition">
                                    <Trash />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelPusatInformasi;
