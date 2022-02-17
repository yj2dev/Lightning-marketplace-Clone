import { SlideContainer, StaticContainer } from "./styled";
import { useEffect, useRef, useState } from "react";
import useInterval from "../../../../hooks/useInterval";

const Banner = () => {
  const slideImgRef = useRef();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [totalImgIndex, setTotalImgIndex] = useState(5);

  useEffect(() => {
    // slideImgRef.current.style.transition = "all 0.5s ease-in-out";
    slideImgRef.current.style.transform = `translateX(-${currentImgIndex}00%)`;
  }, [currentImgIndex]);

  useInterval(() => {
    onClickNextImage();
  }, 5000);

  const onClickNextImage = () => {
    if (currentImgIndex >= totalImgIndex - 1) setCurrentImgIndex(0);
    else setCurrentImgIndex(currentImgIndex + 1);
  };

  const onClickPreviewImage = () => {
    if (currentImgIndex === 0) setCurrentImgIndex(totalImgIndex - 1);
    else setCurrentImgIndex(currentImgIndex - 1);
  };

  return (
    <>
      {/*  Slide Container Section */}
      <SlideContainer>
        <div className="slidebox" ref={slideImgRef}>
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/almond.jpg`}
          />
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/mushroom.jpg`}
          />
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/pear.jpg`}
          />
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/tomato.jpg`}
          />
          <img
            src={`${process.env.REACT_APP_MEDIA_URL}/static/banner_image/vegetable.jpg`}
          />
        </div>
        <button onClick={onClickPreviewImage} className="prev-btn"></button>
        <button onClick={onClickNextImage} className="next-btn"></button>
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
