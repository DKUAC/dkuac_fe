import React, { useState } from "react";
import teddyBear from "../../images/teddy_bear.png";
import explain1 from "../../images/explain_1.png";
import explain2 from "../../images/explain_2.png";
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import faqImage from "../../images/faq.png";
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

const faqs = [
  { question: "현재 모집 중인가요?", answer: "네 2학기 부원은 9월 30일까지 모집 예정입니다!" },
  { question: "죽전 캠퍼스 학생만 가입 가능한가요?", answer: "천안 캠퍼스 학생도 가입 가능합니다!" },
  { question: "DKUAC 동아리는 어떤 활동을 하는 동아리인가요?", answer: "저희 DKUAC는 클라이밍과 등산 활동을 하는 운동 동아리입니다. 클라이밍은 외벽과 볼더링 활동을 진행하며 등산 활동은 학교를 기준으로 멀지 않은 산들을 골라 활동을 진행합니다. 활동은 클라이밍과 등산 활동을 매주 번갈아가며 진행하고 있으며, 볼더링 활동은 클라이밍 활동 주간 중 평일에 최대 2번 진행하고, 외벽 활동은 클라이밍 활동 주간 중 주말 중에 하루 진행합니다. 또한 등산 활동은 등산 활동 주간 중 주말에 하루 진행하고 있습니다:)" },
  { question: "클라이밍을 잘해야 하나요?", answer: "클라이밍을 한 번도 해보지 않으셨어도 들어오셔도 됩니다! 실제로 클라이밍 경험이 없으신 분들이 대부분이니 부담갖지 마시고 지원해 주세요! 오시면 잘 알려드립니다:)" },
  { question: "고학년도 가입 가능한가요?", answer: "고학년 분들도 가입 가능합니다!" },
  { question: "회비가 어떻게 되나요?", answer: "회비는 학기 당 10,000원입니다!" }
];

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.faqItem} onClick={toggleFAQ}>
      <img src={faqImage} alt="FAQ" style={styles.faqImage} />
      <div style={styles.faqQuestion}>
        {faq.question}
      </div>
      {isOpen && <div style={styles.faqAnswer}>{faq.answer}</div>}
    </div>
  );
}

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
      <div style={styles.faqSection}>
        <div style={styles.faqHeader}>
          <div style={styles.faqTitle}>FAQ</div>
          <Link to="/contact" style={styles.faq_moreButton}>
            + 문의하기
          </Link>
        </div>
        <div style={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;