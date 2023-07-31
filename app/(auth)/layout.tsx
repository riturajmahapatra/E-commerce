import React from "react";
import './layout.css';
export default function AuthLayout({
    children
}:{
    children: React.ReactNode
}) {
    return(
        <div className="imga">
            {children}
        </div>
    )
}