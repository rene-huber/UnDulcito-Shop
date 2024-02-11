"use client";
import Loader from "@/components/loading/Loader"

import React, { useEffect, useState } from "react";
import Form from "@/components/form/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const UpdateWork = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);


  const router = useRouter();
  const { id: workId } = router.query?.id;

  const [work, setWork] = useState({
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



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const updateFormWork = new FormData()

      for (var key in work) {
        updateFormWork.append(key, work[key])
      }

      work.photos.forEach((photo) => {
        updateFormWork.append("workPhotoPaths", photo)
      })

      const response = await fetch(`/api/work/${workId}`, {
        method: "PATCH",
        body: updateFormWork
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
