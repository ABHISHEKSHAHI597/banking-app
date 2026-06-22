import { useLocation } from "react-router-dom";

const UserProfile = () => {
    const location = useLocation();
    const user = location.state

  const formatCardNumber = (cardNumber) => {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Profile
        </h1>

        <div className="space-y-5">

          {/* User ID */}
          <div>
            <p className="text-slate-400 text-sm">User ID</p>
            <div className="bg-slate-800 p-3 rounded-lg text-white">
              {user._id}
            </div>
          </div>

          {/* Name */}
          <div>
            <p className="text-slate-400 text-sm">Name</p>
            <div className="bg-slate-800 p-3 rounded-lg text-white">
              {user.name}
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="text-slate-400 text-sm">Email</p>
            <div className="bg-slate-800 p-3 rounded-lg text-white">
              {user.email}
            </div>
          </div>

          {/* Card Number */}
          <div>
            <p className="text-slate-400 text-sm">Card Number</p>
            <div className="bg-slate-800 p-3 rounded-lg text-white font-mono tracking-widest">
              {formatCardNumber(user.cardNum)}
            </div>
          </div>

          {/* Balance */}
          <div>
            <p className="text-slate-400 text-sm">Current Balance</p>
            <div className="bg-green-900/20 border border-green-500 p-4 rounded-lg text-2xl font-bold text-green-400">
              ₹ {user.balance.toLocaleString()}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;