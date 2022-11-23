import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Hero from "../views/Hero";
import HowItWorks from "../views/HowItWorks";
import Values from "../views/Values";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Goats & Friends Ski Trip</title>
        <meta name="description" content="Party with the goats" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Values />
      <HowItWorks />

      <Footer />
    </div>
  );
};

export default Home;
