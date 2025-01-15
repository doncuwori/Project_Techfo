import React from "react";
import Dropdown from "@/Components/FAQ/Dropdown";
import Step from "@/Components/FAQ/Step";

const ProcedurePenelitian = () => {
    return (
        <div className="container max-w-5xl mx-auto px-8 py-8 mb-8 relative z-10">
            <div className="text-left">
                <h3 className="text-2xl font-bold text-black">
                    Prosedur <span className="text-[#fe632e]">Penelitian</span>
                </h3>
            </div>

            <div className="mt-4 relative z-10">
                <Dropdown title="Prosedur Pendaftaran Penelitian">
                    <Step
                        stepNumber="1"
                        title="Pilih Penelitian yang ingin diikuti"
                        description="Pilih Penelitian sesuai minat dan bakat Anda. Untuk informasi Penelitian terbaru, klik"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih dan hubungi dosen pembimbing"
                        description="Hubungi dosen sesuai dengan topik Penelitian. Lihat informasi dosen pembimbing"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="3"
                        title="Daftarkan diri ke Penelitian"
                        description="Daftarkan diri atau tim ke Penelitian yang diinginkan. Semangat dan semoga berhasil!"
                    />
                    <Step
                        stepNumber="4"
                        title="Melakukan pendataan fakultas"
                        description="Lakukan pendataan fakultas untuk mencatat partisipasi Penelitian. Klik"
                        linkText="link ini"
                        linkUrl="#"
                    />
                </Dropdown>

                <Dropdown title="Prosedur Penerimaan Penelitian">
                    <Step
                        stepNumber="1"
                        title="Pilih Penelitian yang ingin diikuti"
                        description="Pilih Penelitian sesuai minat dan bakat Anda. Untuk informasi Penelitian terbaru, klik"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih dan hubungi dosen pembimbing"
                        description="Hubungi dosen sesuai dengan topik Penelitian. Lihat informasi dosen pembimbing"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="3"
                        title="Daftarkan diri ke Penelitian"
                        description="Daftarkan diri atau tim ke Penelitian yang diinginkan. Semangat dan semoga berhasil!"
                    />
                    <Step
                        stepNumber="4"
                        title="Melakukan pendataan fakultas"
                        description="Lakukan pendataan fakultas untuk mencatat partisipasi Penelitian. Klik"
                        linkText="link ini"
                        linkUrl="#"
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default ProcedurePenelitian;
