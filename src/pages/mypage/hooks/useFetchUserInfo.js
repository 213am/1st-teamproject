import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function useFetchUserInfo({
  targetUserNo,
  setUserInfo,
  signedUserNo,
  navigate,
  setValue,
  setIsLoading,
}) {
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!signedUserNo) {
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
          title: "로그인 정보가 없습니다. 다시 로그인해주세요.",
        });
        navigate?.("/signin");
        return;
      }

      try {
        const response = await axios.get("/api/user", {
          params: { targetUserNo, signedUserNo },
        });

        console.log("API 응답 데이터:", response.data);

        if (response.data.code === "OK") {
          const { email, userId, nickname, pic, statusMessage } = response.data;
          setUserInfo({ email, userId, nickname, statusMessage, pic });
          setValue?.("nickname", nickname);
          setValue?.("statusMessage", statusMessage || "기본 상태 메시지");
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
            title: "유저 정보를 찾을 수 없습니다.",
          });
          navigate?.("/signin");
        }
      } catch (error) {
        console.error("유저 정보 가져오기 오류:", error);
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
      } finally {
        setIsLoading?.(false);
      }
    };

    fetchUserInfo();
  }, [
    targetUserNo,
    signedUserNo,
    navigate,
    setValue,
    setUserInfo,
    setIsLoading,
  ]);
}

export default useFetchUserInfo;
