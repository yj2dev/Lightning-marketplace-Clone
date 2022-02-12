import styled from "styled-components";

export const Container = styled.div`
  background-color: #f9f9f9;
  .error {
    color: #d80c18;
  }
`;

export const Footer = styled.div`
  color: #adadad;

  & a {
    color: #adadad;
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

export const PasswordBadge = styled.div`
  height: 38px;
  color: #adadad;
  font-size: 30px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin: 30px 0 20px 0;
  border-bottom: 1px solid #adadad;

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
