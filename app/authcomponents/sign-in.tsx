import { signIn } from "@/auth"
 
export function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 

export function SignIn() {
    return (
      <form
        action={async (formData) => {
          "use server"
          await signIn("resend", formData)
        }}
      >
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Signin with Resend</button>
      </form>
    )
  }