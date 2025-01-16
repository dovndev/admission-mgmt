
import dbConnect from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import userModel from '@/models/user'
import { generatePassword } from '@/lib/utils'
export async function POST(
    req: NextRequest,
) {
    try {
        dbConnect()
        const data = await req.json()
        const user = await userModel.findOne({ email: data.email })
        if (user) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
        }
        const password = generatePassword({
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNumber: data.mobileNumber
        })
        console.log("password gen", password)
        const newUser = new userModel(data)
        newUser.password = await newUser.generateHashPassword(password)
        const savedUser = await newUser.save()
        // send email with emai and password

        console.log("user saved", savedUser)
        return NextResponse.json({ data: data })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}