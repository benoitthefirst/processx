import * as React from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel } from "@mui/material";
import BootstrapInput from "../../components/BootstrapInput";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://processx.co.za/">
        ProcessX
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    background: {
      default: "#e7edeb",
    },
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper
          sx={{
            backgroundColor: "#fff",
            marginTop: 8,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src="/logo.png" width={130} height={60} alt="ProcessX Logo" />
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 40, fontWeight: 800, mt: 5 }}
          >
            Let's Grow
          </Typography>
          <Typography
            component="h2"
            variant="h5"
            sx={{ fontWeight: 600, mt: 1 }}
          >
            The easiest way to accept payments
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink htmlFor="bootstrap-input">
                Email Address
              </InputLabel>
              <BootstrapInput
                placeholder="Please enter your email address"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                required
              />
            </FormControl>
            <FormControl variant="standard" fullWidth sx={{ mt: 2, mb: 3 }}>
              <InputLabel shrink htmlFor="bootstrap-input">
                Email Address
              </InputLabel>
              <BootstrapInput
                placeholder="Please enter your password"
                id="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </FormControl>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button type="submit" fullWidth variant="contained">
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
