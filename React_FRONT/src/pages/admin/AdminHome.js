import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../css/style1.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import MyComponent from "../../components/MyComponent";

export default function AdminHome() {
  const [swiperRef, setSwiperRef] = useState(null);
  // CPU
  const [cpu, setCpu] = useState([]);
  const [cpuLength, setCpuLength] = useState("");
  // GPU
  const [gpu, setGpu] = useState([]);
  const [gpuLength, setGpuLength] = useState("");
  // MAIN
  const [main, setMain] = useState([]);
  const [mainLength, setMainLength] = useState("");
  // RAM
  const [ram, setRam] = useState([]);
  const [ramLength, setRamLength] = useState("");
  // SSD
  const [ssd, setSsd] = useState([]);
  const [ssdLength, setSsdLength] = useState("");
  // POWER
  const [power, setPower] = useState([]);
  const [powerLength, setPowerLength] = useState("");

  useEffect(() => {
    totalList();
  });
  const totalList = () => {
    axios
      .get("/products/list")
      .then((res) => {
        // 각 카테고리 데이터를 상태로 설정
        setCpu(res.data.cpu);
        setCpuLength(res.data.cpu.length);

        setGpu(res.data.gpu);
        setGpuLength(res.data.gpu.length);

        setMain(res.data.main);
        setMainLength(res.data.main.length);

        setRam(res.data.ram);
        setRamLength(res.data.ram.length);

        setSsd(res.data.ssd);
        setSsdLength(res.data.ssd.length);

        setPower(res.data.power);
        setPowerLength(res.data.power.length);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  // 상품 갯수를 가져와야 함 length

  return (
    <>
      <MyComponent>상품 추가</MyComponent>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
    </>
  );
}
