"use client"
import React,{useState} from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppRegistrationOutlined as OnBoardingIcon,
  DashboardOutlined as DashboardIcon,
  RecommendOutlined as ReferralIcon,
  ReceiptOutlined as SalesIcon,
  StorefrontOutlined as StoreIcon,
  Description as InvoiceIcon,
  Store as SellOnlineIcon,
  AddBusiness as BusinessSettingsIcon,
  CreditScore as CapitalIcon,
  ShoppingCartOutlined as CardMachineIcon,
  HelpOutlineOutlined as HelpOutlineOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  SourceOutlined as SourceOutlinedIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AccountCircle } from "@mui/icons-material";
import { Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const drawerWidth = 240;

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const _menuData = [
    {value: "Complete Setup",slug: "onboarding", icon: <OnBoardingIcon/>},
    {value: "Dashboard",slug: "dashboard", icon: <DashboardIcon/>},
    /* {value: "Referrals",slug: "lets-grow", icon: <ReferralIcon/>},
    {value: "Sales and Refunds",slug: "sales/reports", icon: <SalesIcon/>}, */
    {value: "Manage My Store",slug: "store/products", icon: <StoreIcon/>},
    /* {value: "Invoices",slug: "invoice/invoices", icon: <InvoiceIcon/>},
    {value: "Sell Online",slug: "online/payment-links", icon: <SellOnlineIcon/>}, */
    {value: "Business Settings",slug: "business/details", icon: <BusinessSettingsIcon/>},
    /* {value: "Capital",slug: "capital/offers", icon: <CapitalIcon/>},
    {value: "Buy Card Machines",slug: "card-machines", icon: <CardMachineIcon/>}, */
    {value: "Get Help",slug: "https://support.processx.help/s/", icon: <HelpOutlineOutlinedIcon/>},
    {value: "Profile",slug: "profile", icon: <AccountCircleOutlinedIcon/>},
    {value: "Legal",slug: "https://www.processx.co.za/za/terms", icon: <SourceOutlinedIcon/>},
    {value: "Logout",slug: "logout", icon: <LogoutIcon/>},
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ paddingTop: 5, paddingBottom: 5 }}>
        {/* <Image src="/logo.png" width={130} height={60} alt="ProcessX Logo" /> */}
        <img
          src="/logo.png"
          height="60"
          width="140"
          alt=""
          style={{ display: "inline" }}
        ></img>
      </Toolbar>
      <Divider />
      <List>
        {_menuData.slice(0,4).map((item, index) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {_menuData.slice(4,8).map((item, index) => (
          <ListItem key={item.value} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.value} />
          </ListItemButton>
        </ListItem>
        ))}
      </List>
    </div>
  );

  /* const container =
    window !== undefined ? () => window().document.body : undefined; */

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Crochicx
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          /* container={container} */
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
