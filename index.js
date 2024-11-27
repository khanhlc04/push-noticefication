import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getMessaging, onMessage, getToken } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging.js";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBSDrODupgI0MzvLIcqQPgm2U4OgrW5VQM",
    authDomain: "disaster-a495d.firebaseapp.com",
    projectId: "disaster-a495d",
    storageBucket: "disaster-a495d.firebasestorage.app",
    messagingSenderId: "999451644442",
    appId: "1:999451644442:web:d1a863948b04a0927777a3",
    measurementId: "G-0F58QYY2N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }
  
  // Gọi hàm requestPermission để yêu cầu quyền thông báo
  requestPermission();

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: 'BD8qmoU_jP1DmohUNKcvJmfsvywLFhnO8eYpOR6AUijA27MHDI3qGiUAeIbWWhYYm0szrLhDvTIKE_1E_WpJ6-I' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    // ...
    document.write(currentToken);


  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);

  new Notification(payload.data.title, {
    body: payload.data.body,
    icon: 'https://img.icons8.com/emoji/100/warning-emoji.png'
  });
});