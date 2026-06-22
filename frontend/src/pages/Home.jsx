import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

const Home = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true);
    const [loginType, setLoginType] = useState("user");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onChange",
    });

    const password = watch("password");
    const cvv = watch("cvv");

    const loginSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/login",
                {
                    email: data.email,
                    password: data.password,
                    loginType,
                }
            );

            reset();

            toast.success(res.data.message)

            const token = res.data.token

            localStorage.setItem("token", token)

            if (res.status === 200) {
                const dashboard = loginType === "user" ? "userDashboard" : "adminDashboard";

                navigate(`/${dashboard}`);
            }

        } catch (error) {
            reset();
            toast.error(error.response.data.message);
        }
    };

    const registerSubmit = async (data) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/register",
                {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    cvv: data.cvv,
                }
            );
            reset();

            toast.success(res.data.message);

            const token = res.data.token

            localStorage.setItem("token", token)

            if (res.status === 201) {
                navigate("/userDashboard");
            }

        } catch (error) {
            reset();
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex justify-center items-center px-4 py-10">

            <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-8 shadow-2xl">

                {/* Logo */}

                <div className="flex flex-col items-center mb-8">

                    <div className="w-20 h-20 rounded-full bg-linear-to-r from-emerald-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white mb-4">
                        ₹
                    </div>

                    <h1 className="text-5xl font-bold text-white">
                        Banking App
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Secure • Fast • Reliable
                    </p>

                </div>

                {/* Features */}

                <div className="grid grid-cols-3 gap-3 mb-8">

                    <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
                        <p className="text-2xl">🔒</p>
                        <p className="text-xs text-slate-300 mt-1">
                            Secure
                        </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
                        <p className="text-2xl">⚡</p>
                        <p className="text-xs text-slate-300 mt-1">
                            Fast
                        </p>
                    </div>

                    <div className="bg-slate-800 rounded-xl p-3 text-center border border-slate-700">
                        <p className="text-2xl">🛡️</p>
                        <p className="text-xs text-slate-300 mt-1">
                            Trusted
                        </p>
                    </div>

                </div>

                {/* Login Register Toggle */}

                <div className="flex bg-slate-800 rounded-xl p-1 mb-8">

                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setIsLogin(true);
                        }}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${isLogin
                                ? "bg-linear-to-r from-emerald-500 to-green-600 text-white"
                                : "text-slate-400"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setIsLogin(false);
                        }}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${!isLogin
                                ? "bg-linear-to-r from-blue-500 to-purple-600 text-white"
                                : "text-slate-400"
                            }`}
                    >
                        Register
                    </button>

                </div>

                {isLogin ? (
                    <form
                        onSubmit={handleSubmit(loginSubmit)}
                        className="space-y-5"
                    >

                        <div>
                            <label className="block text-slate-300 mb-2">
                                Login As
                            </label>

                            <select
                                value={loginType}
                                onChange={(e) => setLoginType(e.target.value)}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 outline-none"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                {...register("email")}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 outline-none"
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password")}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-emerald-500 outline-none"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-white font-bold text-lg transition"
                        >
                            Login
                        </button>

                    </form>
                ) : (
                    <form
                        onSubmit={handleSubmit(registerSubmit)}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            placeholder="Full Name"
                            {...register("name")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            {...register("email")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <input
                            type="password"
                            placeholder="CVV"
                            {...register("cvv")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <input
                            type="password"
                            placeholder="Confirm CVV"
                            {...register("confirmCvv")}
                            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-blue-500 outline-none"
                        />

                        <button
                            type="submit"
                            className="w-full py-4 bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-bold text-lg transition"
                        >
                            Register
                        </button>

                    </form>
                )}

                {/* Footer */}

                <div className="mt-8 pt-6 border-t border-slate-800 text-center">

                    <p className="text-slate-500 text-sm">
                        Banking Simulation Project
                    </p>

                    <p className="text-slate-600 text-xs mt-1">
                        Secure Digital Transactions • MERN Stack
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Home;