import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import Stack from "@mui/material/Stack";
import type { DefaultSession } from "next-auth";
import Avatar from "@mui/material/Avatar";

function formatDisplayName(user?: DefaultSession["user"]) {
  return user?.name;
}

export default function Header() {
  const rightLink = {
    fontSize: { xs: 14, md: 16 },
    ml: 3,
  };
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const image = session?.user?.image;
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
        <Box sx={{ flex: { xs: 0, sm: 1 } }} />
        <Link
          variant="h1"
          underline="none"
          color="inherit"
          href="/"
          sx={{
            fontSize: { xs: 14, sm: 18, md: 24 },
            width: { xs: 100, sm: "inherit" },
          }}
        >
          Goats & Friends Ski&nbsp;Trip
        </Link>
        <Box sx={{ flex: 1 }} className={`nojs-show`}>
          <Stack
            sx={{ flex: 1 }}
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            spacing={2}
          >
            {(status === "loading" && <></>) ||
              (session?.user && (
                <>
                  <Avatar alt={session.user.name || "Hi"} src={image} />

                  <Stack>
                    <small>Signed in as</small>
                    <strong>
                      {formatDisplayName(session.user) || "Anonymous"}
                    </strong>
                  </Stack>

                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    component="a"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </>
              )) || (
                <>
                  <Link
                    variant="h6"
                    underline="none"
                    href="/login"
                    color="inherit"
                    sx={{ ...rightLink }}
                  >
                    {"Log in"}
                  </Link>
                  <Link
                    variant="h6"
                    underline="none"
                    href="/register"
                    sx={{ ...rightLink, color: "secondary.main" }}
                  >
                    {"Sign up"}
                  </Link>
                </>
              )}
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
