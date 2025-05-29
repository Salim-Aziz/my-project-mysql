import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="body">
        <footer>
          <div className="footer-col">
            <h4>About the shop</h4>
            <p>
              We offer a diverse selection of stationery, office, and school
              supplies, as well as gift and packaging products. Our inventory is
              carefully curated to provide the best quality and value for all
              your business and personal needs.
            </p>
          </div>
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul>
              <li></li> <h3>Email:</h3>
              <li>
                <a href="#">studentsphere@gmail.com:</a>
              </li>
              <h3>Phone</h3>
              <li>
                <a href="#">tel:+3187725391</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li>
                <a href="#"></a>
              </li>
              <li>
                <a href="#"></a>
              </li>
              <li>
                <a href="#"></a>
              </li>
            </ul>
          </div>
          {/* <div>© 2024 STUDENTSPHERE . All rights reserved.</div> */}
        </footer>
        <div className="copy-right">
          © 2024 STUDENTSPHERE . All rights reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
