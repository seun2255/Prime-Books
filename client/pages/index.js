import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/main/navbar";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  );
}
