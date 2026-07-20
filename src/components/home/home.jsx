import React, { useEffect, useState } from "react";

import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Stack,
  Rating,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import { useNavigate } from "react-router-dom";

/**
 * DESIGN TOKENS
 * -------------------------------------------------------------------------
 * Palette   Ink #14141F (text/nav), Paper #FFFFFF, Alt-panel #F4F3EF,
 *           Wine #7A2B33 (primary accent), Brass #B7924A (secondary accent),
 *           Stone #6E6C68 (muted text), Hairline #E4E2DC (borders)
 * Type      Display: "Fraunces" (serif, editorial) — headlines only
 *           Body/UI: "Inter" — everything else
 * Signature Hairline-bordered "gallery" product grid: cards invert to ink
 *           on hover instead of lifting/shadowing; brass rule marks section
 *           transitions instead of numbering or heavy dividers.
 */
const BRAND = {
  name: "EleganceShop",
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

const TESTIMONIALS = [
  { id: 1, name: "Sara L.", rating: 5, text: "Fast delivery, stellar quality. I recommend EleganceShop to all my friends." },
  { id: 2, name: "Mike R.", rating: 5, text: "Excellent customer service — returned an item with no hassle." },
  { id: 3, name: "Anna P.", rating: 4.5, text: "Stylish, comfortable, and durable. Great value for money." },
];

const VALUE_PROPS = [
  { icon: <LocalShippingOutlinedIcon />, title: "Complimentary Shipping", text: "On every order over $50, no code needed." },
  { icon: <VerifiedOutlinedIcon />, title: "Quality Guarantee", text: "Every piece inspected before it reaches you." },
  { icon: <ReplayOutlinedIcon />, title: "30-Day Returns", text: "Changed your mind? Send it back, hassle-free." },
  { icon: <SupportAgentOutlinedIcon />, title: "Personal Support", text: "A real person, seven days a week." },
];

const FONT_LINK_ID = "elegance-shop-fonts";

export default function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [wishlist, setWishlist] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = `${BRAND.name} — Modern Essentials`;
    window.scrollTo(0, 0);

    if (!document.getElementById(FONT_LINK_ID)) {
      const link = document.createElement("link");
      link.id = FONT_LINK_ID;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap";
      document.head.appendChild(link);
    }

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p) => ({
          id: p.id,
          name: p.title,
          price: p.price,
          rating: p.rating?.rate || 4.5,
          ratingCount: p.rating?.count || 0,
          img: p.image,
        }));
        setProducts(formatted);
      });

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((categoryNames) => {
        const categoryPromises = categoryNames.map((category) =>
          fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`)
            .then((res) => res.json())
            .then((products) => ({
              id: category,
              label: category.charAt(0).toUpperCase() + category.slice(1),
              img: products[0]?.image || "https://via.placeholder.com/300",
            }))
        );
        Promise.all(categoryPromises).then(setCategories);
      });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSnack({ open: true, message: "Please enter a valid email address", severity: "error" });
      return;
    }
    setSnack({ open: true, message: "Thanks for subscribing — check your inbox", severity: "success" });
    setEmail("");
  };

  const addToCart = (product) => {
    setCartCount((c) => c + 1);
    setSnack({ open: true, message: `${product.name} added to cart`, severity: "success" });
  };

  const toggleWishlist = (id) => {
    setWishlist((w) => {
      const newWishlist = w.includes(id) ? w.filter((x) => x !== id) : [...w, id];
      setSnack({
        open: true,
        message: newWishlist.includes(id) ? "Added to wishlist" : "Removed from wishlist",
        severity: "success",
      });
      return newWishlist;
    });
  };

  const Eyebrow = ({ children }) => (
    <Typography
      sx={{
        fontFamily: FONT_BODY,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: BRAND.wine,
        display: "inline-flex",
        alignItems: "center",
        gap: 1.2,
        "&::before": {
          content: '""',
          display: "inline-block",
          width: 22,
          height: 2,
          bgcolor: BRAND.brass,
        },
      }}
    >
      {children}
    </Typography>
  );

  const SectionHeading = ({ eyebrow, title, subtitle, align = "left" }) => (
    <Box sx={{ mb: { xs: 5, md: 7 }, textAlign: align, maxWidth: align === "center" ? 640 : "none", mx: align === "center" ? "auto" : 0 }}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Typography
        component="h2"
        sx={{
          fontFamily: FONT_DISPLAY,
          fontWeight: 600,
          mt: 1.5,
          fontSize: { xs: "2rem", md: "2.75rem" },
          color: BRAND.ink,
          lineHeight: 1.15,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontFamily: FONT_BODY, color: BRAND.stone, mt: 1.5, fontSize: "1.05rem", lineHeight: 1.7 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box component="main" sx={{ bgcolor: BRAND.paper, color: BRAND.ink, fontFamily: FONT_BODY }}>
      {/* ============================= HERO ============================= */}
      <Box component="section" sx={{ borderBottom: `1px solid ${BRAND.hairline}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center" sx={{ py: { xs: 8, md: 0 }, minHeight: { md: "88vh" } }}>
            <Grid item xs={12} md={6}>
              <Eyebrow>New Season Edit</Eyebrow>
              <Typography
                component="h1"
                sx={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 600,
                  mt: 2,
                  mb: 3,
                  fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.25rem" },
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: BRAND.ink,
                }}
              >
                Timeless essentials,
                <br />
                <Box component="span" sx={{ fontStyle: "italic", color: BRAND.wine }}>
                  thoughtfully made.
                </Box>
              </Typography>
              <Typography sx={{ fontSize: "1.1rem", color: BRAND.stone, lineHeight: 1.75, maxWidth: 440, mb: 5 }}>
                Premium fabrics and considered details, designed to outlast the season. Complimentary
                shipping on every order over $50.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate("/products")}
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: 0,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    bgcolor: BRAND.ink,
                    letterSpacing: "0.02em",
                    "&:hover": { bgcolor: BRAND.wine },
                    transition: "background-color 0.25s ease",
                  }}
                >
                  Shop the Collection
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/products")}
                  sx={{
                    px: 4,
                    py: 1.6,
                    borderRadius: 0,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    borderColor: BRAND.ink,
                    color: BRAND.ink,
                    letterSpacing: "0.02em",
                    "&:hover": { borderColor: BRAND.wine, color: BRAND.wine, bgcolor: "transparent" },
                  }}
                >
                  View Lookbook
                </Button>
              </Stack>

              <Stack direction="row" spacing={4} sx={{ mt: 7, pt: 4, borderTop: `1px solid ${BRAND.hairline}` }}>
                {[
                  ["50k+", "Happy customers"],
                  ["4.8/5", "Average rating"],
                  ["120+", "Countries served"],
                ].map(([stat, label]) => (
                  <Box key={label}>
                    <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.6rem", color: BRAND.ink }}>
                      {stat}
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: BRAND.stone }}>{label}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 380, md: 620 },
                  backgroundImage: 'url("/images/wallpaper.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 16, md: -32 },
                    bottom: { xs: 16, md: 32 },
                    bgcolor: BRAND.paper,
                    border: `1px solid ${BRAND.hairline}`,
                    px: 3,
                    py: 2.5,
                    maxWidth: 220,
                  }}
                >
                  <Typography sx={{ fontFamily: FONT_DISPLAY, fontStyle: "italic", fontSize: "1.05rem", color: BRAND.ink, lineHeight: 1.4 }}>
                    "Quality you can feel from the first touch."
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: BRAND.stone, mt: 1, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    — Verified Customer
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ========================= VALUE PROPS ========================== */}
      <Box component="section" sx={{ bgcolor: BRAND.ink, py: { xs: 5, md: 6 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 2 }}>
            {VALUE_PROPS.map((item) => (
              <Grid item xs={6} md={3} key={item.title}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box sx={{ color: BRAND.brass, mt: 0.3 }}>{item.icon}</Box>
                  <Box>
                    <Typography sx={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</Typography>
                    <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", mt: 0.3, lineHeight: 1.5 }}>
                      {item.text}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ========================= CATEGORIES ========================== */}
      <Box component="section" sx={{ py: { xs: 9, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionHeading
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="Curated edits across every essential — find your fit in a few clicks."
          />
          <Grid container spacing={0} sx={{ border: `1px solid ${BRAND.hairline}`, borderRight: "none", borderBottom: "none" }}>
            {categories.map((c) => (
              <Grid
                key={c.id}
                item
                xs={6}
                md={3}
                onClick={() => navigate(`/products?category=${encodeURIComponent(c.label)}`)}
                sx={{
                  borderRight: `1px solid ${BRAND.hairline}`,
                  borderBottom: `1px solid ${BRAND.hairline}`,
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover .cat-img": { transform: "scale(1.06)" },
                  "&:hover .cat-overlay": { bgcolor: "rgba(20,20,31,0.35)" },
                }}
              >
                <Box sx={{ position: "relative", height: { xs: 200, md: 260 }, bgcolor: BRAND.panel, overflow: "hidden" }}>
                  <Box
                    className="cat-img"
                    component="img"
                    src={c.img}
                    alt={c.label}
                    sx={{ width: "100%", height: "100%", objectFit: "contain", p: 4, transition: "transform 0.4s ease" }}
                  />
                  <Box className="cat-overlay" sx={{ position: "absolute", inset: 0, transition: "background-color 0.3s ease" }} />
                </Box>
                <Box sx={{ px: 2.5, py: 2 }}>
                  <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.1rem", color: BRAND.ink }}>
                    {c.label}
                  </Typography>
                  <Typography sx={{ fontSize: "0.78rem", color: BRAND.wine, mt: 0.3, letterSpacing: "0.03em" }}>
                    Shop now →
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ========================= FEATURED ========================== */}
      <Box component="section" sx={{ py: { xs: 9, md: 12 }, bgcolor: BRAND.panel }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "flex-end" }} sx={{ mb: { xs: 5, md: 7 } }}>
            <Box>
              <Eyebrow>Featured</Eyebrow>
              <Typography component="h2" sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, mt: 1.5, fontSize: { xs: "2rem", md: "2.75rem" }, color: BRAND.ink }}>
                This Week's Selection
              </Typography>
            </Box>
            <Button
              onClick={() => navigate("/products")}
              endIcon={<ArrowForwardIcon />}
              sx={{ color: BRAND.ink, fontWeight: 600, mt: { xs: 2, sm: 0 }, "&:hover": { color: BRAND.wine, bgcolor: "transparent" } }}
            >
              View All Products
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gap: "1px",
              bgcolor: BRAND.hairline,
              border: `1px solid ${BRAND.hairline}`,
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            }}
          >
            {products.slice(0, 8).map((p) => {
              const isWishlisted = wishlist.includes(p.id);
              return (
                <Card
                  key={p.id}
                  elevation={0}
                  sx={{
                    borderRadius: 0,
                    bgcolor: BRAND.paper,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    "&:hover .prod-img": { transform: "scale(1.05)" },
                  }}
                >
                  <Box
                    onClick={() => navigate(`/product/${p.id}`)}
                    sx={{
                      position: "relative",
                      height: { xs: 170, md: 260 },
                      bgcolor: BRAND.paper,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={p.img}
                      alt={p.name}
                      className="prod-img"
                      sx={{ maxHeight: "82%", maxWidth: "82%", objectFit: "contain", transition: "transform 0.35s ease" }}
                    />
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(p.id);
                      }}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        bgcolor: BRAND.paper,
                        border: `1px solid ${BRAND.hairline}`,
                        borderRadius: 0,
                        "&:hover": { bgcolor: BRAND.panel },
                      }}
                    >
                      {isWishlisted ? (
                        <FavoriteIcon fontSize="small" sx={{ color: BRAND.wine }} />
                      ) : (
                        <FavoriteBorderIcon fontSize="small" sx={{ color: BRAND.ink }} />
                      )}
                    </IconButton>
                  </Box>

                  <CardContent sx={{ px: 2.5, py: 2.5, flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: BRAND.ink,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        minHeight: "2.7em",
                        lineHeight: "1.35em",
                      }}
                    >
                      {p.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 1 }}>
                      <Rating size="small" value={p.rating} precision={0.1} readOnly sx={{ color: BRAND.brass, fontSize: "0.95rem" }} />
                      <Typography sx={{ fontSize: "0.72rem", color: BRAND.stone }}>({p.ratingCount})</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.5 }}>
                      <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem", color: BRAND.ink }}>
                        ${p.price.toFixed(2)}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => addToCart(p)}
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          color: BRAND.wine,
                          textTransform: "uppercase",
                          "&:hover": { bgcolor: "transparent", color: BRAND.ink },
                        }}
                      >
                        Add to Bag
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ========================= TESTIMONIALS ========================= */}
      <Box component="section" sx={{ py: { xs: 9, md: 12 } }}>
        <Container maxWidth="lg">
          <SectionHeading eyebrow="Trust" title="What Customers Say" align="center" />
          <Grid container spacing={{ xs: 5, md: 6 }}>
            {TESTIMONIALS.map((t, i) => (
              <Grid item xs={12} md={4} key={t.id}>
                <Box sx={{ textAlign: "center", px: { md: 2 } }}>
                  <Rating size="small" value={t.rating} precision={0.1} readOnly sx={{ color: BRAND.brass, mb: 2 }} />
                  <Typography
                    sx={{
                      fontFamily: FONT_DISPLAY,
                      fontStyle: "italic",
                      fontSize: "1.15rem",
                      lineHeight: 1.6,
                      color: BRAND.ink,
                      mb: 3,
                    }}
                  >
                    "{t.text}"
                  </Typography>
                  <Divider sx={{ width: 32, mx: "auto", mb: 2, borderColor: BRAND.brass, borderBottomWidth: 2 }} />
                  <Typography sx={{ fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.04em", color: BRAND.stone, textTransform: "uppercase" }}>
                    {t.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ========================= NEWSLETTER ========================= */}
      <Box component="section" sx={{ bgcolor: BRAND.ink, py: { xs: 9, md: 11 } }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Eyebrow>Stay in the Loop</Eyebrow>
          <Typography
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: { xs: "1.9rem", md: "2.4rem" },
              color: "#fff",
              mt: 2,
              mb: 2,
            }}
          >
            Get 10% off your first order
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.65)", mb: 5, fontSize: "0.98rem" }}>
            Join our list for early access to new arrivals and member-only sales.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{ display: "flex", gap: 0, justifyContent: "center", maxWidth: 420, mx: "auto" }}
          >
            <TextField
              size="small"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{
                flex: 1,
                bgcolor: "#fff",
                "& .MuiOutlinedInput-root": { borderRadius: 0 },
                "& fieldset": { border: "none" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: BRAND.brass,
                color: BRAND.ink,
                px: 4,
                borderRadius: 0,
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.03em",
                "&:hover": { bgcolor: "#c9a961" },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnack({ ...snack, open: false })}
          severity={snack.severity}
          sx={{ width: "100%", borderRadius: 0 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}