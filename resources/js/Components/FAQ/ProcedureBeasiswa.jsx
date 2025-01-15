import React from "react";
import Dropdown from "@/Components/FAQ/Dropdown";
import Step from "@/Components/FAQ/Step";

const ProcedureBeasiswa = () => {
    return (
        <div className="container max-w-5xl mx-auto px-8 py-8 relative z-10">
            <div className="text-left">
                <h3 className="text-2xl font-bold text-black">
                    Prosedur <span className="text-[#fe632e]">Beasiswa</span>
                </h3>
            </div>

            <div className="mt-4 relative z-10">
                <Dropdown title="Prosedur Pendaftaran Beasiswa">
                    <Step
                        stepNumber="1"
                        title="Pilih Beasiswa yang ingin diikuti"
                        description="Pilih Beasiswa sesuai minat Anda. Untuk informasi Beasiswa terbaru, klik"
                        linkText="di sini"
                        linkUrl={route("beasiswa")}
                    />
                    <Step
                        stepNumber="2"
                        title="Daftarkan diri ke Beasiswa"
                        description="Daftarkan diri ke Beasiswa yang diinginkan. Semangat dan semoga berhasil!"
                    />
                    <Step
                        stepNumber="3"
                        title="Melakukan pendataan fakultas"
                        description="Lakukan pendataan fakultas untuk mencatat partisipasi Beasiswa. Dengan mengisi form yang telah disediakan. Klik"
                        linkText="link ini"
                        linkUrl={route("pendataanBeasiswa")}
                    />
                </Dropdown>

                <Dropdown title="Prosedur Pendataan Penerima Beasiswa">
                    <Step
                        stepNumber="1"
                        title="Pilih Menu Pendataan Beasiswa"
                        description="Pada navigasi terdapat menu Pendataan Beasiswa, lalu klik menu tersebut. Dapat dilihat"
                        linkText="di sini"
                        linkUrl={route("pendataanBeasiswa")}
                    />
                    <Step
                        stepNumber="2"
                        title="Pilih Menu Lolos Yang Ada Pada Pendataan Beasiswa"
                        description="Pilihlah menu Lolos dengan menggeser menu Daftar Menjadi Lolos"
                    />
                    <Step
                        stepNumber="3"
                        title="Isi Form Yang Telah Disediakan"
                        description="Isilah form penerima beasiswa yang telah disediakan"
                    />
                    <Step
                        stepNumber="4"
                        title="Pendataan Telah Selesai"
                        description="Setelah melakukan submit form maka pendataan fakultas telah selesai, Terima Kasih!!"
                    />
                </Dropdown>
            </div>
        </div>
    );
};

export default ProcedureBeasiswa;
