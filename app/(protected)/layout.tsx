import { NavBar } from "./_components/navbar";
import Navbar from "../(user)/_components/Navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return(
        <>
        <Navbar />
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center ">
            <NavBar />
            {children}
        </div>
        </>
    )

}
export default ProtectedLayout;