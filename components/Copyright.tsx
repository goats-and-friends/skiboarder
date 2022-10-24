import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ianonavy.com">
        Ian Naval
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      {" Icons made by "}
      <Link href="https://freepik.com">Freepik</Link>
      {" from "}
      <Link href="https://www.flaticon.com">www.flaticon.com</Link>
      {" are licensed by "}
      <Link href="https://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</Link>
    </Typography>
  );
}
