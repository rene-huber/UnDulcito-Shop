import { connectToDB } from "@/mongodb/dataBase";
import User from "@/models/User";
import { NextResponse } from "next/server"
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises"


export async function POST (req) {
  
    try {   
    await connectToDB()
  
const { username, email, password,  profileImage } = await req.json()


    if (!profileImage) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
    }

    
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
      profileImagePath : profileImage
    })

    await newUser.save()

    return NextResponse.json({ message: "User registerred successfully!", user: newUser }, { status: 200 })
    
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Fail to create new User!" }, { status: 500 })
  }
}