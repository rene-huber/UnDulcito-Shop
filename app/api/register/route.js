import { connectToDB } from "@/mongodb/dataBase";
import User from "@/models/User";
import { NextResponse } from "next/server"
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises"


export async function POST (req) {
  
    try {
   
    await connectToDB()

    const data = await req.formData()
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    const file = data.get('profileImage')

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const profileImagePath=`/Users/pro/Desktop/tienda/public/uploads/${file.name}`
    await writeFile(profileImagePath, buffer)
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists!" }, { status: 409 })
    }

    const saltRounds = 10
    const hashedPassword = await hash(password, saltRounds)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImagePath: `/uploads/${file.name}`
    })

    await newUser.save()

    return NextResponse.json({ message: "User registerred successfully!", user: newUser }, { status: 200 })
    
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Fail to create new User!" }, { status: 500 })
  }
}