import { useState } from "react";

interface dataFromProps {
  images: string[];
  activeImage: number;
  close: () => void;
}

const Gallery = ({ images, activeImage, close }: dataFromProps) => {
  const [imageIndex, setImageIndex] = useState(activeImage);

  const changeGalleryImage = (direction: "prev" | "next") => {
    switch (direction) {
      case "prev":
        if (imageIndex === 0) {
          setImageIndex(images.length - 1);
        } else setImageIndex(imageIndex - 1);
        break;
      case "next":
        if (imageIndex === images.length - 1) {
          setImageIndex(0);
        } else setImageIndex(imageIndex + 1);
        break;
      default:
        break;
    }
  };
  return (
    <div className="gallery">
      <div
        className="prev"
        onClick={() => changeGalleryImage("prev")}
      >{`<`}</div>
      <div className="gallery-image">
        <img
          src={images[imageIndex].replace(
            "{formatter}",
            "product_card_screenshot_748"
          )}
          alt={`Screenshot No. ${imageIndex}`}
        />
      </div>
      <div
        className="next"
        onClick={() => changeGalleryImage("next")}
      >{`>`}</div>

      <div className="close" onClick={close}>
        X
      </div>
    </div>
  );
};

export default Gallery;
