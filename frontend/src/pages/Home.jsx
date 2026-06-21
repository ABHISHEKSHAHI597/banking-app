import { useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
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

    const loginSubmit = (data) => {
        console.log("Login Data:", {
            ...data,
            loginType,
        });

        reset();

        
    };

    const registerSubmit = (data) => {
        const {
            confirmPassword,
            confirmCvv,
            ...userData
        } = data;

        console.log("Register Data:", userData);

        reset();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex justify-center items-center px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">

                <h1 className="text-4xl font-bold text-center text-white mb-2">
                    Banking App
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Secure Banking
                </p>

                <div className="flex bg-slate-800 rounded-lg p-1 mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            reset();
                            setIsLogin(true);
                        }}
                        className={`flex-1 py-2 rounded-md transition ${isLogin
                                ? "bg-emerald-600 text-white"
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
                        className={`flex-1 py-2 rounded-md transition ${!isLogin
                                ? "bg-emerald-600 text-white"
                                : "text-slate-400"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {isLogin ? (
                    <form
                        onSubmit={handleSubmit(loginSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block text-slate-300 mb-2">
                                Login As
                            </label>

                            <select
                                value={loginType}
                                onChange={(e) =>
                                    setLoginType(e.target.value)
                                }
                                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
                            >
                                <option value="user">
                                    User
                                </option>

                                <option value="admin">
                                    Admin
                                </option>
                            </select>
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required:
                                        "Email is required",
                                })}
                                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
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
                                {...register("password", {
                                    required:
                                        "Password is required",
                                })}
                                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-white font-semibold"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSubmit(registerSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register("name", {
                                    required:
                                        "Name is required",
                                })}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
                            />

                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required:
                                        "Email is required",
                                })}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
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
                                {...register("password", {
                                    required:
                                        "Password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                    maxLength: {
                                        value: 16,
                                        message:
                                            "Password must be at most 16 characters",
                                    },
                                })}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                {...register(
                                    "confirmPassword",
                                    {
                                        required:
                                            "Please confirm your password",
                                        validate: (
                                            value
                                        ) =>
                                            value ===
                                            password ||
                                            "Passwords do not match",
                                    }
                                )}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
                            />

                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        errors
                                            .confirmPassword
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="CVV"
                                maxLength={3}
                                {...register("cvv", {
                                    required:
                                        "CVV is required",
                                    pattern: {
                                        value: /^\d{3}$/,
                                        message:
                                            "CVV must be exactly 3 digits",
                                    },
                                })}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
                            />

                            {errors.cvv && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cvv.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirm CVV"
                                maxLength={3}
                                {...register(
                                    "confirmCvv",
                                    {
                                        required:
                                            "Please confirm your CVV",
                                        validate: (
                                            value
                                        ) =>
                                            value ===
                                            cvv ||
                                            "CVVs do not match",
                                    }
                                )}
                                className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white"
                            />

                            {errors.confirmCvv && (
                                <p className="text-red-500 text-sm mt-1">
                                    {
                                        errors
                                            .confirmCvv
                                            .message
                                    }
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition"
                        >
                            Register
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Home;