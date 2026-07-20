import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Typography,
    CardMedia,
    Button,
    Stack,
    Divider,
    Snackbar,
    Alert,
    Container,
    IconButton,
    CircularProgress,
    Link,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartStatus,
    fetchInitialCart,
    removeFromCart as reduxRemoveFromCart,
    updateQuantity as reduxUpdateQuantity,
} from "../../store/slice/cartSlice";

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

const CartItemRow = ({ item, onRemove, onUpdateQuantity }) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems="center"
            sx={{ py: 3, px: { xs: 2, sm: 3 }, width: "100%", borderBottom: `1px solid ${BRAND.hairline}` }}
        >
            <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ width: 80, height: 80, objectFit: "contain", bgcolor: BRAND.panel, border: `1px solid ${BRAND.hairline}`, p: 1 }}
            />
            <Box sx={{ flexGrow: 1, width: "100%" }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        color: BRAND.ink,
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        mb: 0.5,
                    }}
                >
                    {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: BRAND.stone }}>
                    ${item.price.toFixed(2)}
                </Typography>
            </Box>
            <Stack direction="row" alignItems="center" spacing={0} sx={{ my: { xs: 1, sm: 0 }, border: `1px solid ${BRAND.hairline}` }}>
                <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} sx={{ borderRadius: 0 }}>
                    <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ minWidth: 28, textAlign: "center", fontWeight: 600, fontSize: "0.9rem" }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} sx={{ borderRadius: 0 }}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Stack>
            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, width: { xs: "100%", sm: 90 }, textAlign: "right", minWidth: 90, color: BRAND.ink }}>
                ${(item.price * item.quantity).toFixed(2)}
            </Typography>
            <IconButton
                size="small"
                onClick={() => onRemove(item.id)}
                title="Remove item"
                sx={{ color: BRAND.stone, borderRadius: 0, "&:hover": { color: BRAND.wine, bgcolor: "transparent" }, ml: { xs: 0, sm: 1 } }}
            >
                <DeleteOutlineIcon fontSize="small" />
            </IconButton>
        </Stack>
    );
};

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const cartStatus = useSelector(selectCartStatus);
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        if (cartStatus === "idle") {
            dispatch(fetchInitialCart());
        }
    }, [cartStatus, dispatch]);

    const removeFromCart = (id) => {
        dispatch(reduxRemoveFromCart(id));
        setSnack({ open: true, message: "Item removed from cart", severity: "success" });
    };

    const updateQuantity = (id, newQuantity) => {
        dispatch(reduxUpdateQuantity({ id, newQuantity }));
    };

    const { subtotal, shipping, tax, grandTotal } = useMemo(() => {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 100 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        const grandTotal = subtotal + shipping + tax;
        return { subtotal, shipping, tax, grandTotal };
    }, [cartItems]);

    if (cartStatus === "loading") {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", bgcolor: BRAND.paper }}>
                <CircularProgress sx={{ color: BRAND.wine }} />
            </Box>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Box sx={{ py: 12, bgcolor: BRAND.paper, minHeight: "100vh", fontFamily: FONT_BODY }}>
                <Container maxWidth="xs">
                    <Box sx={{ textAlign: "center", p: 4, border: `1px solid ${BRAND.hairline}` }}>
                        <ShoppingBagIcon sx={{ fontSize: 44, color: BRAND.brass, mb: 2 }} />
                        <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.4rem", mb: 1.5, color: BRAND.ink }}>
                            Your cart is empty
                        </Typography>
                        <Typography sx={{ color: BRAND.stone, mb: 3, fontSize: "0.9rem" }}>
                            Looks like you haven't added anything yet.
                        </Typography>
                        <Button
                            variant="contained"
                            disableElevation
                            sx={{ bgcolor: BRAND.ink, borderRadius: 0, px: 4, py: 1.3, fontWeight: 600, textTransform: "none", "&:hover": { bgcolor: BRAND.wine } }}
                            onClick={() => navigate("/products")}
                        >
                            Start Shopping
                        </Button>
                    </Box>
                </Container>
            </Box>
        );
    }

    return (
        <Box sx={{ py: { xs: 7, md: 10 }, bgcolor: BRAND.paper, minHeight: "100vh", fontFamily: FONT_BODY }}>
            <Container maxWidth="lg">
                <Typography
                    sx={{
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 600,
                        fontSize: { xs: "1.9rem", md: "2.4rem" },
                        mb: 5,
                        color: BRAND.ink,
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    Shopping Cart
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gap: { xs: 3, md: 4 },
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 360px" },
                        alignItems: "start",
                    }}
                >
                    {/* Items list */}
                    <Box
                        sx={{
                            border: `1px solid ${BRAND.hairline}`,
                            maxHeight: { xs: "auto", sm: "calc(100vh - 220px)" },
                            overflow: { xs: "visible", sm: "auto" },
                        }}
                    >
                        {cartItems.map((item) => (
                            <CartItemRow key={item.id} item={item} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
                        ))}
                    </Box>

                    {/* Order summary */}
                    <Box
                        sx={{
                            p: { xs: 3, md: 4 },
                            border: `1px solid ${BRAND.hairline}`,
                            bgcolor: BRAND.panel,
                            position: { xs: "relative", sm: "sticky" },
                            top: { xs: "auto", sm: 100 },
                        }}
                    >
                        <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.25rem", mb: 3, color: BRAND.ink }}>
                            Order Summary
                        </Typography>
                        <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography sx={{ color: BRAND.stone, fontSize: "0.9rem" }}>Subtotal</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>${subtotal.toFixed(2)}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography sx={{ color: BRAND.stone, fontSize: "0.9rem" }}>Shipping</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography sx={{ color: BRAND.stone, fontSize: "0.9rem" }}>Est. Tax</Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>${tax.toFixed(2)}</Typography>
                            </Stack>
                            <Divider sx={{ pt: 1.5, borderColor: BRAND.hairline }} />
                            <Stack direction="row" justifyContent="space-between" sx={{ pt: 1 }}>
                                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.15rem", color: BRAND.ink }}>
                                    Total
                                </Typography>
                                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.15rem", color: BRAND.ink }}>
                                    ${grandTotal.toFixed(2)}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<ShoppingBagIcon />}
                            disableElevation
                            sx={{
                                mt: 3,
                                borderRadius: 0,
                                fontWeight: 600,
                                py: 1.5,
                                bgcolor: BRAND.ink,
                                textTransform: "none",
                                "&:hover": { bgcolor: BRAND.wine },
                            }}
                        >
                            Proceed to Checkout
                        </Button>

                        <Box sx={{ textAlign: "center", mt: 2.5 }}>
                            <Link
                                component="button"
                                onClick={() => navigate("/products")}
                                sx={{ color: BRAND.stone, fontWeight: 600, fontSize: "0.85rem", textDecoration: "none", "&:hover": { color: BRAND.wine } }}
                            >
                                Continue Shopping
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity} sx={{ width: "100%", borderRadius: 0 }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Cart;