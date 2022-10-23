import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

export default function Header() {
  const rightLink = {
    fontSize: 16,
    ml: 3,
  };
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }} />
        <Link
          variant="h6"
          underline="none"
          color="inherit"
          href="/"
          sx={{ fontSize: 24 }}
        >
          {"Goats and Friends Ski Trip"}
        </Link>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Link
            variant="h6"
            underline="none"
            href="/signup"
            sx={{ ...rightLink, color: "secondary.main" }}
          >
            {"Sign Up"}
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
