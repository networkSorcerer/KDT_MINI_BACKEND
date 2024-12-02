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

const KH_DOMAIN = "http://localhost:8112";

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
  }, []);
  const totalList = () => {
    axios
      .get(KH_DOMAIN + "/products/list")
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
      {/* CPU */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {cpu.length > 0 ? (
          cpu?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
      {/* GPU */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {gpu.length > 0 ? (
          gpu?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
      {/* MAIN */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {main.length > 0 ? (
          main?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
      {/* RAM */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {ram.length > 0 ? (
          ram?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
      {/* SSD */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {ssd.length > 0 ? (
          ssd?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
      {/* POWER */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={6}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="cpuSwiper"
      >
        {power.length > 0 ? (
          power?.map((a) => (
            <SwiperSlide key={a.product_id}>{a.name}</SwiperSlide>
          ))
        ) : (
          <SwiperSlide>테이터가 없습니다.</SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
