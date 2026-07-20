import React from "react";
import { Box, Typography, Container, Grid, Stack } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

const About = () => {
  return (
    <Box sx={{ py: { xs: 9, md: 12 }, bgcolor: BRAND.paper, fontFamily: FONT_BODY }}>
      <Container maxWidth="lg">
        {/* HERO */}
        <Stack spacing={2.5} alignItems="center" sx={{ textAlign: "center", mb: 11 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              display: "grid",
              placeItems: "center",
              border: `1px solid ${BRAND.hairline}`,
              bgcolor: BRAND.ink,
            }}
          >
            <StorefrontIcon sx={{ fontSize: 30, color: BRAND.brass }} />
          </Box>
          <Eyebrow>Our Story</Eyebrow>
          <Typography
            sx={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 600,
              fontSize: { xs: "2.2rem", md: "3.2rem" },
              color: BRAND.ink,
              lineHeight: 1.15,
            }}
          >
            About {BRAND.name}
          </Typography>
          <Typography sx={{ color: BRAND.stone, maxWidth: 640, fontSize: "1.05rem", lineHeight: 1.75 }}>
            {BRAND.name} is your one-stop online shopping destination. Our mission is to provide premium
            products with exceptional service and a seamless shopping experience.
          </Typography>
        </Stack>

        {/* MISSION & VISION */}
        <Grid container spacing={0} sx={{ mb: 12, border: `1px solid ${BRAND.hairline}` }}>
          {[
            {
              title: "Our Mission",
              desc: "Provide a modern, reliable, and enjoyable shopping experience connecting customers with top-quality products.",
              icon: <FlagOutlinedIcon sx={{ fontSize: 26 }} />,
            },
            {
              title: "Our Vision",
              desc: "Become the most loved online shopping platform, delivering products and experiences that delight customers worldwide.",
              icon: <VisibilityOutlinedIcon sx={{ fontSize: 26 }} />,
            },
          ].map((item, idx) => (
            <Grid
              item
              xs={12}
              md={6}
              key={idx}
              sx={{
                p: { xs: 4, md: 6 },
                borderRight: { md: idx === 0 ? `1px solid ${BRAND.hairline}` : "none" },
                borderTop: { xs: idx === 1 ? `1px solid ${BRAND.hairline}` : "none", md: "none" },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  display: "grid",
                  placeItems: "center",
                  bgcolor: BRAND.panel,
                  color: BRAND.wine,
                  mb: 3,
                }}
              >
                {item.icon}
              </Box>
              <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.4rem", color: BRAND.ink, mb: 1.5 }}>
                {item.title}
              </Typography>
              <Typography sx={{ color: BRAND.stone, lineHeight: 1.75, fontSize: "0.95rem" }}>{item.desc}</Typography>
            </Grid>
          ))}
        </Grid>

        {/* WHY CHOOSE US */}
        <Box>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Eyebrow>Advantages</Eyebrow>
            <Typography
              sx={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 600,
                fontSize: { xs: "1.9rem", md: "2.5rem" },
                color: BRAND.ink,
                mt: 1.5,
              }}
            >
              Why Choose Us
            </Typography>
          </Box>

          <Grid container spacing={0} sx={{ border: `1px solid ${BRAND.hairline}` }}>
            {[
              {
                icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 28 }} />,
                title: "Trusted Quality",
                desc: "All products meet high-quality standards, inspected before shipping.",
              },
              {
                icon: <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />,
                title: "Fast Delivery",
                desc: "Quick and safe delivery to your doorstep, every time.",
              },
              {
                icon: <SupportAgentOutlinedIcon sx={{ fontSize: 28 }} />,
                title: "24/7 Support",
                desc: "Our support team is always ready to help, day or night.",
              },
            ].map((item, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={4}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRight: { md: index < 2 ? `1px solid ${BRAND.hairline}` : "none" },
                  borderTop: { xs: index > 0 ? `1px solid ${BRAND.hairline}` : "none", md: "none" },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    bgcolor: BRAND.panel,
                    color: BRAND.wine,
                    display: "grid",
                    placeItems: "center",
                    mx: "auto",
                    mb: 2.5,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.15rem", color: BRAND.ink, mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: BRAND.stone, fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default About;