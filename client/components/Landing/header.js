import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Landing/header.module.css";
import icons from "../../assets/icons/icons";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <Image src={icons.headerBackground} layout="fill" />
      </div>
    </div>
  );
}
