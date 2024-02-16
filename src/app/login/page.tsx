import { AuthButtonServer } from "@/components/login/auth-button-server";

const LoginPage = () => {
    return (
        <div className="flex justify-center items-center h-screen flex-col">
            <h1 className="text-3xl md:text-6xl mb-2 md:mb-5">Welcome</h1>
            <AuthButtonServer />
        </div>
    )
}

export default LoginPage