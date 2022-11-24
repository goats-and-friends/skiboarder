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

  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [availability, setAvailability] = useState<Availability>(defaultAvail);
  const [availabilityValid, setAvailabilityValid] = useState<boolean>(true);

  const [interestLevel, setInterestLevel] = useState<string | null>(
    initialSurvey?.interestLevel || null
  );
  const [interestLevelValid, setInterestLevelValid] = useState<boolean>(true);
  const handleInterestLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterestLevel((event.target as HTMLInputElement).value);
    setSubmitted(false);
    setInterestLevelValid(true);
  };
  const [guests, setGuests] = useState<number | null>(
    initialSurvey?.guests || null
  );
  const [guestsValid, setGuestsValid] = useState<boolean>(true);
  const handleGuests = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(parseInt((event.target as HTMLInputElement).value));
    setSubmitted(false);
    setGuestsValid(true);
  };
  const [comment, setComment] = useState<string>(initialSurvey?.comment || "");
  const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment((event.target as HTMLInputElement).value);
    setSubmitted(false);
  };

  const submit = async () => {
    const survey = {
      availability,
      interestLevel,
      guests,
      comment,
    };
    setAvailabilityValid(
      Object.values(availability).filter((s) => s === null).length === 0
    );
    setInterestLevelValid(interestLevel !== null);
    setGuestsValid(guests !== null && !isNaN(guests));
    if (!availabilityValid || !interestLevelValid || !guestsValid) {
      return;
    }
    setSubmitted(true);
    const response = await fetch("/api/initial-survey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(survey),
    });
    if (!response.ok) {
      setSubmitted(false);
    } else {
      setSubmitSuccess(true);
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
            <Typography variant="h3">Initial Survey</Typography>
            <AvailabilityPicker
              valid={availabilityValid}
              setValid={setAvailabilityValid}
              state={availability}
              setState={setAvailability}
              setSubmitted={setSubmitted}
            />
            <FormControl>
              <FormLabel
                error={!interestLevelValid}
                id="demo-radio-buttons-group-label"
              >
                *How interested are you in the trip? (This is not a commitment.)
              </FormLabel>
              {interestLevelValid ? (
                ""
              ) : (
                <Typography variant="caption" color="error">
                  Response is required.
                </Typography>
              )}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="definitely"
                name="interest-level"
                onChange={handleInterestLevel}
                value={interestLevel}
              >
                <FormControlLabel
                  value="definitely"
                  control={<Radio />}
                  label="Definitely going; wouldn't miss it!"
                />
                <FormControlLabel
                  value="probably"
                  control={<Radio />}
                  label="Probably going, unless something else comes up"
                />
                <FormControlLabel
                  value="interested"
                  control={<Radio />}
                  label="Interested, but unlikely"
                />
              </RadioGroup>
            </FormControl>
            <FormControl
              error={!guestsValid}
              component="fieldset"
              variant="standard"
            >
              <FormLabel component="legend">
                *Roughly how many guests will join you?
              </FormLabel>
              {guestsValid ? (
                ""
              ) : (
                <Typography variant="caption" color="error">
                  Response is required.
                </Typography>
              )}
              <TextField
                type="number"
                error={!guestsValid}
                onChange={handleGuests}
                value={guests}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
              ></TextField>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Any other comment?</FormLabel>
              <TextField
                variant="outlined"
                multiline
                onChange={handleComment}
                value={comment}
              ></TextField>
            </FormControl>
            <Typography>*Required</Typography>
            <FormControl>
              <Button variant="contained" onClick={submit} disabled={submitted}>
                {submitted ? (
                  <>Submitted{submitSuccess ? <CheckCircleIcon /> : ""}</>
                ) : (
                  "Submit"
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
