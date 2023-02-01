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
import BootstrapInput from "../../../../../components/BootstrapInput";

export default function ProfilePage() {
  const [name, setName] = React.useState("");
  return (
    <>
      <Head>
        <title>ProcessX Business Portal</title>
        <meta name="description" content="The ProcessX Business Portal allows you to track your credit card sales, view reports, manage your business and sell online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Inter:400,400i,500,700" rel="stylesheet"></link>
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
          Business Details
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800 }}
        >
          Basic Information
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16, mt: 1 }}>
          This information will appear on the receipts that are emailed or SMSed
          to your customers. Please use a name that your customers will
          recognise to avoid confusion.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="tradingName">
                Trading Name
              </InputLabel>
              <BootstrapInput
                placeholder="Trading Name"
                id="tradingName"
                name="tradingName"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="telephoneNumber">
                Telephone Number
              </InputLabel>
              <BootstrapInput
                placeholder="Telephone Number"
                id="telephoneNumber"
                name="telephoneNumber"
                required
                disabled
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="vatNumber">
                VAT Number
              </InputLabel>
              <BootstrapInput
                placeholder="VAT Number"
                id="vatNumber"
                name="vatNumber"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="defaultTax">
                Default Tax
              </InputLabel>
              <BootstrapInput
                placeholder="No Tax (0%)"
                id="defaultTax"
                name="defaultTax"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800, mt: 4 }}
        >
          Trading Address
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16, mt: 1 }}>
          This is the physical location of your business. If your business is
          purely mobile, then please fill in your registered business address.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="streetAddress">
                Street address
              </InputLabel>
              <BootstrapInput
                placeholder="Street address"
                id="streetAddress"
                name="streetAddress"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="suburb">
              Suburb
              </InputLabel>
              <BootstrapInput
                placeholder="Suburb"
                id="suburb"
                name="suburb"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="building">
              Building/Complex (optional)
              </InputLabel>
              <BootstrapInput
                placeholder="Building name, unit number or floor"
                id="building"
                name="building"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="city">
              City
              </InputLabel>
              <BootstrapInput
                placeholder="City"
                id="city"
                name="city"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} md={6}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="postalCode">
              Postal Code
              </InputLabel>
              <BootstrapInput
                placeholder="Postal Code"
                id="postalCode"
                name="postalCode"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                borderRadius: 2,
              }}
              onClick={() => {}}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
