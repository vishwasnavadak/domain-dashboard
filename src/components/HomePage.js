// The Landing Page
import React from "react";

const HomePage = props => {
  const { login } = props.auth;

  return (
    <div className="home-page">
      <section className="main">
        <h1>Welcome, this is homepage</h1>
        <p>
          Lorem Ipsum <br />
          <button className="btn" onClick={() => login()}>
            Signup Now
          </button>
        </p>
      </section>
      <Footer />
    </div>
  );
};
const Footer = () => {
  return <footer>&copy; Webception IT Solutions Pvt. Ltd. MIT License</footer>;
};
export default HomePage;
