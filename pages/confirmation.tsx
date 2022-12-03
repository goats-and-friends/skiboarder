import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Hero from "../views/Hero";
import HowItWorks from "../views/HowItWorks";
import Values from "../views/Values";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container sx={{ p: 2 }}>
        <Typography variant="h2">Response submitted</Typography>
        <Typography> Your survey response has been recorded. </Typography>
        <Typography>
          Click <Link href="/">here</Link> to edit your response.
        </Typography>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
