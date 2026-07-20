// src/pages/Login.jsx
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/slice/userSlice";
import {
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Paper,
    Link,
    Snackbar,
    Alert,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const BRAND_COLOR = "#00BFA6";
const BRAND_COLOR_DARK = "#00897B";
const TEXT_PRIMARY = "#222";
const TEXT_SECONDARY = "#666";
const BACKGROUND_LIGHT = "#f7f9fa";

export default function Login() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const [showPassword, setShowPassword] = useState(false);

    const closeSnack = () => setSnack((s) => ({ ...s, open: false }));

    const submithandler = async (e) => {
        e.preventDefault();

        // derive values
        const nameVal = nameRef.current?.value?.trim() || "";
        const emailVal = emailRef.current?.value?.trim() || "";
        const passwordVal = passwordRef.current?.value || "";

        if (!emailVal || !passwordVal) {
            setSnack({ open: true, message: "Please enter email and password.", severity: "error" });
            return;
        }

        const username = nameVal || emailVal.split("@")[0];

        // Build credentials for FakeStore API (expects username + password)
        const credentials = { username, password: passwordVal };

        setLoading(true);
        try {
            const res = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await res.json().catch(() => null);

            if (!res.ok) {
                // Server returned non-2xx
                const msg = data?.message || `Server error ${res.status}`;
                console.error("Login HTTP error:", res.status, data);
                setSnack({ open: true, message: msg, severity: "error" });
                return;
            }

            if (data?.token) {
                // Save token (demo). In prod prefer httpOnly cookie from backend.
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("authAt", new Date().toISOString());

                // Dispatch redux action - adjust payload shape to match your slice
                dispatch(
                    login({
                        token: data.token,
                        username,
                        email: emailVal,
                    })
                );

                setSnack({ open: true, message: "Logged in successfully", severity: "success" });

                // Navigate to profile (small delay so user sees snack)
                setTimeout(() => navigate("/profile"), 600);
            } else {
                // API responded but no token
                console.warn("No token returned:", data);
                setSnack({ open: true, message: data?.error || "Invalid credentials", severity: "error" });
            }
        } catch (err) {
            console.error("Network/login error:", err);
            setSnack({ open: true, message: "Network error — check your connection", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: { xs: 2, md: 4 },
                bgcolor: BACKGROUND_LIGHT,
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    maxWidth: 450,
                    width: "100%",
                    borderRadius: 4,
                    p: { xs: 4, md: 5 },
                    boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                    bgcolor: "#ffffff",
                    textAlign: "center",
                }}
            >
                <Stack spacing={2} alignItems="center" mb={4}>
                    <LockOpenIcon sx={{ fontSize: 48, color: BRAND_COLOR }} />
                    <Typography variant="h4" fontWeight={700} color={TEXT_PRIMARY}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" color={TEXT_SECONDARY}>
                        Please enter your details to sign in.
                    </Typography>
                </Stack>

                <form onSubmit={submithandler}>
                    <Stack spacing={2.5}>
                        <TextField
                            inputRef={nameRef}
                            label="Name (username)"
                            type="text"
                            variant="outlined"
                            fullWidth
                            placeholder="mor_2314 (demo username)"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    "&.Mui-focused fieldset": { borderColor: BRAND_COLOR },
                                },
                            }}
                        />

                        <TextField
                            inputRef={emailRef}
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            placeholder="you@example.com"
                            required
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    "&.Mui-focused fieldset": { borderColor: BRAND_COLOR },
                                },
                            }}
                        />

                        <TextField
                            inputRef={passwordRef}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            required
                            fullWidth
                            placeholder="83r5^_ (demo password)"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={() => setShowPassword((s) => !s)}
                                            edge="end"
                                            size="large"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    "&.Mui-focused fieldset": { borderColor: BRAND_COLOR },
                                },
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disableElevation
                            sx={{
                                py: 1.5,
                                fontWeight: 600,
                                fontSize: "1.0rem",
                                borderRadius: 2,
                                bgcolor: BRAND_COLOR,
                                textTransform: "none",
                                transition: "background-color 0.3s ease",
                                "&:hover": { bgcolor: BRAND_COLOR_DARK },
                            }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={20} color="inherit" /> : "Log In"}
                        </Button>
                    </Stack>
                </form>

                <Typography mt={4} variant="body2" color={TEXT_SECONDARY}>
                    Don't have an account?{" "}
                    <Link
                        component="button"
                        onClick={() => navigate("/signup")}
                        sx={{
                            color: BRAND_COLOR,
                            fontWeight: 600,
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": {
                                textDecoration: "underline",
                                color: BRAND_COLOR_DARK,
                            },
                        }}
                    >
                        Sign Up
                    </Link>
                </Typography>

                <Typography mt={3} variant="caption" color="#aaa">
                    By logging in, you agree to our{" "}
                    <Link sx={{ cursor: "pointer" }} underline="hover">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link sx={{ cursor: "pointer" }} underline="hover">
                        Privacy Policy
                    </Link>
                    .
                </Typography>
            </Paper>

            <Snackbar
                open={snack.open}
                autoHideDuration={3500}
                onClose={closeSnack}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={closeSnack} severity={snack.severity} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
