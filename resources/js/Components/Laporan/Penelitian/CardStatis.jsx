import React from "react";

const CardStatis = ({ researchRegistrantsCount, researchRecipientsCount }) => {
    return (
        <div class="flex flex-wrap -mx-4 mb-6">
            <div class="w-full md:w-1/2 px-4">
                <div class="bg-orange-100 rounded-lg border-2 border-neutral-100 p-4 flex items-center">
                    <div class="text-5xl ml-2 mr-6">🏆</div>
                    <div>
                        <h2 class="text-xl font-semibold text-black mb-4">
                            Lolos Penelitian
                        </h2>
                        <div class="text-4xl font-bold text-black">{`${researchRecipientsCount}`}</div>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-4">
                <div class="bg-orange-100 rounded-lg border-2 border-neutral-100 p-4 flex items-center">
                    <div class="text-5xl ml-2 mr-6">📄</div>
                    <div>
                        <h2 class="text-xl font-semibold text-black mb-4">
                            Pendaftar Penelitian
                        </h2>
                        <div class="text-4xl font-bold text-black">{`${researchRegistrantsCount}`}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardStatis;
