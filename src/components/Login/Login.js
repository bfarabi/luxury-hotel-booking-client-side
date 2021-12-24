import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "./../../App";
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email: email };
        setLoggedInUser(signInUser);
        storedAuthToken();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const storedAuthToken = () => {
    auth.currentUser
      .getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem("Token", idToken);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle error
      });
  };
  const button = {
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
    padding: "10px",
    fontSize: "20px",
  };
  return (
    <div className="App">
      <h1>Login please..</h1>
      <button style={button} onClick={googleSignIn}>
        google sign in
      </button>
    </div>
  );
};

export default Login;
