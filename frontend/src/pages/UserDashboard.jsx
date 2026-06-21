import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";

const UserDashboard = () => {
  const [name, setName] = useState(null)
  const [credit, setCredit] = useState(null)
  const [debit, setDebit] = useState(null)
  const [balance, setBalance] = useState(null)

  const user = {
    name: "Abhishek",
    balance: 12500,
    totalCredit: 20000,
    totalDebit: 7500,
  };

  useEffect(() => {
    let token = localStorage.getItem("token")
    const getData = async () => {
      let res = await axios.get("http://localhost:5000/userDashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const {name, credit, debit, balance} = res.data

      setName(name)
      setCredit(credit)
      setDebit(debit)
      setBalance(balance)
    }
    getData();
  },[])

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome, {name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Current Balance
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">
            ₹ {balance}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Total Credited
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">
            ₹ {credit}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Total Debited
          </h2>

          <p className="text-4xl font-bold text-red-500 mt-3">
            ₹ {debit}
          </p>
        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <Link
          to="/send-money"
          className="bg-emerald-600 px-6 py-3 rounded-lg text-white"
        >
          Send Money
        </Link>

        <Link
          to="/transactions"
          className="bg-blue-600 px-6 py-3 rounded-lg text-white"
        >
          Transaction History
        </Link>

        <Link
          to="/profile"
          className="bg-purple-600 px-6 py-3 rounded-lg text-white"
        >
          Profile
        </Link>

      </div>

    </div>
  );
};

export default UserDashboard;