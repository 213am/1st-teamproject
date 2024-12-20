import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import StartingPage from "./pages/startingPage/StartingPage";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import MyPage from "./pages/mypage/MyPage";
import ProjectCreationPage from "./pages/projectCreation/ProjectCreationPage";
import MyPageEdit from "./pages/mypage/MyPageEdit";

function App() {
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" />
          <Route path="/startingpage" element={<StartingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/myedit" element={<MyPageEdit />} />
          <Route
            path="/projectCreationPage"
            element={<ProjectCreationPage />}
          />
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}

export default App;
