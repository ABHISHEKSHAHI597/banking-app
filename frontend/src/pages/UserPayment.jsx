import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserPayment = () => {
    

    const [receiverCardNumber, setReceiverCardNumber] = useState("");
    const [senderCardNumber, setSenderCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();

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

            const token = localStorage.getItem("token");

            const { data } = await axios.post(
                "http://localhost:5000/userPayment",
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

            setBalance(prev => prev - numAmount);
            
            toast.success(data.message);

            setReceiverCardNumber("");
            setSenderCardNumber("");
            setCvv("");
            setAmount("");

            console.log(data);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Payment failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">
            <div className="w-full max-w-2xl bg-slate-900 rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-white mb-8">
                    Send Money
                </h1>

                {/* Sender Details */}

                <div className="mb-8">
                    <h2 className="text-xl text-green-400 font-semibold mb-4">
                        Sender Details
                    </h2>

                    <div className="space-y-3">

                        <div className="bg-slate-800 p-3 rounded-lg text-white">
                            <strong>Name:</strong> {user.name}
                        </div>

                        <div className="bg-slate-800 p-3 rounded-lg text-white">
                            <strong>Email:</strong> {user.email}
                        </div>

                        <div className="bg-slate-800 p-3 rounded-lg text-white">
                            <strong>Balance:</strong> ₹
                            {user.balance.toLocaleString()}
                        </div>

                    </div>
                </div>

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
                            className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
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
                            className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
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
                            className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
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
                            className="w-full bg-slate-800 text-white p-3 rounded-lg outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                    >
                        {loading
                            ? "Processing..."
                            : "Send Money"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserPayment;