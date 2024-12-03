import React, { useState } from "react";

const DragDirectionControl = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // 화면 스크롤 방지

    if (!startPos) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;

    // 이동 방향 및 정도에 따라 포지션 업데이트
    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    // 시작 위치를 현재 위치로 갱신
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setStartPos(null); // 터치 종료 시 시작 위치 초기화
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          borderRadius: "50%",
          touchAction: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default DragDirectionControl;
