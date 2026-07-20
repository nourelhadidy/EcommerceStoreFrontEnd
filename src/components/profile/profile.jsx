import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Avatar, Stack, Divider, Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

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

const Profile = () => {
  const { email, password, name } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userName = name || "Guest User";

  const handleLogout = () => {
    console.log("User logged out");
    navigate("/login");
  };

  const handleEdit = () => {
    console.log("Edit Profile clicked");
  };

  const navItems = [
    { label: "Overview", icon: PersonOutlineOutlinedIcon, path: "#overview" },
    { label: "Order History", icon: ShoppingBagOutlinedIcon, path: "/orders" },
    { label: "Home", icon: HomeIcon, path: "/" },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        p: { xs: 2, md: 8 },
        bgcolor: BRAND.paper,
        fontFamily: FONT_BODY,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          bgcolor: BRAND.paper,
          border: `1px solid ${BRAND.hairline}`,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: { md: 680 },
        }}
      >
        {/* LEFT PANEL */}
        <Box
          sx={{
            width: { xs: "100%", md: 280 },
            borderRight: { md: `1px solid ${BRAND.hairline}` },
            borderBottom: { xs: `1px solid ${BRAND.hairline}`, md: "none" },
            p: 4,
            bgcolor: BRAND.ink,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack spacing={4} sx={{ height: "100%" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ width: 56, height: 56, bgcolor: BRAND.brass, color: BRAND.ink, fontSize: "1.3rem", fontWeight: 700 }}>
                {userName.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.05rem" }} noWrap>
                  {userName}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem" }} noWrap>
                  {email}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />

            <Stack spacing={0.5} width="100%">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isCurrent = item.label === "Overview";
                return (
                  <Button
                    key={item.label}
                    startIcon={<IconComponent fontSize="small" />}
                    fullWidth
                    onClick={() => (item.path.startsWith("/") ? navigate(item.path) : null)}
                    sx={{
                      justifyContent: "flex-start",
                      py: 1.4,
                      px: 2,
                      fontWeight: isCurrent ? 600 : 500,
                      fontSize: "0.88rem",
                      textTransform: "none",
                      borderRadius: 0,
                      color: isCurrent ? BRAND.brass : "rgba(255,255,255,0.85)",
                      bgcolor: isCurrent ? "rgba(183,146,74,0.1)" : "transparent",
                      borderLeft: isCurrent ? `2px solid ${BRAND.brass}` : "2px solid transparent",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.06)", color: BRAND.brass },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Stack>

            <Box sx={{ mt: "auto" }}>
              <Button
                startIcon={<ExitToAppIcon fontSize="small" />}
                fullWidth
                onClick={handleLogout}
                variant="outlined"
                sx={{
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textTransform: "none",
                  borderRadius: 0,
                  color: "#E88E93",
                  borderColor: "rgba(232,142,147,0.4)",
                  "&:hover": { bgcolor: "rgba(232,142,147,0.08)", borderColor: "#E88E93" },
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Stack>
        </Box>

        {/* RIGHT PANEL */}
        <Box sx={{ flexGrow: 1, p: { xs: 3, md: 6 } }}>
          <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: { xs: "1.6rem", md: "2rem" }, color: BRAND.ink, mb: 5 }}>
            Account Overview
          </Typography>

          <Stack spacing={6}>
            {/* Personal Details */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem", color: BRAND.ink }}>
                  Personal Details
                </Typography>
                <Button
                  onClick={handleEdit}
                  size="small"
                  startIcon={<EditIcon fontSize="small" />}
                  sx={{ color: BRAND.wine, fontWeight: 600, fontSize: "0.8rem", textTransform: "none", borderRadius: 0 }}
                >
                  Edit
                </Button>
              </Stack>
              <Divider sx={{ mb: 3, borderColor: BRAND.hairline }} />

              <Grid container spacing={4}>
                {[
                  { label: "Full Name", value: name || "Not Set", info: "Name used on orders and invoices." },
                  { label: "Email Address", value: email || "Not Set", info: "Primary contact email for account updates." },
                ].map((info, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Stack spacing={0.5}>
                      <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: BRAND.stone, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                        {info.label}
                      </Typography>
                      <Typography sx={{ fontWeight: 500, fontSize: "1.05rem", color: BRAND.ink }}>{info.value}</Typography>
                      <Typography variant="caption" sx={{ color: BRAND.stone }}>
                        {info.info}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Security */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography sx={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: "1.2rem", color: BRAND.ink }}>
                  Security Settings
                </Typography>
                <Button
                  onClick={() => console.log("Change password")}
                  size="small"
                  startIcon={<LockOutlinedIcon fontSize="small" />}
                  sx={{ color: BRAND.wine, fontWeight: 600, fontSize: "0.8rem", textTransform: "none", borderRadius: 0 }}
                >
                  Change
                </Button>
              </Stack>
              <Divider sx={{ mb: 3, borderColor: BRAND.hairline }} />

              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={0.5}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: BRAND.stone, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Password
                    </Typography>
                    <Typography sx={{ fontWeight: 500, fontSize: "1.05rem", color: BRAND.ink }}>********</Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;