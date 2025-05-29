import headerimage_1 from "../../Images/slider_1.jpg";
import headerimage_2 from "../../Images/slider_2.jpg";
import headerimage_3 from "../../Images/header2.jpg";
import headerimage_4 from "../../Images/header.jpg";
import headerimage_5 from "../../Images/slider_5.jpg";
import headerimage_6 from "../../Images/header4.jpg";
import "./Slider.css";

const Slider = () => {
  return (
    <>
      <div className="main">
        <div className="slider">
          <img src={headerimage_1} alt="" />
          <img src={headerimage_2} alt="" />
          <img src={headerimage_3} alt="" />
          <img src={headerimage_4} alt="" />
          <img src={headerimage_5} alt="" />
          <img src={headerimage_6} alt="" />
        </div>
      </div>
    </>
  );
};
export default Slider;
