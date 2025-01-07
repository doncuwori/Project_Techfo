import { formatDate } from "@/lib/helper";
import { Clock4 } from "lucide-react";

const RiwayatAbdimas = ({ data }) => {
    return (
        <div className="py-6 px-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Riwayat Abdimas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="h-[159px] bg-white shadow-md rounded-lg border border-neutral-100 flex gap-4 p-4 relative"
                        >
                            <div className="w-[125px] h-[127px] relative">
                                <img
                                    src={
                                        item.abdimas_registrant
                                            .abdimas_information.poster_url !=
                                        null
                                            ? "/images/" +
                                              item.abdimas_registrant
                                                  .abdimas_information
                                                  .poster_url
                                            : "/images/noimage.png"
                                    }
                                    alt="Deskripsi gambar"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                                    Abdimas
                                </div>
                            </div>
                            <div className="flex flex-col justify-between gap-2 w-full">
                                <div className="text-black text-lg font-medium line-clamp-2">
                                    {
                                        item.abdimas_registrant
                                            .abdimas_information.name
                                    }
                                </div>
                                <div className="text-gray-500 text-sm font-normal leading-tight line-clamp-2">
                                    {
                                        item.abdimas_registrant
                                            .abdimas_information.description
                                    }
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock4
                                        size={18}
                                        className="text-orange-500"
                                    />
                                    <div className="text-orange-500 text-xs font-medium">
                                        {formatDate(
                                            item.abdimas_registrant
                                                .abdimas_information
                                                .event_time_end
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p
                                className={`absolute top-2 right-2 ${
                                    !item.accepted && !item.rejected
                                        ? "bg-yellow-500"
                                        : item.accepted && !item.rejected
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                } text-white text-xs px-2 py-0.5 rounded-2xl`}
                            >
                                {!item.accepted && !item.rejected
                                    ? "Menunggu"
                                    : item.accepted && !item.rejected
                                    ? "Diterima"
                                    : "Ditolak"}
                            </p>
                            {item.abdimas_registrant.abdimas_information
                                .surat_tugas && item.accepted ? (
                                <a
                                    className="text-blue-500 text-xs font-medium absolute bottom-2 right-2 underline p-2"
                                    href={
                                        "/surat/" +
                                        item.abdimas_registrant
                                            .abdimas_information.surat_tugas
                                    }
                                    target={"_blank"}
                                >
                                    Download Surat Tugas
                                </a>
                            ) : (
                                ""
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RiwayatAbdimas;
