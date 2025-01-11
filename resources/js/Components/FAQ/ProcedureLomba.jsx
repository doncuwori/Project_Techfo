import React from "react";
import Dropdown from "@/Components/FAQ/Dropdown";
import Step from "@/Components/FAQ/Step";

const ProcedureLomba = () => {
    return (
        <div className="container max-w-5xl mx-auto px-8 py-8 relative z-10">
            <div className="text-left">
                <h3 className="text-2xl font-bold text-black">
                    Prosedur <span className="text-[#fe632e]">Lomba</span>
                </h3>
            </div>

            <div className="mt-4 relative z-10">
                <Dropdown title="Prosedur Pendaftaran Lomba">
                    <Step
                        stepNumber="1"
                        title="Pilih lomba yang ingin diikuti"
                        description="Pilih lomba sesuai minat dan bakat Anda melalui dashboard aplikasi Techfo. Pastikan untuk membaca informasi terbaru mengenai lomba tersebut."
                        linkText="disini"
                        linkUrl={route("dashboardUser")}
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih dan hubungi dosen pembimbing"
                        description="Hubungi dosen pembimbing yang sesuai dengan topik lomba yang Anda pilih. Diskusikan kebutuhan bimbingan dan strategi lomba bersama dosen tersebut."
                    />
                    <Step
                        stepNumber="3"
                        title="Daftarkan diri ke lomba"
                        description="Daftarkan diri atau tim Anda melalui aplikasi Techfo dengan klik tombol Daftar pada detail informasi lomba yang tersedia."
                    />
                    <Step
                        stepNumber="4"
                        title="Lakukan Pendataan Partisipasi Lomba"
                        description="Isi pendataan partisipasi melalui fitur yang tersedia di aplikasi Techfo. Data ini digunakan untuk mencatat poin keaktifan Anda selama perkuliahan. Klik"
                        linkText="disini"
                        linkUrl={route("pendataanLomba")}
                    />
                </Dropdown>

                <Dropdown title="Prosedur Pendataan Prestasi Lomba">
                    <Step
                        stepNumber="1"
                        title="Pastikan Pendataan Partisipasi Sudah Dilakukan"
                        description="Pastikan Anda telah mengisi formulir pendataan partisipasi lomba di aplikasi Techfo sebelumnya. Jika belum klik"
                        linkText="disini"
                        linkUrl={route("pendataanLomba")}
                    />
                    <Step
                        stepNumber="2"
                        title="Akses Menu Profil"
                        description="Buka menu Profil pada aplikasi Techfo, lalu pilih kartu Riwayat Partisipasi Lomba untuk lomba yang telah Anda ikuti."
                    />
                    <Step
                        stepNumber="3"
                        title="Lengkapi Data Prestasi"
                        description="Masukkan data prestasi yang Anda peroleh, termasuk bukti prestasi seperti sertifikat atau dokumen pendukung lainnya."
                    />
                    <Step
                        stepNumber="4"
                        title="Submit Formulir Prestasi Lomba"
                        description="Setelah data prestasi diisi, klik Submit untuk menyelesaikan pendataan. Data ini akan menambah poin keaktifan Anda."
                    />
                </Dropdown>

                {/* <Dropdown title="Prosedur Pengajuan Reward Fakultas">
                    <Step
                        stepNumber="1"
                        title="Pilih lomba yang ingin diikuti"
                        description="Pilih lomba sesuai minat dan bakat Anda. Untuk informasi lomba terbaru, klik"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih dan hubungi dosen pembimbing"
                        description="Hubungi dosen sesuai dengan topik lomba. Lihat informasi dosen pembimbing"
                        linkText="di sini"
                        linkUrl="#"
                    />
                    <Step
                        stepNumber="3"
                        title="Daftarkan diri ke lomba"
                        description="Daftarkan diri atau tim ke lomba yang diinginkan. Semangat dan semoga berhasil!"
                    />
                    <Step
                        stepNumber="4"
                        title="Melakukan pendataan fakultas"
                        description="Setelah data prestasi diisi, klik Submit untuk menyelesaikan pendataan. Data ini akan menambah poin keaktifan Anda."
                    />
                </Dropdown> */}
            </div>
        </div>
    );
};

export default ProcedureLomba;
