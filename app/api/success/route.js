import User from "@/models/User";
import { connectToDB } from "@/mongodb/dataBase";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, phoneNumber, suggestion } = req.body;

    if (!username || !phoneNumber || !suggestion) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    try {
      // Conectarse a la base de datos
      const client = await connectToDB();
      const db = client.db();

      // Buscar al usuario por nombre de usuario
      const existingUser = await User.findOne({ username });

      // Si no se encuentra al usuario, devolver un error
      if (!existingUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      // Agregar la retroalimentación al usuario encontrado
      existingUser.feedback = { phoneNumber, suggestion };

      // Guardar el usuario actualizado en la base de datos
      await existingUser.save();

      res.status(201).json({ message: 'Feedback submitted successfully', data: existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error submitting feedback' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
