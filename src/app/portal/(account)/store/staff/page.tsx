"use client";
import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Divider,
  Stack,
  Typography,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  InputLabel,
  Paper,
  Toolbar,
  Drawer,
  useMediaQuery,
  useTheme,
  Theme,
  MenuItem,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../templates/customAccordion";

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

enum IPermissionType {
  staffMember = "staffMember",
  supervisor = "supervisor",
  manager = "manager",
  administrator = "administrator",
  custom = "custom",
}
enum ISalesPermissionType {
  makeSales = "makeSales",
  viewTransactions = "viewTransactions",
  refundOwnLastSale = "refundOwnLastSale",
  refundAnySale = "refundAnySale",
}
enum IManagingPermissionType {
  manageProducts = "manageProducts",
  manageStaff = "manageStaff",
  viewFinancials = "viewFinancials",
  manageBusinessSettings = "manageBusinessSettings",
  manageReports = "manageReports",
  manageExternalPrinters = "manageExternalPrinters",
}
type IPermission = {
  name: string;
  type: IPermissionType;
  salesAccess: string[];
  managingAccess: string[];
};

const permissions: IPermission[] = [
  {
    name: "Staff Member",
    type: IPermissionType.staffMember,
    salesAccess: [
      ISalesPermissionType.makeSales,
      ISalesPermissionType.refundOwnLastSale,
    ],
    managingAccess: [],
  },
  {
    name: "Supervisor",
    type: IPermissionType.supervisor,
    salesAccess: [
      ISalesPermissionType.makeSales,
      ISalesPermissionType.viewTransactions,
      ISalesPermissionType.refundOwnLastSale,
      ISalesPermissionType.refundAnySale,
    ],
    managingAccess: [IManagingPermissionType.manageExternalPrinters],
  },
  {
    name: "Manager",
    type: IPermissionType.manager,
    salesAccess: [
      ISalesPermissionType.makeSales,
      ISalesPermissionType.viewTransactions,
      ISalesPermissionType.refundOwnLastSale,
      ISalesPermissionType.refundAnySale,
    ],
    managingAccess: [
      IManagingPermissionType.manageProducts,
      IManagingPermissionType.manageStaff,
      IManagingPermissionType.manageExternalPrinters,
    ],
  },
  {
    name: "Administrator",
    type: IPermissionType.administrator,
    salesAccess: [
      ISalesPermissionType.makeSales,
      ISalesPermissionType.viewTransactions,
      ISalesPermissionType.refundOwnLastSale,
      ISalesPermissionType.refundAnySale,
    ],
    managingAccess: [
      IManagingPermissionType.manageProducts,
      IManagingPermissionType.manageStaff,
      IManagingPermissionType.viewFinancials,
      IManagingPermissionType.manageBusinessSettings,
      IManagingPermissionType.manageReports,
      IManagingPermissionType.manageExternalPrinters,
    ],
  },
  {
    name: "Custom Permissions",
    type: IPermissionType.custom,
    salesAccess: [],
    managingAccess: [],
  },
];

const staffsData: any[] = [
  {
    firstName: "Ben",
    lastName: "Walker",
    email: "user@example.com",
    mobileNumber: "+27800000000",
    permissions: {
      name: "Administrator",
      type: IPermissionType.administrator,
      salesAccess: [
        ISalesPermissionType.makeSales,
        ISalesPermissionType.viewTransactions,
        ISalesPermissionType.refundOwnLastSale,
        ISalesPermissionType.refundAnySale,
      ],
      managingAccess: [
        IManagingPermissionType.manageProducts,
        IManagingPermissionType.manageStaff,
        IManagingPermissionType.viewFinancials,
        IManagingPermissionType.manageBusinessSettings,
        IManagingPermissionType.manageReports,
        IManagingPermissionType.manageExternalPrinters,
      ],
    },
  },
];

const salesPermissions = [
  {
    name: "Make sales",
    value: ISalesPermissionType.makeSales,
    description:
      "Make card and cash sales and view a history of their own transactions.",
  },
  {
    name: "View all transactions",
    value: ISalesPermissionType.viewTransactions,
    description:
      "View all sales, refunds, errors & cancelled transactions in the business.",
  },
  {
    name: "Refund their own last sale",
    value: ISalesPermissionType.refundOwnLastSale,
    description: "Reverse the last sale made in case of an accidental charge.",
  },
  {
    name: "Refund any sale",
    value: ISalesPermissionType.refundAnySale,
    description: "Refund any sale they are allowed to view.",
  },
];

const managingPermissions = [
  {
    name: "Manage products",
    value: IManagingPermissionType.manageProducts,
    description: "Add, edit and remove products from the Yoco App or Portal.",
  },
  {
    name: "Manage staff",
    value: IManagingPermissionType.manageStaff,
    description:
      "Add, edit and remove staff from the Yoco App or Portal. A user can only assign permissions they have to other users.",
  },
  {
    name: "View financials",
    value: IManagingPermissionType.viewFinancials,
    description:
      "View account balance and payouts. Invoices and detailed financials can only be accessed on the Yoco Portal.",
  },
  {
    name: "Manage business settings",
    value: IManagingPermissionType.manageBusinessSettings,
    description:
      "Change bank details & business settings such as payment methods.",
  },
  {
    name: "Manage reports",
    value: IManagingPermissionType.manageReports,
    description:
      "Configure, add or remove users from reports. Reports can only be accessed on the Yoco Portal.",
  },
  {
    name: "Manage external printers",
    value: IManagingPermissionType.manageExternalPrinters,
    description: "Add or remove external printers paired to the Yoco App.",
  },
];

export default function Staff() {
  const theme = useTheme();

  const [staffs, setStaffs] = React.useState<any[]>(staffsData);
  const [currentPermission, setCurrentPermission] = React.useState<IPermission>(
    { ...permissions.find((x) => x.type == IPermissionType.staffMember)! }
  );
  const [state, setState] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNumber] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const [permissionName, setPermissionName] = React.useState<IPermissionType>(
    IPermissionType.staffMember
  );
  const [expanded, setExpanded] = React.useState<string | false>("");

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

      clearFields();
    };

  function getPermission(value: string) {
    const c = currentPermission;
    if (
      c &&
      (c.salesAccess.find((x) => x == value) ||
        c.managingAccess.find((x) => x == value))
    ) {
      return true;
    }

    return false;
  }

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    console.log("value: ", value);
    const p = permissions.find((x) => x.type == value)!;
    console.log("p: ", p);
    setPermissionName(value);
    setCurrentPermission({ ...p });
  };

  const handlePanelChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleSalesPermissions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, checked },
    } = event;

    setPermissionName(IPermissionType.custom);

    if (checked) {
      setCurrentPermission((x) => ({
        ...x,
        salesAccess: [...x.salesAccess, name],
      }));
    } else {
      setCurrentPermission((x) => ({
        ...x,
        salesAccess: x.salesAccess.filter((x) => x != name),
      }));
    }
  };

  const handleManagingPermissions = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, checked },
    } = event;

    setPermissionName(IPermissionType.custom);

    if (checked) {
      setCurrentPermission((x) => ({
        ...x,
        managingAccess: [...x.managingAccess, name],
      }));
    } else {
      setCurrentPermission((x) => ({
        ...x,
        managingAccess: x.managingAccess.filter((x) => x != name),
      }));
    }
  };

  const onEdit = (data: any) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setMobileNumber(data.mobileNumber);
    setIsEdit(true);
    setState(true);
    setCurrentPermission((x) => ({
      ...data.permissions
    }));
    console.log("Type: ", data.permissions.type)
    setPermissionName(data.permissions.type);
  };

  const onSave = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      permissions: currentPermission,
    };
    const index = staffs.findIndex((x: any) => x.email == email);
    console.log(index);
    if (isEdit && index > -1) {
      staffs[index] = payload;
    } else {
      staffs.push(payload);
    }
    setStaffs(staffs);
    setState(false);
    clearFields();
  };

  const onDelete = (id: string) => {
    if (isEdit) {
      setStaffs((x)=>x.filter((a) => x.email != id));
      setState(false);
      clearFields();
    }
  };

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setMobileNumber("");
    setCurrentPermission({ ...permissions.find((x) => x.type == IPermissionType.staffMember)! });
    setPermissionName(IPermissionType.staffMember);
  }

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
            {staffs.map((row: any, index: number) => (
              <StyledTableRow key={index} onClick={() => onEdit(row)}>
                <StyledTableCell component="th" scope="row">
                  {row.firstName + " " + row.lastName}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.email}</StyledTableCell>
                <StyledTableCell scope="row">
                  {row.mobileNumber}
                </StyledTableCell>
                <StyledTableCell scope="row">
                  {row.permissions.name}
                </StyledTableCell>
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
          <Paper sx={{ mt: 3, padding: 2, pt: 3 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Permissions & Security
            </Typography>
            <FormControl sx={{ m: 0, p: 0, mt: 3 }} fullWidth size="small">
              <Typography component="p" align="left" sx={{ fontSize: 12 }}>
                User Type
              </Typography>
              <Select
                displayEmpty
                value={permissionName}
                onChange={handleChange}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
                sx={{ mt: 1 }}
              >
                <MenuItem disabled value="">
                  <em>Select a role for this staff</em>
                </MenuItem>
                {permissions.map((item) => (
                  <MenuItem
                    key={item.name}
                    value={item.type}
                    /*  style={getStyles(item.type.toString(), [permissionName], theme)} */
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handlePanelChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography color="primary">
                  {expanded
                    ? "Hide advanced permissions"
                    : "Show advanced permissions"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl
                  sx={{ my: 0, mx: 3 }}
                  fullWidth
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel
                    component="legend"
                    sx={{ fontSize: 14, color: "#777" }}
                  >
                    SALES AND REFUNDS
                  </FormLabel>
                  <FormGroup>
                    {salesPermissions.map((item: any, index: number) => (
                      <div key={item.name}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 34 } }}
                              onChange={handleSalesPermissions}
                              name={item.value}
                              checked={getPermission(item.value)}
                            />
                          }
                          label={<strong>{item.name}</strong>}
                        />
                        <FormHelperText
                          sx={{ fontSize: 14, color: "#222", ml: 5, mt: -2 }}
                        >
                          {item.description}
                        </FormHelperText>
                      </div>
                    ))}
                  </FormGroup>
                </FormControl>
                <FormControl
                  sx={{ mt: 2, mx: 3 }}
                  fullWidth
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel
                    component="legend"
                    sx={{ fontSize: 14, color: "#777" }}
                  >
                    MANAGING YOUR BUSINESS
                  </FormLabel>
                  <FormGroup>
                    {managingPermissions.map((item: any, index: number) => (
                      <div key={item.name}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 34 } }}
                              onChange={handleManagingPermissions}
                              name={item.value}
                              checked={getPermission(item.value)}
                            />
                          }
                          label={<strong>{item.name}</strong>}
                        />
                        <FormHelperText
                          sx={{ fontSize: 14, color: "#222", ml: 5, mt: -2 }}
                        >
                          {item.description}
                        </FormHelperText>
                      </div>
                    ))}
                  </FormGroup>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Button
              size="medium"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: "#000",
                color: "#fff",
                height: 48,
                borderRadius: 2,
                mt: 2,
              }}
            >
              Set Pin
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
              {isEdit == true && (
                <Button
                  autoFocus
                  size="medium"
                  variant="contained"
                  disableElevation
                  sx={{ mr: 2 }}
                  onClick={() => onDelete(email)}
                >
                  Delete
                </Button>
              )}

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
                color="secondary"
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
