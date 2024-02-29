"use client";

import { categories } from "@/utils/categories";
import WorkList from "@/components/WorkList";
import { useEffect, useState } from "react";
import "@/styles/Categories.scss";
import Loader from "@/components/Loader";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [workList, setWorkList] = useState([]);
  
  const getWorkList = async () => {
    // const response = await fetch(`/api/work/list/${selectedCategory}`);
    const response = await fetch(`/api/work/list/${selectedCategory}`, {cache: 'no-store'});
    const data = await response.json();
    setWorkList(data);
    setLoading(false);
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="categories">
        {categories?.map((item, index) => (
          <p
            onClick={() => setSelectedCategory(item)}
            className={`${item === selectedCategory ? "selected" : ""}`}
            key={index}
          >
            {item}
          </p>
        ))}
      </div>
<div className="feedWrap">
      <WorkList data={workList} />

      <p className="allergy">ALLERGY WARNING: <span> Our product may contain <b>Milk</b>, <b>Soy</b>, <b>Nuts</b>, <b>Gluten</b> and <b>Peanuts</b>.</span> </p>
      </div>
    </div>
  );
};

export default Feed;
