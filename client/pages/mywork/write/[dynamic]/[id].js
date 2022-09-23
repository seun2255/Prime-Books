import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../../styles/MyWork/write.module.css";
import { useState, useContext } from "react";
import { Context } from "../../../../context";
import icons from "../../../../assets/icons/icons";
import ArrowBack from "@mui/icons-material/ArrowBackSharp";
import Add from "@mui/icons-material/AddSharp";
import { getBookDetails } from "../../../api/database";
import { uploadNewChapter } from "../../../api/dappAPI";
import SuccesModal from "../../../../modals/succesModal";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/router";

function MyWork({ book, bookId, chapter }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [succesModal, setSuccesModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleSave = () => {};

  const handlePublish = () => {
    setLoader(true);
    uploadNewChapter(bookId, chapter, title, content).then(() => {
      setLoader(false);
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
        router.push(`/mywork/${bookId}`);
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top__bar}>
        <Link href={`/mywork/${bookId}`}>
          <div className={styles.back__button}>
            <ArrowBack />
            <span className={styles.back__text}>Back</span>
          </div>
        </Link>
        <div className={styles.edit__buttons}>
          <button className={styles.publish__button} onClick={handlePublish}>
            Publish
          </button>
          <button className={styles.save__button}>Save</button>
          <button className={styles.save__button}>Preview</button>
        </div>
      </div>
      <div className={styles.base}>
        <div className={styles.book__name}>{book.title}</div>
        <div className={styles.editor}>
          <input
            className={styles.title}
            placeholder="Untitled Chapter"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={styles.content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="type or paste content here"
          />
        </div>
        {succesModal && <SuccesModal text="Chapter Published" />}
        {loader && (
          <div className={styles.loader}>
            <ThreeDots
              height="40%"
              width="100%"
              color="blueviolet"
              visible={true}
            />
          </div>
        )}
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

  const book = await getBookDetails(dynamic);

  return {
    props: { book: book, bookId: dynamic, chapter: id },
  };
}

export default MyWork;
