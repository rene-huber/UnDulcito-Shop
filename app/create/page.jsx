"use client"
import React, { useState } from 'react'
import Form from '@/components/Form'
import "@/styles/Order.scss"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const CreateWork = () => {
  const CLOUD_NAME = "huberlin";
  const UPLOAD_PRESET = "blog13";
  const { data: session } = useSession()
  const router = useRouter()
  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: []
  })
  console.log( )
  if (session) {work.creator = session?.user?._id}

  const uploadImage = async (photos) => {
    if (!work.photos || work.photos.length === 0) return [];
  
    const uploadedImages = [];
  
    for (let i = 0; i < work.photos.length; i++) {
      const formData = new FormData();
      formData.append("file", work.photos[i]);
      formData.append("upload_preset", UPLOAD_PRESET);
  
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData
        });
  
        const data = await res.json();
        const imageUrl = data['secure_url'];
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  
    return uploadedImages;
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const uploadedImages = await uploadImage(work.photos);

        const creator = work.creator
          const category=  work.category
          const title=  work.title
          const description=  work.description
          const price=  work.price
          const photos=  uploadedImages
        
  
console.log("9879789797979797",  creator, category, title, description, price, photos)

      const response = await fetch(`/api/work/new`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creator, category, title, description, price, photos })
      })
  
      if (response.ok) {
        router.push(`/shop?id=${session?.user?._id}`)
      } else {
        throw new Error("Failed to create work")
      }
    } catch (err) {
      console.log("Publish Work failed", err.message)
    }
  }

  return (
    <div className='bajar'>
     
      <Form
        type="Create"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreateWork