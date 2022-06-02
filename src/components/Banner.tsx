import { useEffect, useState } from "react";
import _11 from "../img/11.jpg";
import _12 from "../img/12.jpg";

function Banner() {
  const [firstImage, setFirstImage] = useState(_12);
  const [secondImage, setSecondImage] = useState(_11);
  const changeImage = (image: number) => {
    switch (image) {
      case 1:
        setFirstImage(require("../img/12.jpg"));
        setSecondImage(require("../img/11.jpg"));
        break;
      case 2:
        setFirstImage(require("../img/14.jpg"));
        setSecondImage(require("../img/13.jpg"));
        break;
      case 3:
        setFirstImage(require("../img/16.jpg"));
        setSecondImage(require("../img/15.jpg"));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    let bannerImage = 1;
    setInterval(() => {
      changeImage(bannerImage);
      bannerImage++;
      if (bannerImage === 4) {
        bannerImage = 1;
      }
    }, 10000);
  }, []);

  return (
    <div className="banner-element">
      <div className="image">
        <img id="first-banner" src={firstImage} alt="Banner 1" />
        <img id="second-banner" src={secondImage} alt="Banner 2" />
      </div>
      <div className="control">
        <div className="control-buttons">
          <div
            onClick={() => {
              changeImage(1);
            }}
          ></div>
          <div
            onClick={() => {
              changeImage(2);
            }}
          ></div>
          <div
            onClick={() => {
              changeImage(3);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
