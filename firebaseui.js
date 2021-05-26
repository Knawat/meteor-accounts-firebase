import firebase from "firebase/app";
import "firebase/auth";
import { rtlLangs } from "./utils";

const enableFirebaseUi = () => {
  // Localize based on document html lang attribute or 'lang' query param
  const langQueryParam = new URL(window.location.href).searchParams.get('lang');

  const LANGUAGE_CODE = document.documentElement.lang || langQueryParam || 'en';
  const IS_RTL = rtlLangs.includes(LANGUAGE_CODE) ? '-rtl' : '';
  const FIREBASEUI_VERSION = Meteor.settings.public.firebaseui.version || '4.8.0';
  const INIT_CONFIG = Meteor.settings.public.firebaseui.init;

  // Load CDN
  const uiScript = document.createElement('script');
  uiScript.src = `https://www.gstatic.com/firebasejs/ui/${FIREBASEUI_VERSION}/firebase-ui-auth__${LANGUAGE_CODE}.js`;

  const uiStyle = document.createElement('link');
  uiStyle.type = 'text/css';
  uiStyle.rel = 'stylesheet';
  uiStyle.href = `https://www.gstatic.com/firebasejs/ui/${FIREBASEUI_VERSION}/firebase-ui-auth${IS_RTL}.css`;

  document.head.append(uiScript);
  document.head.append(uiStyle);

  // TODO: Put firebase ui behind feature flag to be optional
  const uiConfig = {
    ...INIT_CONFIG,
    callbacks: {
      signInSuccessWithAuthResult: () => {
        cleanupFirebaseUi([uiScript, uiStyle]);
        return true;
      }
    },
    signInSuccessUrl: window.location.href,
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
  };

  uiScript.addEventListener('load', () => {
    loadFirebaseUi(uiConfig);
  })
}

const cleanupFirebaseUi = (elements) => {
  document.querySelector('#firebaseui-auth-container').remove();

  elements.forEach(elem => {
    elem.parentNode.removeChild(elem);
  });
}

const loadFirebaseUi = (config) => {
  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  const modalContainer = document.createElement('div');
  modalContainer.className = 'firebaseui-modal';
  document.body.append(modalContainer);

  const uiContainer = document.createElement('div');
  uiContainer.id = 'firebaseui-auth-container';
  modalContainer.append(uiContainer);

  ui.start('#firebaseui-auth-container', config);
}

export { enableFirebaseUi };
