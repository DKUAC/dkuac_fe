import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import userInfoStore from "../../stores/userInfoStore";
import { authAxios, basicAxios, formDataAxios } from "../../api/axios";
import logoutUtil from "../../utils/logout-util";

function Activities() {
  const { isLoggedIn, isStaff, name } = userInfoStore();
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    comments: [],
  });
  const [newActivity, setNewActivity] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const activityRef = useRef(null);

  // URL에서 학기 정보 가져오기
  const searchParams = new URLSearchParams(location.search);
  const semester = searchParams.get('semester');

  // 활동 데이터 가져오기
const fetchActivities = async () => {
  const [year, semesterTerm] = semester.split("-");
  try {
    const response = await basicAxios.get(`/activity?year=${year}&semester=${semesterTerm}`);
    if (response.data.length > 0) {
      const activitiesWithFormattedImages = response.data.map((activity) => {
        let imageUrl = activity.images[0];
        // 이미지 URL에서 '/public/activity/' 부분 제거
        if (imageUrl.includes("/public/activity/")) {
          imageUrl = imageUrl.replace("/public/activity/", "/activity/");
        }
        if (!imageUrl.includes("https")) {
          imageUrl = `${process.env.REACT_APP_BACKEND_API_URL}${imageUrl}`;
        }
        return { ...activity, images: imageUrl };
      });
      setActivities(activitiesWithFormattedImages);
    } else {
      setActivities([]);
    }
  } catch (error) {
    console.error("활동 데이터를 가져오는 데 실패했습니다:", error);
    setActivities([]);
  }
};


  // 댓글 데이터 가져오기
  const fetchComments = async (activityId) => {
    try {
      const response = await basicAxios.get(`/activity/${activityId}/comments`);
      if (Array.isArray(response.data)) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: response.data,
        }));
      } else {
        console.error("댓글 데이터가 유효하지 않습니다:", response.data);
      }
    } catch (error) {
      console.error("댓글을 가져오는 데 실패했습니다:", error);
      setSelectedActivity((prev) => ({
        ...prev,
        comments: [],
      }));
    }
  };

  // 학기 정보가 변경될 때마다 활동 데이터를 불러옴
  useEffect(() => {
    if (semester) {
      fetchActivities();
    }
  }, [semester]);

  // 입력 필드 값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e) => {
    setNewActivity((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // 활동 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newActivity.title);
    formData.append("content", newActivity.content);
    formData.append("images", newActivity.image);

    const currentDate = new Date().toISOString().split("T")[0];
    formData.append("date", currentDate);

    try {
      const response = await formDataAxios.post("/activity", formData);

      if (response.status === 201) {
        alert("활동이 성공적으로 추가되었습니다.");
        setShowForm(false);
        setNewActivity({ title: "", content: "", image: null });
        fetchActivities();
      } else {
        alert("활동 추가에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      console.error("활동 제출 중 오류가 발생했습니다:", error);
      alert("활동 추가 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 활동 클릭 처리
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    fetchComments(activity.id); // 댓글을 불러오는 요청 추가
    setShowActivityPopup(true);
  };

  // 댓글 제출 처리
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    setSelectedActivity((prev) => ({
      ...prev,
      comments: [...prev.comments, { content: newComment, Author: { name } }],
    }));
    try {
      const response = await authAxios.post(
        `/activity/${selectedActivity.id}/comments`,
        {
          content: newComment,
        }
      );

      if (response.status === 201) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: [...prev.comments, response.data],
        }));
        setNewComment("");
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.log("댓글 제출 중 오류가 발생했습니다:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>
              {semester} 활동
              {isLoggedIn && isStaff && (
                <button
                  style={styles.addActivityButton}
                  onClick={() => setShowForm(true)}
                >
                  + 글 작성
                </button>
              )}
            </div>
            <div style={styles.activityContainer}>
              {activities.map((activity, index) => (
                <div
                  key={activity.id || index}
                  style={styles.activityBox}
                  onClick={() => handleActivityClick(activity)}
                >
                  <img
                    src={activity.images}
                    alt={activity.title}
                    style={styles.activityImage}
                  />
                  <div style={styles.activityName}>{activity.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showForm && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <h2>활동 추가하기</h2>
              <input
                type="text"
                name="title"
                placeholder="활동 제목"
                value={newActivity.title}
                onChange={handleInputChange}
                style={styles.input}
              />
              <textarea
                name="content"
                placeholder="활동 내용"
                value={newActivity.content}
                onChange={handleInputChange}
                style={styles.textarea}
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                style={styles.input}
              />
              <div style={styles.popupButtonsContainer}>
                <button style={styles.submitButton} onClick={handleSubmit}>
                  작성하기
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        )}

        {showActivityPopup && selectedActivity && (
          <div style={styles.popupOverlay}>
            <div style={styles.activityPopup}>
              <div style={styles.activityPopupImage}>
                <img
                  src={selectedActivity.images}
                  alt={selectedActivity.title}
                  style={styles.activityPopupImageStyle}
                />
              </div>
              <div style={styles.activityPopupContent}>
                <h2 style={styles.activityTitle}>{selectedActivity.title}</h2>
                <p style={styles.activityContent}>{selectedActivity.content}</p>
                <div
                  className="commentContainer"
                  style={styles.commentsContainer}
                >
                  {selectedActivity.comments?.map(
                    (comment, index) =>
                      comment.content && (
                        <div
                          className="comment"
                          key={index}
                          style={styles.comment}
                        >
                          <div style={styles.commentAuthor}>
                            {comment.Author?.name}
                          </div>
                          <div>{comment.content}</div>
                        </div>
                      )
                  )}
                </div>
                {isLoggedIn && (
                  <div style={styles.commentInputContainer}>
                    <input
                      type="text"
                      placeholder="댓글을 입력하세요"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={styles.commentInput}
                    />
                    <button
                      style={styles.commentButton}
                      onClick={handleCommentSubmit}
                    >
                      작성
                    </button>
                  </div>
                )}
              </div>
              <button
                style={styles.closeButton}
                onClick={() => setShowActivityPopup(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
