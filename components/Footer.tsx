import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Copyright } from "./Copyright";

export function Footer() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      <Link color="inherit" href="/privacy">
        Privacy
      </Link>
      {" | "}
      <Copyright />
    </Typography>
  );
}
