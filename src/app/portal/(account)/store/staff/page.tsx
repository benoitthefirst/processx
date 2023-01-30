"use client";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Divider,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Paper,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BootstrapInput from "../../../../../components/BootstrapInput";
import Empty from "../../../../../components/empty";
import ResponsiveDialog from "../../../../../components/responsiveDialog";
import {
  CustomTable,
  StyledTableRow,
  StyledTableCell,
} from "../../templates/CustomizedTables";
import ProductImage from "../../templates/productImage";

const staffsData: any[] = [
  {
    firstName: "Ben",
    lastName: "Walker",
    email: "user@example.com",
    mobileNumber: "+27800000000",
    permissions: "Administrator",
  },
];

export default function Staff() {
  const theme = useTheme();

  const [staffs, setStaffs] = React.useState<any[]>(staffsData);
  const [state, setState] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [permissions, setPermissions] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
      //setActiveDrawer(anchor);
      if (open == false) {
        setIsEdit(false);
      }
    };

  const onEdit = (data: any) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setMobileNumber(data.mobileNumber);
    setIsEdit(true);
    setState(true);
  };

  const onSave = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      permissions: "Administrator",
    };
    const index = staffs.findIndex((x: any) => x.email == email);
    console.log(index)
    if (isEdit && index > -1) {
      staffs[index] = payload;
    } else {
      staffs.push(payload);
    }
    setStaffs(staffs);
    setState(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
  };

  return (
    <>
      <Head>
        <title>Staff | PROCESSX</title>
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
          mb={2}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: 30, fontWeight: 800 }}
          >
            Manage Staff Members
          </Typography>
          <Button
            size="medium"
            variant="contained"
            disableElevation
            onClick={toggleDrawer(true)}
          >
            Invite Staff Members
          </Button>
        </Stack>

        {staffs.length > 0 ? (
          <CustomTable
            items={["NAME", "EMAIL", "MOBILE NUMBER", "PERMISSIONS"]}
            sx={{ mt: 2 }}
          >
            {staffs.map((row: any) => (
              <StyledTableRow key={row.name} onClick={() => onEdit(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.email}</StyledTableCell>
                <StyledTableCell scope="row">
                  {row.mobileNumber}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.permissions}</StyledTableCell>
              </StyledTableRow>
            ))}
          </CustomTable>
        ) : (
          <Empty
            title="Your business currently has no staffs or"
            subtitle="add staff to manage your business"
          />
        )}
      </Container>
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={state}
        onClose={() => setState(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 700,
            backgroundColor: "background.default",
          },
        }}
      >
        <Box padding={2} mb={10}>
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
              zIndex: 1,
            }}
          >
            <Typography
              component="h3"
              variant="h5"
              sx={{ fontSize: 18, fontWeight: 600 }}
            >
              Invite a Staff Member
            </Typography>
          </Box>
          <Paper sx={{ mt: 3, padding: 2, pt: 3 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}
            >
              General Infomation
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    First Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="First Name"
                    id="firstName"
                    name="firstName"
                    autoFocus
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Last Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Last Name"
                    id="lastName"
                    name="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Staff Email
                  </InputLabel>
                  <BootstrapInput
                    placeholder="staff@example.com"
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
                  <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                    Staff Mobile Number
                  </InputLabel>
                  <BootstrapInput
                    placeholder="080 000 0000"
                    id="phoneNumber"
                    name="phoneNumber"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ mt: 3, padding: 1 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Permissions & Security
            </Typography>
            <Typography
              component="p"
              align="center"
              sx={{ fontSize: 14, mt: 2 }}
            >
              There are currently no products in this brand
            </Typography>
            <Button
              size="large"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#e4e9f1",
                color: "#222",
                width: "100%",
                height: 48,
                borderRadius: 0,
                mt: 2,
              }}
            >
              Add item(s) to brand
            </Button>
          </Paper>
          <Box
            position="fixed"
            sx={{
              display: "flex",
              ml: "-15px",
              top: "auto",
              bottom: 0,
              backgroundColor: "background.paper",
              width: "100%",
              padding: 1,
            }}
          >
            <Toolbar variant="dense">
              <Button
                autoFocus
                sx={{ backgroundColor: "background.default" }}
                onClick={toggleDrawer(false)}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                size="medium"
                variant="contained"
                disableElevation
                sx={{ ml: 2 }}
                onClick={onSave}
              >
                Save
              </Button>
            </Toolbar>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
