'use client';

import { login } from "@/app/api/server-actions/user.actions";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const { register, handleSubmit, reset } = useForm<any>({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const router = useRouter();
    
    const onSubmit = async (values: any) => {
        try {
            reset();
            const user = await login(values);

            if (!!user) {
                localStorage.setItem("user", JSON.stringify(user));
                router.replace("/view-insights");
            }
        } catch (e) {
            // TODO: process error
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <p className="text-4xl font-bold text-gray-900 mb-6 text-center">Authenticate</p>      
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            {...register("password")}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                            placeholder="example_pass"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
