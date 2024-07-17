import React from "react";

function Contact() {
  const styles = {
    home: {
      textAlign: "center",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2vw",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#3a5ba0",
    },
  };
  return (
    <div style={styles.home}>
      <h1>Contact Page</h1>
      <p>Here we will provide contact information.</p>
    </div>
  );
}

export default Contact;
