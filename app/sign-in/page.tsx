import { GoogleSignIn, SignIn } from "../authcomponents/sign-in";

export default function signIn() {
    return(
        <>
        <div className="align-middle space-x-4"><GoogleSignIn/></div>
        <div className="align-middle space-x-4"><SignIn/></div>
        </>
    )
}