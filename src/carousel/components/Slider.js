import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderList = styled.div`
  display: flex;
`;

const SliderItem = styled.div`
  position: relative;
  height: 100%;
  min-width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    color: white;
    justify-content: center;
    font-size: 60px;
    font-weight: bold;
  }
`;

const Slider = () => {
  const slides = ["#33a", "#8c9", "#f3e074"];
  const sliderRef = useRef(null);
  const count = 1; // 양쪽에 추가할 개수
  const [currentIndex, setCurrentIndex] = useState(count);
  let isTransform = useRef(true);

  const createSlides = useCallback(() => {
    const items = [...slides];
    for (let i = 0; i < count; i++) {
      items.push(slides[i % slides.length]);
      items.unshift(slides[slides.length - 1 - (i % slides.length)]);
    }
    return items;
  }, [slides]);

  const [newSlides, setNewSlides] = useState(createSlides);

  useEffect(() => {
    const startTimer = setInterval(
      () =>
        setCurrentIndex((prev) =>
          prev === newSlides.length - 1 ? count : prev + 1
        ),
      2000
    );
    return () => {
      clearInterval(startTimer);
    };
  }, [newSlides]);

  useEffect(() => {
    // if (currentIndex === newSlides.length - 1) {
    //   // 마지막 인덱스라면
    //   console.log("hi");
    //   sliderRef.current.style.transition = "";
    //   sliderRef.current.style.transform = `
    //     translateX(${-100 * count}%)
    //   `;
    //   setCurrentIndex(count);
    // } else {
    //   sliderRef.current.style.transition = "all 0.5s linear";
    //   sliderRef.current.style.transform = `
    //     translateX(${-100 * currentIndex}%)
    //   `;
    // }
  }, [currentIndex, newSlides]);

  return (
    <SliderWrapper>
      <SliderList
        ref={sliderRef}
        style={{
          transition: `${
            currentIndex === newSlides.length - 1 ? "" : "all 0.5s linear"
          }`,
          transform: `
        translateX(${-100 * currentIndex}%)
      `,
        }}
      >
        {newSlides?.map((color, index) => (
          <SliderItem>
            <div key={index} style={{ background: color }}>
              {index}
            </div>
          </SliderItem>
        ))}
      </SliderList>
    </SliderWrapper>
  );
};

export default Slider;
