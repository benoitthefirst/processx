"use client";
import Head from "next/head";
import Image from "next/image";
import { Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [active, setctive] = useState(1);
  return (
    <>
      <Head>
        <title>Dashboard | PROCESSX</title>
        <meta name="description" content="The ProcessX Business Portal allows you to track your credit card sales, view reports, manage your business and sell online." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        component="main"
        maxWidth="xl"
        sx={{ height: { xs: "100vh", sm: "100%" }, padding: { xs: 0, sm: 5 } }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontSize: 30, fontWeight: 600, mt: 4 }}
        >
          Dashboard
        </Typography>
        <Grid container spacing={1} mt={2}>
          <Grid item lg={6}>
            <Paper
              sx={{ height: 150, padding: 2, paddingLeft: 5, paddingRight: 5 }}
            >
              <Typography>Balance</Typography>
              <Divider />
              <Typography variant="h3">R0.00</Typography>
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <Paper
              sx={{ height: 150, padding: 2, paddingLeft: 5, paddingRight: 5 }}
            >
              <Typography>Recent Transactions</Typography>
              <Divider />
              <Typography variant="h3">10</Typography>
            </Paper>
          </Grid>
          <Grid item lg={12} mt={2}>
            {/* <CustomizedTabs/> */}
            <Grid container spacing={1}>
              <Grid item lg={3}>
                <Paper
                  square
                  sx={{
                    ms: 2,
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: active != 0 ? "#e7edeb" : "white",
                  }}
                  elevation={0}
                  onClick={() => setctive(0)}
                >
                  <Typography>Yesterday</Typography>
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Paper>
              </Grid>
              <Grid item lg={3}>
                <Paper
                  square
                  sx={{
                    ms: 2,
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: active != 1 ? "#e7edeb" : "white",
                  }}
                  elevation={0}
                  onClick={() => setctive(1)}
                >
                  <Typography>Today</Typography>
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Paper>
              </Grid>
              <Grid item lg={3}>
                <Paper
                  square
                  sx={{
                    ms: 2,
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: active != 2 ? "#e7edeb" : "white",
                  }}
                  elevation={0}
                  onClick={() => setctive(2)}
                >
                  <Typography>Last 7 days</Typography>
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Paper>
              </Grid>
              <Grid item lg={3}>
                <Paper
                  square
                  sx={{
                    ms: 2,
                    padding: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: active != 3 ? "#e7edeb" : "white",
                  }}
                  elevation={0}
                  onClick={() => setctive(3)}
                >
                  <Typography>Last 30 days</Typography>
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Paper
              sx={{ height: 500, padding: 2, paddingLeft: 5, paddingRight: 5 }}
            >
              <Grid container spacing={1}>
                <Grid item lg={4}>
                  <Typography>Quick Facts</Typography>
                  <Divider />
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Grid>
                <Grid item lg={8}>
                  <Typography>Trainsactions</Typography>
                  <Divider />
                  <Typography variant="h5" color="primary" mt={2}>
                    R0.00
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <Paper
              sx={{ height: 400, padding: 2, paddingLeft: 5, paddingRight: 5 }}
            >
              <Typography>Popular Products</Typography>
              <Divider />
              <Typography variant="h3">500</Typography>
            </Paper>
          </Grid>
          <Grid item lg={6}>
            <Paper
              sx={{ height: 400, padding: 2, paddingLeft: 5, paddingRight: 5 }}
            >
              <Typography>Top Staff</Typography>
              <Divider />
              <Typography variant="h3">500</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
