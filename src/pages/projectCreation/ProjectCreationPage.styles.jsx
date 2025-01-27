import styled from "@emotion/styled";
import { LuCircleUser } from "react-icons/lu";

const alignment = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

const information = `
  padding: 4.5px;  // Reduced by 10%
  font-size: 18px;  // Reduced by 10%
  width: 22.5vw;  // Reduced by 10%
  border-radius: 5px;
  border: 2px solid #7a7a7a;
  background-color: #f4f4f4;
  &:focus {
    outline: none;
    border: 2px solid #7a7a7a;
  }
`;

export const ProjectCreationForm = styled.form`
  ${alignment};
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;

  h1 {
    justify-content: flex-start;
    font-size: 19.8px;
    margin-right: 50.5vw;
    margin-bottom: 5.4vh;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달을 다른 요소들 위에 올리기 위해 z-index 설정 */
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;

  h2 {
    font-size: 24px;
    margin-bottom: 15px;
  }

  label {
    font-size: 18px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }

  button {
    background-color: #dfdfdf;
    color: #000;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;

    font-size: 15px;
  }

  button:hover {
    background-color: #ff4500;
  }
`;

export const ProjectCreationLayout = styled.div`
  background-color: #fcfbfb;
`;

export const ProjectCreationWrap = styled.div`
  display: flex;

  label {
    font-size: 19.8px; // Reduced by 10%
    font-weight: 550;
    margin-right: 2.7vw; // Reduced by 10%
  }
`;

export const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 600px;
  margin-right: 50px;

  label {
    margin-bottom: 3.6vh; // Reduced by 10%
  }
`;

export const Calendar = styled.div`
  width: 22.5vw; // Reduced by 10%
  height: 45vh; // Reduced by 10%
  background-color: #f4f4f4;
`;

export const ProjectInformation = styled.div``;

export const InformationWrap = styled.div`
  display: flex;
  align-items: ${(props) => (props.projectDetails ? "none" : "center")};
  margin-top: 3.6px; // Reduced by 10%
  margin-bottom: 4.5vh; // Reduced by 10%
  max-width: 650px; // Reduced by 10%
  padding: 10px;
`;

export const InformationLabel = styled.label`
  margin-top: 4.5px; // Reduced by 10%
  text-wrap: nowrap;
`;

export const InformationInput = styled.input`
  ${information}
`;

export const InformationText = styled.textarea`
  ${information}
  height: 315px; // Reduced by 10%
  resize: none;
`;

export const AddTeamMemberBt = styled.button`
  ${alignment};
  border: none;
  background-color: transparent;
  div {
    font-size: 18px; // Reduced by 10%
    font-weight: 500;
  }
`;

export const StyledLuCircleUser = styled(LuCircleUser)`
  font-size: 45px; // Reduced by 10%
`;

export const ProjectCreationFormBT = styled.button`
  padding: 8px 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(255, 255, 255, 1);
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    color: rgba(255, 255, 255, 1);
  }
`;
