import { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import styles from "./Login.module.css";

export function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>NX</div>
          <h1 className={styles.title}>Nexus Roadmap</h1>
          <p className={styles.subtitle}>Sign in to save your progress</p>
        </div>

        <button 
          className={styles.googleBtn} 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Continue with Google
        </button>

        <div className={styles.divider}>
          <span>or continue with email</span>
        </div>

        <form className={styles.form} onSubmit={handleEmailAuth}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="name@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button className={styles.submitBtn} type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button className={styles.toggleBtn} onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
