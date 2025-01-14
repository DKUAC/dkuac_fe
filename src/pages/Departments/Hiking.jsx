import React, { useState } from "react";
import styles from "./styles";
import header from "../../images/박종화.png"; // 등산부장
import executive1 from "../../images/손샘.png"; // 등산집행부
import executive2 from "../../images/강인하.png"; // 등산집행부
import executive3 from "../../images/김서현.png"; // 등산집행부

const totalMembers = [
  { name: "박종화", role: "등산부장", image: header, department: "공과대학", major: "전자전기공학과", year: "21학번" },
  { name: "손샘", role: "등산 집행부", image: executive1, department: "공과대학", major: "토목환경공학과", year: "21학번" },
  { name: "강인하", role: "등산 집행부", image: executive2, department: "공과대학", major: "건축학과", year: "21학번" },
  { name: "김서현", role: "등산 집행부", image: executive3, department: "SW융합대학", major: "컴퓨터공학과", year: "22학번" },
];

function TotalDepartment() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div style={styles.membersContainer}>
      {totalMembers.map((member, index) => (
        <div key={index} style={styles.member} onClick={() => handleMemberClick(member)}>
          <img src={member.image} alt={member.name} style={styles.memberImage} />
          <div style={styles.memberOverlay}>
            <div style={styles.memberName}>{member.name}</div>
            <div style={styles.memberRole}>{member.role}</div>
          </div>
        </div>
      ))}

      {selectedMember && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedMember.image} alt={selectedMember.name} style={styles.modalImage} />
            <div style={styles.modalTextContainer}>
              <h2 style={styles.modalRole}>{selectedMember.role}</h2>
              <h2 style={styles.modalName}>{selectedMember.name}</h2>
              <p style={styles.modalDepartment}>
                {selectedMember.department} <br />{selectedMember.major}
              </p>
              <p style={styles.modalYear}>{selectedMember.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TotalDepartment;
