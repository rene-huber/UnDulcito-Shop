"use client";

import Loader from "@/components/loading/Loader"

import WorkList from "@/components/WorkList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import "@/styles/Shop.scss"

const Shop = () => {
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const loggedInUserId = session?.user?._id;

  const router = useRouter();
  const { id: profileId } = router.query?.id;


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

  return loading ? <Loader /> : (
    <>
   

      {loggedInUserId === profileId && (
        <h1 className="title-list">Your Works</h1>
      )}

      {loggedInUserId !== profileId && (
        <h1 className="title-list">{profile.username}</h1>
      )}

      <WorkList data={workList}/>
    </>
  );
};

export default Shop;
