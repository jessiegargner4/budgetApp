import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {
  const [newExpense, setNewExpense] = useState({ name: '', amount: 0 });
  const [expenses, setExpenses] = useState([
    { name: 'Phone Bill', amount: 205 },
    { name: 'Student Loan', amount: 300 },
    { name: 'Mortgage', amount: 1117 },
    { name: 'Gym Membership', amount: 10 },
    { name: 'Petco', amount: 10 },
    // { name: 'Trash Collection', amount: 110 }
    // {name: 'powerBill', amount: 110}
  ]);
  const [shoppingExpenses, setShoppingExpenses] = useState<{name: string, amount: number}[]>([]);

  const income = useRef(2300);

  const totalRecurringExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalShoppingExpenses = shoppingExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalExpenses = totalRecurringExpenses + totalShoppingExpenses;

  const handleAddExpense = () => {
    if (newExpense.name.trim() && newExpense.amount > 0) {
      setShoppingExpenses([...shoppingExpenses, { name: newExpense.name, amount: newExpense.amount }]);
      setNewExpense({ name: '', amount: 0 });
    }
  };


  const handleExpenseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, name: e.target.value });
  };

  const handleExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 });
  };

  return (
    <>
      <div className="AppContainer">
        <div className="AmountCards">
          <div className="IncomeCard">
            <h2>Income</h2>
            <p>${income.current}</p>
          </div>
          <div className="ExpensesCard">
            <h2>Expenses</h2>
            <p>${totalExpenses}</p>
          </div>
          <div className="BalanceCard">
            <h2>Balance</h2>
            <p>${income.current - totalExpenses}</p>
          </div>
        </div>
        <div className="RecurringExpenses">
          <h2>Recurring Expenses</h2>
          <div className="ExpensesList">
            {expenses.map((expense, index) => (
              <div key={index} className="ExpenseItem">
                <span className="ExpenseName">{expense.name}</span>
                <span className="ExpenseAmount">${expense.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ShoppingExpenses">
          <h2>Shopping</h2>
          <div className="ExpensesList">
            {shoppingExpenses.map((expense, index) => (
              <div key={index} className="ExpenseItem">
                <span className="ExpenseName">{expense.name}</span>
                <span className="ExpenseAmount">${expense.amount}</span>
              </div>
            ))}
            {shoppingExpenses.length === 0 && <p>No shopping expenses yet</p>}
          </div>
        </div>
        <div className="AddExpenses">
          <div className="AddExpenseCard">
            <h2>Add Expense</h2>
            <div className="ExpenseNameContainer">
              <label htmlFor="expenseName">Expense Name:</label>
              <input 
                type="text" 
                id="expenseName" 
                placeholder="Enter expense name" 
                value={newExpense.name}
                onChange={handleExpenseNameChange}
              />
            </div>
            <div className="AmmountContainer">
              <label htmlFor="expenseAmount">Amount:</label>
              <input 
                type="number" 
                id="expenseAmount" 
                placeholder="Enter amount" 
                value={newExpense.amount || ''}
                onChange={handleExpenseAmountChange}
              />
            </div>
            <button className="AddExpenseButton" onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
