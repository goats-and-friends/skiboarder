import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Copyright } from "./Copyright";

export function Footer() {
  return (
    <>
      <Typography variant="body2" color="text.secondary" align="center">
        <Link color="inherit" href="/privacy">
          Privacy
        </Link>
        {" | "}
        <Copyright />
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Disclaimer: this website is just for fun and not a commercial
        enterprise. Participants understand this website organizes a single
        particular ski trip and is not open to the general public.
      </Typography>
    </>
  );
}
