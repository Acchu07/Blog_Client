import AuthForm from "./authForm";

export default function SignUpForm() {
    function hasClicked(){
        console.log('Clicked SignUp')
    }
    return (
        <>
            <AuthForm clicked={hasClicked} />
        </>
    )
}