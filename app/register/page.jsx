"use client";
import { FcGoogle } from "react-icons/fc"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image";

import "@/styles/Register.scss"
import Link from "next/link";
import { set } from "mongoose";

const Register = () => {
const CLOUD_NAME = "huberlin";
const UPLOAD_PRESET = "blog13";

const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [photo, setPhoto] = useState(null)  

console.log(username, email, password, confirmPassword, photo)

  const router = useRouter();
  const [passwordMatch, setPasswordMatch] = useState(true);
  useEffect(() => {setPasswordMatch(password === confirmPassword)})


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!profileImage) {
      console.log("Please upload an image")
      return
    }

    try {
      const profileImage = await uploadImage(photo);
      
      const response = await fetch("/api/register/", {
        method: "POST",
        body: JSON.stringify({username, email, password, confirmPassword, profileImage}), 
      });

      if (response.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  const loginWithGoogle = () => {
    signIn("github", { callbackUrl: "/" });
  };

  const uploadImage = async () => {
    if (!photo) return


    const formData = new FormData()

    formData.append("file", photo)
    formData.append("upload_preset", UPLOAD_PRESET)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      const profileImage = data['secure_url']

      return profileImage
    } catch (error) {
        console.log(error)
    }
}




  return (
    <div className="register">
     <Image src="/login.jpg" alt="login" className="register_decor" width={255} height={400} />
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) =>  setConfirmPassword(e.target.value)}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            onChange={(e) => setPhoto(e.target.files[0])}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <Image src="/addImage.png" alt="add profile" width={35} height={25} />
            <p>Upload Profile Photo</p>
          </label>
          {photo && (
            <img
              src={URL.createObjectURL(photo)}
              alt="Profile"
              style={{ maxWidth: "80px", maxHeight: "100px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
    
        <Link href="/login">Already have an account? Log In Here</Link>
      </div>
    </div>
  );
};

export default Register;
