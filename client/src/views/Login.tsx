
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { login } from "../services/auth";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


const Login = () => {
    const navigate: NavigateFunction = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const initialValues: {
        username: string;
        password: string;
    } = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue: { username: string; password: string }) => {
        const { username, password } = formValue;

        setMessage("");
        setLoading(true);

        login(username, password).then(
            () => {
                navigate("/home");
                // window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };
    return (
        <><div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-black">

            </div>

            <div className="w-full bg-gradient-to-r from-rose-100 to-teal-100 lg:w-1/2 flex items-center justify-center">

                <div className="max-w-md w-full p-6">
                    <p className="mb-1 leading-relaxed">username administrator : admin</p>
                    <p className="mb-1 leading-relaxed">password : admin123</p>
                    <p className="mb-1 leading-relaxed">username customer : customer </p>
                    <p className="mb-1 leading-relaxed">password : 123</p>
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                        Login
                    </h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Field name="username" type="text" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="text-sm text-red-500 mt-2"
                                />

                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field name="password" type="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-500 mt-2"
                                />

                            </div>
                            <div>
                                <label className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        className="mr-2 w-4 h-4"

                                    />
                                    <span className="text-sm text-gray-600">
                                        Show password
                                    </span>
                                </label>
                            </div>

                            <div>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                                >
                                    {loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    Login
                                </Button>
                            </div>
                            {message && (
                                <div className="form-group">
                                    <div className="text-sm text-red-500 mt-2" role="alert">
                                        {message}
                                    </div>
                                </div>
                            )}
                        </Form></Formik>



                </div>
            </div>
        </div></>
    )
}

export default Login