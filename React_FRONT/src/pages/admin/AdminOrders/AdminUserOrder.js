import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosApi3 from "../../../api/AxiosApi3";
// 쿼리 변경 그냥 order는 개별주문 custom은 커스텀 컴퓨터 인것 처럼 설정 하고 custom_id는 무시?
//
const AdminUserOrder = () => {
  const { user_id } = useParams();
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [customOrderList, setCustomOrderList] = useState([]);
  const [cpu, setCpu] = useState([]);
  const [gpu, setGpu] = useState([]);
  const [main, setMain] = useState([]);
  const [ram, setRam] = useState([]);
  const [ssd, setSsd] = useState([]);
  const [power, setPower] = useState([]);

  useEffect(() => {
    OrderList(user_id);
    CustomOrderList(user_id);
    ProductList();
  }, [user_id]);

  const ProductList = async () => {
    const rsp = await AxiosApi3.productList();
    setProductList(rsp.data.list);
    setCpu(rsp.data.cpu);
    setGpu(rsp.data.gpu);
    setMain(rsp.data.main);
    setRam(rsp.data.ram);
    setSsd(rsp.data.ssd);
    setPower(rsp.data.power);
  };

  const OrderList = async (user_id) => {
    const rsp = await AxiosApi3.orderList(user_id);
    setOrderList(rsp.data.orderList);
    console.log(rsp.data.orderList);
  };

  const CustomOrderList = async (user_id) => {
    const rsp = await AxiosApi3.customOrderList(user_id);
    setCustomOrderList(rsp.data.customOrderList);
    console.log(rsp.data.customOrderList);
  };

  const handleDragStart = (e, item, source) => {
    e.dataTransfer.setData("item", JSON.stringify({ item, source }));
  };

  const handleDrop = (e, destination) => {
    e.preventDefault();
    const { item, source } = JSON.parse(e.dataTransfer.getData("item"));

    if (source === destination) return;

    if (source === "orderList") {
      setOrderList((prev) =>
        prev.filter((cartItem) => cartItem.id !== item.id)
      );
    } else if (source === "customOrderList") {
      setCustomOrderList((prev) =>
        prev.filter((wishItem) => wishItem.id !== item.id)
      );
    }

    if (destination === "orderList") {
      setOrderList((prev) => [...prev, item]);
    } else if (destination === "customOrderList") {
      setCustomOrderList((prev) => [...prev, item]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>주문 목록 조회</h1>
      <br />
      <div style={{ display: "flex", gap: "20px" }}>
        {/* 상품 목록 */}
        <div
          onDrop={(e) => handleDrop(e, "productList")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>Products</h2>
          {cpu.map((item) => (
            <div
              key={item.product_id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, "cpu")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.product_id}
              {item.product}
              {item.price}
              {item.stock}
            </div>
          ))}
        </div>

        {/* 낱개 상품 */}
        <div
          onDrop={(e) => handleDrop(e, "orderList")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>개별 주문 목록</h2>
          {orderList.map((item) => (
            <div
              key={item.product_id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, "orderList")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.product_id}
              {item.product}
              {item.price}
              {item.quantity}
            </div>
          ))}
        </div>

        {/* 커스텀 PC */}
        <div
          onDrop={(e) => handleDrop(e, "customOrderList")}
          onDragOver={handleDragOver}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            minHeight: "200px",
            width: "200px",
          }}
        >
          <h2>커스텀 PC 주문 목록</h2>
          {customOrderList.map((item) => (
            <div
              key={item.product_id}
              draggable
              onDragStart={(e) => handleDragStart(e, item, "customOrderList")}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                cursor: "grab",
              }}
            >
              {item.product_id}
              {item.product}
              {item.price}
              {item.quantity}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUserOrder;
