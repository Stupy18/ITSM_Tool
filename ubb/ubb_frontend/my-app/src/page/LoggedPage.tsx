import React, { useEffect, useState } from "react";
import { LocalStorageEnum } from "../enum/LocalStorageEnum.tsx";



export default function LoggedPage(){


    const [username, setUsername] = useState<String>(" ")
    useEffect(()=>{
        if(localStorage.getItem(LocalStorageEnum.USER))
            setUsername(localStorage.getItem(LocalStorageEnum.USER)!)
    },[localStorage.getItem(LocalStorageEnum.USER)])
    
    return(
        <text>
        You're logged in, ${username}!</text>)
}