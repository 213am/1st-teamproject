import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileImage from "./components/ProfileImage";
import UserForm from "./components/UserForm";
import useFetchUserInfo from "./hooks/useFetchUserInfo";
import { Container, Header, ProfileWrapper } from "./MyPageEdit.styled";
import Swal from "sweetalert2";

function MyPageEdit() {
  const [pic, setPic] = useState(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 확인 상태
  const [userInfo, setUserInfo] = useState({
    email: "",
    userId: "",
    nickname: "",
    statusMessage: "",
    pic: "",
  });
  const [cookies, setCookie] = useCookies(["signedUserNo"]);
  const [userProfile, setUserProfile, removeUserProfile] = useCookies([
    "userProfile",
  ]);
  const navigate = useNavigate();
  const location = useLocation();
  const signedUserNo = cookies.signedUserNo;
  const targetUserNo =
    new URLSearchParams(location.search).get("targetUserNo") || signedUserNo;

  // Fetch user info
  useFetchUserInfo({
    targetUserNo,
    setUserInfo,
    signedUserNo,
    navigate,
    setValue: null, // React Hook Form 값 사용 시 적용
    setIsLoading: null, // 로딩 상태 사용 시 적용
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPic(file);
    }
    removeUserProfile();
    setUserProfile("userProfile", userInfo.pic);
  };

  const handleCheckNickname = async () => {
    let cleanNickname = userInfo.nickname.includes("#")
      ? userInfo.nickname.split("#")[0]
      : userInfo.nickname;

    if (!cleanNickname) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "닉네임을 입력해주세요.",
      });

      return;
    }

    try {
      const response = await axios.get("/api/user", {
        params: { targetUserNo, nickname: cleanNickname }, // BE 요청 유지
      });

      if (response.data.code === "DN") {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "warning",
          title: "닉네임이 중복되었습니다.",
        });

        setIsNicknameChecked(false);
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "닉네임이 사용 가능합니다.",
        });
        setUserInfo({ ...userInfo, nickname: cleanNickname }); // `#` 이후 제거된 닉네임을 상태에 저장
        setIsNicknameChecked(true);
      }
    } catch (error) {
      console.error("닉네임 확인 오류:", error);
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "서버 오류가 발생했습니다.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ 닉네임이 `#0000`을 포함하는 경우 제거 후 저장
      const cleanNickname = userInfo.nickname.includes("#")
        ? userInfo.nickname.split("#")[0]
        : userInfo.nickname;

      const params = {
        targetUserNo: parseInt(targetUserNo),
        nickname: cleanNickname || "", // `#0000` 제거 후 BE로 전송
        statusMessage: userInfo.statusMessage || "", // 상태 메시지 값이 없으면 빈 문자열 전달
      };

      const formData = new FormData();

      // ✅ JSON 데이터를 Blob으로 변환하여 `req` 키에 추가

      formData.append("req", new Blob([JSON.stringify(params)]));

      // #@Start ✅ 새로운 파일이 있을 경우에만 `pic` 추가 (기존 이미지는 BE에서 유지)
      // if (pic instanceof File) {
      formData.append("pic", pic); // ✅ 새로운 이미지 추가
      // formData.append("pic", new Blob([JSON.stringify(pic)])); // ✅ 새로운 이미지 추가
      // }

      console.log("📌 최종 전송 데이터:", [...formData.entries()]); // 데이터 확인 로그

      // // ✅ 기존 `pic` 유지 (새로운 이미지가 없을 경우 기존 프로필 유지)
      // if (pic) {
      //   formData.append("pic", pic);
      // } else if (userInfo.pic && typeof userInfo.pic === "string") {
      //   // 기존 `pic`이 문자열 경로일 경우 유지
      //   formData.append("pic", userInfo.pic); // 백엔드에서 기존 이미지 유지하는 키 필요
      // }

      // @end ✅ 새로운 파일이 있을 경우에만 `pic` 추가 (기존 이미지는 BE에서 유지)

      // 🚨 Content-Type을 설정하지 않음 (자동 설정)
      const response = await axios.put("/api/user", formData, {
        headers: { Accept: "*/*" }, // `multipart/form-data`는 자동으로 설정됨
      });

      if (response.data.code === "OK") {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "정보 변경이 완료되었습니다.",
        });

        navigate("/mypage", {
          state: { updatedPic: pic }, // 🔥 변경된 pic 정보를 넘김
        });
      } else if (response.data.code === "DN") {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "warning",
          title: "닉네임이 중복되었습니다.",
        });

        setIsNicknameChecked(false);
      } else {
        console.error("🚨 서버 응답 데이터:", response.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "정보 저장 중 오류가 발생했습니다.",
        });
      }
    } catch (error) {
      console.error("🚨 정보 저장 오류:", error);
      if (error.response) {
        console.error("🚨 서버 응답 데이터:", error.response.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: `서버 오류 발생: ${error.response.data.message || "알 수 없는 오류"}`,
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "error",
          title: "서버 오류가 발생했습니다.",
        });
      }
    }
  };

  return (
    <Container>
      <Header>
        <h2>정보 변경 페이지</h2>
      </Header>
      <ProfileWrapper>
        <ProfileImage
          pic={pic || userInfo.pic}
          targetUserNo={targetUserNo}
          handleImageChange={handleImageChange}
        />
      </ProfileWrapper>
      <UserForm
        email={userInfo.email}
        userId={userInfo.userId}
        nickname={userInfo.nickname.split("#")[0]} // UI에서 `#` 이후 제거
        onNicknameChange={(e) =>
          setUserInfo({
            ...userInfo,
            nickname: e.target.value.replace(/#/g, ""),
          })
        }
        isNicknameChecked={isNicknameChecked}
        handleCheckNickname={handleCheckNickname}
        statusMessage={userInfo.statusMessage}
        onStatusMessageChange={(e) =>
          setUserInfo({ ...userInfo, statusMessage: e.target.value })
        }
        isEditable
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default MyPageEdit;
