"use client";

import "@/styles/WorkDetails.scss";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

import {
  ArrowForwardIos,
  Edit,
  FavoriteBorder,
  ArrowBackIosNew,
  ShoppingCart,
  Favorite,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [work, setWork] = useState({});

  const searchParams = useSearchParams();
  const workId = searchParams.get("id");


  const [quantity, setQuantity] = useState(1); 

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };


  /* GET WORK DETAILS */
  useEffect(() => {
    const getWorkDetails = async () => {
      const response = await fetch(`/api/work/${workId}`, {
        method: "GET",
      });
      const data = await response.json();
      setWork(data);
      setLoading(false);
    };

    if (workId) {
      getWorkDetails();
    }
  }, [workId]);

  const { data: session, update } = useSession();

  const userId = session?.user?._id;

  /* SLIDER FOR PHOTOS */
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) %
        work.workPhotoPaths.length
    );
  };

  /* SHOW MORE PHOTOS */
  const [visiblePhotos, setVisiblePhotos] = useState(5);

  const loadMorePhotos = () => {
    setVisiblePhotos(work.workPhotoPaths.length);
  };

  /* SELECT PHOTO TO SHOW */
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const handleSelectedPhoto = (index) => {
    setSelectedPhoto(index);
    setCurrentIndex(index);
  };

  const router = useRouter();

  /* ADD TO WISHLIST */
  const wishlist = session?.user?.wishlist;

  const isLiked = wishlist?.find((item) => item?._id === work._id);

  const patchWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    const response = await fetch(`api/user/${userId}/wishlist/${work._id}`, {
      method: "PATCH",
    });
    const data = await response.json();
    update({ user: { wishlist: data.wishlist } }); // update session
  };

  /* ADD TO CART */
  const cart = session?.user?.cart;

  const isInCart = cart?.find((item) => item?.workId === workId);

  const addToCart = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    const newCartItem = {
      workId,
      image: work.workPhotoPaths[0],
      title: work.title,
      category: work.category,
      creator: work.creator,
      price: work.price,
      quantity: quantity,
    };

    if (!isInCart) {
      const newCart = [...cart, newCartItem];

      try {
        const res = await fetch(`/api/user/${userId}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: newCart }),
        });

        if (res.ok) {
          update({ user: { cart: newCart } });
          router.push("/cart");
        } else {
          console.error("Error al actualizar el carrito:", res.statusText);
        }
      } catch (err) {
        console.error("Error de red o de servidor:", err);
      }
    } else {
      confirm("This item is already in your cart");
      return;
    }
  };



  return loading ? (
    <Loader />
  ) : (
    <div>
     
      <div className="work-details">
        <div className="title">
          <h1>{work.title}</h1>
          {work?.creator?._id === userId ? (
            <div
              className="save"
              onClick={() => {
                router.push(`/update-work?id=${workId}`);
              }}
            >
              <Edit />
              <p>Edit</p>
            </div>
          ) : (
            <div className="save" onClick={patchWishlist}>
              {isLiked ? (
                <Favorite sx={{ color: "red" }} />
              ) : (
                <FavoriteBorder />
              )}
              <p>Save</p>
            </div>
          )}
        </div>

        <div className="slider-container">
          <div
            className="slider"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {work.workPhotoPaths?.map((photo, index) => (
              <div className="slide" key={index}>
                <Image src={photo} alt="work" width={500} height={500}/>
                <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                  <ArrowBackIosNew sx={{ fontSize: "15px" }} />
                </div>
                <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                  <ArrowForwardIos sx={{ fontSize: "15px" }} />
                </div>
              </div>
            ))}
          </div>
       
        </div>
        <div className="photos">
          {work.workPhotoPaths?.slice(0, visiblePhotos).map((photo, index) => (
          <Image
          src={photo}
          alt="work-demo"
          key={index}
          onClick={() => handleSelectedPhoto(index)}
          className={`image ${selectedPhoto === index ? "selected" : ""}`}
          width={694}	
          height={694}
        />
        
          ))}

          {visiblePhotos < work.workPhotoPaths.length && (
            <div className="show-more" onClick={loadMorePhotos}>
              <ArrowForwardIos sx={{ fontSize: "40px" }} />
              Show More
            </div>
          )}
        </div>

        <p>{work.description}</p>

        <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>


      <h1>Price: ${work.price * quantity}</h1>
        <button type="submit" onClick={addToCart}>
          <ShoppingCart />
          ADD TO CART
        </button>
        <p className="allergy">ALLERGY WARNING: <span> Our product may contain <b>Milk</b>, <b>Soy</b>, <b>Nuts</b>, <b>Gluten</b> and <b>Peanuts</b>.</span> </p>
      </div>
    </div>
  );
};

export default ProductDetails;
