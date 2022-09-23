import Image from "next/image";
import styles from "../../styles/Profile/newBook.module.css";
import icons from "../../assets/icons/icons";
import { useState } from "react";
import { uploadNewBook } from "../../pages/api/dappAPI";
import { Web3Storage } from "web3.storage";
import linkCreator from "../../utils/linkCreator";
import SuccesModal from "../../modals/succesModal";
import { ThreeDots } from "react-loader-spinner";

export default function NewBook(props) {
  const { user, setView } = props;
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [pic, setPic] = useState(false);
  const [fileUpload, setFileUpload] = useState("");
  const [succesModal, setSuccesModal] = useState(false);
  const [picLoader, setPicLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const token = process.env.NEXT_PUBLIC_STORAGE_TOKEN;
  const client = new Web3Storage({ token });

  const handleFileUpload = async (event) => {
    setPicLoader(true);
    let file = event.target.files[0];
    if (file) {
      const cid = await client.put(event.target.files);
      const url = linkCreator(cid, file.name);
      setFileUpload(url);
      setPic(url);
    }
    setPicLoader(false);
  };

  const handleSave = async () => {
    setLoader(true);
    {
      user.username === ""
        ? alert("an author needs a name")
        : uploadNewBook(title, synopsis, fileUpload, user.username)
            .then(() => {
              setLoader(false);
              setSuccesModal(true);
              setTimeout(() => {
                setSuccesModal(false);
                setView(2);
              }, 2000);
            })
            .catch(() => setLoader(false));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner__container}>
        <div className={styles.fields}>
          <div className={styles.username__field}>
            <div className={styles.label}>Title</div>
            <input
              type="text"
              className={styles.username__input}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles.label}>Synopsis</div>
            <textarea
              type="text"
              className={styles.about__input}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>
          <div className={styles.photo__field}>
            <div className={styles.profile__pic}>
              {pic ? (
                picLoader ? (
                  <ThreeDots
                    height="40%"
                    width="100%"
                    color="blueviolet"
                    visible={true}
                  />
                ) : (
                  <img
                    src={pic}
                    alt="profile pic"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "20px",
                    }}
                  />
                )
              ) : (
                <div className={styles.no__pic}>
                  {picLoader ? (
                    <ThreeDots
                      height="40%"
                      width="100%"
                      color="blueviolet"
                      visible={true}
                    />
                  ) : (
                    <Image src={icons.bookCover} layout="fill" />
                  )}
                </div>
              )}
            </div>
            <label htmlFor="pic-upload" className={styles.upload__button}>
              Upload Photo
            </label>
            <input
              id="pic-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div className={styles.button__container}>
          <button className={styles.button} onClick={handleSave}>
            Create
          </button>
        </div>
      </div>
      {succesModal && <SuccesModal text="New Book Created" />}
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
  );
}
