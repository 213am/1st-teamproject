import { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  UserId,
  Layout,
} from "./MyPage.styled";

function MyPage() {
  const location = useLocation();
  const [cookies] = useCookies(["signedUserNo"]);
  const { targetUserNo } = useParams();
  const [isUser, setIsUser] = useState(null);

  const [clickUserNo, setClickUserNo] = useState(() => {
    // location.state가 null이면 signedUserNo를 기본값으로 사용
    if (
      location.state?.targetUserNo === cookies.signedUserNo ||
      targetUserNo === cookies.signedUserNo
    ) {
      setIsUser(true); // targetUserNo와 signedUserNo가 동일하면 true
    } else {
      setIsUser(false); // 아니면 false
    }
    return location.state?.targetUserNo || targetUserNo || cookies.signedUserNo;
  });

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nickname: "",
    email: "",
    pic: location.state?.updatedPic || "",
    userId: "",
    userStatusMessage: "",
    myInfo: null,
  });
  const [imageSrc, setImageSrc] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const signedUserNo = cookies.signedUserNo;

  const fetchUserData = useCallback(async () => {
    const endpoint = "/api/user";

    if (!signedUserNo) {
      console.error("signedUserNo is missing");
      return;
    }

    // 로그 추가: fetchUserData 호출 전 상태 확인
    console.log("fetchUserData 호출 - clickUserNo:", clickUserNo);
    console.log("fetchUserData 호출 - signedUserNo:", signedUserNo);

    try {
      const response = await axios.get(endpoint, {
        params: {
          targetUserNo: location.state?.targetUserNo || signedUserNo,
          signedUserNo: signedUserNo,
        },
      });

      console.log("API response:", response.data);

      if (response.data.code === "OK") {
        setUserData({
          nickname: response.data.nickname
            ? response.data.nickname
                .replace(/#0000/g, "")
                .split("#")
                .slice(0, 2)
                .join("#")
            : "",
          email: response.data.email || "",
          pic: response.data.pic || "/default_profile.jpg",
          userId: response.data.userId || "",
          userStatusMessage: response.data.statusMessage || "",
          myInfo: response.data.myInfo,
        });
      } else {
        console.error("Failed to fetch user data:", response.data);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  }, [clickUserNo, signedUserNo]);

  useEffect(() => {
    if (location.state || clickUserNo) {
      fetchUserData();
    }
  }, [fetchUserData, location.state, clickUserNo]); // 의존성에 clickUserNo 추가

  useEffect(() => {
    console.log("userData.pic 변경 감지:", userData.pic);
    if (userData.pic) {
      const newImageSrc = `${import.meta.env.VITE_BASE_URL}/pic/user/${targetUserNo || signedUserNo}/${userData.pic}`;
      setImageSrc(newImageSrc);
    }
  }, [userData.pic, targetUserNo, signedUserNo]);

  const handleImageClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const userEditClick = (e) => {
    navigate(`/mypage/edit`, {
      state: { targetUserId: e.userId },
    });
  };
  return (
    <Layout>
      <Header>
        <h2>{userData.nickname} 의 페이지</h2>
      </Header>
      <Userinfo>
        <UserProfile>
          {userData.pic ? (
            <img
              src={imageSrc || "/default_profile.jpg"}
              alt="프로필"
              style={{
                borderRadius: "50px",
                width: "100px",
                height: "100px",
                cursor: "pointer",
              }}
              onClick={handleImageClick}
            />
          ) : (
            <img src="/default_profile.jpg" alt="" />
          )}
          <Userpage>
            <UserDetail>
              <Label>아이디</Label>
              <UserId>{userData.userId || "아이디 정보 없음"}</UserId>
            </UserDetail>
            <UserDetail>
              <Label>이메일</Label>
              <Useremail>{userData.email || "이메일 정보 없음"}</Useremail>
            </UserDetail>
            <UserDetail>
              <Label>닉네임</Label>
              <Usernickname>
                {userData.nickname || "닉네임 정보 없음"}
              </Usernickname>
            </UserDetail>
          </Userpage>
        </UserProfile>
      </Userinfo>
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
          onClick={handleClosePopup}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageSrc || "/default_profile.jpg"}
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
      {setIsUser && (
        <Footer>
          <button onClick={() => userEditClick(userData)}>정보 변경하기</button>
        </Footer>
      )}
    </Layout>
  );
}

export default MyPage;
