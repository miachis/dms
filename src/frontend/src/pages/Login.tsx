import { Link, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import styles from "../static/Login.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type APIResponse, type APIErrorResponse } from "../types/signUpTypes";
import { useState } from "react";

interface Inputs {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [apiErrors, setApiErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result: APIResponse = await response.json();

      if (result.error) {
        if (Array.isArray(result.error)) {
          const newArray: string[] = [];
          result.error.map((err: APIErrorResponse) => {
            newArray.push(err.msg);
            setApiErrors(() => newArray);
            return;
          });
        }
        setApiErrors([result.error]);
        return;
      }

      if (result.token) {
        localStorage.setItem("access_token", result.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <BackButton />
      <div id={styles.loginContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {apiErrors.length > 1 ? (
            apiErrors.map((err) => <p>{err}</p>)
          ) : (
            <p>{apiErrors[0]}</p>
          )}
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className={styles.errorMsg}>{errors.email.message}</span>
          )}
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters long",
              },
            })}
          />
          {errors.password && (
            <span className={styles.errorMsg}>{errors.password.message}</span>
          )}
          <button type="submit" id={styles.loginBtn}>
            Login
          </button>
          <p id={styles.p}>
            New here?{" "}
            <Link to={"/register"} id={styles.registerLink}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
