import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "@/lib/helper";
import { useDownloadExcel } from "react-export-table-to-excel";

const TabelTabPenerima = ({ dataPenerima, filters, refs }) => {
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: "Penerima Beasiswa Export",
        sheet: "Penerima",
    });

    const [filtered, setFiltered] = useState(dataPenerima);

    useEffect(() => {
        let nama = filters.nama;
        let prodi = filters.prodi;
        let angkatan = filters.angkatan;
        let tahun = filters.tahun;

        let temp = dataPenerima;
        if (nama) {
            temp = temp.filter((item) =>
                item.mahasiswa.nama.toLowerCase().includes(nama.toLowerCase())
            );
        }

        if (prodi) {
            temp = temp.filter((item) =>
                item.mahasiswa.prodi.nama_prodi
                    .toLowerCase()
                    .includes(prodi.toLowerCase())
            );
        }

        if (angkatan) {
            temp = temp.filter((item) => item.mahasiswa.angkatan == angkatan);
        }

        if (tahun) {
            temp = temp.filter((item) => item.created_at.includes(tahun));
        }
        setFiltered(temp);

        if (refs) {
            onDownload();
        }
    }, [filters, refs]);

    const handleValidate = (item) => {
        axios.get(route("laporanBeasiswa.validate", item)).then((response) => {
            alert("Berhasil Validasi");
            window.location.reload();
        });
    };

    return (
        <div>
            <table ref={tableRef} class="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Beasiswa
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            NIM
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Program Studi
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Angkatan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Jenis Beasiswa
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penyelenggara
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negara Penyelenggara
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Waktu Pelaksanaan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Deskripsi Kegiatan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Scan Bukti
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Validasi
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {filtered.map((item, index) => {
                        console.log(item);
                        return (
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {index + 1}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.mahasiswa.nim}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.mahasiswa.nama}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {" "}
                                    {item.mahasiswa.prodi.nama_prodi}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.mahasiswa.angkatan}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.type}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.organizer}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {
                                        item.country.country_name
                                    }
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {formatDate(item.event_date_start)} -{" "}
                                    {formatDate(item.event_date_end)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.proof_scan_url !== null ? (
                                        <a
                                            href={`/images/${item.proof_scan_url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            Lihat File
                                        </a>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {item.is_validated == true ? (
                                        "Sudah Valid"
                                    ) : (
                                        <button
                                            className="bg-blue-500 text-sm text-white px-2 py-1 rounded"
                                            onClick={() =>
                                                handleValidate(
                                                    item.id
                                                )
                                            }
                                        >
                                            Validasi
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TabelTabPenerima;
