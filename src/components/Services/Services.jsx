import React from "react";
import { Box, Typography, Container, Grid, Stack, Button } from "@mui/material";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
            justifyContent: "center",
            gap: 1.2,
            "&::before": { content: '""', display: "inline-block", width: 22, height: 2, bgcolor: BRAND.brass },
        }}
    >
        {children}
    </Typography>
);

const SERVICES = [
    {
        title: "Product Development",
        description: "We offer top-notch product development to bring your ideas to life.",
        icon: <BuildOutlinedIcon sx={{ fontSize: 26 }} />,
    },
    {
        title: "Customer Support",
        description: "Our 24/7 support team ensures a smooth shopping experience.",
        icon: <SupportAgentOutlinedIcon sx={{ fontSize: 26 }} />,
    },
    {
        title: "Fast Delivery",
        description: "Quick and reliable shipping for all your orders.",
        icon: <LocalShippingOutlinedIcon sx={{ fontSize: 26 }} />,
    },
];

const Services = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: BRAND.paper, fontFamily: FONT_BODY }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", maxWidth: 560, mx: "auto", mb: 6 }}>
                    <Eyebrow>What We Offer</Eyebrow>
                    <Typography
                        sx={{
                            fontFamily: FONT_DISPLAY,
                            fontWeight: 600,
                            fontSize: { xs: "2rem", md: "2.6rem" },
                            color: BRAND.ink,
                            mt: 1.5,
                        }}
                    >
                        Our Services
                    </Typography>
                    <Typography sx={{ color: BRAND.stone, mt: 1.5, fontSize: "0.98rem", lineHeight: 1.7 }}>
                        Everything we do is built around making your shopping experience effortless.
                    </Typography>
                </Box>

                <Grid container spacing={0} sx={{ border: `1px solid ${BRAND.hairline}` }}>
                    {SERVICES.map((service, index) => (
                        <Grid
                            key={index}
                            item
                            xs={12}
                            md={4}
                            sx={{
                                p: { xs: 3, md: 4 },
                                textAlign: "center",
                                borderRight: {
                                    md: index < SERVICES.length - 1
                                        ? `1px solid ${BRAND.hairline}`
                                        : "none"},
                                borderTop: {
                                    xs: index > 0 ? `1px solid ${BRAND.hairline}` : "none",
                                    md: "none"
},
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    display: "grid",
                                    placeItems: "center",
                                    bgcolor: BRAND.panel,
                                    color: BRAND.wine,
                                    mb: 2.5,
                                }}
                            >
                                {service.icon}
                            </Box>
                            <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem", color: BRAND.ink, mb: 1 }}>
                                {service.title}
                            </Typography>
                            <Typography sx={{ color: BRAND.stone, fontSize: "0.9rem", lineHeight: 1.65, mb: 3, flexGrow: 1 }}>
                                {service.description}
                            </Typography>
                            <Button
                                endIcon={<ArrowForwardIcon fontSize="small" />}
                                sx={{
                                    borderRadius: 0,
                                    border: `1px solid ${BRAND.ink}`,
                                    color: BRAND.ink,
                                    fontWeight: 600,
                                    fontSize: "0.82rem",
                                    textTransform: "none",
                                    px: 3,
                                    py: 1,
                                    "&:hover": { bgcolor: BRAND.ink, color: "#fff" },
                                }}
                            >
                                Learn More
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;