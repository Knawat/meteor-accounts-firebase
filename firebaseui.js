import firebase from "firebase/app";
import "firebase/auth";

const enableFirebaseUi = () => {
  // Localize based on document html lang attribute or 'lang' query param
  const langQueryParam = new URL(window.location.href).searchParams.get('lang');
  const LANGUAGE_CODE = document.documentElement.lang || langQueryParam || 'en';
  const isRTL = LANGUAGE_CODE.includes('ar') ? '-rtl' : '';

  // Load CDN
  const uiScript = document.createElement('script');
  uiScript.src = `https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth__${LANGUAGE_CODE}.js`;

  const uiStyle = document.createElement('link');
  uiStyle.type = 'text/css';
  uiStyle.rel = 'stylesheet';
  uiStyle.href = `https://www.gstatic.com/firebasejs/ui/4.8.0/firebase-ui-auth${isRTL}.css`;

  document.head.append(uiScript);
  document.head.append(uiStyle);

  // TODO: Put firebase ui behind feature flag to be optional
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: () => {
        cleanupFirebaseUi([uiScript, uiStyle]);
        return true;
      }
    },
    signInFlow: 'popup',
    signInSuccessUrl: window.location.href, // successful url to be same as current page 
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],

    // TODO: Support dynamic values to be passed from meteor app
    tosUrl: 'https://www.knawat.com/terms/',
    privacyPolicyUrl: 'https://www.knawat.com/privacy-policy/'
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
