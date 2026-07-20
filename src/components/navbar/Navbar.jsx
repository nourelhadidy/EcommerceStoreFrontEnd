import * as React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Tooltip,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputBase,
  Badge,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import StorefrontIcon from "@mui/icons-material/Storefront";

// Shared design tokens — keep identical across all pages
const BRAND = {
  name: "LuxeCart",
  ink: "#14141F",
  paper: "#FFFFFF",
  panel: "#F4F3EF",
  wine: "#7A2B33",
  brass: "#B7924A",
  stone: "#6E6C68",
  hairline: "#E4E2DC",
};
const FONT_DISPLAY = "'Fraunces', 'Georgia', serif";
const FONT_BODY = "'Inter', 'Helvetica Neue', Arial, sans-serif";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const SETTINGS = [
  { label: "Profile", path: "/profile", icon: <AccountCircleIcon fontSize="small" /> },
  { label: "Cart", path: "/cart", icon: <ShoppingBagIcon fontSize="small" /> },
  { label: "Login", path: "/login", icon: <LoginIcon fontSize="small" /> },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `1px solid rgba(255,255,255,0.16)`,
  backgroundColor: "rgba(255,255,255,0.06)",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.28)" },
  marginLeft: theme.spacing(1),
  width: "100%",
  display: "flex",
  alignItems: "center",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(2), width: "auto" },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  fontFamily: FONT_BODY,
  ".MuiInputBase-input": {
    padding: theme.spacing(1.1, 1.2, 1.1, 0),
    paddingLeft: theme.spacing(1.6),
    width: "100%",
    fontSize: "0.9rem",
    [theme.breakpoints.up("md")]: { width: "300px" },
  },
}));

export default function Navbar() {
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const [query, setQuery] = React.useState("");
  const [products, setProducts] = React.useState(null);
  const [loadingProducts, setLoadingProducts] = React.useState(false);
  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "info" });

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const toggleMobile = (open) => () => setMobileOpen(open);

  const toggleCart = (open) => async () => {
    setCartOpen(open);
    if (open) {
      try {
        const res = await fetch("https://fakestoreapi.com/carts/1");
        const cart = await res.json();
        const products = await Promise.all(
          cart.products.map(async (p) => {
            const res = await fetch(`https://fakestoreapi.com/products/${p.productId}`);
            const data = await res.json();
            return { ...data, quantity: p.quantity };
          })
        );
        setCartItems(products);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    }
  };

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoadingProducts(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch (err) {
        console.error("Products fetch error:", err);
        if (!cancelled) setSnack({ open: true, message: "Failed to load products", severity: "error" });
      } finally {
        if (!cancelled) setLoadingProducts(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const runSearch = () => {
    const q = (query || "").trim().toLowerCase();
    if (!q) {
      setSnack({ open: true, message: "Please type a product name", severity: "info" });
      return;
    }
    if (!products) {
      setSnack({ open: true, message: "Products still loading, try again shortly", severity: "info" });
      return;
    }
    const exact = products.find((p) => p.title.toLowerCase() === q);
    if (exact) return navigate(`/productDetails/${exact.id}`);
    const includes = products.find((p) => p.title.toLowerCase().includes(q));
    if (includes) return navigate(`/productDetails/${includes.id}`);
    const starts = products.find((p) => p.title.toLowerCase().startsWith(q));
    if (starts) return navigate(`/productDetails/${starts.id}`);
    setSnack({ open: true, message: "No product found with that name", severity: "warning" });
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") runSearch();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: BRAND.ink,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          color: "#fff",
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 76 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open menu"
              onClick={toggleMobile(true)}
              sx={{ display: { xs: "inline-flex", md: "none" }, mr: 2, borderRadius: 0 }}
            >
              <MenuIcon />
            </IconButton>

            {/* BRAND */}
            <Box
              component={RouterLink}
              to="/"
              sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit", mr: 4 }}
            >
              <StorefrontIcon sx={{ mr: 1, fontSize: 26, color: BRAND.brass }} />
              <Typography
                noWrap
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 600,
                  fontSize: "1.35rem",
                  letterSpacing: "0.01em",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {BRAND.name}
              </Typography>
            </Box>

            {/* NAV LINKS */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                  sx={{
                    textTransform: "none",
                    fontFamily: FONT_BODY,
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    px: 2,
                    borderRadius: 0,
                    position: "relative",
                    "&:hover": { bgcolor: "transparent", color: BRAND.brass },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Search sx={{ display: { xs: "none", md: "flex" } }}>
                <SearchInput
                  placeholder="Search products…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  inputProps={{ "aria-label": "search products" }}
                />
                <IconButton aria-label="search" sx={{ color: "inherit", borderRadius: 0 }} onClick={runSearch} disabled={loadingProducts}>
                  {loadingProducts ? <CircularProgress size={18} color="inherit" /> : <SearchIcon fontSize="small" />}
                </IconButton>
              </Search>
            </Box>

            {/* ACTIONS */}
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton color="inherit" sx={{ borderRadius: 0 }}>
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" onClick={toggleCart(true)} sx={{ borderRadius: 0 }}>
                <Badge badgeContent={cartItems.length} sx={{ "& .MuiBadge-badge": { bgcolor: BRAND.wine, color: "#fff" } }}>
                  <ShoppingCartIcon fontSize="small" />
                </Badge>
              </IconButton>

              <Tooltip title="Account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 1.5, borderRadius: 0 }}>
                  <Avatar sx={{ bgcolor: BRAND.brass, color: BRAND.ink, width: 34, height: 34, fontSize: "0.9rem", fontWeight: 700 }}>
                    N
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "48px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                slotProps={{ paper: { sx: { borderRadius: 0, border: `1px solid ${BRAND.hairline}` } } }}
              >
                {SETTINGS.map((item) => (
                  <MenuItem
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleCloseUserMenu}
                    sx={{
                      fontFamily: FONT_BODY,
                      gap: 1.5,
                      fontSize: "0.9rem",
                      "&:hover": { color: BRAND.wine, bgcolor: BRAND.panel },
                    }}
                  >
                    {item.icon} {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="left" open={mobileOpen} onClose={toggleMobile(false)}>
        <Box sx={{ width: 280, p: 3, fontFamily: FONT_BODY }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem" }}>Menu</Typography>
            <IconButton onClick={toggleMobile(false)} sx={{ borderRadius: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 1, borderColor: BRAND.hairline }} />
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemText>
                  <Button
                    component={RouterLink}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      textTransform: "none",
                      width: "100%",
                      justifyContent: "flex-start",
                      borderRadius: 0,
                      color: BRAND.ink,
                      fontWeight: 500,
                      "&:hover": { color: BRAND.wine, bgcolor: "transparent" },
                    }}
                  >
                    {link.label}
                  </Button>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* CART DRAWER */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart(false)}>
        <Box sx={{ width: { xs: 320, sm: 420 }, p: 3, fontFamily: FONT_BODY }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem" }}>Your Cart</Typography>
            <IconButton onClick={toggleCart(false)} sx={{ borderRadius: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2, borderColor: BRAND.hairline }} />

          {cartItems.length === 0 ? (
            <Typography variant="body2" sx={{ color: BRAND.stone }}>
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id} sx={{ py: 1.5, px: 0 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={52}
                    height={52}
                    style={{ objectFit: "contain", border: `1px solid ${BRAND.hairline}` }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: BRAND.stone }}>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          <Divider sx={{ my: 2, borderColor: BRAND.hairline }} />
          <Button
            variant="contained"
            fullWidth
            disableElevation
            sx={{
              bgcolor: BRAND.ink,
              borderRadius: 0,
              textTransform: "none",
              fontWeight: 600,
              py: 1.4,
              "&:hover": { bgcolor: BRAND.wine },
            }}
          >
            Checkout
          </Button>
        </Box>
      </Drawer>

      <Box sx={{ height: { xs: 64, sm: 76 } }} />

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: "100%", borderRadius: 0 }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}