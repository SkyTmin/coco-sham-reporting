import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyCn_cb4dgnTE0NnDJrrR5p6g76mcNP_4eE",
  authDomain: "coco-sham-reporting.firebaseapp.com",
  projectId: "coco-sham-reporting",
  storageBucket: "coco-sham-reporting.firebasestorage.app",
  messagingSenderId: "767238390021",
  appId: "1:767238390021:web:3cd3902dbbd051dd15f76c",
  measurementId: "G-TZ16ZYQJ1Y"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Экспорт Firestore
export const db = getFirestore(app);