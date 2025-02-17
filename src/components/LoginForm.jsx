import AuthForm from "./authForm";
import { useState } from "react";
import defaultPath from "../utils/paths";

export default function Login({setUserLoggedIn}){
    const [errors, setErrors] = useState('')
    // ToDo handle invalid username and password on this page itself
    async function hasClicked(username, password){
        setErrors('')
        const response = await fetch(`${defaultPath}user/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const jsObJ = await response.json();
        if(jsObJ.user){
            setUserLoggedIn({bIsLoggedIn:true,userName:jsObJ.user})
            return;
        }
        setErrors(jsObJ)
    }
    return (
        <>
        {errors.message}
        <AuthForm clicked={hasClicked} customData={"Login"}/>
        </>
    )
}