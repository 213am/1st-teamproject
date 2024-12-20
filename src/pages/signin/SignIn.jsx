import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { GoX } from "react-icons/go"; // 닫기 버튼 아이콘 추가
import {
  ButtonGroup,
  CloseButton,
  Form,
  PopupContainer,
  PopupForm,
  PopupOverlay,
  PrevButton,
  ResetButton,
  SigninBox,
  SigninBoxGroupbt,
  SigninBoxInputBox,
  SigninBoxSigninbt,
  SigninContainer,
  SigninLabel,
  SigninMailBox,
  SigninPwBox,
  SigninTitle,
} from "./SignIn.styled";

function SignIn() {
  const [isLoginFailed, setIsLoginFailed] = useState(false); // 로그인 실패 상태
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [isEmailMode, setIsEmailMode] = useState(false); // 이메일 찾기 모드
  const [labelText, setLabelText] = useState("이메일"); // 이메일 라벨 텍스트

  // 로그인 및 아이디 찾기 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const formData = new FormData(e.target); // form 데이터 가져오기
    const email = formData.get("email");
    const password = formData.get("password");

    if (isEmailMode) {
      alert(`입력한 닉네임: ${email}, 비밀번호: ${password}`); // 아이디 찾기 시 알림
    } else {
      if (email === "test@example.com" && password === "password") {
        alert("로그인 성공!"); // 로그인 성공 알림
        setIsLoginFailed(false); // 상태 초기화
      } else {
        alert("이메일 & 비밀번호를 확인해주세요."); // 로그인 실패 알림
        setIsLoginFailed(true); // 로그인 실패 상태
      }
    }
  };

  // 이메일 찾기 버튼 클릭 핸들러
  const handleFindEmail = () => {
    setIsEmailMode(true); // 이메일 찾기 모드 활성화
    setLabelText("닉네임"); // 이메일 라벨을 닉네임으로 변경
  };

  // 로그인 하기 버튼 클릭 핸들러 (이메일 찾기 모드에서)
  const handleLoginMode = () => {
    setIsEmailMode(false); // 이메일 찾기 모드 비활성화
    setLabelText("이메일"); // 라벨 텍스트를 이메일로 변경
  };

  // 비밀번호 찾기 버튼 클릭 핸들러
  const handleFindPassword = () => {
    setShowPopup(true); // 팝업 표시
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false); // 팝업 숨김
  };

  return (
    <SigninContainer>
      <SigninBox>
        {/* 헤더 영역: 이전 버튼과 제목 */}
        <div style={{ position: "relative" }}>
          <PrevButton>
            <SlArrowLeft />
          </PrevButton>
          {/* 화면 중앙 정렬된 제목 */}
          <SigninTitle>로 그 인</SigninTitle>
        </div>

        {/* 로그인 및 아이디 찾기 폼 */}
        <Form onSubmit={handleSubmit}>
          {/* 이메일 입력 필드 */}
          <SigninMailBox>
            <SigninLabel>{labelText}</SigninLabel>{" "}
            {/* 라벨 텍스트 상태 기반 변경 */}
            <SigninBoxInputBox
              type="text"
              placeholder={`${labelText}을 입력해주세요.`}
              name="email"
            />
          </SigninMailBox>

          {/* 비밀번호 필드 항상 표시 */}
          <SigninPwBox>
            <SigninLabel>비밀번호</SigninLabel>
            <SigninBoxInputBox
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
            />
          </SigninPwBox>

          {/* 로그인 버튼 */}
          <SigninBoxSigninbt type="submit">
            {isEmailMode ? "아이디 찾기" : "로그인 하기"}{" "}
            {/* 상태 기반 텍스트 변경 */}
          </SigninBoxSigninbt>
        </Form>
      </SigninBox>

      {/* 버튼 그룹 */}
      <ButtonGroup>
        <SigninBoxGroupbt
          onClick={isEmailMode ? handleLoginMode : handleFindEmail}
        >
          {isEmailMode ? "로그인 하기" : "이메일 찾기"}{" "}
          {/* 상태에 따라 텍스트 변경 */}
        </SigninBoxGroupbt>
        <SigninBoxGroupbt onClick={handleFindPassword}>
          비밀번호 찾기
        </SigninBoxGroupbt>
        <SigninBoxGroupbt>회원가입</SigninBoxGroupbt>
      </ButtonGroup>

      {/* 비밀번호 찾기 팝업 부분 수정 */}
      {showPopup && (
        <PopupOverlay onClick={handleClosePopup}>
          <PopupContainer onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleClosePopup}>
              <GoX />
            </CloseButton>
            <h2>비밀번호를 잊으셨나요?</h2>
            <PopupForm
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const email = formData.get("email");
                alert(`입력한 이메일: ${email}`); // 이메일 확인 알림
                handleClosePopup(); // 팝업 닫기
              }}
            >
              <SigninBoxInputBox
                type="text"
                name="email"
                placeholder="이메일 주소를 입력해주세요."
              />
              <ResetButton type="submit">비밀번호 재설정</ResetButton>
            </PopupForm>
          </PopupContainer>
        </PopupOverlay>
      )}
    </SigninContainer>
  );
}

export default SignIn;
