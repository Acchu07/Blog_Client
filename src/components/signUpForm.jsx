import AuthForm from "./authForm";
import defaultPath from "../utils/paths";

export default function SignUpForm() {
    async function hasClicked(username, password){
        const response = await fetch(`${defaultPath}user/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const jsObJ = await response.json();
    }
    return (
        <>
            <AuthForm clicked={hasClicked} customData={"Sign-Up"} />
        </>
    )
}