import styled from "@emotion/styled";

// 헤더 영역 스타일
export const Header = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  padding: 20px;
  font-size: 15px;
  font-weight: bold;
  max-width: 800px;
  background-color: white;
  margin: 0 auto;
  margin-bottom: 100px;
`;

// 유저 정보 섹션 컨테이너
export const Userinfo = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  align-items: start; /* 중앙 정렬 */
  padding-right: 250px;
  gap: 20px; /* 프로필과 정보 간 간격 */
  max-width: 800px; /* 전체 영역의 너비 */
  background-color: white;
  margin: 0 auto;
`;

// 유저 프로필 이미지 섹션
export const UserProfile = styled.div`
  display: flex;
  align-items: center; /* 중앙 정렬 */
  gap: 10px;
`;

// 닉네임 및 이메일 섹션
export const Userpage = styled.div`
  display: flex;
  flex-direction: column; /* 수직 정렬 */
  gap: 15px; /* 항목 간 간격 */
`;

// 닉네임/이메일 정보 하나의 행을 수평 배치
export const UserDetail = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px;
`;

// 라벨 스타일
export const Label = styled.div`
  font-weight: bold; /* 굵은 텍스트 */
  min-width: 80px; /* 일정한 너비 */
`;

// 닉네임 텍스트 스타일
export const Usernickname = styled.div`
  font-size: 16px;
  color: #333;
`;

// 이메일 텍스트 스타일
export const Useremail = styled.div`
  font-size: 16px;
  color: #555;
`;

// 푸터 영역 스타일
export const Footer = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  max-width: 800px; /* 전체 영역의 너비 */
  background-color: white;
  margin: 0 auto;
  margin-top: 50px;

  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #f4f4f4; /* 버튼 기본 색상 */
    color: black;
    border: none;
    border-radius: 8px; /* 둥근 모서리 */
    cursor: pointer;

    &:hover {
      background-color: #0056b3; /* 호버 시 색상 변경 */
    }
  }
`;
