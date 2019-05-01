import auth0 from "auth0-js";
import history from "./History";

import { auth } from "../../config.json";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;
  userProfile;

  auth0 = new auth0.WebAuth({
    domain: auth.domain,
    clientID: auth.clientID,
    redirectUri: auth.redirectUri,
    responseType: "token id_token",
    scope: "openid email profile",
    audience: auth.audience,
    issuer: auth.issuer
  });
  constructor() {
    //just bind the methods to this
   this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
   // this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    //removed 
    //this.scheduleRenewal();
  }
  login = () => {
    console.log("login called!");
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        history.replace("/");
        console.log(
          `Error: ${err.error}. Check the console for further details.`
        );
      }
    });
  };

  getAccessToken = () => {
    return this.accessToken;
  };

  getIdToken = () => {
    return this.idToken;
  };

  setSession = authResult => {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem("isLoggedIn", "true");

    // Set the time that the access token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // Set the users scopes
    this.scopes = authResult.scope || this.requestedScopes || "";
    this.scheduleRenewal();
    // navigate to the home route
    history.replace("/app");
  };

  renewSession = () => {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  };

  getProfile = cb => {
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  };

  logout = () => {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    // Remove user scopes
    this.scopes = null;
    // Remove user profile
    this.userProfile = null;

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem("isLoggedIn");
    clearTimeout(this.tokenRenewalTimeout);

    // navigate to the home route
    history.replace("/");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;

    return new Date().getTime() < expiresAt;
  };

  userHasScopes = scopes => {
    const grantedScopes = this.scopes.split(" ");
    return scopes.every(scope => grantedScopes.includes(scope));
  };
  scheduleRenewal() {
    let expiresAt = this.expiresAt;
    const timeout = expiresAt - Date.now();
    if (timeout > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewSession();
      }, timeout);
    }
  }

  getExpiryDate() {
    return JSON.stringify(new Date(this.expiresAt));
  }
}
