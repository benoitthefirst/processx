"use client";
import {
  Container,
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import BootstrapInput from "../../../../components/BootstrapInput";

export default function ProfilePage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [staffNumber, setStaffNumber] = React.useState("");
  const [idNumber, setIdNumber] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const onSave = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      staffNumber: staffNumber,
      idNumber: idNumber
    }

    console.log("paload: ", payload);
  }

  const onChangePassword = () => {
    if(newPassword !== confirmPassword){
      //To-Do: Show message
      return;
    }

    const payload = {
      oldPassword: oldPassword,
      newPassowrd: newPassword
    }

    console.log("paload: ", payload);
  }
  return (
    <>
      <Head>
        <title>ProcessX Business Portal</title>
        <meta name="description" content="The ProcessX Business Portal allows you to track your credit card sales, view reports, manage your business and sell online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          height: { xs: "100vh", sm: "100%" },
          mt: 5,
          padding: { xs: 0, sm: 3 },
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ fontSize: 40, fontWeight: 800, mb: 5 }}
        >
          My Account
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800 }}
        >
          Basic Information
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16,mt:1 }}>
          You can sign in with either your email address or your mobile number.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="firstName">
                First Name
              </InputLabel>
              <BootstrapInput
                placeholder="First name"
                id="firstName"
                name="firstName"
                autoFocus
                required
                disabled
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="lastName">
                Last Name
              </InputLabel>
              <BootstrapInput
                placeholder="Last name"
                id="lastName"
                name="lastName"
                required
                disabled
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="email">
                Email
              </InputLabel>
              <BootstrapInput
                placeholder="user@example.com"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="mobileNumber">
                Mobile Number
              </InputLabel>
              <BootstrapInput
                placeholder="080 000 0000"
                id="mobileNumber"
                name="mobileNumber"
                required
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="staffNumber">
                Staff Number
              </InputLabel>
              <BootstrapInput
                placeholder="Staff Number"
                id="staffNumber"
                name="staffNumber"
                value={staffNumber}
                onChange={(e) => setStaffNumber(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="idNumber">
                ID Number
              </InputLabel>
              <BootstrapInput
                placeholder=""
                id="idNumber"
                name="idNumber"
                disabled
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <Button
              autoFocus
              size="medium"
              variant="contained"
              color="secondary"
              disableElevation
              onClick={onSave}
            >
              Save
            </Button>
          </Grid>
        </Grid>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800,mt:4 }}
        >
          Change Password
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16,mt:1 }}>
        To change your password, please fill in your old password as well as the new password you want to use.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="oldPassword">
                Old password
              </InputLabel>
              <BootstrapInput
                placeholder="Old password"
                id="oldPassword"
                name="oldPassword"
                autoFocus
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="newPassword">
              Password
              </InputLabel>
              <BootstrapInput
                placeholder="New Password"
                id="newPassword"
                name="newPassword"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="confimPassword">
                Confim Password
              </InputLabel>
              <BootstrapInput
                placeholder="Confim Password"
                id="confimPassword"
                name="confimPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Button
              autoFocus
              size="medium"
              variant="contained"
              color="secondary"
              disableElevation
              sx={{
                bgcolor: "#000",
                color: "#fff",
                borderRadius: 2,
              }}
              onClick={onChangePassword}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
