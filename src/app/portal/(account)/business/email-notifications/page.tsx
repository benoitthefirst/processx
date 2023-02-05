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

export default function EmailNotificationsPage() {
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
          Email Notifications
        </Typography>
        
        <Typography variant="body1" sx={{ fontSize: 16, mt: 1 }}>
        A report showing the total sales, best selling items and highest earning staff members for the period. See an example.
        </Typography>
        <Typography
          component="h4"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 800 }}
        >
          Add another person
        </Typography>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12}>
            <FormControl variant="standard" fullWidth>
              <InputLabel shrink color="secondary" htmlFor="tradingName">
              Send to a staff member
              </InputLabel>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                }}
              >
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
                <Button
                  size="medium"
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: "rgb(228, 233, 241)",
                    color: "black",
                    fontWeight: 600,
                    borderRadius: 1,
                    mt: 3,
                  }}
                >
                  Add staff member
                </Button>
              </Box>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
