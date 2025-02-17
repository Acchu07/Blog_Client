import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Login from './LoginForm.jsx';
import SignUpForm from './signUpForm.jsx';
import DisplayButton from './DisplayButton.jsx';
import HomePagePost from './PostHomePage.jsx';
import { useContext } from 'react';
import { UserLoggedInContext } from '../context/userLoggedInContext';
import AuthenticateUser from '../utils/authenticate.js';
import styles from '../css/homepage.module.css';
import defaultPath from '../utils/paths.js';

export default function HomePage() {
  const { userLoggedIn, setUserLoggedIn } = useContext(UserLoggedInContext);
  const [displayView, setDisplayView] = useState(0);

  useEffect(() => {
    AuthenticateUser(setUserLoggedIn);
  }, []);

  function showView() {
    switch (displayView) {
      case 1:
        return <Login setUserLoggedIn={setUserLoggedIn} />;
      case 2:
        return <SignUpForm />;
      default:
        return null;
    }
  }

  function displayLoggedInUser() {
    return (
      <div className={styles.header}>
        <p className={styles.loggedInMessage}>Logged In Hello {userLoggedIn.userName}</p>
        <button className={styles.logOutButton} onClick={() => logOut(setUserLoggedIn)}>
          Log Out
        </button>
        <Link to="/dashboard" className={styles.dashboardLink}>
          DashBoard
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {userLoggedIn.bIsLoggedIn === true ? (
        displayLoggedInUser()
      ) : (
        <>
          <div className={styles.buttonContainer}>
            <DisplayButton setDisplayView={setDisplayView} displayView={displayView}>
              Login
            </DisplayButton>
            <DisplayButton setDisplayView={setDisplayView} displayView={displayView}>
              Sign Up
            </DisplayButton>
          </div>
          {showView(displayView)}
        </>
      )}
      <h1 className={styles.postsHeader}>BLOG POSTS</h1>
      <HomePagePost />
    </div>
  );
}

async function logOut(setUserLoggedIn) {
  const loggedOut = await fetch(`${defaultPath}user/logOut`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (loggedOut.ok) {
    setUserLoggedIn({ bIsLoggedIn: false, userName: '' });
  } else {
    console.error('Failed to log out');
  }
}