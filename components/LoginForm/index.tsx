/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import styles from "./loginform.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { login } from "@/actions/clientauth.action";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/");
  }, [state?.success, router]);
  const handleProviderSignIn = async (provider: string) => {
    try {
      await signIn(provider);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };
  return (
    <>
      <div>
        <button
          className={styles.button}
          onClick={() => handleProviderSignIn("google")}
        >
          Login with Google
        </button>
        <button
          className={styles.button}
          onClick={() => handleProviderSignIn("github")}
        >
          Login with Github
        </button>
      </div>
      <form className={styles.form} action={formAction}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
        {state?.error}
        <Link href="/register">
          {"Don't have an account?"} <b>Register</b>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
