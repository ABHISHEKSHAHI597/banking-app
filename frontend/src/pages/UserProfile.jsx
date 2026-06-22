import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "";
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Profile
          </h1>

          <p className="text-slate-400 mt-1">
            Account Information
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/userDashboard")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white font-semibold transition"
          >
            Dashboard
          </button>

          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl text-white font-semibold transition"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Virtual Card */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">

        <h2 className="text-lg font-semibold">
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
            {formatCardNumber(user.cardNum)}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm opacity-80">
            Available Balance
          </p>

          <p className="text-3xl font-bold">
            ₹ {user.balance?.toLocaleString()}
          </p>
        </div>

      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 shadow-xl">

        {/* Avatar */}
        <div className="flex justify-center mb-8">

          <div className="w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-4xl font-bold text-white">
            {user.name?.charAt(0).toUpperCase()}
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <p className="text-slate-400 text-sm">
              User ID
            </p>

            <p className="text-white mt-2 break-all">
              {user._id}
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <p className="text-slate-400 text-sm">
              Name
            </p>

            <p className="text-white mt-2">
              {user.name}
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <p className="text-slate-400 text-sm">
              Email
            </p>

            <p className="text-white mt-2">
              {user.email}
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
            <p className="text-slate-400 text-sm">
              Card Number
            </p>

            <p className="text-white mt-2 font-mono tracking-widest">
              {formatCardNumber(user.cardNum)}
            </p>
          </div>

        </div>

        {/* Balance Card */}
        <div className="mt-8 bg-green-900/20 border border-green-500 rounded-2xl p-6">

          <p className="text-slate-300">
            Current Balance
          </p>

          <p className="text-4xl font-bold text-green-400 mt-2">
            ₹ {user.balance?.toLocaleString()}
          </p>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;