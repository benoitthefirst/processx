import {
  Paper,
  Typography,
  Unstable_Grid2 as Grid,
  Box,
  Stack,
} from "@mui/material";
import React from "react";

const colors = [
  "#018567",
  "rgb(0, 91, 149)",
  "rgb(104, 178, 255)",
  "rgb(86, 192, 201)",
  "rgb(174, 158, 246)",
  "rgb(255, 188, 68)",
  "rgb(232, 80, 60)",
];

export default function ProductImage({name, subtitle, color, setColor }: any) {
  return (
    <Paper sx={{ mt: 3, p: 2 }}>
      <Typography
        component="h4"
        variant="h6"
        sx={{ fontSize: 12, fontWeight: 600 }}
      >
        Product Image
      </Typography>
      {subtitle && <Typography
        variant="body1"
        sx={{ fontSize: 12}}
      >
        {subtitle}
      </Typography>}
      
      <Grid container spacing={2} mt={2}>
        <Grid xs={12} md={4}>
          <Box sx={{ bgcolor: "#f7f7f7", padding: "32px 26px", width: 180 }}>
            <Paper
              sx={{
                display: "block",
                margin: "auto",
                bgcolor: "#fff",
                p: 0,
                width: 124,
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ my: 1 }}
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    bgcolor: color?.length > 0 ? color : colors[0],
                    height: 60,
                    width: 60,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ color: "white", fontSize: 24, fontWeight: 600 }}
                  >
                    {name && name.substring(0,2)}
                  </Typography>
                </Box>
              </Stack>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderTop: `0.01px solid ${color?.length > 0 ? color : colors[0]}`,
                  borderBottom: `0.01px solid ${color?.length > 0 ? color : colors[0]}`,
                  py: 1,
                  height: 40
                }}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{
                    fontSize: 14,
                  }}
                >
                  {name}
                </Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: color?.length > 0 ? color : colors[0],
                  height: 5,
                  mt: 1,
                }}
              />
            </Paper>
          </Box>
        </Grid>
        <Grid xs={12} md={8}>
          <Stack direction="row" spacing={2}>
            {colors.map((color, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: color,
                  height: 40,
                  width: 40,
                }}
                onClick={() => setColor(color)}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
