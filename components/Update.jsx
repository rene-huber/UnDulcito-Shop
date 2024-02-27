"use client";
import Loader from "@/components/Loader"

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const UpdateWork = () => {
  const CLOUD_NAME = "huberlin";
  const UPLOAD_PRESET = "blog13";
  
  const { data: session } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const workId = searchParams.get("id");
  

  const [work, setWork] = useState({
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });

  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`api/work/${workId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setWork({
        creator: data.creator,
        category: data.category,
        title: data.title,
        description: data.description,
        price: data.price,
        photos: data.workPhotoPaths,
      });

      setLoading(false);
    };

    if (workId) {
      getWorkDetails();
    }
  }, [workId]);



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

      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ creator, category, title, description, price, photos })
      })

      if (response.ok) {
        router.push(`/shop?id=${session?.user?._id}`)
      }
    } catch (err) {
      console.log("Publish Work failed", err.message)
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <>
    
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default UpdateWork;
