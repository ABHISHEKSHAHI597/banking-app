import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"

const UserPayment = () => {
    const [receiverCardNumber, setReceiverCardNumber] = useState("");
    const [senderCardNumber, setSenderCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const logoutHandler = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await api.get(
                    "/getUser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(data.user);
            } catch (error) {
                toast.error("Failed to fetch user details");
            }
        };

        getUser();
    }, [token]);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!user) return;

        if (!receiverCardNumber.trim()) {
            return toast.error("Receiver card number is required");
        }

        if (receiverCardNumber.length !== 12) {
            return toast.error("Receiver card number must be 12 digits");
        }

        if (receiverCardNumber === user.cardNum) {
            return toast.error("Cannot send money to yourself");
        }

        if (!senderCardNumber.trim()) {
            return toast.error("Enter your card number");
        }

        if (senderCardNumber !== user.cardNum) {
            return toast.error("Invalid sender card number");
        }

        if (!cvv.trim()) {
            return toast.error("Enter CVV");
        }

        if (!amount) {
            return toast.error("Enter amount");
        }

        const numAmount = Number(amount);

        if (isNaN(numAmount)) {
            return toast.error("Amount must be numeric");
        }

        if (numAmount <= 0) {
            return toast.error("Amount must be greater than 0");
        }

        if (numAmount > user.balance) {
            return toast.error("Insufficient balance");
        }

        try {
            setLoading(true);

            const paymentResponse = await api.post(
                "/userPayment",
                {
                    receiverCardNumber,
                    senderCardNumber,
                    cvv,
                    amount: numAmount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const userResponse = await api.get(
                "/getUser",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(userResponse.data.user);

            toast.success(paymentResponse.data.message);

            setReceiverCardNumber("");
            setSenderCardNumber("");
            setCvv("");
            setAmount("");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Payment failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const formatCardNumber = (cardNum) => {
        if (!cardNum) return "";
        return cardNum.replace(/(\d{4})(?=\d)/g, "$1 ");
    };

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
                        Send Money
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Secure Money Transfer
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
                        onClick={() =>
                            navigate("/UserProfile", {
                                state: user,
                            })
                        }
                        className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl text-white font-semibold transition"
                    >
                        Profile
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

            <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl mb-8">

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

            {/* Payment Form */}

            <div className="max-w-3xl mx-auto bg-slate-900 rounded-3xl p-8 shadow-xl">

                <form
                    onSubmit={handlePayment}
                    className="space-y-5"
                >

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Receiver Card Number
                        </label>

                        <input
                            type="text"
                            value={receiverCardNumber}
                            onChange={(e) =>
                                setReceiverCardNumber(
                                    e.target.value
                                )
                            }
                            placeholder="Enter receiver card number"
                            className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 p-4 rounded-xl text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Your Card Number
                        </label>

                        <input
                            type="text"
                            value={senderCardNumber}
                            onChange={(e) =>
                                setSenderCardNumber(
                                    e.target.value
                                )
                            }
                            placeholder="Verify your card number"
                            className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 p-4 rounded-xl text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            CVV
                        </label>

                        <input
                            type="password"
                            value={cvv}
                            onChange={(e) =>
                                setCvv(e.target.value)
                            }
                            placeholder="Enter CVV"
                            className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 p-4 rounded-xl text-white outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Amount
                        </label>

                        <input
                            type="number"
                            value={amount}
                            onChange={(e) =>
                                setAmount(e.target.value)
                            }
                            placeholder="Enter amount"
                            className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 p-4 rounded-xl text-white outline-none"
                        />
                    </div>

                    {/* Summary */}

                    <div className="bg-slate-800 rounded-xl p-4">

                        <h3 className="text-white font-semibold mb-3">
                            Payment Summary
                        </h3>

                        <div className="flex justify-between">
                            <span className="text-slate-400">
                                Transfer Amount
                            </span>

                            <span className="text-green-400 font-bold">
                                ₹ {amount || 0}
                            </span>
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-xl text-lg font-bold transition"
                    >
                        {loading
                            ? "Processing Transfer..."
                            : "Send Money 💸"}
                    </button>

                </form>

                {/* Tips */}

                <div className="mt-8 bg-slate-800 rounded-xl p-5">

                    <h3 className="text-green-400 font-semibold mb-3">
                        Transfer Tips
                    </h3>

                    <ul className="text-slate-300 text-sm space-y-2">
                        <li>
                            • Verify receiver card number carefully.
                        </li>

                        <li>
                            • Ensure sufficient balance before transfer.
                        </li>

                        <li>
                            • Never share your CVV with anyone.
                        </li>

                        <li>
                            • Completed transfers cannot be reversed.
                        </li>
                    </ul>

                </div>

            </div>

        </div>
    );
};

export default UserPayment;