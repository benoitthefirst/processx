"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Drawer,
  Paper,
  Stack,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BootstrapInput from "../../../../components/BootstrapInput";
import Empty from "../../../../components/empty";

export default function Products() {
  const [state, setState] = React.useState(true);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };
  return (
    <>
      <Head>
        <title>Products | PROCESSX</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        component="main"
        maxWidth="xl"
        sx={{ height: { xs: "100vh", sm: "100%" }, padding: { xs: 0, sm: 5 } }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          justifyContent={{ xs: "flex-start", sm: "space-between" }}
          mt={4}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 30, fontWeight: 600 }}
          >
            Products
          </Typography>
          <Button
            size="medium"
            variant="contained"
            disableElevation
            onClick={toggleDrawer(true)}
          >
            Add Product
          </Button>
        </Stack>
        <Empty
          title="Your business currently has no products or"
          subtitle="you may need to change your filter'"
          action="Click Add Product to add products to your store"
        />
      </Container>
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 500,
            backgroundColor: "background.default",
          },
        }}
      >
        <Box padding={2}>
          <Typography
            component="h3"
            variant="h5"
            sx={{ fontSize: 18, fontWeight: 600 }}
          >
            Add Product
          </Typography>
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 12, fontWeight: 600 }}
            >
              Basic Info
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Product name"
                    id="name"
                    name="name"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Price
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Price"
                    id="price"
                    name="price"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Tax
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Default: No Tax(0%)"
                    id="tax"
                    name="tax"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Description
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Description"
                    id="description"
                    name="description"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Brand
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Brand"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Category
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Category"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <Button size="medium" variant="contained" disableElevation>
                  Advanced Options
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 12, fontWeight: 600 }}
            >
              Product Image
            </Typography>
            <Typography
              component="p"
              sx={{ fontSize: 12 }}
            >
              For best results, your image should be square and atleast 1200x1200 pixels.
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Product name"
                    id="name"
                    name="name"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Price
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Price"
                    id="price"
                    name="price"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Tax
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Default: No Tax(0%)"
                    id="tax"
                    name="tax"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Description
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Description"
                    id="description"
                    name="description"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Brand
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Brand"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Category
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Category"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <Button size="medium" variant="contained" disableElevation>
                  Advanced Options
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 12, fontWeight: 600 }}
            >
              Stock
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Product name"
                    id="name"
                    name="name"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Price
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Price"
                    id="price"
                    name="price"
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Tax
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Default: No Tax(0%)"
                    id="tax"
                    name="tax"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Description
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Description"
                    id="description"
                    name="description"
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Brand
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Brand"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Product Category
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Category"
                    id="email"
                    name="email"
                    autoFocus
                    required
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <Button size="medium" variant="contained" disableElevation>
                  Advanced Options
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Drawer>
    </>
  );
}
