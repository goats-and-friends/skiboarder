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
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Copyright } from "../components/Copyright";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import AvailabilityPicker from "../views/AvailabilityPicker";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    setSubmitted(true);
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
            <AvailabilityPicker />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                How interested are you to the trip? (This is not a commitment.)
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="definitely"
                name="interest-level"
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
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">
                How many guests do you represent?
              </FormLabel>
              <TextField type="number"></TextField>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Any other comment?</FormLabel>
              <TextField variant="outlined" multiline></TextField>
            </FormControl>
            <FormControl>
              <Button variant="contained" onClick={submit} disabled={submitted}>
                {submitted ? "Submitted" : "Submit"}
              </Button>
            </FormControl>
          </Stack>
        )}
      </Container>
      <Copyright />
    </div>
  );
};

export default Home;
