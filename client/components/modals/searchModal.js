import styles from "../../styles/modals/searchModal.module.css";
import Close from "@mui/icons-material/Close";
import Search from "@mui/icons-material/Search";

const SearchModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.search__bar__container}>
        <div className={search__bar}>
          <label className={styles.search__icon}>
            <Search width={"20px"} height={"20px"} />
          </label>
          <input
            type="text"
            placeholder="Search..."
            className={styles.search__input}
          />
          <a className={styles.close__icon}>
            <Close width={"14px"} height={"14px"} />
          </a>
        </div>
      </div>
      <div className={search__results}></div>
    </div>
  );
};

export default SearchModal;
