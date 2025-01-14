// NewsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Box, CircularProgress, Alert, CardMedia } from "@mui/material";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/news");
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching news");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        News Articles
      </Typography>
      {news.map((article) => (
        <Card key={article._id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
          {article.image && (
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:5000${article.image}`}
              alt={article.title}
            />
          )}
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
              {article.title}
            </Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {article.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default NewsPage;
