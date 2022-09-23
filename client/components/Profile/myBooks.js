import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Profile/myBooks.module.css";
import icons from "../../assets/icons/icons";
import { useState } from "react";
import BookGrid from "./booksGrid";

export default function MyBooks(props) {
  const { setView, books } = props;

  return (
    <div className={styles.container}>
      <div className={styles.button__container}>
        <button className={styles.promote}>Promote</button>
        <button className={styles.add__book} onClick={() => setView(4)}>
          New Book
        </button>
      </div>
      <div className={styles.books__container}>
        {books.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.folder__icon}>
              <Image src={icons.folder} layout="fill" />
            </div>
            <h3 className={styles.empty__text}>No Books yet!</h3>
            <button className={styles.create__now} onClick={() => setView(4)}>
              Create Now
            </button>
          </div>
        ) : (
          <BookGrid books={books} />
        )}
      </div>
    </div>
  );
}
