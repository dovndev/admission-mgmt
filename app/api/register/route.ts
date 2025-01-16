
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
        const password = generatePassword({
            firstName: data.firstName,
            lastName: data.lastName,
            mobileNumber: data.mobileNumber
        })
        console.log("password gen", password)
        const newUser = new userModel(data)
        newUser.password = await newUser.generateHashPassword(password)
        const savedUser = await newUser.save()
        console.log("user saved", savedUser)
        return NextResponse.json({ data: data })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}