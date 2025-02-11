import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCXY2Wu5UhocVOLEv_vB3k5r8aEIlrXimI",
  authDomain: "dice-game-5050.firebaseapp.com",
  databaseURL: "https://dice-game-5050-default-rtdb.firebaseio.com",
  projectId: "dice-game-5050",
  storageBucket: "dice-game-5050.firebasestorage.app",
  messagingSenderId: "772251818656",
  appId: "1:772251818656:web:2f67598c0619096afb07c5",
  measurementId: "G-SH4ZE3V1RB"
};

const questions = [
  {
    id: 1,
    optionA: "Sadece gündüz yaşamak",
    optionB: "Sadece gece yaşamak",
    votesA: 0,
    votesB: 0
  },
  {
    id: 2,
    optionA: "Süper zeki olmak",
    optionB: "Süper zengin olmak",
    votesA: 0,
    votesB: 0
  },
  // ... 98 soru daha eklenecek
];

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function seedQuestions() {
  try {
    for (const question of questions) {
      await set(ref(database, `questions/${question.id}`), question);
    }
    console.log('Sorular başarıyla yüklendi!');
  } catch (error) {
    console.error('Hata:', error);
  }
}

seedQuestions();
