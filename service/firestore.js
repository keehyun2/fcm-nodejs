const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

require('dotenv').config();

/// firestore 설정
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMINSDK);
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();

/// 메세지 모니터
const moniterMessage = async () => {
  db.collectionGroup('messages').onSnapshot((querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        if (new Date().getTime() - change.doc.data().timestamp < 3000) {
          // 과거 3000 ms 이내 메세지
          console.log('New msg: ', change.doc.data());
          pushMessage(change.doc.data());
        }
      }
      if (change.type === 'modified') {
        console.log('Modified msg: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed msg: ', change.doc.data());
      }
    });
  });
};

/// 푸시 메세지 보내기
const pushMessage = async (doc) => {
  const idFrom = doc.idFrom;
  const idTo = doc.idTo;
  const contentMessage = doc.content;

  const sender = await db.collection('users').doc(idFrom).get();
  const receiver = await db.collection('users').doc(idTo).get();

  console.log(`Found user from: ${sender.data().nickname}`);
  const payload = {
    notification: {
      title: `You have a message from "${sender.data().nickname}"`,
      body: contentMessage,
      badge: '1',
      sound: 'default'
    }
  };
  // Let push to the target device
  getMessaging()
    .sendToDevice(receiver.data().pushToken, payload)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });

  console.log(sender.data());
};

module.exports = {
  moniterMessage
};
