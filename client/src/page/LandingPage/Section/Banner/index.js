import { SlideContainer, StaticContainer } from "./styled";
import { useEffect, useRef, useState } from "react";

const Banner = () => {
  const imageRef = useRef();

  const [imageStyle, setImageStyle] = useState({});

  const onClickNextImage = () => {
    setImageStyle({
      transform: "translateX(-200%)",
      border: "5px solid red",
    });
  };

  return (
    <>
      <button onClick={onClickNextImage}> NEXT </button>
      {/*  Slide Container Section */}
      <SlideContainer>
        <div className="slidebox">
          <img
            ref={imageRef}
            style={imageStyle}
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/almond.jpg`}
          />
          <img
            style={imageStyle}
            ref={imageRef}
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/mushroom.jpg`}
          />
          <img
            style={{ transform: "translateX(-400%)" }}
            ref={imageRef}
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/pear.jpg`}
          />
          <img
            style={imageStyle}
            ref={imageRef}
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/tomato.jpg`}
          />
          <img
            ref={imageRef}
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/vegetable.jpg`}
          />
        </div>
      </SlideContainer>

      {/* End  Slide Container Section */}

      {/*  Slide Container Section */}
      <StaticContainer>
        <img
          src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/lightning_market_banner.png`}
          alt="lightning_market_banner"
        />
      </StaticContainer>

      {/* End  Slide Container Section */}
    </>
  );
};

export default Banner;
