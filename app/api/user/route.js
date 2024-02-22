import { connectToDB } from "@/mongodb/dataBase";
import User from "@/models/User";

export const GET = async (req, res) => {

  try {
    await connectToDB()
const userList = await User.find({}).select('email orders');

  

    return new Response(JSON.stringify(userList), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to fetch Work List", { status: 500 })
  }
}



