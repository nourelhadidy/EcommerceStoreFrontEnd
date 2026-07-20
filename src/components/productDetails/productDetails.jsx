import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
    Box,
    Typography,
    Button,
    Stack,
    Divider,
    Snackbar,
    Alert,
    Container,
    Rating,
    CircularProgress,
    Chip,
    Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slice/cartSlice";

// Shared design tokens — keep identical across all pages
const BRAND = {
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

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        const productId = parseInt(id);
        if (isNaN(productId)) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching product:", err);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        try {
            dispatch(addToCart(product));
            setSnack({ open: true, message: `${product.title} added to cart!`, severity: "success" });
        } catch (error) {
            console.error("Failed to add to cart:", error);
            setSnack({ open: true, message: "Failed to add to cart. Please try again.", severity: "error" });
        }
    };

    const handleCloseSnack = () => setSnack({ ...snack, open: false });

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
                <CircularProgress sx={{ color: BRAND.wine }} />
            </Box>
        );
    }

    if (!product) {
        return (
            <Container sx={{ py: 12, textAlign: "center", fontFamily: FONT_BODY }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.8rem", mb: 3 }}>
                    Product not found.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    disableElevation
                    sx={{ bgcolor: BRAND.ink, borderRadius: 0, px: 4, py: 1.4, "&:hover": { bgcolor: BRAND.wine } }}
                >
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: BRAND.paper, minHeight: "100vh", fontFamily: FONT_BODY }}>
            <Container maxWidth="lg">
                <Button
                    component={RouterLink}
                    to="/products"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{
                        mb: 5,
                        color: BRAND.stone,
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        textTransform: "none",
                        borderRadius: 0,
                        "&:hover": { color: BRAND.wine, bgcolor: "transparent" },
                    }}
                >
                    Back to Products
                </Button>

                <Grid container spacing={0} sx={{ border: `1px solid ${BRAND.hairline}` }}>
                    {/* Image */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: BRAND.panel,
                                height: { xs: 340, md: "100%" },
                                minHeight: { md: 480 },
                                p: 5,
                                borderRight: { md: `1px solid ${BRAND.hairline}` },
                            }}
                        >
                            <Box
                                component="img"
                                src={product.image}
                                alt={product.title}
                                sx={{ width: "100%", height: "100%", maxHeight: 380, objectFit: "contain" }}
                            />
                        </Box>
                    </Grid>

                    {/* Content */}
                    <Grid item xs={12} md={6}>
                        <Box sx={{ p: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", height: "100%" }}>
                            <Chip
                                label={product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                                size="small"
                                sx={{
                                    bgcolor: BRAND.ink,
                                    color: "#fff",
                                    fontWeight: 600,
                                    fontSize: "0.7rem",
                                    width: "fit-content",
                                    mb: 3,
                                    borderRadius: 0,
                                }}
                            />
                            <Typography
                                sx={{
                                    fontFamily: FONT_DISPLAY,
                                    fontWeight: 600,
                                    fontSize: { xs: "1.7rem", md: "2.1rem" },
                                    lineHeight: 1.25,
                                    color: BRAND.ink,
                                    mb: 2,
                                }}
                            >
                                {product.title}
                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                                <Rating size="small" value={product.rating?.rate || 0} precision={0.1} readOnly sx={{ color: BRAND.brass }} />
                                <Typography variant="body2" sx={{ color: BRAND.stone }}>
                                    ({product.rating?.count || 0} reviews)
                                </Typography>
                            </Stack>

                            <Typography sx={{ color: BRAND.stone, mb: 4, lineHeight: 1.75, flexGrow: 1, fontSize: "0.95rem" }}>
                                {product.description}
                            </Typography>

                            <Divider sx={{ mb: 3, borderColor: BRAND.hairline }} />

                            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "2.2rem", color: BRAND.ink, mb: 3 }}>
                                ${product.price.toFixed(2)}
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    disableElevation
                                    startIcon={<ShoppingBagIcon />}
                                    onClick={handleAddToCart}
                                    sx={{
                                        borderRadius: 0,
                                        fontWeight: 600,
                                        py: 1.5,
                                        px: 4,
                                        textTransform: "none",
                                        bgcolor: BRAND.ink,
                                        "&:hover": { bgcolor: BRAND.wine },
                                    }}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={() => navigate("/cart")}
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        borderRadius: 0,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        color: BRAND.ink,
                                        borderColor: BRAND.ink,
                                        py: 1.5,
                                        px: 4,
                                        "&:hover": { bgcolor: BRAND.panel, borderColor: BRAND.wine, color: BRAND.wine },
                                    }}
                                >
                                    Go to Cart
                                </Button>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%", borderRadius: 0 }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProductDetails;