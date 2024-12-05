import { useRecoilState } from "recoil";
import AxiosApi from "../../../api/AxiosApi3";
import { useEffect, useState } from "react";
import { modalState1 } from "../../../api/recoil/modalState1";
import { ModalStyle, ModalButton } from "../style/ModalStyle";

const ProductSaveModal = (props) => {
  const { close, open, type } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useRecoilState(modalState1);
  useEffect(() => {
    //Categories();
  });
  // 상품 카테고리 리스트
  const Categories = async () => {
    try {
      const rsp = await AxiosApi.categoryList();
      setCategoryList(rsp.data.category);
    } catch {}
  };
  const resetModal = () => {};
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>
              <h2> 상품 등록</h2>
              <button
                onClick={() => {
                  close();
                  resetModal();
                }}
              >
                &times;
              </button>
            </header>
            <main>
              {/* {url && !file ? (
                <img
                  src={url}
                  alt="Downloaded File"
                  style={{ maxWidth: "100%" }}
                />
              ) : file ? (
                <img
                  src={URL.createObjectURL(file)} // 또는 업로드 후의 URL을 사용
                  alt="Downloaded File"
                  style={{ maxWidth: "100%" }}
                />
              ) : (
                <p>파일이 선택되지 않았습니다.</p> // file과 url이 모두 없는 경우
              )}

              <input type="file" onChange={handleFileInputChange} />

              <>
                <div>
                  <>
                    <label>종류: </label>
                    <input
                      type="text"
                      value={productDetail[0].category}
                      readOnly
                    />
                  </>
                </div>

                <div>
                  <label>상품 이름: </label>
                  <input
                    type="text"
                    value={productId !== null ? productDetail[0].name : ""}
                    onChange={(e) => {
                      const updatedDetail = [...productDetail];
                      updatedDetail[0].name = e.target.value;
                      setProductDetail(updatedDetail);
                    }}
                  />
                </div>
                <div>
                  <label>상품 가격: </label>
                  <input
                    type="text"
                    value={productId !== null ? productDetail[0].price : ""}
                    onChange={(e) => {
                      const updatedDetail = [...productDetail];
                      updatedDetail[0].price = e.target.value;
                      setProductDetail(updatedDetail);
                    }}
                  />
                </div>
                <div>
                  <label>수량: </label>
                  <input
                    type="number"
                    value={productId !== null ? productDetail[0].stock : ""}
                    onChange={(e) => {
                      const updatedDetail = [...productDetail];
                      updatedDetail[0].stock = e.target.value;
                      setProductDetail(updatedDetail);
                    }}
                  />
                </div>
                <div>
                  <label>상세 정보: </label>
                  <input
                    value={
                      productId !== null ? productDetail[0].description : ""
                    }
                    onChange={(e) => {
                      const updatedDetail = [...productDetail];
                      updatedDetail[0].description = e.target.value;
                      setProductDetail(updatedDetail);
                    }}
                  />
                </div>
              </> */}
            </main>
            <footer>
              <ModalButton>수정</ModalButton>
              <button
                onClick={() => {
                  close();
                  resetModal();
                }}
              >
                취소
              </button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default ProductSaveModal;
