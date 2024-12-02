import styled from "styled-components";

export const Button1 = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 200px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4caf50;
  }

  option {
    padding: 10px;
  }
`;

export const StyledInput = styled.input`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "10px"};
  margin: ${(props) => props.margin || "5px 0"};
  border: ${(props) => props.border || "1px solid #ccc"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  font-size: ${(props) => props.fontSize || "16px"};
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: ${(props) => props.focusBorderColor || "#007BFF"};
    box-shadow: ${(props) =>
      props.focusBoxShadow || "0 0 5px rgba(0, 123, 255, 0.5)"};
  }

  &::placeholder {
    color: ${(props) => props.placeholderColor || "#999"};
  }

  ${(props) => props.disabled && `
    background-color: #f5f5f5;
    cursor: not-allowed;
    color: #ccc;
  `}
`;

export const Input1 = (props) => {
  return <StyledInput {...props} />;
};