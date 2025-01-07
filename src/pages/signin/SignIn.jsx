import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie"; // react-cookie 추가
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import * as yup from "yup";
import {
  ButtonGroup,
  SigninBox,
  SigninBoxGroupbt,
  SigninContainer,
  SigninTitle,
} from "./SignIn.styled";
import SigninForm from "./SignInForm";
import SigninID from "./SignInID";
import SigninPw from "./SignInPw";
import Swal from "sweetalert2";

function SignIn() {
  // 상태 관리
  const [cookies, setCookie] = useCookies(); // 쿠키 관리 상태 추가
  const navigate = useNavigate(); // 페이지 이동 관리
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showPwPopup, setShowPwPopup] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(""); // 인증 코드 상태 추가
  const [isVerified, setIsVerified] = useState(false);
  const [associatedID, setAssociatedID] = useState("");
  // 모든 상태와 핸들러를 여기에 유지합니다.
  // 로그인 Formik 설정
  const loginFormik = useFormik({
    initialValues: { userId: "", password: "" },
    validationSchema: yup.object({
      userId: yup
        .string()
        .required("아이디를 입력해주세요.")
        .test("is-valid-id", "아이디 형식이 올바르지 않습니다.", (value) =>
          /^[a-zA-Z0-9_-]+$/.test(value),
        ), // userId 검증 추가
      password: yup.string().required("비밀번호를 입력해주세요."),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user/sign-in", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values), // userId와 password 전송
        });
        const data = await response.json();
        if (data.code === "OK") {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "로그인 성공.",
          });
          setLoginError("");

          // signedUserNo를 쿠키에 저장
          setCookie("signedUserNo", data.signedUserNo);

          navigate("/schedule"); // 마이페이지로 이동
        } else if (data.code === "IE") {
          setLoginError("아이디를 확인해주세요.");
        } else if (data.code === "IP") {
          setLoginError("비밀번호를 확인해주세요.");
        } else {
          setLoginError("로그인 실패. 아이디 또는 비밀번호를 확인해주세요.");
        }
      } catch (error) {
        console.error("로그인 오류:", error);
        setLoginError("서버 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  // 이메일 Formik 설정
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("올바른 이메일 형식이 아닙니다.")
        .required("이메일을 입력해주세요."),
    }),
    onSubmit: async () => {
      try {
        console.log("전송된 이메일:", emailFormik.values.email); // 디버깅용 로그 추가
        const response = await fetch(
          `/api/mail?email=${emailFormik.values.email}`,
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API 응답 데이터:", result); // API 응답 로그 추가

        if (result.code === "OK") {
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
            title: "인증 번호 전송 완료.",
          });
          setAssociatedID(result.userId); // ID 저장
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
            title: "인증 번호 전송 실패. 이메일을 확인해주세요.",
          });
        }
      } catch (error) {
        console.error("아이디 찾기 오류:", error);
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
          title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    },
  });

  // 비밀번호 찾기 Formik 설정
  const pwFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required("비밀번호를 입력해주세요.")
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력해주세요."),
    }),
    onSubmit: (values) => {
      console.log("제출된 비밀번호:", values);
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
        title: "비밀번호가 성공적으로 재설정되었습니다.",
      });
      setShowPwPopup(false); // 팝업 닫기
    },
  });

  // 인증번호 확인 및 전송 통합 함수 (재사용 가능)
  const handleVerifyCode = async (method = "GET") => {
    try {
      // URL 설정
      const url =
        method === "GET"
          ? `/api/mail?email=${emailFormik.values.email}`
          : "/api/mail";

      console.log("요청 URL:", url);
      console.log("요청 메서드:", method);

      // 요청 실행
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" }, // 헤더 설정
        body:
          method === "POST"
            ? JSON.stringify({
                email: emailFormik.values.email, // 이메일
                code: verificationCode, // 인증 코드
              })
            : null, // GET 요청의 경우 body 없음
      });

      console.log("응답 상태 코드:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("응답 데이터:", result);

      // 응답 처리
      if (result.code === "OK") {
        alert(method === "POST" ? "인증 성공!" : "인증번호 전송 성공!");
        if (method === "GET") setVerificationSent(true); // 인증번호 전송 상태
        if (method === "POST") setIsVerified(true); // 인증 성공 상태
        if (result.userId) setAssociatedID(result.userId); // 사용자 ID 저장
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
          title: "인증 실패. 다시 시도해주세요.",
        });
      }
    } catch (error) {
      console.error("인증 요청 중 오류 발생:", error);
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
        title: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  return (
    <SigninContainer>
      <SigninBox>
        {/* 헤더 */}
        <div style={{ position: "relative" }}>
          <SigninTitle>로 그 인</SigninTitle>
        </div>

        {/* 로그인 Form */}
        <SigninForm
          loginFormik={loginFormik} // loginFormik 전달
          isLoading={isLoading}
          loginError={loginError}
        />
        {/* 버튼 그룹 */}
        <ButtonGroup>
          <SigninBoxGroupbt onClick={() => setShowEmailPopup(true)}>
            아이디 찾기
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => setShowPwPopup(true)}>
            비밀번호 찾기
          </SigninBoxGroupbt>
          <SigninBoxGroupbt onClick={() => (window.location.href = "/signup")}>
            회원가입
          </SigninBoxGroupbt>
        </ButtonGroup>
      </SigninBox>

      {/* 아이디 찾기 팝업 */}
      {/* 필요한 Props 전달 */}
      {showEmailPopup && (
        <SigninID
          setShowEmailPopup={setShowEmailPopup}
          handleVerifyCode={handleVerifyCode}
          verificationSent={verificationSent}
          setVerificationCode={setVerificationCode}
          verificationCode={verificationCode}
          isVerified={isVerified}
          associatedID={associatedID}
          emailFormik={emailFormik} // emailFormik 전달
        />
      )}

      {/* 비밀번호 찾기 팝업 */}
      {showPwPopup && (
        <SigninPw
          pwFormik={pwFormik} // 전달
          emailFormik={emailFormik}
          setShowPwPopup={setShowPwPopup}
          verificationSent={verificationSent}
          handleVerifyCode={handleVerifyCode}
          isVerified={isVerified}
          setVerificationCode={setVerificationCode}
          verificationCode={verificationCode} // 추가
        />
      )}
    </SigninContainer>
  );
}

export default SignIn;
