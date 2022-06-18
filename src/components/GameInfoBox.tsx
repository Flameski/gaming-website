import { useState } from "react";
import { Game } from "../interfaces";
import Gallery from "./Gallery";

function GameInfoBox(info: Game) {
  const [showGallery, setShowGallery] = useState(false);
  const [activeGalleryImage, setactiveGalleryImage] = useState(0);
  const openGallery = (index: number) => {
    setactiveGalleryImage(index);
    setShowGallery(!showGallery);
  };

  return (
    <section className="game-info-box">
      <h2>{info.title}</h2>
      <img src={info.img} alt={info.title} />
      <p dangerouslySetInnerHTML={{ __html: info.description }}></p>
      <div className="screenshots">
        {info.screenshots.map((sc, index) => {
          return (
            <img
              key={index}
              src={sc.replace("{formatter}", "product_card_screenshot_112")}
              alt={info.title + "Screenshot " + index}
              onClick={() => {
                openGallery(index);
              }}
            />
          );
        })}
        {/* TODO: you should be able to click on the screenshots and see a gallery */}
      </div>
      <div className="tags">
        {info.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
      {showGallery && (
        <Gallery
          images={info.screenshots}
          activeImage={activeGalleryImage}
          close={() => {
            setShowGallery(!showGallery);
          }}
        />
      )}
    </section>
  );
}

export default GameInfoBox;
