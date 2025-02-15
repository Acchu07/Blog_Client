export default function AuthForm({clicked}){

    function submittedForm(e){
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        clicked(username,password)
    }

    return (
        <>
        <form action="submit" onSubmit={submittedForm}>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button >Login</button>
        </form>
        </>
    )
}