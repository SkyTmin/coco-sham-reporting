import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import IncomeSheetCard from '../components/IncomeSheetCard';
import IncomeSheetForm from '../components/IncomeSheetForm';

export default function Home() {
  const [incomeSheets, setIncomeSheets] = useState([]);

  // Загрузка данных из Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'incomeSheets'));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIncomeSheets(data);
    };

    fetchData();
  }, []);

  // Добавление нового листа доходов
  const addIncomeSheet = async (sheet) => {
    const docRef = await addDoc(collection(db, 'incomeSheets'), sheet);
    setIncomeSheets([...incomeSheets, { id: docRef.id, ...sheet }]);
  };

  // Удаление листа доходов
  const deleteIncomeSheet = async (id) => {
    await deleteDoc(doc(db, 'incomeSheets', id));
    setIncomeSheets(incomeSheets.filter((sheet) => sheet.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Coco Sham Reporting</h1>
      <IncomeSheetForm onAddIncomeSheet={addIncomeSheet} />
      <div className="grid gap-4">
        {incomeSheets.length === 0 ? (
          <p className="text-gray-500">Нет созданных листов доходов</p>
        ) : (
          incomeSheets.map((sheet) => (
            <IncomeSheetCard key={sheet.id} sheet={sheet} onDeleteSheet={deleteIncomeSheet} />
          ))
        )}
      </div>
    </main>
  );
}