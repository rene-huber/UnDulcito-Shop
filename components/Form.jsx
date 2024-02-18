import { categories } from "@/utils/categories";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";

import "@/styles/Form.scss";

const Form = ({ type, work, setWork, handleSubmit }) => {
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setWork((prevWork) => {
      return {
        ...prevWork,
        photos: [...prevWork.photos, ...newPhotos],
      };
    });
  };

  const handleRemovePhoto = (indexToRemove) => {
    setWork((prevWork) => {
      return {
        ...prevWork,
        photos: prevWork.photos.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWork((prevWork) => {
      return {
        ...prevWork,
        [name]: value,
      };
    });
  };

  return (
    <div className="form">
      {/* <h1>{type} Your Work</h1> */}
      <form onSubmit={handleSubmit}>
        <h3>Categorias, elige una:</h3>
        <div className="category-list">
          {categories?.map((item, index) => (
            <p
              key={index}
              className={`${work.category === item ? "selected" : ""}`}
              onClick={() => {
                setWork({ ...work, category: item });
              }}
            >
              {item}
            </p>
          ))}
        </div>

        <h3>Aqui van las fotos</h3>
        {work.photos.length < 1 && (
          <div className="photos">
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="alone">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Sube una o varias fotos</p>
            </label>
          </div>
        )}

        {work.photos.length > 0 && (
          <div className="photos">
            {work?.photos?.map((photo, index) => (
              <div key={index} className="photo">
                {photo instanceof Object ? (
                  <img src={URL.createObjectURL(photo)} alt="work" />
                ) : (
                  <img src={photo} alt="work" />
                )}
                <button type="button" onClick={() => handleRemovePhoto(index)}>
                  <BiTrash />
                </button>
              </div>
            ))}
            <input
              id="image"
              type="file"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="together">
              <div className="icon">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </div>
        )}

      
        <div className="description">
          <p>Titulo o nombre</p>
          <input
            type="text"
            placeholder=""
            onChange={handleChange}
            name="title"
            value={work.title}
            required
          />
          <p>Descripcion , etc .. </p>
          <textarea
            type="text"
            placeholder=""
            onChange={handleChange}
            name="description"
            value={work.description}
            required
          />
          <p>Precio</p>
          <span>$</span>
          <input
            type="number"
            placeholder="Precio"
            onChange={handleChange}
            name="price"
            value={work.price}
            required
            className="price"
          />
        </div>
        <button className="submit_btn" type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default Form;
