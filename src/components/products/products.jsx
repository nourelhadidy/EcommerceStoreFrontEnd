import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Container,
    CircularProgress,
    Chip,
    Stack,
} from "@mui/material";

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
            "&::before": { content: '""', display: "inline-block", width: 22, height: 2, bgcolor: BRAND.brass },
        }}
    >
        {children}
    </Typography>
);

const Products = () => {
    const [products, setProducts] = useState([]);
    const [byCategory, setByCategory] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        setLoading(true);
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data || []);
                const grouped = (data || []).reduce((acc, p) => {
                    const key = p.category || "uncategorized";
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(p);
                    return acc;
                }, {});
                setByCategory(grouped);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", bgcolor: BRAND.paper }}>
                <CircularProgress sx={{ color: BRAND.wine }} />
            </Box>
        );
    }

    const categories = ["all", ...Object.keys(byCategory || {})];

    const renderGridFor = (items) => (
        <Box
            sx={{
                display: "grid",
                gap: "1px",
                bgcolor: BRAND.hairline,
                border: `1px solid ${BRAND.hairline}`,
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            }}
        >
            {items.map((product) => (
                <Card
                    key={product.id}
                    component={RouterLink}
                    to={`/productDetails/${product.id}`}
                    elevation={0}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 0,
                        bgcolor: BRAND.paper,
                        textDecoration: "none",
                        "&:hover .prod-img": { transform: "scale(1.05)" },
                    }}
                >
                    <Box
                        sx={{
                            height: { xs: 170, md: 220 },
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                            bgcolor: BRAND.paper,
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.title}
                            className="prod-img"
                            sx={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", transition: "transform 0.35s ease" }}
                        />
                    </Box>

                    <CardContent sx={{ px: 2.5, py: 2.5, display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1, gap: 1.2 }}>
                        <Typography
                            sx={{
                                fontFamily: FONT_BODY,
                                fontSize: "0.9rem",
                                fontWeight: 500,
                                color: BRAND.ink,
                                display: "-webkit-box",
                                overflow: "hidden",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                minHeight: "2.6em",
                                lineHeight: "1.3em",
                            }}
                        >
                            {product.title}
                        </Typography>

                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: "auto" }}>
                            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.15rem", color: BRAND.ink }}>
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Chip
                                label={product.category}
                                size="small"
                                sx={{
                                    bgcolor: BRAND.panel,
                                    color: BRAND.stone,
                                    fontWeight: 600,
                                    fontSize: "0.68rem",
                                    textTransform: "capitalize",
                                    borderRadius: 0,
                                }}
                            />
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: BRAND.paper, minHeight: "100vh", fontFamily: FONT_BODY }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Eyebrow>Catalogue</Eyebrow>
                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 600,
                            fontSize: { xs: "2.1rem", md: "2.9rem" },
                            color: BRAND.ink,
                            mt: 1.5,
                        }}
                    >
                        Shop by Category
                    </Typography>
                    <Typography sx={{ color: BRAND.stone, mt: 1.5, maxWidth: 520, mx: "auto" }}>
                        Every essential, organized and easy to find.
                    </Typography>
                </Box>

                {/* Category selector */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 7 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" justifyContent="center" rowGap={1}>
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat === "all" ? "All Products" : cat}
                                clickable
                                onClick={() => setSelectedCategory(cat)}
                                sx={{
                                    textTransform: "capitalize",
                                    fontWeight: 600,
                                    fontSize: "0.8rem",
                                    borderRadius: 0,
                                    px: 0.5,
                                    py: 2.2,
                                    bgcolor: selectedCategory === cat ? BRAND.ink : "transparent",
                                    color: selectedCategory === cat ? "#fff" : BRAND.ink,
                                    border: `1px solid ${selectedCategory === cat ? BRAND.ink : BRAND.hairline}`,
                                    "&:hover": {
                                        bgcolor: selectedCategory === cat ? BRAND.wine : BRAND.panel,
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Sections */}
                {selectedCategory === "all" ? (
                    Object.keys(byCategory).map((cat) => (
                        <Box key={cat} sx={{ mb: 8 }}>
                            <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 3 }}>
                                <Typography
                                    sx={{
                                        fontFamily: FONT_DISPLAY,
                                        fontWeight: 600,
                                        fontSize: "1.5rem",
                                        textTransform: "capitalize",
                                        color: BRAND.ink,
                                    }}
                                >
                                    {cat}
                                </Typography>
                                <Box sx={{ flex: 1, height: "1px", bgcolor: BRAND.hairline }} />
                            </Stack>
                            {renderGridFor(byCategory[cat])}
                        </Box>
                    ))
                ) : (
                    <Box sx={{ mb: 6 }}>
                        <Stack direction="row" alignItems="baseline" spacing={2} sx={{ mb: 3 }}>
                            <Typography
                                sx={{
                                    fontFamily: FONT_DISPLAY,
                                    fontWeight: 600,
                                    fontSize: "1.5rem",
                                    textTransform: "capitalize",
                                    color: BRAND.ink,
                                }}
                            >
                                {selectedCategory}
                            </Typography>
                            <Box sx={{ flex: 1, height: "1px", bgcolor: BRAND.hairline }} />
                        </Stack>
                        {renderGridFor(byCategory[selectedCategory] || [])}
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Products;