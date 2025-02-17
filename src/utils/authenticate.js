import defaultPath from "./paths";

export default async function AuthenticateUser(setUserLoggedIn) {
    try {
        const response = await fetch(`${defaultPath}user/authenticate`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 401) {
            return setUserLoggedIn({ bIsLoggedIn: false, userName: '' });
        }

        const jsObJ = await response.json();
        if (jsObJ.user) {
            setUserLoggedIn({ bIsLoggedIn: true, userName: jsObJ.user })
            return;
        }
    }
    catch (err) {
        setUserLoggedIn({ bIsLoggedIn: false, userName: '' })
    }
}