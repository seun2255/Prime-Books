import styles from "../../styles/Home/navbar.module.css";
import Close from "@mui/icons-material/Close";
import Search from "@mui/icons-material/Search";
import Note from "@mui/icons-material/Note";
import Book from "@mui/icons-material/Book";
import Category from "@mui/icons-material/Category";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import icons from "../../assets/icons/icons";
import { useSpring, animated } from "react-spring";
import { connect, getContract2, getBalances } from "../../pages/api/dappAPI";
import { Context } from "../../context";
import SuccesModal from "../../modals/succesModal";
import WalletConnectModal from "../../modals/walletConnectModal";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import axios from "axios";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../pages/api/database";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [succesModal, setSuccesModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const connectedState = useAccount().isConnected;
  const { state, dispatch } = useContext(Context);
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  // const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (option) => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector:
        option === 1
          ? new MetaMaskConnector()
          : new WalletConnectConnector({
              options: {
                qrcode: true,
              },
            }),
    });

    const userData = { address: account, chain: chain.id, network: "evm" };

    connect().then((userData) => {
      setWalletModal(false);
      if (userData) {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: userData,
        });
      } else {
        console.log("Some error occured");
      }
      console.log(userData);
      console.log("hello");
    });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    // push(url);
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const searchBox = useSpring({
    width: searchActive ? "300px" : "224px",
    config: { duration: 300 },
  });

  useEffect(() => {
    setIsConnected(connectedState);
    connectedState ? setButtonText("profile") : setButtonText("connect");
    if (isConnected) {
      getContract2().then((contract) => {
        contract.on("TokensBought", async () => {
          console.log("Tokens were Bought");
          const balances = await getBalances();
          var temp = state;
          temp.tokenBalance = balances.tokenBalance;
          temp.ethBalance = balances.ethBalance;
          dispatch({
            type: "LOGGED_IN_USER",
            payload: temp,
          });
        });
      });
    }
  }, [connectedState]);

  useEffect(() => {
    if (isConnected) {
      connect().then((userData) => {
        if (userData) {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: userData,
          });
          const unsubUser = onSnapshot(
            doc(db, "users", userData.address),
            (doc) => {
              var data = doc.data();
              dispatch({
                type: "LOGGED_IN_USER",
                payload: data,
              });
            }
          );
        } else {
          console.log("Some error occured");
        }
      });
    }
  }, [isConnected]);

  return (
    <div className={styles.container}>
      <div className={styles.left__section}>
        <div className={styles.logo}>
          <Image src={icons.logo} layout="fill" />
        </div>
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
        <animated.div
          className={styles.search__button}
          style={searchBox}
          onFocus={() => setSearchActive(true)}
          onBlur={() => setSearchActive(false)}
        >
          <Search height={"20px"} width={"20px"} />
          <input
            type="text"
            className={styles.search__input}
            placeholder="Search..."
          />
        </animated.div>
        {/* <div className={styles.right__section__item}>Library</div> */}
        {isConnected ? (
          <Link href={"/profile"}>
            <button className={styles.sign__in__button}>{buttonText}</button>
          </Link>
        ) : (
          <button
            className={styles.sign__in__button}
            onClick={() => setWalletModal(true)}
          >
            {buttonText}
          </button>
        )}
      </div>
      {succesModal && <SuccesModal text="Wallet Connected" />}
      {walletModal && (
        <WalletConnectModal
          handleAuth={handleAuth}
          setWalletModal={setWalletModal}
        />
      )}
    </div>
  );
};

export default NavBar;
