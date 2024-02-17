import Shop from '@/components/Shop'
import { Suspense } from 'react'

<<<<<<< HEAD
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import WorkList from "@/components/WorkList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "@/styles/Shop.scss";

const Shop = () => {
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  const searchParams = useSearchParams();
  const profileId = searchParams.get("id");

  const [workList, setWorkList] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getWorkList = async () => {
      const response = await fetch(`api/user/${profileId}/shop`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setWorkList(data.workList);
      setProfile(data.user);
      setLoading(false);
    };

    if (profileId) {
      getWorkList();
    }
  }, [profileId]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <WorkList data={workList} />
    </>
  );
};

export default Shop;
=======
function Store() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <Shop />
     </Suspense>
  )
}

export default Store
>>>>>>> main
