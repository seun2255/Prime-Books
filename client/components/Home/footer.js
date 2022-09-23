import styles from "../../styles/Home/footer.module.css";
import Image from "next/image";
import Link from "next/link";
import icons from "../../assets/icons/icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner__container}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Image src={icons.logo} layout="fill" />
          </div>
          <div className={styles.links}>
            <div className={styles.link__group}>
              <span>About</span>
              <span>Contact Us</span>
            </div>
            <div className={styles.link__group}>
              <span>Services</span>
              <span>Anouncements</span>
            </div>
          </div>
          <div className={styles.socials}>
            <i
              className="fa-brands fa-facebook"
              style={{
                color: "white",
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
            ></i>
            <i
              className="fa-brands fa-twitter"
              style={{
                color: "white",
                width: "20px",
                height: "20px",
                marginRight: "10px",
              }}
            ></i>
            <i
              className="fa-brands fa-discord"
              style={{ color: "white", width: "20px", height: "20px" }}
            ></i>
          </div>
        </div>
        <div className={styles.divide}></div>
        <div className={styles.bottom}>
          <span className={styles.copyright}>Copyright © Prime Books 2022</span>
          <div className={styles.legal}>
            <span>Terms of Service</span>
            <span style={{ marginBottom: "7px" }}>.</span>
            <span>Privacy Policy</span>
            <span style={{ marginBottom: "7px" }}>.</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
