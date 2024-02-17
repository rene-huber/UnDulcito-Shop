<<<<<<< HEAD
"use client";
import Loader from "@/components/Loader"
import Navbar from "@/components/Navbar"
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


const UpdateWork = () => {
  const { data: session } = useSession();
=======
import React from 'react'
import { Suspense } from 'react'
import Update from '@/components/Update'

function UpdatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Update />
     </Suspense>
  )
}
>>>>>>> main

export default UpdatePage