"use client";
import {
  Container,
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Box,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import BootstrapInput from "../../../../../components/BootstrapInput";
import { CustomSwitch } from "../../templates/switch";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

enum IReceiptType {
  receipt = "receipt",
  taxInvoice = "taxInvoice"
}

const receipts = [
  {
    name: "Receipt",
    type: IReceiptType.receipt,
  },
  {
    name: "Tax Invoice",
    type: IReceiptType.taxInvoice,
  },
];

export default function ProfilePage() {
  const [name, setName] = React.useState("");
  const [receiptType, setReceiptType] = React.useState<IReceiptType>(
    IReceiptType.receipt
  );
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log("value: ", value);
    setReceiptType(value);
  };
  return (
    <>
      <Head>
        <title>ProcessX Business Portal</title>
        <meta
          name="description"
          content="The ProcessX Business Portal allows you to track your credit card sales, view reports, manage your business and sell online."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Inter:400,400i,500,700"
          rel="stylesheet"
        ></link>
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
          Receipt Configuration
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800 }}
        >
          Receipt Details
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16, mt: 1 }}>
          This information will appear on the receipts that are emailed or SMSed
          to your customers. Please use a name that your customers will
          recognise to avoid confusion.
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="secondary" htmlFor="tradingName">
                Business Logo
              </InputLabel>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    borderRadius: 1,
                    mt: 3,
                  }}
                >
                  Upload Logo
                </Button>
              </Box>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="telephoneNumber">
                Receipt Type
              </InputLabel>
              <Select
                displayEmpty
                size="medium"
                value={receiptType}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
                sx={{ mt: 3,bgcolor: "background.paper" }}
              >
                {receipts.map((item:any) => (
                  <MenuItem
                    key={item.name}
                    value={item.type}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="companySlogan">
                Company slogan
              </InputLabel>
              <BootstrapInput
                placeholder="eg. Let's Grow"
                id="companySlogan"
                name="companySlogan"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="receiptFooter">
                Receipt Footer
              </InputLabel>
              <BootstrapInput
                placeholder="eg. Please retain your receipt"
                id="receiptFooter"
                name="receiptFooter"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="stockTracking">
                Show phone number
              </InputLabel>
              <CustomSwitch sx={{ m: 0, mt: 3 }} />
            </FormControl>
          </Grid>
        </Grid>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800, mt: 4 }}
        >
          Social Media Handles
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="facebook">
                Facebook
              </InputLabel>
              <BootstrapInput
                placeholder="eg. ProcessX"
                id="facebook"
                name="facebook"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="twitter">
                Twitter
              </InputLabel>
              <BootstrapInput
                placeholder="eg. ProcessX"
                id="twitter"
                name="twitter"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="instagram">
                Instagram
              </InputLabel>
              <BootstrapInput
                placeholder="eg. ProcessX"
                id="instagram"
                name="instagram"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                mt: 3
              }}
            >
              <Button
                autoFocus
                sx={{ backgroundColor: "rgb(228, 233, 241)", color: "black" }}
                onClick={() => {}}
              >
                Preview receipt
              </Button>
              <Button
                autoFocus
                size="medium"
                variant="contained"
                disableElevation
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => {}}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
