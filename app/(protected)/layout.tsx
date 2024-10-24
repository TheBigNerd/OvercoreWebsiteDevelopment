import { NavBar } from "./_components/adminnavbar";
import Navbar from "../(user)/_components/Navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return(
        <>
        <Navbar />
        <div className="h-full w-full flex flex-col gap-y-15 items-center justify-center ">
            {children}
        </div>
        </>
    )

}
export default ProtectedLayout;