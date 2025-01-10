const TabelPusatInfo = ({ data, handler }) => {
    const handleChange = (e) => {
        let arrayId = [];
    
        data.forEach((item) => {
            let selected = document.querySelector(
                `input[name="id_abdimas_registrant_${item.id}"]:checked`
            );
    
            arrayId.push({
                id: item.id,
                value: selected ? selected.value : "rejected", // Default to "rejected" if nothing is selected
            });
        });
    
        handler(arrayId);
    };
    

    return (
        <div className="overflow-x-auto mt-4 border">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Pendaftar
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            KHS
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CV
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Portofolio
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Foto 3X4
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penerimaan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penolakan
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className="py-2 text-center">{index + 1}</td>
                            <td className="py-2 text-center">
                                {item.mahasiswa.nama}
                            </td>
                            <td className="py-2 text-center">
                                <a
                                    className="underline text-blue-500"
                                    target="_blank"
                                    href={`/images/${item.khs}`}
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="py-2 text-center">
                                <a
                                    className="underline text-blue-500"
                                    target="_blank"
                                    href={`/images/${item.cv}`}
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="py-2 text-center">
                                <a
                                    className="underline text-blue-500"
                                    target="_blank"
                                    href={`/images/${item.portofolio}`}
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="py-2 text-center">
                                <a
                                    className="underline text-blue-500"
                                    target="_blank"
                                    href={`/images/${item.foto}`}
                                >
                                    Lihat File
                                </a>
                            </td>
                            <td className="py-2 text-center">
                                {!item.status && !item.rejected
                                    ? "Menunggu"
                                    : item.status && !item.rejected
                                    ? "Diterima"
                                    : "Ditolak"}
                            </td>
                            <td className="py-2 text-center">
                                {!item.status && !item.rejected ? (
                                    <input
                                        type="radio"
                                        value="accepted"
                                        name={`id_abdimas_registrant_${item.id}`}
                                        onChange={handleChange}
                                    />
                                ) : item.status && !item.rejected ? (
                                    <input type="radio" checked disabled />
                                ) : (
                                    ""
                                )}
                            </td>
                            <td className="py-2 text-center">
                                {!item.status && !item.rejected ? (
                                    <input
                                        type="radio"
                                        value="rejected"
                                        name={`id_abdimas_registrant_${item.id}`}
                                        onChange={handleChange}
                                    />
                                ) : item.rejected && !item.status ? (
                                    <input type="radio" checked disabled />
                                ) : (
                                    ""
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TabelPusatInfo;
