import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Login from "./Login";

function ProtectedRouter({children}){
    const [isData, setData]=useState();

    useEffect(()=>{
        const token= JSON.parse(sessionStorage.getItem('token'))
        setData(token)
    })
    

    return(<>

    {
        isData ? children : <Login/>
    }
    </>)
}export default ProtectedRouter