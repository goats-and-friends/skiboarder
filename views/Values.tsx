import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SxProps } from "@mui/system";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

export default function Values() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const bgColor = `secondary.${prefersDarkMode ? "dark" : "light"}`;
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: bgColor }}
    >
      <Container sx={{ mt: 15, mb: 30, display: "flex", position: "relative" }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
          }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/6251/6251331.png"
                alt="cabin"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Ski-in / ski-out condos
              </Typography>
              <Typography variant="h5">
                {"Each unit has direct access to the chair lifts so that "}
                {"those who ski or snowboard can make the best of their time."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/5021/5021715.png"
                alt="ski lift"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                New memories
              </Typography>
              <Typography variant="h5">
                {"Whether you plan to ski or not, you're bound to enjoy "}
                {"creating new memories with your fellow goats and friends."}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box
                component="img"
                src="https://cdn-icons-png.flaticon.com/512/1052/1052873.png"
                alt="wallet"
                sx={{ height: 55 }}
              />
              <Typography variant="h6" sx={{ my: 5 }}>
                Exclusive rates
              </Typography>
              <Typography variant="h5">
                {"By signing up with the group, you will access specially "}
                {"negotiated rates that you will not find booking direct."}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
