import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import format from "date-fns/format";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { Availability, get2023Dates, Status } from "../lib/availability";
import styles from "../styles/Home.module.css";
import AvailabilityPicker from "../views/AvailabilityPicker";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { InitialSurvey, PrismaClient } from "@prisma/client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (
    session === undefined ||
    session?.user === undefined ||
    session?.user?.email === undefined ||
    session?.user?.email === null
  ) {
    return { props: {} };
  }
  const userEmail = session?.user.email;
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  const dbName = user?.name;
  return { props: { dbName } };
};

type AppProps = {
  dbName: string;
};

const Home: NextPage<AppProps> = ({ dbName }: AppProps) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [name, setName] = useState<string | null>(dbName || null);
  const [nameValid, setNameValid] = useState<boolean>(true);
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName((event.target as HTMLInputElement).value);
    setSubmitted(false);
    setNameValid(true);
  };

  const submit = async () => {
    const profile = {
      name,
    };
    setNameValid(name !== null && name !== "");
    if (!nameValid) {
      return;
    }
    setSubmitted(true);
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      setSubmitted(false);
    } else {
      setSubmitSuccess(true);
      router.push("/");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Goats & Friends Ski Trip</title>
        <meta
          name="description"
          content="Goats and friends ski trip planning website."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        {(loading && <>loading</>) || (
          <Stack sx={{ mt: 4, mb: 4 }} spacing={4}>
            <Typography variant="h2">Your Profile</Typography>
            <FormControl
              error={!nameValid}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">*Full name</FormLabel>
              {nameValid ? (
                ""
              ) : (
                <Typography variant="caption" color="error">
                  Response is required.
                </Typography>
              )}
              <TextField
                error={!nameValid}
                onChange={handleName}
                value={name}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              ></TextField>
            </FormControl>
            <Typography>*Required</Typography>
            <FormControl>
              <Button variant="contained" onClick={submit} disabled={submitted}>
                {submitted ? (
                  <>Saved{submitSuccess ? <CheckCircleIcon /> : ""}</>
                ) : (
                  "Save"
                )}
              </Button>
            </FormControl>
          </Stack>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
