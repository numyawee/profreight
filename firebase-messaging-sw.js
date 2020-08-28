importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");


const firebaseConfig = {
     apiKey: "AIzaSyC5ke5EpaEpRvCSnVoUDkk1an6zAE0kKZw",
     authDomain: "innocheque-push.firebaseapp.com",
     databaseURL: "https://innocheque-push.firebaseio.com",
     projectId: "innocheque-push",
     storageBucket: "innocheque-push.appspot.com",
     messagingSenderId: "501449367080",
     appId: "1:501449367080:web:da296afb70a2f8f6649f1d"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function(payload) {
//      const promiseChain = clients
//           .matchAll({
//                type: "window",
//                includeUncontrolled: true,
//           })
//           .then((windowClients) => {
//                for (let i = 0; i < windowClients.length; i++) {
//                     const windowClient = windowClients[i];
//                     windowClient.postMessage(payload);
//                }
//           })
//           .then(() => {
//                return registration.showNotification("my notification title");
//           });
//      return promiseChain;
// });

// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// // Initialize Firebase
// var config = {
//      apiKey: "AIzaSyC5ke5EpaEpRvCSnVoUDkk1an6zAE0kKZw",
//      authDomain: "innocheque-push.firebaseapp.com",
//      databaseURL: "https://innocheque-push.firebaseio.com",
//      projectId: "innocheque-push",
//      storageBucket: "innocheque-push.appspot.com",
//      messagingSenderId: "501449367080",
//      appId: "1:501449367080:web:da296afb70a2f8f6649f1d"
// };
// firebase.initializeApp(config);
// const messaging = firebase.messaging();

function checkBrowser() {
     c = navigator.userAgent.search("Chrome");
     f = navigator.userAgent.search("Firefox");
     m8 = navigator.userAgent.search("MSIE 8.0");
     m9 = navigator.userAgent.search("MSIE 9.0");
     if (c > -1) {
          browser = "Chrome";
     } else if (f > -1) {
          browser = "Firefox";
     } else if (m9 > -1) {
          browser = "MSIE 9.0";
     } else if (m8 > -1) {
          browser = "MSIE 8.0";
     }
     return browser;
}


messaging.setBackgroundMessageHandler(function (payload) {
     // console.log('Handling background message ', payload);
     // console.log(checkBrowser())
     return self.registration.showNotification(payload.data.title + ' background', {
          body: payload.data.body,
          icon: payload.data.icon,
          data: payload.data.link
     });
});

self.addEventListener('notificationclick', function (event) {
     event.notification.close();
     // event.waitUntil(self.clients.location.href(event.notification.data));
});
