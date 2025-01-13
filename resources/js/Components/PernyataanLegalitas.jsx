import React from "react";

const PernyataanLegalitas = ({ isChecked, onCheckboxChange }) => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Pernyataan Legalitas</h2>
            <div className="border p-4 rounded-lg bg-orange-50">
                <div className="flex items-center">
                    <input 
                        type="checkbox" 
                        className="mr-4" 
                        checked={isChecked}
                        onChange={onCheckboxChange}
                    />
                    <label className="text-gray-700">
                        Saya menyatakan bahwa data yang terunggah adalah sesuai
                        dengan aslinya dan data yang saya isikan benar. Apabila
                        suatu hari ditemukan data yang tidak benar, saya
                        bersedia menerima sanksi sesuai dengan ketentuan yang
                        berlaku.
                    </label>
                </div>
            </div>
        </section>
    );
};

export default PernyataanLegalitas;
