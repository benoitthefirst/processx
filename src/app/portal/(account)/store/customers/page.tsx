"use client";
import { Anchor } from "@mui/icons-material";
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
  Theme,
  Breakpoints,
  Breakpoint,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect } from "react";
import BootstrapInput from "../../../../../components/BootstrapInput";
import Empty from "../../../../../components/empty";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ResponsiveDialog from "../../../../../components/responsiveDialog";
import {
  CustomTable,
  StyledTableRow,
  StyledTableCell,
} from "../../templates/CustomizedTables";
import SearchInput from "../../templates/search";

const customersData: any[] = [
  {
    name: "Bernadette Kanku",
    company: "Walker Inc",
    email: "user@example.com",
    mobileNumber: "+27800000000",
    address: "22 Bree Street, Cape Town, 7405",
    vatNumber: "5468481166",
  },
];

export default function Customers() {
  const [open, setOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState<any[]>(customersData);
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [vatNumber, setVatNumber] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    clearFields();
  };
  const onAdd = () => {
    setOpen(true);
  };

  const onEdit = (data: any) => {
    setName(data.name);
    setCompany(data.company);
    setEmail(data.email);
    setMobileNumber(data.mobileNumber);
    setAddress(data.address);
    setVatNumber(data.vatNumber);
    setIsEdit(true);
    setOpen(true);
  };

  const onSave = () => {
    const payload = {
      name: name,
      company: company,
      email: email,
      mobileNumber: mobileNumber,
      address: address,
      vatNumber: vatNumber,
    };
    const index = customers.findIndex((x: any) => x.email == email);
    if (isEdit && index > -1) {
      customers[index] = payload;
    } else {
      customers.push(payload);
    }
    setCustomers(customers);
    setOpen(false);
    clearFields();
  };

  const onDelete = () => {
    if (isEdit) {
      setCustomers((x)=>x.filter((a) => a.email != email));
      setOpen(false);
      clearFields();
    }
  };

  const clearFields = () => {
    setName("");
    setCompany("");
    setEmail("");
    setMobileNumber("");
    setAddress("");
    setVatNumber("");
    setIsEdit(false);
  };

  return (
    <>
      <Head>
        <title>ProcessX Business Portal</title>
        <meta name="description" content="The ProcessX Business Portal allows you to track your credit card sales, view reports, manage your business and sell online." />
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
            Customers
          </Typography>
          <Button
            size="medium"
            variant="contained"
            disableElevation
            onClick={onAdd}
          >
            Add
          </Button>
        </Stack>
        <SearchInput />
        {customers.length > 0 ? (
          <CustomTable
            items={[
              "NAME",
              "COMPANY",
              "EMAIL",
              "MOBILE NUMBER",
              "ADDRESS",
              "VAT NUMBER",
            ]}
            sx={{ mt: 3 }}
          >
            {customers.map((row: any, index: number) => (
              <StyledTableRow key={index} onClick={() => onEdit(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.company}</StyledTableCell>
                <StyledTableCell scope="row">{row.email}</StyledTableCell>
                <StyledTableCell scope="row">
                  {row.mobileNumber}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.address}</StyledTableCell>
                <StyledTableCell scope="row">{row.vatNumber}</StyledTableCell>
              </StyledTableRow>
            ))}
          </CustomTable>
        ) : (
          <Empty title="No customers found" subtitle="" />
        )}
      </Container>

      <ResponsiveDialog
        title="Add A Customer"
        open={open}
        onClose={handleClose}
        actionBtnText="Save"
        onClick={onSave}
        onDelete={onDelete}
        showDeleteBtn={isEdit}
      >
        <Box padding={{ xs: 2, md: 2 }}>
          <Grid container spacing={2} mt={2}>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  Customer name
                </InputLabel>
                <BootstrapInput
                  placeholder="Customer name"
                  id="name"
                  name="name"
                  autoFocus
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  Company (optional)
                </InputLabel>
                <BootstrapInput
                  placeholder="Company name"
                  id="company"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  Email address
                </InputLabel>
                <BootstrapInput
                  placeholder="customer@example.com"
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  Phone number
                </InputLabel>
                <BootstrapInput
                  placeholder="Phone number"
                  id="phoneNumber"
                  name="phoneNumber"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  Physical address (optional)
                </InputLabel>
                <BootstrapInput
                  placeholder="Enter physical address"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant="standard" fullWidth>
                <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                  VAT Number (optional)
                </InputLabel>
                <BootstrapInput
                  placeholder="VAT Number"
                  id="vatNumber"
                  name="vatNumber"
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </ResponsiveDialog>
    </>
  );
}
