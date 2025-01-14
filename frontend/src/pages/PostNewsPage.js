// PostNewspage.js
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import axios from "axios";

function PostNewsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null); // Store the uploaded image file
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image); // Append the image to the form data

    try {
      await axios.post("http://localhost:5000/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set multipart form-data header
        },
      });
      setSuccess("News posted successfully!");
      setTitle("");
      setContent("");
      setImage(null);
    } catch (err) {
      setError("Error posting news");
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Post News
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])} // Handle image file
          style={{ marginTop: "16px" }}
        />
        {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Post News
        </Button>
      </form>
    </Box>
  );
}

export default PostNewsPage;
