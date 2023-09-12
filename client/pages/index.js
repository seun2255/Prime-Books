import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Landing/index.module.css";
import Footer from "../components/Home/footer";
import { getRecent, getAllBooks } from "./api/database";

export default function Home({ books, recentChapters }) {
  return (
    <div className={styles.container}>
      <div className={styles.top__book}>
        <label className={styles.top__book__title}>The NO.1 Book</label>
        <div className={styles.top__book__box}>
          <div className={styles.top__book__details__container}>
            <div className={styles.top__book__details}>
              <Link href={`/books/${books[1].bookId}`}>
                <div className={styles.top__book__cover}>
                  {books[1].cover !== "" ? (
                    <img
                      src={books[1].cover}
                      alt="profile pic"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    <Image src={icons.bookCover} layout="fill" />
                  )}
                </div>
              </Link>
              <div className={styles.info}>
                <div className={styles.details}>
                  <div className={styles.status}>{books[1].status}</div>
                  <div className={styles.title}>{books[1].title}</div>
                  <div className={styles.details}>{books[1].synopsis}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.top__book__info}>
            <div
              className={styles.top__book__info__box}
              style={{ borderTop: "1px solid grey" }}
            >
              over 1000 likes!
            </div>
            <div className={styles.top__book__info__box}>200 reviews</div>
            <div className={styles.top__book__info__box}>
              most viewed novel!
            </div>
          </div>
        </div>
      </div>
      <div className={styles.top__books}>
        <h3 className={styles.top__books__title}>Top Books</h3>
        <h4 className={styles.top__books__subtitle}>
          These are the best books we have!
        </h4>
        <div className={styles.top__books__list}>
          {books.map((book, index) => {
            if (index !== 1 && index !== 0 && index < 6) {
              return (
                <div
                  className={styles.top__books__item}
                  style={{
                    backgroundColor:
                      index === 2 || index === 5 ? "#c2b4fb" : "#a48dff",
                  }}
                  key={index}
                >
                  <Link href={`/books/${book.bookId}`}>
                    <div className={styles.top__books__item__cover}>
                      {book.cover !== "" ? (
                        <img
                          src={book.cover}
                          alt="profile pic"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                        />
                      ) : (
                        <Image src={icons.bookCover} layout="fill" />
                      )}
                    </div>
                  </Link>
                  <h4 className={styles.top__books__item__title}>
                    {book.title}
                  </h4>
                  <div className={styles.top__books__item__status}>
                    {book.status}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className={styles.recent__updates__container}>
        <div className={styles.recent__updates}>
          <h3 className={styles.recent__updates__title}>
            Most Recently Updated
          </h3>
          {recentChapters.map((chapter, index) => {
            return (
              <Link
                href={`/books/${chapter.bookId}/${chapter.chapter}`}
                key={index}
              >
                <div className={styles.recent__updates__item}>
                  <span className={styles.recent__updates__item__book}>
                    {books[chapter.bookId].title}
                  </span>
                  <span>Chapter {chapter.chapter}</span>
                  <span className={styles.recent__updates__item__author}>
                    {books[chapter.bookId].author}
                  </span>
                  <span className={styles.recent__updates__item__created}>
                    {chapter.created}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // redirect if not authenticated
  //   if (!session) {
  //     return {
  //       redirect: {
  //         destination: "/signin",
  //         permanent: false,
  //       },
  //     };
  //   }
  const recentChapters = await getRecent();
  const books = await getAllBooks();

  return {
    props: { recentChapters: recentChapters, books: books },
  };
}
