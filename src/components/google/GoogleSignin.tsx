import React, { useEffect, useState } from "react";
import { GOOGLE_CLIENT_ID } from "../../api/keys/ApiKeys";
import { useUser } from "../../hooks/useUser";
import { User } from "../../interfaces/UserInterface";

declare global {
  interface Window {
    google: any;
  }
}

export const GoogleSignIn = () => {

  const [userModel, setUserModel] = useState<User>(
    {
      email: '',
      google: true,
      img: '',
      name: '',
      status: true,
      uid: ''
    }
  )
  const { onAddUserLoggedToGlobalAppState } = useUser()



  function handleCredentialResponse(response: any) {
    const { user, token } = response; // Assuming response contains user and token
    console.log("User:", user); // Log user information
    console.log("Token:", token); // Log token
    console.log("Handling response:", response); // Add this log to check if function is called
    const body = { id_token: response.credential };
    // https://grupo-17-418915.uc.r.appspot.com
    // https://backend-express-hc75.onrender.com/
    // http://localhost:8080
    fetch("https://grupo-17-418915.uc.r.appspot.com/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("Server response:", resp); // Log server response

        setUserModel(user)
        onAddUserLoggedToGlobalAppState(userModel)


        console.log(userModel + " USER MODEL")
        // TODO -> Set User's logged info to redux 
        /** - USER MODEL ----
         * const usuario = 
         * user: 
            email:"dmramirez22@gmail.com"
            google:true
            img:"https://lh3.googleusercontent.com/a/ACg8ocLC5cxIPHW0_zMQUUCHGQ8Ax4Yc3utVehJ_fDRwvpBCGhCxlg=s96-c"
            name:"Danny Muñoz"
            status:true
            uid:"66117c3afd706bbcaafbf04d"
         */


        localStorage.setItem('email', resp.user.email)
      })
      .catch(console.warn);
  }


  // This function have to be called from sign out option within the menu
  const handleSignOut = () => {
    console.log("Sign out clicked");
    console.log(window.google.accounts.id)
    window.google.accounts.id.revoke(localStorage.getItem('email'), (done: any) => {
      localStorage.clear();
      window.location.reload();
    })
  };

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