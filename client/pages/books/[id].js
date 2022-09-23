import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Books/index.module.css";
import { useState, useContext } from "react";
import { Context } from "../../context";
import icons from "../../assets/icons/icons";
import ArrowBack from "@mui/icons-material/ArrowBackSharp";
import Add from "@mui/icons-material/AddSharp";
import { getBookDetails } from "../api/database";
import Footer from "../../components/Home/footer";
import { addBookToLibrary } from "../api/dappAPI";
import SuccesModal from "../../modals/succesModal";
import { ThreeDots } from "react-loader-spinner";

function Books({ book, latestChapter }) {
  const [selected, setSelected] = useState(1);
  const [succesModal, setSuccesModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleAddToLibraryClick = async () => {
    setLoader(true);
    addBookToLibrary(book).then(() => {
      setLoader(false);
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top__section}>
        <div className={styles.book__cover}>
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
        <div className={styles.info}>
          <div className={styles.details}>
            <div className={styles.status}>{book.status}</div>
            <div className={styles.title}>{book.title}</div>
            <div className={styles.author}>Author: {book.author}</div>
          </div>
          <div className={styles.buttons}>
            <Link href={`/books/${book.bookId}/1`}>
              <button className={styles.read__button}>Read</button>
            </Link>
            <button className={styles.library__button}>
              <span
                style={{ marginLeft: "5px" }}
                onClick={handleAddToLibraryClick}
              >
                {loader ? (
                  <ThreeDots
                    height="20px"
                    width="180px"
                    color="white"
                    visible={true}
                  />
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Add /> Add To Library
                  </div>
                )}
              </span>
            </button>
          </div>
        </div>
        {succesModal && <SuccesModal text="Book added to Library" />}
      </div>
      <div className={styles.main__section}>
        <div className={styles.option}>
          <div className={styles.option__buttons}>
            <button
              className={styles.option__button}
              style={{
                borderBottom: selected === 1 ? "5px solid blueviolet" : "none",
              }}
              onClick={() => setSelected(1)}
            >
              About
            </button>
            <button
              className={styles.option__button}
              style={{
                borderBottom: selected === 2 ? "5px solid blueviolet" : "none",
              }}
              onClick={() => setSelected(2)}
            >
              Chapters
            </button>
          </div>
        </div>
        {selected === 1 ? (
          <>
            {/* <div className={styles.general__details}></div> */}
            <div className={styles.synopsis}>
              <h3 className={styles.section__header}>Synopsis</h3>
              <div className={styles.details}>{book.synopsis}</div>
            </div>
            <div className={styles.reviews}>
              <h3 className={styles.section__header}>Reviews</h3>
            </div>
          </>
        ) : (
          <div className={styles.chapters}>
            <div className={styles.latest__chapter}>
              Latest Release:{" "}
              <Link href={"/"}>
                <span>
                  Chapter {latestChapter.chapter}: {latestChapter.title}
                </span>
                {latestChapter.created}
              </Link>
            </div>
            {book.chapters.length !== 0 ? (
              <div className={styles.chapter__list}>
                {book.chapters.map((chapter, index) => {
                  return (
                    <div className={styles.chapter}>
                      <span>{index}</span>
                      <div className={styles.chapter__details}>
                        <span className={styles.chapter__name}>
                          {chapter.title}
                        </span>
                        <span className={styles.chapter__time}>
                          {chapter.created}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.no__chapters}>Chapters Coming Soon!</div>
            )}
          </div>
        )}
      </div>
      <Footer />
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
  const latestChapter = bookDetails.chapters[bookDetails.chapters.length - 1];
  console.log(latestChapter);

  return {
    props: { book: bookDetails, latestChapter: latestChapter },
  };
}

export default Books;
