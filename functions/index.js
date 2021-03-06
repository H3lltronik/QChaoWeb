const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.deleteOldMessages = functions.https.onRequest((request, response) => {
  let chats = []
  admin.database().ref('chats').once('value', (snapshot) => {
    let chat = snapshot.val();
    chats.push(chat);
  });

  response.send(chats);
});
