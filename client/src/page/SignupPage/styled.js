import styled from "styled-components";

export const Container = styled.div`
  background-color: #f9f9f9;
  .error {
    color: #d80c18;
  }
`;

export const PasswordCreateRules = styled.div`
  color: #adadad;
  font-weight: 400;
  font-size: 14px;

  & span {
    color: red;
  }
`;

export const AgreeMyPhoneSection = styled.div`
  color: #adadad;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;

  & label:hover {
    cursor: pointer;
    color: #6c6c6c;
  }

  & label {
    margin-left: 4px;
  }

  & input[type="checkbox"] {
    //display: block;
    -webkit-appearance: none;
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 100%;
    border: 3px solid #c3c2cc;
    margin: 0px;
    padding: 0px;
    background-color: white;
    position: relative;
  }

  & input[type="checkbox"]::after {
    content: "";
    width: 6px;
    height: 3px;
    top: 2px;
    left: 2px;
    border-bottom: 3px solid #c3c2cc;
    border-left: 3px solid #c3c2cc;
    position: absolute;
    transform: rotate(-45deg);
  }

  & input[type="checkbox"]:hover::before {
    cursor: pointer;
    content: "";
    width: 30px;
    height: 30px;
    background-color: black;
    position: absolute;
    border-radius: 100%;
    opacity: 0.1;
    top: -8px;
    left: -8px;
  }

  & input[type="checkbox"]:checked {
    border: 3px solid #ff5058;
    background-color: #ff5058;
  }

  & input[type="checkbox"]:checked::after {
    border-bottom: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
  }
`;

export const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
  width: 400px;
  //height: 400px;
  box-shadow: 0px 4px 7px #bbbbbb;
  border-radius: 5px;

  h1 {
    color: #3f3f3f;
    font-size: 28px;
  }
  h3 {
    color: #adadad;
    font-size: 18px;
  }
  button {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #d80c18;
    border: none;
    outline: none;
    width: 100%;
    height: 70px;
    border-radius: 5px;
    cursor: not-allowed;
    opacity: 0.4;
    transition: 0.2s;
  }

  #active {
    opacity: 1;
    cursor: pointer;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  margin: 30px 0 20px 0;
  border-bottom: 1px solid #adadad;

  & input[type="password"] {
    font-size: 18px;
    font-family: "Do Hyeon", sans-serif;
    letter-spacing: 1px;
  }
  & input {
    font-weight: bold;
    width: 100%;
    font-size: 18px;
    height: 40px;
    border: none;
    outline: none;
    background: none;
  }
  & label {
    position: absolute;
    top: 20%;
    color: #adadad;
    left: 0;
    transition: 0.2s;
    font-weight: bold;
  }
  & span::before {
    content: "";
    position: absolute;
    top: 42px;
    left: 0;
    width: 0%;
    height: 1px;
    background: #191919;
    transition: 0.2s;
  }
  & input:focus ~ label,
  input:valid ~ label {
    top: -10px;
    font-size: 13px;
  }
  & input:focus ~ span::before,
  input:valid ~ span::before {
    width: 100%;
    color: #191919;
  }
`;
