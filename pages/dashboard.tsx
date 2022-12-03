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
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import PollIcon from "@mui/icons-material/Poll";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
    include: {
      initialSurvey: {
        include: {
          availabilities: true,
        },
      },
    },
  });
  const initialSurvey = user?.initialSurvey;
  return { props: { initialSurvey } };
};

type AppProps = {
  initialSurvey: InitialSurvey & { availabilities: Availability[] };
};

const Home: NextPage<AppProps> = ({ initialSurvey }: AppProps) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const defaultAvail: Availability = {};
  if (initialSurvey) {
    for (const date of initialSurvey.availabilities) {
      if (date.date) {
        defaultAvail[date.date] = date.status;
      }
    }
  } else {
    const q1Weekends = get2023Dates();
    for (const date of q1Weekends) {
      defaultAvail[format(date, "yyyy-MM-dd")] = null;
    }
  }

  let profileComplete = false;
  if (session !== undefined && session?.user !== undefined) {
    const name = session?.user.name;
    profileComplete = name !== null && name !== undefined;
  }

  const router = useRouter();

  const openProfile = () => {
    router.push("/profile");
  };
  const openSurvey = () => {
    router.push("/initial-survey");
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
          <Stack sx={{ mt: 4, mb: 4 }} spacing={2}>
            <Typography variant="h2">Welcome!</Typography>
            <Typography>
              This is your home for all things Ski Trip. Keep checking back for
              new tasks, and be on the lookout for updates in your email.
            </Typography>
            <Typography variant="h3">Your tasks</Typography>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem disablePadding>
                <ListItemButton onClick={openProfile}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Set your profile" />
                  {profileComplete ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemButton>
              </ListItem>
              <Divider variant="inset"></Divider>
              <ListItem disablePadding>
                <ListItemButton onClick={openSurvey}>
                  <ListItemIcon>
                    <PollIcon />
                  </ListItemIcon>
                  <ListItemText primary="Complete interest survey" />
                  {initialSurvey ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </ListItemButton>
              </ListItem>
            </List>
          </Stack>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
