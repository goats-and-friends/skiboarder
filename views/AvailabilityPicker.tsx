import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import parseJSON from "date-fns/parseJSON";
import intlFormat from "date-fns/intlFormat";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import addDays from "date-fns/addDays";
import useMediaQuery from "@mui/material/useMediaQuery";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

function getDates() {
  return eachWeekOfInterval(
    {
      start: new Date(2023, 1, 1),
      end: new Date(2023, 4, 1),
    },
    {
      weekStartsOn: 5, // Friday
    }
  );
}

enum Status {
  Unavailable = "unavailable",
  Available = "available",
  Preferred = "preferred",
}

type Availability = {
  [key: string]: Status;
};

export default function AvailabilityPicker() {
  const q1Weekends = getDates();
  const availability: Availability = {};
  for (const date of q1Weekends) {
    availability[date.toJSON()] = Status.Available;
  }
  const [state, setState] = React.useState<Availability>(availability);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  function handleChange(key: string, status: Status) {
    setState({
      ...state,
      [key]: status,
    });
  }

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">
        What dates are you currently available?
      </FormLabel>
      {isMobile ? (
        <Box mb={2}>
          <Stack direction="row" alignItems="center">
            <CancelIcon /> Unavailable
          </Stack>
          <Stack direction="row" alignItems="center">
            <CheckCircleIcon /> Available
          </Stack>
          <Stack direction="row" alignItems="center">
            <StarIcon /> Preferred
          </Stack>
        </Box>
      ) : (
        ""
      )}
      <FormGroup>
        <Stack spacing={1}>
          {Object.keys(state).map((key) => {
            const date = parseJSON(key);
            const status = state[key];
            return (
              <Stack key={key} direction="row" alignItems="center" spacing={1}>
                <ToggleButtonGroup
                  key="controls"
                  exclusive
                  value={status}
                  onChange={(
                    e: React.MouseEvent<HTMLElement>,
                    value: Status
                  ) => {
                    console.log(key);
                    return handleChange(key, value);
                  }}
                  aria-label="availability"
                  size="small"
                >
                  <ToggleButton
                    value={Status.Unavailable}
                    color="error"
                    aria-label="unavailable"
                  >
                    {isMobile ? (
                      <CancelIcon />
                    ) : (
                      <>
                        <CancelIcon fontSize="small" />
                        Can't Go
                      </>
                    )}
                  </ToggleButton>
                  <ToggleButton
                    value={Status.Available}
                    color="success"
                    aria-label="available"
                  >
                    {isMobile ? (
                      <CheckCircleIcon />
                    ) : (
                      <>
                        <CheckCircleIcon fontSize="small" />
                        Avail
                      </>
                    )}
                  </ToggleButton>
                  <ToggleButton
                    value={Status.Preferred}
                    color="secondary"
                    aria-label="preferred"
                  >
                    {isMobile ? (
                      <StarIcon />
                    ) : (
                      <>
                        <StarIcon fontSize="small" />
                        Prefer
                      </>
                    )}
                  </ToggleButton>
                </ToggleButtonGroup>
                <Typography key="date">
                  {intlFormat(date, {
                    weekday: isMobile ? "short" : "long",
                    month: isMobile ? "numeric" : "long",
                    day: "numeric",
                  }).replace(" ", "\u00A0")}{" "}
                  to{" "}
                  {intlFormat(addDays(date, 2), {
                    weekday: isMobile ? "short" : "long",
                    month: isMobile ? "numeric" : "long",
                    day: "numeric",
                  }).replace(" ", "\u00A0")}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </FormGroup>
    </FormControl>
  );
}
