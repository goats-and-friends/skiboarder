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
      <Container>
        <Typography variant="h3">Privacy Policy</Typography>
        <Typography>Last updated: 2022-11-23</Typography>
        <Typography>
          <ul>
            <li>
              We collect the personal information you provide to us in order to
              provide you with services (ski trip planning). Personal data we
              collect includes but is not limited to: names, and contact
              information.
            </li>
            <li>
              We will not sell your personal data or use your data for any
              reason other than to provide and improve our services.
            </li>
            <li>
              We do not consider any information you provide to be sensitive,
              including dietary restrictions.
            </li>
            <li>
              We automatically collect data such as your IP address and
              browser/device characteristics for logging purposes only.
            </li>
            <li>
              You can request the deletion of your personal data via email to{" "}
              <Link
                href="mailto:privacy@ski.goatsandfriends.com"
                underline="hover"
                color="secondary"
              >
                privacy@ski.goatsandfriends.com
              </Link>
              . We will honor your request within 30 days after verifying your
              identity.
            </li>
            <li>
              First party cookies are required for authentication; otherwise, we
              do not use cookies.
            </li>
            <li>We do not use any third party tracking services.</li>
            <li>
              We may disclose your information as legally required by government
              authorities.
            </li>
            <li>We may update this policy at any time without notice.</li>
          </ul>
        </Typography>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;
