"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Empty from "../../../../components/empty";

export default function Products() {
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
          <Button size="medium" variant="contained" disableElevation>
            Add Product
          </Button>
        </Stack>
        <Empty
          title="Your business currently has no products or 
            "
          subtitle="you may need to change your filter'"
          action="Click Add Product to add products to your store"
        />
      </Container>
    </>
  );
}
