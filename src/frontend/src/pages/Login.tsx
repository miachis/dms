import { Link } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import styles from "../static/Login.module.css";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section>
      <BackButton />
      <div id={styles.loginContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
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
