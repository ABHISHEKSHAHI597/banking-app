import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";

const UserDashboard = () => {
  const [credit, setCredit] = useState(null)
  const [debit, setDebit] = useState(null)
  const [user,setUser] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("token")
    const getData = async () => {
      let res = await axios.get("http://localhost:5000/userDashboard", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const {user, credit, debit, balance} = res.data

      setCredit(credit)
      setDebit(debit)
      setUser(user)
    }
    getData();
  },[])

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      <h1 className="text-4xl font-bold text-white mb-6">
        Welcome, {user.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Current Balance
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">
            ₹ {user.balance}
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
          to="/userPayment"
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
          to="/UserProfile"
          className="bg-purple-600 px-6 py-3 rounded-lg text-white"
          state={user}
        >
          Profile
        </Link>

      </div>

    </div>
  );
};

export default UserDashboard;