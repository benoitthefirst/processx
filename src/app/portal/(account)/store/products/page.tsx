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
  useMediaQuery,
  useTheme,
  AppBar,
  IconButton,
  Toolbar,
  FormControlLabel,
} from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BootstrapInput from "../../../../../components/BootstrapInput";
import Empty from "../../../../../components/empty";
import FormDrawer from "../../../../../components/formDrawer";
import {
  CustomTable,
  StyledTableCell,
  StyledTableRow,
} from "../../templates/CustomizedTables";
import ProductImage from "../../templates/productImage";
import SearchInput from "../../templates/search";
import { CustomSwitch } from "../../templates/switch";

const productsData = [
  {
    name: "Jordan",
    description: "Jordan",
    price: "R120",
  },
];

export default function Products() {
  const theme = useTheme();
  const [products, setProducts] = React.useState<any[]>(productsData);
  const [state, setState] = React.useState(false);
  const [name, setName] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [productBrand, setProductBrand] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [productSku, setProductSku] = React.useState("");
  const [productDefaultCost, setProductDefaultCost] = React.useState("");
  const [color, setColor] = React.useState("");
  const [lowStock, setLowStock] = React.useState("");
  const [trackStock, setTrackStock] = React.useState(false);
  const [trackVarientLevel, setTrackVarientLevel] = React.useState(false);
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

      //console.log("isOpen: ", open);

      setState(open);
      clearFields();
    };

  const onEdit = (data: any) => {
    setName(data.name);
    setTax(data.taxNumber);
    setDescription(data.description);
    setProductBrand(data.productBrand);
    setProductCategory(data.productCategory);
    setProductPrice(data.price);
    setProductSku(data.productSku);
    setProductDefaultCost(data.productDefaultCost);
    setColor(data.color);
    setLowStock(data.lowStock);
    setTrackStock(data.trackStock);
    setTrackVarientLevel(data.trackVarientLevel);
    setIsEdit(true);
    setState(true);
  };

  const onSave = () => {
    const payload = {
      name: name,
      color: color,
      description: description,
      price: productPrice,
      productBrand: productBrand,
      productCategory: productCategory,
      taxNumber: tax,
      productSku: productSku,
      productDefaultCost: productDefaultCost,
      lowStock:lowStock,
      trackStock:trackStock,
      trackVarientLevel:trackVarientLevel,
    };
    products.push(payload);
    setProducts(products);
    setState(false);
    clearFields();
  };

  const onDelete = (id: string) => {
    if (isEdit) {
      //setStaffs((x)=>x.filter((a) => a.email != id));
      setState(false);
      clearFields();
    }
  };

  const clearFields = () => {
    setName("");
    setTax("");
    setDescription("");
    setProductBrand("");
    setProductCategory("");
    setProductPrice("");
    setProductSku("");
    setProductDefaultCost("");
    setColor("");
    setLowStock("");
    setTrackStock(false);
    setTrackVarientLevel(false);
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
        sx={{
          height: { xs: "100vh", sm: "100%" },
          mt: 2,
          padding: { xs: 0, sm: 3 },
        }}
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
            sx={{ fontSize: 30, fontWeight: 800 }}
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
        <SearchInput />
        {products.length > 0 ? (
          <CustomTable
            items={["", "NAME", "DESCRIPTION", "PRICE"]}
            last={true}
            sx={{ mt: 2 }}
          >
            {products.map((row: any, index: number) => (
              <StyledTableRow key={index} onClick={() => onEdit(row)}>
                <StyledTableCell width={80}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: row?.color ?? "primary.main",
                      height: 60,
                      width: 60,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      align="center"
                      sx={{ color: "white", fontSize: 24, fontWeight: 600 }}
                    >
                      Jo
                    </Typography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell scope="row">{row.description}</StyledTableCell>
                <StyledTableCell scope="row" width={120}>
                  {row.price}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </CustomTable>
        ) : (
          <Empty
            title="Your business currently has no products or"
            subtitle="you may need to change your filter'"
            action="Click Add Product to add products to your store"
          />
        )}
      </Container>
      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={state}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            maxWidth: 700,
            backgroundColor: "background.default",
          },
        }}
      >
        <Box padding={2} mb={10}>
          <Typography
            component="h3"
            variant="h5"
            sx={{ fontSize: 18, fontWeight: 600 }}
          >
            Add Product
          </Typography>
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
              Add Product
            </Typography>
          </Box>
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Basic Info
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="productName">
                    Name
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Product name"
                    id="productName"
                    name="productName"
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="productPrice">
                    Price
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Price"
                    id="productPrice"
                    name="productPrice"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="tax">
                    Tax
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Default: No Tax(0%)"
                    id="tax"
                    name="tax"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="description">
                    Description
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="productBrand  ">
                    Product Brand
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Brand"
                    id="productBrand"
                    name="productBrand"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="productCategory">
                    Product Category
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Select a Category"
                    id="productCategory"
                    name="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
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
                  Advanced Options
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <ProductImage
            name={name}
            subtitle="For best results, your image should be square and at least 1200x1200 pixels."
            color={color}
            setColor={setColor}
          />
          <Paper sx={{ mt: 3, padding: 2 }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Stock
            </Typography>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="productSku">
                    Product Code (SKU)
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Autogenerated"
                    id="productSku"
                    name="productSku"
                    value={productSku}
                    onChange={(e) => setProductSku(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="defaultCostPrice">
                    Default Cost Price
                  </InputLabel>
                  <BootstrapInput
                    placeholder="Price"
                    id="defaultCostPrice"
                    name="defaultCostPrice"
                    value={productDefaultCost}
                    onChange={(e) => setProductDefaultCost(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel shrink color="primary" htmlFor="stockTracking">
                    Enable Stock Tracking
                  </InputLabel>
                  <CustomSwitch
                    sx={{ m: 0, mt: 3 }}
                    checked={trackStock}
                    onChange={(e) => setTrackStock(e.target.checked)}
                  />
                </FormControl>
              </Grid>
              {trackStock == true && (
                <>
                  <Grid xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel
                        shrink
                        color="primary"
                        htmlFor="bootstrap-input"
                      >
                        Track Stock at Variant Level
                      </InputLabel>
                      <CustomSwitch
                        sx={{ m: 0, mt: 3 }}
                        checked={trackVarientLevel}
                        onChange={(e) => setTrackVarientLevel(e.target.checked)}
                      />
                      <Typography variant="body1" my={1}>
                        If the stock for variants of this product are tracked
                        separately, or you have separate SKU's you should enable
                        this option.
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid xs={12}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel
                        shrink
                        color="primary"
                        htmlFor="lowStockLevel"
                      >
                        Low Stock Alert
                      </InputLabel>
                      <BootstrapInput
                        placeholder="0"
                        id="lowStockLevel"
                        name="lowStockLevel"
                        value={lowStock}
                        onChange={(e) => setLowStock(e.target.value)}
                      />
                      <Typography variant="body1" my={1}>
                        Alert me when stock falls below this level. Configure
                        who gets these alerts.
                      </Typography>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Paper>
          <Paper sx={{ mt: 3, padding: 2, display: "block" }}>
            <Typography
              component="h4"
              variant="h6"
              sx={{ fontSize: 14, fontWeight: 600 }}
            >
              Variants
            </Typography>
            <Grid>
              <Grid>
                <Typography variant="body1" my={1}>
                  Create multiple variants of your products based on size,
                  colour, material and other categories. Separate options with a
                  comma.
                </Typography>
              </Grid>
              <Grid>
                <Button
                  size="medium"
                  variant="contained"
                  disableElevation
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    borderRadius: 2,
                    mt: 2,
                  }}
                >
                  Add New Attribute
                </Button>
              </Grid>
            </Grid>
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
                  onClick={() => onDelete(productSku)}
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
