import React from "react";
import teddyBear from "../../images/teddy_bear.png";
import explain1 from "../../images/explain_1.png";
import explain2 from "../../images/explain_2.png";
import quotation from "../../images/quotation.png"; // 큰따옴표 이미지 추가
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import { Link } from "react-router-dom";
import ReviewBox from "../../components/ReviewBox";

const reviews = [
  {
    text: "See you at the top",
    author: "박영진",
    department: "산업보안학과 19",
  },
  {
    text: "See you at the top",
    author: "박영진",
    department: "산업보안학과 19",
  },
  {
    text: "See you at the top",
    author: "박영진",
    department: "산업보안학과 19",
  },
  {
    text: "See you at the top",
    author: "박영진",
    department: "산업보안학과 19",
  },
];

const activities = [
  {
    image: activity1,
    name: "외벽",
  },
  {
    image: activity2,
    name: "등산",
  },
  {
    image: activity3,
    name: "MT",
  },
];

function Home() {
  const handleButtonClick = () => {
    window.location.href = "https://naver.me/5ch4sm44";
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={styles.home}>
        <div style={styles.content}>
          <img src={teddyBear} alt="Teddy Bear" style={styles.teddyBear} />
          <div style={styles.textContainer}>
            <h1 style={styles.h1}>단국대학교</h1>
            <h1 style={styles.h1}>클라이밍 & 등산 동아리</h1>
            <h2 style={styles.h2}>
              DKUAC <span style={styles.since}>since 1975</span>
            </h2>
            <button style={styles.button} onClick={handleButtonClick}>
              지원하기
            </button>
          </div>
        </div>
      </div>
      <div style={styles.explainSection}>
        <div style={styles.sectionTitle}>저희 동아리는요</div>
        <div style={styles.explainContainer}>
          <img src={explain1} alt="Explain 1" style={styles.explainImage} />
          <img src={explain2} alt="Explain 2" style={styles.explainImage} />
        </div>
      </div>
      <div className="reviewsSection" style={styles.reviewsSection}>
        <div className="reviewsTitle" style={styles.reviewsTitle}>
          후기
        </div>
        <div className="reviewContainer" style={styles.reviewContainer}>
          {reviews.map((r, index) => (
            <ReviewBox key={index} r={r} index={index} />
          ))}
        </div>
      </div>
      <div style={styles.activitiesSection}>
        <div style={styles.activitiesHeader}>
          <div style={styles.activitiesTitle}>활동</div>
          <Link to="/activities" style={styles.moreButton}>
            + 더보기
          </Link>
        </div>
        <div style={styles.activityContainer}>
          {activities.map((activity, index) => (
            <div key={index} style={styles.activityBox}>
              <img
                src={activity.image}
                alt={activity.name}
                style={styles.activityImage}
              />
              <div style={styles.activityName}>{activity.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
