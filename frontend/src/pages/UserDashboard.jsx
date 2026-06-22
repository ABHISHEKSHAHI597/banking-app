import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/userDashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user, credit, debit } = res.data;

        setUser(user);
        setCredit(credit);
        setDebit(debit);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-slate-400 text-sm">
            {new Date().toLocaleDateString()}
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Welcome Back 👋
          </h1>

          <p className="text-2xl text-slate-300 mt-1">
            {user.name}
          </p>

          <p className="text-slate-400">
            {user.email}
          </p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold transition"
        >
          Logout
        </button>
      </div>

      {/* Virtual Card */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">

        <h2 className="text-lg font-semibold opacity-90">
          Banking App
        </h2>

        <div className="mt-8">
          <p className="text-sm opacity-80">
            Card Holder
          </p>

          <p className="text-2xl font-bold uppercase">
            {user.name}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-2xl tracking-widest font-mono">
            {formatCardNumber(user.cardNumber)}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm opacity-80">
            Available Balance
          </p>

          <p className="text-3xl font-bold">
            ₹ {user.balance}
          </p>
        </div>

      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-slate-400">
            Current Balance
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">
            ₹ {user.balance}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-slate-400">
            Total Credited
          </h2>

          <p className="text-4xl font-bold text-green-500 mt-3">
            ₹ {credit}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl hover:scale-105 transition duration-300">
          <h2 className="text-slate-400">
            Total Debited
          </h2>

          <p className="text-4xl font-bold text-red-500 mt-3">
            ₹ {debit}
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <Link
          to="/userPayment"
          className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl p-8 text-center text-white text-xl font-semibold transition"
          state={user}
        >
          💸 Send Money
        </Link>

        <Link
          to="/transactions"
          className="bg-blue-600 hover:bg-blue-700 rounded-2xl p-8 text-center text-white text-xl font-semibold transition"
        >
          📜 Transaction History
        </Link>

        <Link
          to="/UserProfile"
          state={user}
          className="bg-purple-600 hover:bg-purple-700 rounded-2xl p-8 text-center text-white text-xl font-semibold transition"
        >
          👤 Profile
        </Link>

      </div>
    </div>
  );
};

export default UserDashboard;