"use client";
import React from "react";
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
  useMediaQuery,
  useTheme,
  AppBar,
  IconButton,
  Toolbar,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function FormDrawer({
  title,
  children,
  open,
  onClose,
  actionBtnText,
  onHandleAction
}: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open
      onClose={()=>onClose()}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 500,
          backgroundColor: "background.default",
        },
      }}
    >
      <Box padding={2}>
        <Box
          position="fixed"
          sx={{
            display: "flex",
            ml: "-15px",
            top: 0,
            bottom: "auto",
            backgroundColor: "background.default",
            width: "100%",
            padding: 2,
            zIndex: 1
          }}
        >
          <Typography
            component="h3"
            variant="h5"
            sx={{ fontSize: 18, fontWeight: 600 }}
          >
            {title && title}
          </Typography>
        </Box>

        {children}
        <Box
          position="fixed"
          sx={{
            display: "flex",
            ml: "-15px",
            top: "auto",
            bottom: 0,
            backgroundColor: "background.paper",
            width: "100%",
            padding: 2,
          }}
        >
          <Button
            sx={{ backgroundColor: "#e4e9f1", color: "black" }}
            onClick={onClose(false)}
            size="medium"
            variant="contained"
            disableElevation
          >
            Cancel
          </Button>
          {actionBtnText && (
            <Button
              onClick={onHandleAction}
              size="medium"
              variant="contained"
              disableElevation
              sx={{ ml: 2 }}
            >
              {" " + actionBtnText + " "}
            </Button>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
