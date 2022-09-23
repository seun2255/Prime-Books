import { animated, useSpring } from "react-spring";
import styles from "../styles/modals/walletConnectModal.module.css";
import Image from "next/image";
import icons from "../assets/icons/icons";

export default function WalletConnectModal(props) {
  const { handleAuth, setWalletModal } = props;

  const popUpEffect = useSpring({
    from: { opacity: 0, top: "200px" },
    to: { opacity: 1, top: "0px" },
    config: { duration: 150 },
  });

  return (
    <div
      className={styles.outer}
      onClick={(e) => {
        e.stopPropagation();
        setWalletModal(false);
      }}
    >
      <animated.div
        className={styles.container}
        style={popUpEffect}
        onClick={(e) => {
          e.stopPropagation();
          setWalletModal(true);
        }}
      >
        <button className={styles.buttons} onClick={() => handleAuth(1)}>
          <div className={styles.icons}>
            <Image src={icons.metamask} layout="fill" />
          </div>
          Metamask
        </button>
        <button className={styles.buttons} onClick={() => handleAuth(2)}>
          <div
            className={styles.icons}
            style={{ width: "42px", height: "42px" }}
          >
            <Image src={icons.walletconnect} layout="fill" />
          </div>
          Wallet Connect
        </button>
      </animated.div>
    </div>
  );
}
