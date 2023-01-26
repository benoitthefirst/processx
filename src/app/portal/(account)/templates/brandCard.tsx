import { Paper, Grid, Typography } from "@mui/material";
import React from "react";

export default function BrandCard() {
  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={2}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "primary.main",
              height: 60,
              width: 60,
              pt: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ color: "white", fontSize: 24, fontWeight: 600 }}
            >
              Jo
            </Typography>
          </Paper>
        </Grid>
        <Grid xs={4}>
          <Typography
            variant="subtitle1"
            align="left"
            sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}
          >
            Jordan
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}
          >
            1 Products
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
