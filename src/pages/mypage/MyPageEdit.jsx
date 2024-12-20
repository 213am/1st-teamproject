import { UserProfile } from "./MyPage.styled";
import {
  Header,
  EditForm,
  InputField,
  SubmitButton,
  UserImage,
} from "./MyPageEdit.styled";

function MyPageEdit() {
  return (
    <div>
      {/* 헤더 영역 */}
      <Header>
        <h2>마이 페이지</h2>
      </Header>
      <UserProfile>
        <UserImage>
          {/* 프로필 이미지와 기본 텍스트 */}
          프로필 이미지 변경
        </UserImage>
        <p>유저 정보 및 사진</p>
      </UserProfile>
      {/* 정보 변경 폼 */}
      <EditForm>
        <InputField placeholder="이메일을 입력해주세요" />
        <InputField type="password" placeholder="비밀번호를 입력해주세요" />
        <InputField type="password" placeholder="비밀번호 확인" />
        <InputField placeholder="닉네임을 입력해주세요" />
        <SubmitButton>정보 변경 저장하기</SubmitButton>
      </EditForm>
    </div>
  );
}

export default MyPageEdit;
