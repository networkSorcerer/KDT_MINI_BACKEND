import { useRecoilState } from "recoil";
import AxiosApi from "../../../api/AxiosApi3";
import { useEffect, useState, useRef } from "react";
import { modalState1 } from "../../../api/recoil/modalState1";
import { ModalStyle, ModalButton } from "../style/ModalStyle";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../api/firebase";

const ProductSaveModal = (props) => {
  const { close, open, type } = props;
  const [categoryList, setCategoryList] = useState([]);
  const [modal, setModal] = useRecoilState(modalState1);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // 업로드할 파일
  const [category, setCategory] = useState(1);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const categoryRef = useRef("");
  useEffect(() => {
    if (open) {
      Categories();
    }
  }, [open]);
  // 상품 카테고리 리스트
  const Categories = async () => {
    try {
      const rsp = await AxiosApi.categoryList();
      setCategoryList(rsp.data.category);
    } catch {}
  };

  // 상품 등록
  const productSave = async () => {
    console.log("save 카테고리 네임 : ", categoryRef.current.value);

    try {
      const rsp = await AxiosApi.productSave(
        category,
        productName,
        price,
        stock,
        description
      );
      console.log(rsp.data);
      if (rsp.data === true) {
        alert("상품등록에 성공했습니다.");
        await handleUploadClick();
      } else {
        alert("상품 등록에 실패했습니다.");
      }
    } catch {}
  };
  // 업로드 버튼 클릭 핸들러
  const handleUploadClick = () => {
    console.log("categoryName : ", categoryName);
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
    const storageRef = ref(
      storage,
      `images/${categoryRef.current.value}/${productName}.jpg`
    ); // Firebase Storage 참조
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("이미지 파이어베이스 업로드 성공");
      getDownloadURL(snapshot.ref)
        .then((url) => {
          console.log("경로 : " + url);
        })
        .catch((e) => {
          console.log("파일 업로드 에러 : " + e);
        });
    });
  };
  // 파일 선택 핸들러
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 150;
        canvas.height = 150;
        ctx.drawImage(img, 0, 0, 150, 150);
        console.log("이미지 그리기 완료");
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], selectedFile.name, {
                type: "image/jpeg",
              });
              setFile(resizedFile);
              setUrl(URL.createObjectURL(resizedFile));
            } else {
              console.log("이미지 변환 중 오류 발생");
            }
          },
          "image/jpeg",
          0.95
        );
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        console.log("이미지 로드 중 오류 발생");
      };
    }
  };
  const resetModal = () => {
    setUrl(null);
    setFile(null);
    setError(null);
    categoryRef.current = null;
  };
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
              {url && !file ? (
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
                    <select
                      onChange={(e) => {
                        const selectedOption = JSON.parse(e.target.value); // JSON 문자열 파싱
                        setCategory(selectedOption.id); // category_id 저장
                        categoryRef.current = selectedOption.name; // a.name을 ref에 저장
                      }}
                    >
                      {categoryList && categoryList.length > 0 ? (
                        categoryList.map((a) => (
                          <option
                            key={a.category_id}
                            value={JSON.stringify({
                              id: a.category_id,
                              name: a.name,
                            })} // JSON 형태로 value 저장
                          >
                            {a.name}
                          </option>
                        ))
                      ) : (
                        <option>데이터가 없습니다.</option>
                      )}
                    </select>
                  </>
                </div>

                <div>
                  <label>상품 이름: </label>
                  <input
                    type="text"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <label>상품 가격: </label>
                  <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label>수량: </label>
                  <input
                    type="number"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <label>상세 정보: </label>
                  <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </>
            </main>
            <footer>
              <ModalButton onClick={productSave}>등록</ModalButton>
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
