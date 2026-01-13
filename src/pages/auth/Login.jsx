import { useState } from "react";
import logo from "../../assets/logo.svg";
import styles from "./auth.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.heading}>
          <h3>Welcome to Note</h3>
          <p>Please log in to continue</p>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.passwordHeader}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <a href="#" className={styles.forgotLink}>
                Forgot?
              </a>
            </div>
            {/* Add an input wrapper to make the toggle button inside */}
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeButton}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#717784"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M6.42 17.73c-2.23-1.46-3.67-3.66-3.67-5.59 0-3.28 4.14-7.3 9.25-7.3 2.09 0 4.03.67 5.59 1.71M19.85 8.61c.891 1.13 1.41 2.38 1.41 3.53 0 3.28-4.15 7.3-9.26 7.3-.91 0-1.799-.13-2.63-.36"
                    />
                    <path
                      stroke="#717784"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M9.766 14.367a3.12 3.12 0 0 1-.925-2.23 3.159 3.159 0 0 1 5.394-2.24M15.11 12.7a3.158 3.158 0 0 1-2.538 2.541M19.892 4.25 4.118 20.024"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#717784"
                      fill-rule="evenodd"
                      d="M12.003 10.115c-1.332 0-2.412 1.036-2.412 2.315s1.08 2.316 2.412 2.316c1.332 0 2.412-1.037 2.412-2.316 0-1.28-1.08-2.315-2.412-2.315ZM8.09 12.43c0-2.075 1.752-3.755 3.912-3.755s3.912 1.68 3.912 3.755c0 2.074-1.752 3.756-3.912 3.756S8.09 14.504 8.09 12.43Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill="#717784"
                      fill-rule="evenodd"
                      d="M4.976 7.195A11.248 11.248 0 0 1 12.002 4.7a11.25 11.25 0 0 1 7.026 2.493c1.775 1.44 2.976 3.377 2.976 5.237 0 1.86-1.2 3.797-2.976 5.237a11.249 11.249 0 0 1-7.026 2.493 11.248 11.248 0 0 1-7.026-2.494C3.2 16.226 2 14.289 2 12.43s1.2-3.795 2.976-5.235Zm.968 1.1C4.37 9.571 3.5 11.14 3.5 12.43c0 1.29.87 2.859 2.444 4.136a9.71 9.71 0 0 0 6.058 2.154 9.712 9.712 0 0 0 6.058-2.153c1.574-1.277 2.444-2.846 2.444-4.137 0-1.291-.87-2.86-2.444-4.137a9.712 9.712 0 0 0-6.058-2.153 9.71 9.71 0 0 0-6.058 2.154Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <hr className={styles.separator}/>

        {/* OR LOG IN WTIH */}
        <div className={styles.logWith}>
          <p>Or log in with:</p>
          <button className={styles.buttonSecondary}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              fill="none"
              viewBox="0 0 24 25"
            >
              <path
                fill="#0E121B"
                fill-rule="evenodd"
                d="M20.838 14.718a8.932 8.932 0 0 0 .086-2.857.558.558 0 0 0-.557-.473h-7.805a.562.562 0 0 0-.562.562v2.206c0 .31.252.562.562.562h4.275c.176 0 .305.18.239.343-.935 2.31-3.39 3.826-6.132 3.32-2.106-.39-3.832-2.06-4.284-4.153a5.477 5.477 0 0 1 8.369-5.776.572.572 0 0 0 .73-.06l1.703-1.733a.559.559 0 0 0-.046-.832 8.897 8.897 0 0 0-5.161-1.815c-4.872-.135-9.091 3.823-9.25 8.694-.167 5.108 3.927 9.302 8.995 9.302 4.383 0 8.037-3.14 8.838-7.29Z"
                clip-rule="evenodd"
              />
            </svg>
            Google
          </button>
          <br />
          <hr className={styles.separator} />
        </div>
      </div>
    </div>
  );
}

export default Login;
