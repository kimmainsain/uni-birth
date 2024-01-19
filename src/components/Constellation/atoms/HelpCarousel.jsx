import React, { useState } from "react";
import Slider from "react-slick";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Carousel = ({ HelpList }) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [isActive, setIsActive] = useState(false);
  return (
    <div>
      <button
        className="absolute bottom-64 right-4 z-20 h-16 rounded-lg text-white"
        onClick={() => setIsActive(!isActive)}
      >
        <div className="text-5xl">
          <BsFillQuestionCircleFill />
        </div>
      </button>
      {isActive && (
        <div className="absolute bottom-60 left-1/2 z-20 w-60 -translate-x-1/2 rounded-lg">
          <div className="relative rounded-lg">
            <Slider {...settings}>
              {HelpList?.map((List, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <img
                    className="rounded-lg "
                    src={List}
                    alt={`Slide ${index}`}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <style>
            {`
   .slick-dots li button:before {
     color: gray;
   }

   .slick-dots li.slick-active button:before {
     color: white;
   }
`}
          </style>
        </div>
      )}
    </div>
  );
};

export default Carousel;
