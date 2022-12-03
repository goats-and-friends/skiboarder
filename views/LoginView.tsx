import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn, ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const LoginView = ({
  csrfToken,
  promptText,
  consentText,
  providers,
}: {
  csrfToken: string;
  promptText: string;
  consentText: string;
  providers: Record<string, ClientSafeProvider>;
}) => {
  const router = useRouter();
  const { error } = router.query;
  let friendlyError = error;
  if (error === "OAuthAccountNotLinked") {
    friendlyError = "Account registered with email. Please use magic link.";
  }
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          transform: "rotate(11deg) translate(-40%, -10%)",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "70%",
          height: "150%",
          backgroundColor: "secondary.dark",
          zIndex: "-1",
        }}
      />

      <Stack justifyContent="center" height="100vh">
        <Card
          sx={{
            marginLeft: {
              xs: "8px",
              sm: "60px",
            },
            width: "360px",
          }}
        >
          <Stack spacing={2} padding={8}>
            <Link
              variant="h1"
              underline="none"
              color="inherit"
              href="/"
              sx={{
                fontSize: 24,
                textAlign: "center",
              }}
            >
              Goats & Friends Ski&nbsp;Trip
            </Link>
            <Box>{promptText}</Box>
            {error && (
              <Typography color="error">Error: {friendlyError}</Typography>
            )}
            <Stack spacing={2} divider={<Divider />}>
              <form action="/api/auth/signin/email" method="POST">
                <Stack spacing={2}>
                  <Input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <TextField
                    id="email"
                    name="email"
                    label="Email address"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                  <Button variant="contained" color="secondary" type="submit">
                    Send magic link
                  </Button>
                  <Typography variant="caption">
                    {consentText}I have read and agree to the{" "}
                    <Link href="/privacy" target="_new">
                      privacy policy
                    </Link>
                    .
                  </Typography>
                </Stack>
              </form>
              <Stack spacing={2}>
                {providers &&
                  Object.values(providers).map(
                    (provider: ClientSafeProvider) => {
                      if (provider.type === "oauth") {
                        return (
                          <div key={provider.name} style={{ marginBottom: 0 }}>
                            <Button
                              variant="outlined"
                              fullWidth
                              onClick={() => signIn(provider.id)}
                            >
                              Sign in with {provider.name}
                            </Button>
                          </div>
                        );
                      }
                    }
                  )}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </div>
  );
};

export default LoginView;
