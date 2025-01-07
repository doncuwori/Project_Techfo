import { formatDate } from "@/lib/helper";
import React from "react";

const TabelTabPrestasi = ({ dataPemenang }) => {
    return (
        <div>
            <table class="min-w-full divide-y divide-gray-200 ">
                <thead>
                    <tr>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Partisipan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Predikat Kemenangan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Kegiatan
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delegasi Ormawa
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dosen Pembimbing/Pendamping
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bidang
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penyelenggara
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negara Penyelenggara
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tempat Pelaksanaan
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
                            Foto Kegiatan
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {dataPemenang.map((item, index) => {
                        return (
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {index + 1}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <ol className="list-decimal">
                                        {item.mahasiswa.map(
                                            (partisipan, index) => (
                                                <li className="text-left">
                                                    {partisipan.nim} -{" "}
                                                    {partisipan.nama} -{" "}
                                                    {
                                                        partisipan.prodi
                                                            .nama_prodi
                                                    }{" "}
                                                    - {partisipan.angkatan}
                                                    {item.leader.mahasiswa
                                                        .nim ==
                                                    partisipan.nim ? (
                                                        <b> (Ketua)</b>
                                                    ) : (
                                                        ""
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ol>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.degree}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.activity_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.ormawa_delegation}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.dosen.nama}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.field}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.organizer}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.country.country_name}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.location}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {formatDate(item.activity_date_start)} -{" "}
                                    {formatDate(item.activity_date_end)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.description}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a
                                        className="text-blue-600 underline"
                                        href={`/images/${item.proof_scan_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Lihat File
                                    </a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a
                                        className="text-blue-600 underline"
                                        href={`/images/${item.event_photo_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Lihat File
                                    </a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TabelTabPrestasi;
