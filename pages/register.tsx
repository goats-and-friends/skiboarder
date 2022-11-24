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
  providers: Record<string, ClientSafeProvider>;
}) => {
  return (
    <LoginView
      csrfToken={csrfToken}
      providers={providers}
      promptText={
        "Thanks for considering joining the ski\u00A0trip! We'll create you an account if it doesn't already exist. Sign in below:"
      }
      consentText={
        "By registering a new account, I consent to receive emails relating to the ski trip. "
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
