import { ErrorCard } from "@/app/components/auth/error-card"

const AuthErrorPage = () => {
    return (
        <div className="h-full flex items-center justify-center bg-slate-500">
            <ErrorCard />
        </div>
    )
}
export default AuthErrorPage