import React from "react";

const TabelTabPenerima = ({ data }) => {
    return (
        <div>
            <table class="min-w-full divide-y divide-gray-200 ">
                <thead>
                    <tr>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
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
                            Email
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nomor Telepon/WA
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            KHS
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CV
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Portofolio
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Foto 3x4
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {index + 1}
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
                                    {item.mahasiswa.email}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    {item.abdimas_registrant.telephone}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a className="underline text-blue-500" target="_blank" href={'/images/'+item.abdimas_registrant.khs}>Lihat File</a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a className="underline text-blue-500" target="_blank" href={'/images/'+item.abdimas_registrant.cv}>Lihat File</a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a className="underline text-blue-500" target="_blank" href={'/images/'+item.abdimas_registrant.portofolio}>Lihat File</a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <a className="underline text-blue-500" target="_blank" href={'/images/'+item.abdimas_registrant.foto}>Lihat File</a>
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
