import { formatDate } from "@/lib/helper";
import { Clock4 } from "lucide-react";

const RiwayatPrestasiLomba = ({ data }) => {
    return (
        <div className="py-6 px-8 mb-6">
            <h2 className="text-2xl font-semibold mb-6">
                Riwayat Prestasi Lomba
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((d, index) => (
                    <div
                        key={index}
                        className="h-[159px] bg-white shadow-md rounded-lg border border-neutral-100 flex gap-4 p-4 relative"
                    >
                        <div className="w-[125px] h-[127px] relative">
                            <img
                                src={
                                    d.competition_achievement.event_photo_url !=
                                    null
                                        ? "/images/" +
                                          d.competition_achievement
                                              .event_photo_url
                                        : "/images/noimage.png"
                                }
                                alt="Deskripsi gambar"
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-2xl">
                                Lomba
                            </div>
                        </div>
                        <div className="flex flex-col justify-between gap-2 w-full">
                            <div className="text-black text-lg font-medium">
                                {d.competition_achievement.activity_name}
                            </div>
                            <div className="text-gray-500 text-sm font-normal leading-tight line-clamp-2">
                                {d.competition_achievement.description}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock4 size={18} className="text-orange-500" />
                                <div className="text-orange-500 text-xs font-medium">
                                    {formatDate(d.created_at)}
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-green-500 p-1 px-4 rounded-md text-white hover:shadow-lg">
                            {d.competition_achievement.degree}
                        </div>
                        <p
                            className={`absolute top-4 right-4 ${
                                !d.competition_achievement.is_validated
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            } text-white text-xs px-2 py-0.5 rounded-2xl`}
                        >
                            {!d.competition_achievement.is_validated
                                ? "Menunggu Validasi"
                                : "Diterima"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RiwayatPrestasiLomba;
