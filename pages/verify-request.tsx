import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Image from "next/image";

const VerifyRequest = () => {
  return (
    <>
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
            <Image
              src="/vercel.svg"
              width="196px"
              height="64px"
              alt="App Logo"
            />
            <Box>
              A verification link has been sent. Please check your email.
            </Box>
          </Stack>
        </Card>
      </Stack>
    </>
  );
};

export default VerifyRequest;
