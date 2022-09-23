import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Profile/index.module.css";
import { useState, useContext } from "react";
import { Context } from "../context";
import Main from "../components/Profile/main";
import MyBooks from "../components/Profile/myBooks";
import Library from "../components/Profile/library";
import NewBook from "../components/Profile/newBook";
import Finance from "../components/Profile/finance";
import icons from "../assets/icons/icons";

export default function Profile() {
  const { state } = useContext(Context);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState("");
  const options = [
    icons.profileOption,
    icons.library,
    icons.write,
    icons.finance,
  ];

  const optionText = ["Profile", "Library", "My Books", "Finance"];

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className={styles.option}
              onClick={() => setSelected(index)}
              style={{
                backgroundColor:
                  selected === index
                    ? "#9a81ff"
                    : selected === 4 && index === 2
                    ? "#9a81ff"
                    : "transparent",
              }}
              onMouseOver={() => setHovered(index)}
              onMouseOut={() => setHovered("")}
            >
              <div className={styles.option__inner}>
                <Image src={option} layout="fill" className={styles.icon} />
              </div>
              {hovered === index && (
                <div className={styles.icon__text}>{optionText[index]}</div>
              )}
            </div>
          );
        })}
      </div>
      <div className={styles.view}>
        {selected === 0 && <Main user={state.user} />}
        {selected === 1 && (
          <Library books={state.user.library} setView={setSelected} />
        )}
        {selected === 2 && (
          <MyBooks books={state.user.myBooks} setView={setSelected} />
        )}
        {selected === 3 && <Finance user={state.user} setView={setSelected} />}
        {selected === 4 && <NewBook user={state.user} setView={setSelected} />}
      </div>
    </div>
  );
}
