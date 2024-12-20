import styled from "@emotion/styled";

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  font-size: 24px;
  font-weight: bold;
`;

export const UserProfile = styled.div`
  background-color: #f9f9f9;
`;

export const UserImage = styled.div`
  background-color: #f9f9f9;
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
  max-width: 400px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #f4f4f4;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1048c2;
  }
`;
