"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Tab,
  Tabs,
  Stack,
  Typography,
  Paper,
  Drawer,
  FormControl,
  InputLabel,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BootstrapInput from "../../../../../components/BootstrapInput";
import Empty from "../../../../../components/empty";
import FormDrawer from "../../../../../components/formDrawer";
import CustomizedMenus from "../../templates/customizedMenus";
import CustomizedTables from "../../templates/CustomizedTables";
import ProductImage from "../../templates/productImage";
import SearchInput from "../../templates/search";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  minWidth: 0,
  [theme.breakpoints.up("sm")]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: "rgba(0, 0, 0, 0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    color: "#40a9ff",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "primary",
    fontWeight: theme.typography.fontWeightMedium,
  },
  "&.Mui-focusVisible": {
    backgroundColor: "primary",
  },
}));

interface StyledTabProps {
  label: string;
}

const brandsData = [
  {
    name: "Jordan",
    items: ["121233", "121233"],
  },
  {
    name: "Nike",
    items: ["121233"],
  },
  {
    name: "Adidas",
    items: ["121233"],
  },
  {
    name: "Umbro",
    items: ["121233"],
  },
  {
    name: "Uzzi",
    items: ["121233"],
  },
];
const categoriesData = [
  {
    name: "Top",
    items: 1,
  },
  {
    name: "Shoes",
    items: 1,
  },
];

export default function BrandsAndCategories() {
  const theme = useTheme();

  const [brands, setBrands] = React.useState<any[]>(brandsData);
  const [active, setActive] = React.useState(0);
  const [activeDrawer, setActiveDrawer] = React.useState("");
  const [state, setState] = React.useState(false);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActive(newValue);
  };

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
    };

  const onSave = () => {
    const payload = {
      name: name,
      color: color,
      items: ["124434355"],
    };
    brands.push(payload);
    setBrands(brands);
    setState(false);
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
        sx={{ height: { xs: "100vh", sm: "100%" }, mt: { xs: 7, sm: 10 } }}
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
            sx={{ fontSize: { xs: 24, sm: 30 }, fontWeight: 700 }}
          >
            Brands And Categories
          </Typography>
          <Button
            size="medium"
            variant="contained"
            disableElevation
            onClick={toggleDrawer(true)}
          >
            Add Product
          </Button>
          <CustomizedMenus
            name="Add"
            items={[{ name: "Brand" }, { name: "Category" }]}
            setDrawer={()=>toggleDrawer(true)}
          />
        </Stack>
        <SearchInput />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ bgcolor: "#fff", mt: 3 }}>
            <AntTabs
              centered
              value={active}
              onChange={handleChange}
              aria-label="ant example"
              variant="fullWidth"
            >
              <AntTab label="Brands" />
              <AntTab label="Categories" />
            </AntTabs>
          </Box>
          <CustomizedTables data={active == 0 ? brands : categoriesData} />

          {!brands && (
            <Empty
              title="Your business currently has no brands and categories or 
            "
              subtitle="you may need to change your filter'"
            />
          )}
        </Box>
      </Container>
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={state}
        onClose={()=>setState(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            maxWidth: 700,
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
              Add Brand
            </Typography>
          </Box>
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 12, fontWeight: 600, mb: 2 }}
            >
              Basic Info
            </Typography>
            <FormControl sx={{ mt: 1 }} variant="standard" fullWidth>
              <InputLabel shrink color="primary" htmlFor="bootstrap-input">
                Name
              </InputLabel>
              <BootstrapInput
                placeholder="Name"
                id="name"
                name="name"
                autoFocus
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </Paper>
          <ProductImage name={name} color={color} setColor={setColor} />
          <Paper sx={{ mt: 3, padding: 1 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Brand Items
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
              padding: 2,
            }}
          >
            <Toolbar>
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
