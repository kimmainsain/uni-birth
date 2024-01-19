import React from "react";
import Slider from "react-slick";
import { BsX } from "react-icons/bs";
import help1 from "../atoms/help1.png";
import help2 from "../atoms/help2.png";
import help3 from "../atoms/help3.png";
import help4 from "../atoms/help4.png";
import help5 from "../atoms/help5.png";

const Carousel = ({ setIsActive }) => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    Infinity: true,
  };

  const HelpList = [help5, help2, help1, help3, help4];

  return (
    <div>
      <div className="absolute bottom-60 left-1/2 z-40 w-72 -translate-x-1/2 rounded-lg">
        <div className="relative">
          <button
            className="absolute right-0 top-4 z-20 text-white" // 닫기 버튼의 위치와 z-index 설정
            onClick={() => setIsActive(false)}
          >
            <BsX size={30} /> {/* 닫기 아이콘 */}
          </button>
          <Slider {...settings}>
            {HelpList?.map((List, index) => (
              <div key={index} className="rounded-lg">
                <img className="rounded-lg" src={List} alt={`Slide ${index}`} />
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
    </div>
  );
};

export default Carousel;
