import {
  Footer,
  Header,
  Label,
  UserDetail,
  Useremail,
  Userinfo,
  Usernickname,
  Userpage,
  UserProfile,
} from "./MyPage.styled";
import { useState } from "react";

function MyPage() {
  // 유저 데이터를 하드코딩 예시 (이 데이터를 API에서 가져오도록 수정 가능)
  const userData = {
    nickname: "react그린이", // 닉네임
    email: "reactgreen@example.com", // 이메일
    profileImage: "https://via.placeholder.com/150", // 프로필 이미지 URL
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false); // 이미지 팝업 상태

  const handleImageClick = () => {
    setIsPopupOpen(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div>
      {/* 헤더 영역 */}
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      {/* 유저 정보 섹션 */}
      <Userinfo>
        <UserProfile>
          {/* 프로필 이미지와 기본 텍스트 */}
          <img
            src={userData.profileImage}
            alt="유저 프로필"
            style={{
              borderRadius: "50%", // 원형으로 보이게 설정
              width: "100px", // 너비
              height: "100px", // 높이
              cursor: "pointer", // 클릭 가능한 커서
            }}
            onClick={handleImageClick} // 클릭 이벤트 추가
          />
          <p>유저 정보 및 사진</p>
        </UserProfile>

        {/* 유저 닉네임 및 이메일 정보 */}
        <Userpage>
          <UserDetail>
            <Label>닉네임</Label>
            <Usernickname>{userData.nickname}</Usernickname>
          </UserDetail>
          <UserDetail>
            <Label>이메일</Label>
            <Useremail>{userData.email}</Useremail>
          </UserDetail>
        </Userpage>
      </Userinfo>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleClosePopup} // 팝업 외부 클릭 시 닫기
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록
          >
            <img
              src={userData.profileImage}
              alt="유저 프로필 확대"
              style={{ width: "300px", height: "300px", borderRadius: "50%" }}
            />
            <button
              onClick={handleClosePopup}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* 푸터 영역 */}
      <Footer>
        <button
          onClick={() => {
            window.location.href = "/mypage/myedit"; // 정보 변경 페이지로 이동
          }}
        >
          정보 변경하기
        </button>
      </Footer>
    </div>
  );
}

export default MyPage;
