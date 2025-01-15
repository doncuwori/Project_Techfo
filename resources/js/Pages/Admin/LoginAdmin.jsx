import React from "react";
import Logo from "@/Components/LoginAdmin/Logo";
import ApplicationName from "@/Components/LoginAdmin/ApplicationName";
import LoginForm from "@/Components/LoginAdmin/LoginForm";

function LoginAdmin() {
    return (
        <div className="bg-orange-500 h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 z-0 flex justify-center items-center">
                <img
                    src="img/bgloginadmin.png"
                    alt="Background"
                    className="w-full h-full"
                />
            </div>
            <Logo />
            <ApplicationName />
            <LoginForm />
        </div>
    );
}

export default LoginAdmin;
