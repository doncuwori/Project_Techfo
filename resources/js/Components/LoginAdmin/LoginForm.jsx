import React from "react";

function LoginForm() {
    return (
        <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 lg:w-1/4 p-8 absolute z-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Selamat Datang, Admin!</h2>
            <form action="#" method="POST">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value="ava.wright@gmail.com"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Kata Sandi *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value="ava.wright@gmail.com"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                    Masuk
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
