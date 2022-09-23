import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Books/chapter.module.css";
import { useState, useContext } from "react";
import { Context } from "../../../context";
import icons from "../../../assets/icons/icons";
import ArrowBack from "@mui/icons-material/ArrowBackSharp";
import Add from "@mui/icons-material/AddSharp";
import { getBookDetails } from "../../api/database";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

function Book({ book, chapter }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>
        <Link href={`/books/${chapter.bookId}`}>
          <div className={styles.back__button}>
            <ArrowBack />
            <span className={styles.back__text}>Back</span>
          </div>
        </Link>
      </div>
      <div className={styles.base}>
        <div className={styles.book__name}>{book.title}</div>
        <div className={styles.editor}>
          <div className={styles.title}>{chapter.title}</div>
          <div className={styles.content}>{chapter.content}</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id, dynamic } = context.query;

  // redirect if not authenticated
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/signin",
  //         permanent: false,
  //       },
  //     };
  //   }

  const book = await getBookDetails(id);
  const chapter = book.chapters[dynamic];

  return {
    props: { book: book, chapter: chapter },
  };
}

export default Book;
