import AuthForm from "./authForm";

export default function Login(setUserLoggedIn){

    // ToDo handle invalid username and password on this page itself
    async function hasClicked(username, password){
        console.log('Clicked Login')        
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const jsObJ = await response.json();
        console.log(jsObJ.user);


    }
    return (
        <>
        <AuthForm clicked={hasClicked}/>
        </>
    )
}