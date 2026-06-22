import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserTransaction = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:5000/getUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(userRes.data.user);

        const transRes = await axios.get(
          "http://localhost:5000/userTransaction",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(transRes.data.transactions);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to load transactions"
        );
      }
    };

    getData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Transaction History
          </h1>

          <p className="text-slate-400">
            View all your transactions
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/userDashboard")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/userPayment")
            }
            className="bg-emerald-600 hover:bg-emerald-700 px-5 py-3 rounded-xl text-white font-semibold"
          >
            Send Money
          </button>

          <button
            onClick={() =>
              navigate("/UserProfile", {
                state: user,
              })
            }
            className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl text-white font-semibold"
          >
            Profile
          </button>

          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

      {/* User Card */}

      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">

        <h2 className="text-lg font-semibold">
          Account Holder
        </h2>

        <div className="mt-4">
          <p className="text-2xl font-bold">
            {user.name}
          </p>

          <p className="opacity-80">
            {user.email}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm opacity-80">
            Current Balance
          </p>

          <p className="text-3xl font-bold">
            ₹ {user.balance?.toLocaleString()}
          </p>
        </div>

      </div>

      {/* Transactions */}

      <div className="space-y-4">

        {transactions.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-8 text-center text-slate-400">
            No Transactions Found
          </div>
        ) : (
          transactions.map((transaction) => {

            const isDebit =
              transaction.sender._id === user._id;

            return (
              <div
                key={transaction._id}
                className="bg-slate-900 rounded-2xl p-6 border border-slate-800"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="text-white text-lg font-semibold">
                      {isDebit
                        ? "Money Sent"
                        : "Money Received"}
                    </h3>

                    <p className="text-slate-400 text-sm mt-1">
                      {new Date(
                        transaction.createdAt
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div
                    className={`text-2xl font-bold ${isDebit
                        ? "text-red-500"
                        : "text-green-500"
                      }`}
                  >
                    {isDebit ? "-" : "+"} ₹
                    {transaction.amount.toLocaleString()}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">

                  {/* Sender */}

                  <div className="bg-slate-800 p-4 rounded-xl">

                    <h4 className="text-red-400 font-semibold mb-3">
                      Sender
                    </h4>

                    <p className="text-white">
                      {transaction.sender.name}
                    </p>

                    <p className="text-slate-400">
                      {transaction.sender.email}
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                      Card:
                      {" "}
                      {transaction.sender.cardNum}
                    </p>

                  </div>

                  {/* Receiver */}

                  <div className="bg-slate-800 p-4 rounded-xl">

                    <h4 className="text-green-400 font-semibold mb-3">
                      Receiver
                    </h4>

                    <p className="text-white">
                      {transaction.receiver.name}
                    </p>

                    <p className="text-slate-400">
                      {transaction.receiver.email}
                    </p>

                    <p className="text-slate-500 text-sm mt-2">
                      Card:
                      {" "}
                      {transaction.receiver.cardNum}
                    </p>

                  </div>

                </div>

              </div>
            );
          })
        )}

      </div>

    </div>
  );
};

export default UserTransaction;