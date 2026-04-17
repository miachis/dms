import styles from "../static/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import type {
  Inputs,
  APIErrorResponse,
  APIResponse,
} from "../types/signUpTypes";

export function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const password = watch("password");

  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string[]>([""]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("https://dms-3p9o.onrender.com/api/users", {
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
          });
          setApiError(() => newArray);
          return;
        }
        setApiError([result.error]);
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
      <div id={styles.formContainer}>
        <form id={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <h1>Register</h1>
          {apiError.length > 1 ? (
            apiError.map((err) => <p style={{ color: "red" }}>{err}</p>)
          ) : (
            <p style={{ color: "red" }}>{apiError[0]}</p>
          )}
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className={styles.errorMsg}>{errors.email.message}</span>
          )}
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter a username"
          />
          {errors.username && (
            <span className={styles.errorMsg}>{errors.username.message}</span>
          )}
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be 8 characters long",
              },
            })}
            placeholder="Create your password"
          />
          {errors.password && (
            <span className={styles.errorMsg}>{errors.password.message}</span>
          )}
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm password correctly",
              validate: (value) => {
                return value === password || "Passwords do not match";
              },
            })}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className={styles.errorMsg}>
              {errors.confirmPassword.message}
            </span>
          )}
          <button type="submit" id={styles.signUpBtn}>
            Register
          </button>
          <p id={styles.p}>
            Already have an account?{" "}
            <Link to={"/login"} id={styles.loginLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
