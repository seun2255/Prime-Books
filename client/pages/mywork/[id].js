import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/MyWork/index.module.css";
import { useState, useContext } from "react";
import { Context } from "../../context";
import icons from "../../assets/icons/icons";
import ArrowBack from "@mui/icons-material/ArrowBackSharp";
import Add from "@mui/icons-material/AddSharp";
import { getBookDetails } from "../api/database";

function MyWork({ book }) {
  const [selected, setSelected] = useState(2);

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>
        <Link href={"/profile"}>
          <div className={styles.back__button}>
            <ArrowBack />
            <span className={styles.back__text}>Back</span>
          </div>
        </Link>
        <div className={styles.edit__buttons}>
          <Link href={"/profile"}>
            <button className={styles.cancel__button}>Cancel</button>
          </Link>
          <button className={styles.save__button}>Save</button>
        </div>
      </div>
      <div className={styles.base}>
        <div className={styles.left}>
          <div className={styles.general}>
            <img
              src={book.cover}
              alt="profile pic"
              className={styles.cover__pic}
            />
            <Link href={`../books/${book.bookId}`} passHref>
              <a
                className={styles.reader__button}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.reader__button}>
                  View as Reader
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.inner__right}>
            <div className={styles.details__nav}>
              <button
                className={styles.nav__button}
                onClick={() => setSelected(1)}
                style={{
                  borderBottom:
                    selected === 1 ? "5px solid blueviolet" : "none",
                }}
              >
                Story Details
              </button>
              <button
                className={styles.nav__button}
                onClick={() => setSelected(2)}
                style={{
                  borderBottom:
                    selected === 2 ? "5px solid blueviolet" : "none",
                }}
              >
                Table of Content
              </button>
            </div>
            {selected === 1 ? (
              <div className={styles.detail__box}>
                <label className={styles.detail__label}>Title</label>
                <div className={styles.detail} style={{ marginBottom: "20px" }}>
                  {book.title}
                </div>
                <label className={styles.detail__label}>Description</label>
                <div className={styles.detail}>{book.synopsis}</div>
              </div>
            ) : (
              <div className={styles.content__box}>
                <div className={styles.new__chapter}>
                  <div className={styles.chapter__text}>Chapters</div>
                  <Link
                    href={`/mywork/write/${book.bookId}/${book.chapters.length}`}
                  >
                    <button className={styles.new__chapter__button}>
                      <Add />
                      <span className={styles.new__text}>New</span>
                    </button>
                  </Link>
                </div>
                {book.chapters.length > 0 ? (
                  <div className={styles.chapters}>
                    {book.chapters.map((chapter, index) => {
                      if (index !== 0) {
                        return (
                          <div className={styles.chapter} key={index}>
                            <span className={styles.chapter__title}>
                              {chapter.title}
                            </span>
                            <span className={styles.publish__date}>
                              {chapter.created}
                            </span>
                          </div>
                        );
                      }
                    })}
                  </div>
                ) : (
                  <div className={styles.empty}>
                    <div className={styles.folder__icon}>
                      <Image src={icons.folder} layout="fill" />
                    </div>
                    <h3 className={styles.empty__text}>No Chapters yet!</h3>
                    <Link href={`/mywork/write/${book.bookId}/1`}>
                      <button className={styles.create__now}>upload Now</button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  // redirect if not authenticated
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/signin",
  //         permanent: false,
  //       },
  //     };
  //   }
  const bookDetails = await getBookDetails(id);

  return {
    props: { book: bookDetails },
  };
}

export default MyWork;
