import React from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  PRODUCT: "product",
};

const Product = ({ product }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.PRODUCT,
    item: product,
  }));

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        cursor: "grab",
      }}
    >
      {product.name}
    </div>
  );
};

const Cart = ({ onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.PRODUCT,
    drop: (item) => onDrop(item),
  }));

  return (
    <div
      ref={drop}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        minHeight: "200px",
        width: "200px",
      }}
    >
      <h2>Cart</h2>
    </div>
  );
};

const DragAndDropWithReactDnd = () => {
  const products = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
  ];

  const handleDrop = (product) => {
    alert(`${product.name} added to the cart!`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* 상품 목록 */}
        <div>
          <h2>Products</h2>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>

        {/* 장바구니 */}
        <Cart onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default DragAndDropWithReactDnd;
