import Work from "@/models/work";
import { connectToDB } from "@/mongodb/dataBase";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const work = await Work.findById(params.id).populate("creator");

    if (!work) return new Response("The Work Not Found", { status: 404 });

    return new Response(JSON.stringify(work), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    const { creator, category, title, description, price, photos } =
      await req.json();

    const existingWork = await Work.findById(params.id)

    if (!existingWork) {
      return new Response("The Work Not Found", { status: 404 });
    }
   
    existingWork.category = category
    existingWork.title = title
    existingWork.description = description
    existingWork.price = price
    existingWork.workPhotoPaths = photos

    await existingWork.save()

    return new Response("Successfully updated the Work", { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Error updating the Work", { status: 500 })
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Work.findByIdAndDelete(params.id);

    return new Response("Successfully deleted the Work", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Error deleting the Work", { status: 500 });
  }
};
