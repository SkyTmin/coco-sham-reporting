import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import ExpenseForm from './ExpenseForm';
import ConfirmationDialog from './ConfirmationDialog';

export default function IncomeSheetCard({ sheet, onDeleteSheet }) {
  const [expenses, setExpenses] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Загрузка расходов из Firestore
  useEffect(() => {
    const fetchExpenses = async () => {
      const querySnapshot = await getDocs(collection(db, `incomeSheets/${sheet.id}/expenses`));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    };

    fetchExpenses();
  }, [sheet.id]);

  // Добавление нового расхода
  const addExpense = async (expense) => {
    const docRef = await addDoc(collection(db, `incomeSheets/${sheet.id}/expenses`), expense);
    setExpenses([...expenses, { id: docRef.id, ...expense }]);
  };

  // Удаление расхода
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, `incomeSheets/${sheet.id}/expenses`, id));
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = sheet.amount - totalExpenses;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold">{sheet.name}</h2>
      <p className="text-sm text-gray-500">{sheet.date}</p>
      <p className="text-green-500 font-semibold">Доход: {sheet.amount} ₽</p>
      <p className="text-blue-500 font-semibold">Баланс: {balance} ₽</p>
      <ExpenseForm onAddExpense={addExpense} />
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between text-sm">
            <span>{expense.note}</span>
            <span>-{expense.amount} ₽</span>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="text-red-500 hover:underline ml-4"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Удалить лист
      </button>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onConfirm={() => onDeleteSheet(sheet.id)}
        onCancel={() => setIsDialogOpen(false)}
        message="Вы уверены, что хотите удалить этот лист доходов? Все связанные расходы также будут удалены."
      />
    </div>
  );
}