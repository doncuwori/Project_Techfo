import React from "react";

function Logo() {
    return (
        <div className="absolute top-5 left-5 flex items-center space-x-3">
            <img src="img/upn.png" alt="UPN Logo" className="w-12" />
            <h1 className="text-white font-bold text-xl leading-tight">
                FAKULTAS ILMU KOMPUTER<br />UPN VETERAN JAKARTA
            </h1>
        </div>
    );
}

export default Logo;
