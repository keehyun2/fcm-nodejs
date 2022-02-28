const express = require('express');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const port = process.env.PORT || 5000;

const app = express();

// open the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express is running on port ${port}`);
});

/// firestore 설정
const serviceAccount = require('./gcm1-9a437-firebase-adminsdk-evvpq-1982d3c09d.json');
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
// db.collection('chat-room').doc('xczxccc').set({ msg: 'xcxc', time: '112111' });

const data = {
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA'
};

// Add a new document in collection "cities" with ID 'LA'
const res = db.collection('cities').doc('LA').set(data);

console.log(res);
// .collection('messages')
// .doc('xczxc')

// db.collectionGroup('messages').onSnapshot((querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//     if (change.type === 'added') {
//       console.log('New city: ', change.doc.data());
//     }
//     if (change.type === 'modified') {
//       console.log('Modified city: ', change.doc.data());
//     }
//     if (change.type === 'removed') {
//       console.log('Removed city: ', change.doc.data());
//     }
//   });
// });

// exports.sendNotification = functions.firestore
// .document('messages/{groupId1}/{groupId2}/{message}')
// .onCreate((snap, context) => {
//   console.log('----------------start function--------------------')

//   const doc = snap.data()
//   console.log(doc)

//   const idFrom = doc.idFrom
//   const idTo = doc.idTo
//   const contentMessage = doc.content

//   // Get push token user to (receive)
//   admin
//     .firestore()
//     .collection('users')
//     .where('id', '==', idTo)
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach(userTo => {
//         console.log(`Found user to: ${userTo.data().nickname}`)
//         if (userTo.data().pushToken && userTo.data().chattingWith !== idFrom) {
//           // Get info user from (sent)
//           admin
//             .firestore()
//             .collection('users')
//             .where('id', '==', idFrom)
//             .get()
//             .then(querySnapshot2 => {
//               querySnapshot2.forEach(userFrom => {
//                 console.log(`Found user from: ${userFrom.data().nickname}`)
//                 const payload = {
//                   notification: {
//                     title: `You have a message from "${userFrom.data().nickname}"`,
//                     body: contentMessage,
//                     badge: '1',
//                     sound: 'default'
//                   }
//                 }
//                 // Let push to the target device
//                 admin
//                   .messaging()
//                   .sendToDevice(userTo.data().pushToken, payload)
//                   .then(response => {
//                     console.log('Successfully sent message:', response)
//                   })
//                   .catch(error => {
//                     console.log('Error sending message:', error)
//                   })
//               })
//             })
//         } else {
//           console.log('Can not find pushToken target user')
//         }
//       })
//     })
//   return null
// })
