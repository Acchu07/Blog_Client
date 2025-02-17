import { useContext, useEffect, useState } from "react";
import { UserLoggedInContext } from "../context/userLoggedInContext";
import CreateNewPost from "./createPost";
import SelfPagePost from "./PostBySelf";
import { Link } from "react-router";
import AuthenticateUser from "../utils/authenticate";
import styles from "../css/dashboard.module.css";

export default function Dashboard() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserLoggedInContext);
  const [displayView, setDisplayView] = useState(false);

  useEffect(() => {
    AuthenticateUser(setUserLoggedIn);
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.homeLink}>Homepage</Link>
      {userLoggedIn.bIsLoggedIn === true ? (
        <>
          <button
            className={styles.button}
            onClick={() => setDisplayView(!displayView)}
          >
            {displayView === true ? "Cancel" : "Create New Post"}
          </button>
          {displayView === true ? (
            <CreateNewPost setDisplayView={setDisplayView} displayView={displayView} />
          ) : (
            <SelfPagePost />
          )}
        </>
      ) : (
        <p className={styles.errorMessage}>You need to be logged in</p>
      )}
    </div>
  );
}