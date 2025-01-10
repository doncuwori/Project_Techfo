import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

const LoginForm = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex h-screen">
            {/* Left Section: LeftImage (Hidden on mobile) */}
            <div className="hidden md:w-1/2 md:block relative">
                {/* Background Image (Hidden on mobile) */}
                <img
                    className="w-full h-full object-cover"
                    src="/img/fik.png"
                    alt="Background"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#2d3036]/30" />

                {/* Content */}
                <div className="absolute top-0 left-0 p-8 md:p-12 flex items-center gap-4 z-10">
                    <img
                        className="w-12 h-12 md:w-16 md:h-16"
                        src="/img/upn.png"
                        alt="UPN Logo"
                    />
                    <div className="text-white text-lg md:text-2xl font-bold">
                        FAKULTAS ILMU KOMPUTER
                        <br />
                        UPN VETERAN JAKARTA
                    </div>
                </div>
            </div>

            {/* Right Section: LoginForm */}
            <div className="w-full md:w-1/2 flex px-16 justify-center items-center relative z-10">
                <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
                    <img
                        src="/img/bglogin1.png"
                        alt="Login Background"
                        className="w-full max-h-[600px] rounded-md"
                    />
                </div>

                <div className="absolute top-0 right-0 p-12 text-3xl md:text-4xl font-bold z-30">
                    <span className="text-[#2d3036]">Tech</span>
                    <span className="text-[#fe632e]">fo</span>
                </div>

                {/* Mobile Logo Content */}
                <div className="absolute top-0 left-0 p-8 flex items-center gap-4 z-30 md:hidden">
                    <img
                        className="w-12 h-12 md:w-16 md:h-16"
                        src="/img/upn.png"
                        alt="UPN Logo"
                    />
                    <div className="text-black md:text-white text-lg font-bold">
                        FAKULTAS ILMU KOMPUTER
                        <br />
                        UPN VETERAN JAKARTA
                    </div>
                </div>

                <div className="relative w-full md:w-[598px] bg-white rounded-3xl border border-[#d1d3d8] px-8 py-12 shadow-lg flex flex-col items-center gap-6 z-20">
                    <h1 className="text-[#2d3036] text-3xl font-medium text-center md:text-left">
                        Selamat Datang,{" "}
                        <span className="text-[#fe632e]">Fikers!</span>
                    </h1>

                    {errors && (
                        <p className="text-red-600">
                            {errors.email || errors.password}
                        </p>
                    )}

                    {/* Form Fields */}
                    <form className="w-full space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label className="block text-zinc-950 text-base font-medium mb-2">
                                Username <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="NIM"
                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-md text-base text-zinc-500 focus:outline-none"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                            {errors.username && (
                                <span className="text-red-600">
                                    {errors.username}
                                </span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-zinc-950 text-base font-medium mb-2">
                                Password{" "}
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-md text-base text-zinc-500 focus:outline-none"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <span className="text-red-600">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className={`w-full px-6 py-3 ${
                                processing ? "bg-gray-400" : "bg-[#fe632e]"
                            } text-white text-base font-medium rounded-lg hover:bg-[#e5571e] transition-colors`}
                            disabled={processing}
                        >
                            {processing ? "Loading..." : "Masuk"}
                        </button>
                    </form>
                </div>

                <div className="absolute inset-x-0 bottom-0 z-0 flex justify-center">
                    <img
                        src="/img/bglogin2.png"
                        alt="Bottom Image"
                        className="w-full max-h-[300px] object-cover rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
