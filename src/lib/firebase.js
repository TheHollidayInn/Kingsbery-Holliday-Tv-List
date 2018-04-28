const config = {
  apiKey: 'AIzaSyBcQ7pCuxkJHgEJzD_yzYyHG34v2snRMXM',
  authDomain: 'boi-db-ios-6b583.firebaseapp.com',
  databaseURL: 'https://boi-db-ios-6b583.firebaseio.com',
  projectId: 'boi-db-ios-6b583',
  storageBucket: 'boi-db-ios-6b583.appspot.com',
  messagingSenderId: '451043099307',
};

const firebase = window.firebase;
firebase.initializeApp(config);

export default function getFirebase() {
  const database = firebase.database();
  return database;
}
