import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Profile/main.module.css";
import icons from "../../assets/icons/icons";
import { useState } from "react";
import { updateUser } from "../../pages/api/dappAPI";
import { Web3Storage } from "web3.storage";
import linkCreator from "../../utils/linkCreator";
import SuccesModal from "../../modals/succesModal";
import { ThreeDots } from "react-loader-spinner";

export default function Main(props) {
  const { user } = props;
  const [username, setUsername] = useState(user.username);
  const [about, setAbout] = useState(user.about);
  const [pic, setPic] = useState(user.profilePic);
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
      setPicLoader(false);
    }
  };

  const handleSave = async () => {
    setLoader(true);
    updateUser(username, about, fileUpload).then(() => {
      setLoader(false);
      setSuccesModal(true);
      setTimeout(() => {
        setSuccesModal(false);
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner__container}>
        <div className={styles.fields}>
          <div className={styles.username__field}>
            <div className={styles.label}>Username</div>
            <input
              type="text"
              placeholder="Username"
              className={styles.username__input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className={styles.label}>About</div>
            <textarea
              type="text"
              className={styles.about__input}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className={styles.photo__field}>
            <div className={styles.label}>Profile Pic</div>
            <div className={styles.profile__pic}>
              {pic !== "" ? (
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
                    <Image src={icons.profile} layout="fill" />
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
            Save Changes
          </button>
        </div>
      </div>
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
      {succesModal && <SuccesModal text="Profile Updated" />}
    </div>
  );
}
