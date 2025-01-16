"use server"
import { auth } from "@/auth"
import { signIn } from "@/auth"
export async function isSessonActive() {
    const session = await auth()
    const user = session?.user?.id
    if (user) {
        return true
    }
    return false
}

export async function loginAction(email: string, password: string) {

    console.log("loginAction", email, password)
    const response = await signIn("credentials", {
        email: email,
        password: password,
    })
    console.log("response", response)
}