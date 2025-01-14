import React, { useState, useEffect } from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewsPage from "./pages/NewsPage";
import PostNewsPage from "./pages/PostNewsPage"; // Ensure this path is correct

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [userEmail, setUserEmail] = useState(null); // Store email after login
  const [anchorEl, setAnchorEl] = useState(null); // Manage account menu

  const navigate = useNavigate();

  useEffect(() => {
    // Set the title of the browser tab to "News App"
    document.title = "News App";
  }, []);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    navigate("/news");  // Redirect to news after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    navigate("/login"); // Redirect to login page after logout
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ backgroundColor: "#e3f2fd", minHeight: "100vh", paddingTop: 8 }}>
      <Container maxWidth="sm">
        <AppBar position="fixed" sx={{ width: "100%", zIndex: 1201 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* Left aligned buttons */}
            {isLoggedIn && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="text"
                  component={Link}
                  to="/news"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  News
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  to="/post-news"
                  sx={{ color: "white", fontWeight: "bold" }}
                >
                  Post News
                </Button>
              </Box>
            )}

            {/* AppBar title in the center */}
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
              News App
            </Typography>

            {/* Account icon and menu on the right */}
            {isLoggedIn && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ color: "white", marginRight: 1 }}>
                  {userEmail}
                </Typography>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Typography variant="h3" sx={{ marginBottom: 1 }}>
            Welcome to News App
          </Typography>

          <Routes>
            {/* First Page, asking user to register or login */}
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                      Please login or register
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                      <Button variant="contained" color="primary" component={Link} to="/login">
                        Login
                      </Button>
                      <Button variant="outlined" color="secondary" component={Link} to="/register">
                        Register
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Navigate to="/news" />
                )
              }
            />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/news" element={isLoggedIn ? <NewsPage /> : <Navigate to="/login" />} />
            <Route path="/post-news" element={isLoggedIn ? <PostNewsPage /> : <Navigate to="/login" />} />
          </Routes>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
