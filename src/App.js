import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Equipment from "./pages/Equipment";
import People from "./pages/People";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import userInfoStore from "./stores/userInfoStore";
import { authAxios, basicAxios } from "./api/axios";
import "./App.css";
import Schedules from "./pages/Schedules";

function App() {
  const { isLoggedIn, expiredTime, isStaff } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;

  useEffect(() => {
    let now = new Date().toUTCString();
    if (expiredTime && expiredTime < now) {
      basicAxios
        .get("/auth/token/access")
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
        })
        .catch(async (error) => {
          // if (error.response && error.response.status === 401) {
          //   localStorage.removeItem("accessToken");
          //   clearUserInfoStorage();
          // }
          console.error(error);
          await basicAxios.post("/auth/logout");
          localStorage.removeItem("accessToken");
          clearUserInfoStorage();
          alert("다시 로그인해주세요.");
          window.location.href = "/login";
        });
    }
  }, [expiredTime]); // 종속성 배열에 expiredTime 추가

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/people" element={<People />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
