import React, { useState } from 'react';

export default function ExpenseForm({ onAddExpense }) {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note || !amount) return;

    onAddExpense({ note, amount: parseFloat(amount) });
    setNote('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        placeholder="Описание"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <input
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Добавить расход
      </button>
    </form>
  );
}