import React, { useState } from "react";

const DragAndDropExample = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ]);
  const [cart, setCart] = useState([]);

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("item", JSON.stringify({ item, source }));
  };

  const handleDrop = (e, destination) => {
    e.preventDefault();
    const { item, source } = JSON.parse(e.dataTransfer.getData("item"));

    if (source === destination) return; // 같은 곳으로 드래그하면 무시

    if (destination === "cart") {
      setCart((prevCart) => [...prevCart, item]);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== item.id)
      );
    } else if (destination === "products") {
      setProducts((prevProducts) => [...prevProducts, item]);
      setCart((prevCart) =>
        prevCart.filter((cartItem) => cartItem.id !== item.id)
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Drop 가능한 영역으로 설정
  };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* 상품 목록 */}
      <div
        onDrop={(e) => handleDrop(e, "products")}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          minHeight: "200px",
          width: "200px",
        }}
      >
        <h2>Products</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product, "products")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {product.name}
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* 장바구니 */}
      <div
        onDrop={(e) => handleDrop(e, "cart")}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          minHeight: "200px",
          width: "200px",
        }}
      >
        <h2>Cart</h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, "cart")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.name}
            </div>
          ))
        ) : (
          <p>Drag items here</p>
        )}
      </div>
    </div>
  );
};

export default DragAndDropExample;
