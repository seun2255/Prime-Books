import styles from "../../styles/components/navbar.module.css";
import Close from "@mui/icons-material/Close";
import Search from "@mui/icons-material/Search";
import Note from "@mui/icons-material/Note";
import Book from "@mui/icons-material/Book";
import Category from "@mui/icons-material/Category";

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left__section}>
        <div className={styles.logo}>Prime Books</div>
        <div className={styles.left__section__item}>
          <div className={styles.left__section__item__svg}>
            <Category />
          </div>
          <strong className={styles.left__section__item__text}>Browse</strong>
        </div>
        <div className={styles.left__section__item}>
          <div className={styles.left__section__item__svg}>
            <Note />
          </div>
          <strong className={styles.left__section__item__text}>Rankings</strong>
        </div>
        <div className={styles.left__section__item}>
          <div className={styles.left__section__item__svg}>
            <Book />
          </div>
          <strong className={styles.left__section__item__text}>Create</strong>
        </div>
      </div>

      <div className={styles.right__section}>
        <div className={styles.search__button}>
          <Search height={"20px"} width={"20px"} />
          <strong className={styles.search__button__text}>Search...</strong>
        </div>
        <div className={styles.right__section__item}>Library</div>
        <div className={styles.right__section__item}>Forum</div>
        <button className={styles.sign__in__button}>SIGN IN</button>
      </div>
    </div>
  );
};

export default NavBar;
