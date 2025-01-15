import React from "react";
import Dropdown from "@/Components/FAQ/Dropdown";
import Step from "@/Components/FAQ/Step";

const ProcedureAbdimas = () => {
    return (
        <div className="container max-w-5xl mx-auto px-8 py-8 relative z-10">
            <div className="text-left">
                <h3 className="text-2xl font-bold text-black">
                    Prosedur <span className="text-[#fe632e]">Pengabdian Masyarakat</span>
                </h3>
            </div>

            <div className="mt-4">
                {/* Dropdown for Pendaftaran Pengabdian Masyarakat */}
                <Dropdown title="Prosedur Pendaftaran Pengabdian Masyarakat">
                    <Step
                        stepNumber="1"
                        title="Pilih Pengabdian Masyarakat yang ingin diikuti"
                        description="Pilih kegiatan pengabdian masyarakat sesuai minat dan kemampuan Anda. Anda hanya boleh memilih 1 kegiatan tetapi, setelah hasil pengumuman keluar dan Anda dinyatakan tidak lolos maka dapat mendaftar kembali kegiatan pengabdian masyarakat yang lain."
                    />
                    <Step
                        stepNumber="2"
                        title="Melakukan pengisian form pendaftaran"
                        description="Setelah memilih kegiatan, isilah form sesuai ketentuan yang sudah tertera di dalamnya. Lalu, Anda dapat menunggu hasil pengumumannya keluar."
                    />
                </Dropdown>

                {/* Dropdown for Penerimaan Pengabdian Masyarakat */}
                <Dropdown title="Prosedur Penerimaan Pengabdian Masyarakat">
                    <Step
                        stepNumber="1"
                        title="Melihat hasil pengumuman"
                        description="Anda dapat ke menu Profile. Lalu, ke bagian Riwayat Kegiatan untuk melihat hasil pengumumannya."
                    />
                    <Step
                        stepNumber="2"
                        title="Mengunduh surat tugas"
                        description="Anda dapat mengunduh surat tugas dengan klik card pengabdian masyarakat yang Anda ikuti pada Riwayat Kegiatan di menu Profile. Lalu, Anda dapat klik button surat tugas untuk mengunduh surat tugasnya."
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default ProcedureAbdimas;
