"use client"

import Loader from "@/components/Loader";
import WorkList from "@/components/WorkList";
import "@/styles/Wishlist.scss";
import { useSession } from "next-auth/react";

const Wishlist = () => {
  const { data: session } = useSession();
  const wishlist = session?.user?.wishlist;
  const isEmpty = !wishlist || wishlist.length === 0;
 

  return !session ? (
    <Loader />
  ) : (
    <div className="wish">
      <h1 className="title-list">Your Wishlist</h1>
      {isEmpty ? (
        <p className="noItem">No items in your wishlist</p>
      ) : (
        <WorkList data={wishlist} />
      )}
    </div>
  );
};

export default Wishlist