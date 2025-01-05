import React from "react";

const TabelPusatInfo = ({ data, handler }) => {

    const handleChange = (e) => {
        let selected = document.querySelectorAll('input[name="id_abdimas_registrant[]"]');
        let id = Array.from(selected).map((input) => input.checked ? input.value : null);
        handler(id);
    };

    return (
        <div class="overflow-x-auto mt-4">
            <table class="min-w-full divide-y divide-gray-200 ">
                <thead>
                    <tr>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            No
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nama Pendaftar
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Penerimaan
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                {data.map((item, index) => {
                        return (
                            <tr>
                                <td class="py-2 text-center">{index + 1}</td>
                                <td class="py-2 text-center">{item.mahasiswa.nama}</td>
                                <td class="py-2 text-center">{item.status ? 'Diterima' : 'Menunggu'}</td>
                                <td class="py-2 text-center">
                                    {
                                        item.status ? 
                                        <input disabled type="checkbox" checked/>
                                        :
                                        <input type="checkbox" value={item.id} name="id_abdimas_registrant[]" onChange={handleChange} />
                                    }
                                    
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TabelPusatInfo;
