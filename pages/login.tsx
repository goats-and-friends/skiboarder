import { GetServerSideProps } from "next";
import {
  getCsrfToken,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import LoginView from "../views/LoginView";

const Login = ({
  csrfToken,
  providers,
}: {
  csrfToken: string;
  providers: ClientSafeProvider[];
}) => {
  return (
    <LoginView
      csrfToken={csrfToken}
      providers={providers}
      promptText={
        "Welcome back! Request a sign-\u2060in link to your email, or sign\u00A0in with Google."
      }
    />
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async function (context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
};
