import { connectToDB } from "@/mongodb/dataBase";
import Work from "@/models/work";
import { NextResponse } from "next/server"


export async function POST(req) {
  try {

    await connectToDB();
    const { creator, category, title, description, price, photos } = await req.json();

   
    const newWork = new Work({
      creator,
      category,
      title,
      description,
      price,
      workPhotoPaths: photos
    });

 
    await newWork.save();

    console.log(newWork, "newWork");


    return NextResponse.json({ message: "User registered successfully!", work: newWork }, { status: 200 });
  } catch (err) {

    console.error("Error:", err);
    return new Response("Failed to create a new Work", { status: 500 });
  }
}