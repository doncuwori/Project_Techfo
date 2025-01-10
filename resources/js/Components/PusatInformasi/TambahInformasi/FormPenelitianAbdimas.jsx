import SearchableSelect from "@/Components/SearchableSelect";
import { useForm } from "@inertiajs/react";
import { Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const FormPenelitianAbdimas = ({ type, edit, dosen, previous }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: previous?.name ?? "",
        dosens: previous?.dosen.map((dosen) => dosen.id) ?? [],
        description: previous?.description ?? "",
        event_time_end: previous?.event_time_end ? new Date(Date.parse(previous.event_time_end) + 1000 * 60 * 60 * 24).toISOString().split('T')[0] : "",
        event_time_start: previous?.event_time_start ? new Date(Date.parse(previous.event_time_start) + 1000 * 60 * 60 * 24).toISOString().split('T')[0] : "",
        location: previous?.location ?? "",
        total_students_required: previous?.total_students_required ?? "",
        assignment_letter_url: previous?.assignment_letter_url ?? "",
    });

    const [fields, setFields] = useState(previous?.dosen.map((dosen) => ({ value: dosen.id })) ?? [{ value: "" }]);

    const addField = () => {
        setFields([...fields, { value: "" }]);
    };

    const removeField = (e, index) => {
        e.preventDefault();
        if (fields.length > 1) {
            setFields(fields.slice(0, -1));

            setTimeout(() => {
                const input = document.querySelectorAll(
                    'input[name="dosens[]"]'
                );
                const member = Array.from(input).map((input) => input.value);
                console.log(member);
                setData("dosens", member);
            }, 100);
        }
    };

    const handleDosens = (value) => {
        const input = document.querySelectorAll('input[name="dosens[]"]');
        const dosen = Array.from(input).map((input) => input.value);
        setData("dosens", [...dosen, value.value]);
    };

    const dosenOption = dosen.map((val) => {
        return { value: val.id, label: `${val.nama} - ${val.nidn}` };
    });

    const handleSubmit = (e) => {
        function routeName() {
            if (type === "penelitian" && !edit) {
                return route("researchInformation.store");
            } else if (type === "penelitian" && edit) {
                return route("researchInformation.update", previous.id);
            } else if (type === "abdimas" && !edit) {
                return route("abdimasInformation.store");
            } else if (type === "abdimas" && edit) {
                return route("abdimasInformation.update", previous.id);
            }
        }

        e.preventDefault();
        post(routeName(), {
            onSuccess: () => {
                toast.success(
                    type === "abdimas"
                        ? "Informasi Abdimas berhasil ditambahkan"
                        : "Informasi Penelitian berhasil ditambahkan"
                );
                reset();
                setSelectedFile(null);
            },
            onError: (errors) => {
                type === "abdimas"
                    ? toast.error("Gagal menambahkan informasi abdimas")
                    : toast.error("Gagal menambahkan informasi penelitian");
                console.error(errors);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <section className="space-y-6">
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Nama Kegiatan<span className="text-red-600">*</span>
                        </label>
                        <input
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            type="text"
                            className="w-full border rounded-lg p-3"
                            placeholder="Masukkan Nama Kegiatan"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Lokasi Kegiatan
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            value={data.location}
                            onChange={(e) =>
                                setData("location", e.target.value)
                            }
                            type="text"
                            className="w-full border rounded-lg p-3"
                            placeholder="Masukkan Lokasi Kegiatan"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Waktu Mulai Pendaftaran
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            value={data.event_time_start}
                            onChange={(e) =>
                                setData("event_time_start", e.target.value)
                            }
                            type="date"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Waktu Berakhir Pendaftaran
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            value={data.event_time_end}
                            onChange={(e) =>
                                setData("event_time_end", e.target.value)
                            }
                            type="date"
                            className="w-full border rounded-lg p-3"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Total Mahasiswa yang Dibutuhkan
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            value={data.total_students_required}
                            onChange={(e) => {
                                const value = Math.max(
                                    0,
                                    parseInt(e.target.value) || 0
                                );
                                setData("total_students_required", value);
                            }}
                            type="number"
                            min="0"
                            className="w-full border rounded-lg p-3"
                            placeholder="Masukkan Total Mahasiswa yang Dibutuhkan"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="block text-gray-700 font-bold mb-2">
                            Daftar Dosen
                            <span className="text-red-600">*</span>
                        </label>
                        {fields.map((field, index) => (
                            <div className="flex gap-2" key={index + 1}>
                                {/* <select
                                            className="text-sm px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] w-96"
                                            placeholder="Tuliskan NIM"
                                        >
                                            <option disabled={true} selected={true}>- Pilih Mahasiswa -</option>
                                            {
                                                mahasiswa.map((val)=>{
                                                    return(
                                                        <option>{val.nama} - {val.nim}</option>
                                                    )
                                                })
                                            }

                                        </select> */}

                                <div className="w-full">
                                    <SearchableSelect
                                        name={"dosens[]"}
                                        selected={field}
                                        onChange={handleDosens}
                                        options={dosenOption}
                                        placeholder={"- Pilih Dosen -"}
                                    />
                                </div>

                                <input
                                    className="text-sm px-2.5 py-2 rounded-lg border-neutral-400 border-[1.5px] bg-gray-200"
                                    value={
                                        index == 0
                                            ? "Ketua"
                                            : "Anggota " + index
                                    }
                                    disabled={true}
                                />
                                {index != 0 ? (
                                    <button
                                        onClick={(e) => removeField(e, index)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        <Trash size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={(e) => removeField(e, index)}
                                        className="bg-red-300 text-white px-4 py-2 rounded"
                                        disabled
                                    >
                                        <Trash size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex">
                            <button
                                type="button"
                                className="bg-green-500 p-2 rounded-lg text-white"
                                onClick={addField}
                            >
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Deskripsi Kegiatan
                            <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            onChange={(e) => {
                                setData("description", e.target.value);
                            }}
                            value={data.description}
                            className="w-full border rounded-lg p-3"
                            placeholder="Tuliskan Deskripsi Kegiatan"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-6 rounded-lg mt-4"
                            disabled={processing}
                        >
                            {processing ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </div>
            </section>
        </form>
    );
};

export default FormPenelitianAbdimas;
