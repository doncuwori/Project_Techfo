import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const CardStatis = ({
    competitionAchievementsCount,
    competitionRegistrantsCount,
    totalMahasiswa,
}) => {
    const value = Math.min(competitionAchievementsCount, totalMahasiswa);
    const percentage = (value / totalMahasiswa) * 100;

    return (
        <div class="flex flex-wrap -mx-4 mb-6">
            <div class="w-full md:w-1/3 px-4">
                <div class="bg-white rounded-lg border-2 border-neutral-100 p-4 flex items-center">
                    <div class="w-[87px] h-[87px] relative">
                        <div class="absolute">
                            <CircularProgressbar
                                className="h-24 w-24"
                                value={value}
                                maxValue={totalMahasiswa}
                                text={`${percentage.toFixed(2)}%`}
                            />
                        </div>
                    </div>
                    <div class="flex-col justify-center items-center gap-1 inline-flex">
                        <div class="text-center text-[#2d3036] text-lg font-semibold leading-7 ml-8">
                            Presentase Prestasi Mahasiswa
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 px-4">
                <div class="bg-orange-100 rounded-lg border-2 border-neutral-100 p-4 flex items-center">
                    <div class="text-5xl ml-2 mr-6">🏆</div>
                    <div>
                        <h2 class="text-xl font-semibold text-black mb-4">
                            Pemenang Lomba
                        </h2>
                        <div className="text-4xl font-bold text-black">
                            {`${competitionAchievementsCount}`}
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/3 px-4">
                <div class="bg-orange-100 rounded-lg border-2 border-neutral-100 p-4 flex items-center">
                    <div class="text-5xl ml-2 mr-6">📄</div>
                    <div>
                        <h2 class="text-xl font-semibold text-black mb-4">
                            Partisipan Lomba
                        </h2>
                        <div className="text-4xl font-bold text-black">
                            {`${competitionRegistrantsCount}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardStatis;
