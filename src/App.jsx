import { Details } from "./components/details";
import { Form } from "./components/form";
import { Header } from "./components/header";
import { History } from "./components/history";
import { useEffect, useState } from "react";

const STORAGE_KEY = "spendly-transactions";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-slate-950 min-h-screen items-center px-5 sm:px-10 lg:px-20 pb-20">
      <Header />
      <Details income={income} expense={expense} />
      <Form
        addTransaction={addTransaction}
      />
      {transactions.length > 0 && <History transaction={transactions} deleteTransaction={deleteTransaction} />}
    </div>
  );
}

export default App;
