import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GOOGLE_CLIENT_ID } from "../../api/keys/ApiKeys";
import { urlToApiCall } from "../../data/UrlForAPICalls";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useUser } from "../../hooks/useUser";

declare global {
  interface Window {
    google: any;
  }
}

export const GoogleSignIn = () => {
  const { onAddUserLoggedToGlobalAppState } = useUser()
  const navigate = useNavigate()
  const { onUserLoggingOut, isUserLoggedOut } = useAuthentication()

  const handleCredentialResponse = (response: any) => {
    const { user, token } = response;
    console.log("User:", user);
    console.log("Token:", token);
    console.log("Handling response:", response);
    const body = { id_token: response.credential };
    fetch(`${urlToApiCall}api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Server response:", resp);
        localStorage.setItem('user', JSON.stringify(resp.user));
        // Retrieve user data from local storage
        
        if (isUserLoggedOut) {
          onUserLoggingOut(false);
        }

        console.log(isUserLoggedOut + " isUserLoggedOut")

        localStorage.setItem('email', resp.user.email);
        navigate('/dashboard');
      })
      .catch(console.warn);
  }

  // const handleSignOut = () => {
  //   console.log("Sign out clicked");
  //   console.log(window.google.accounts.id);
  //   window.google.accounts.id.revoke(localStorage.getItem('email'), (done: any) => {
  //     localStorage.clear();
  //     window.location.reload();
  //   })
  // };

  useEffect(() => {
    const googleSigninElement = document.querySelector(".g_id_signin");
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(googleSigninElement, {
      theme: "outline",
      type: "standard",
      size: "large",
      text: "sign_in_with",
      shape: "rectangular",
      logo_alignment: "left",
    });
  }, []);

  return (
    <div className="google-signin-wrapper" style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: 10 }}>
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
      ></div>
    </div>
  );
};