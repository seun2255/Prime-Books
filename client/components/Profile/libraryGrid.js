import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Profile/booksGrid.module.css";
import icons from "../../assets/icons/icons";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { editMyBooks } from "../../utils/dataProcessor";

export default function BookGrid(props) {
  const { books } = props;

  return (
    <div className={styles.container}>
      {books.map((book, index) => {
        return (
          <Link href={`/mywork/${book.bookId}`} key={index}>
            <div className={styles.book}>
              <img src={book.cover} alt="book cover" className={styles.cover} />
              <label className={styles.book__name}>{book.title}</label>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
