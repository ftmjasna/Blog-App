import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, AppBar, Toolbar, Grid, Paper } from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const whenClicked = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <Box sx={{ backgroundColor: 'lightgreen', minHeight: '100vh', padding: '20px' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Paper sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
              Blog Dashboard
            </Typography>
            <AppBar position="static" sx={{ backgroundColor: '#333', borderRadius: '5px', marginBottom: '20px' }}>
              <Toolbar>
                <Link href="/home" sx={{ textDecoration: 'none', color: '#fff', marginRight: '20px' }}>
                  Home
                </Link>
                <Link href="/blogform" sx={{ textDecoration: 'none', color: '#fff' }}>
                  Add Blog
                </Link>
              </Toolbar>
            </AppBar>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {blogs.map(blog => (
                <li key={blog.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
                  <Typography variant="body1" onClick={() => whenClicked(blog)} sx={{ cursor: 'pointer', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', '&:hover': { backgroundColor: '#e0e0e0' } }}>
                    {blog.id}. {blog.title}
                  </Typography>
                </li>
              ))}
            </ul>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
              Selected Blog
            </Typography>
            {selectedBlog && (
              <div>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  UserId: {selectedBlog.userId}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Id: {selectedBlog.id}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                  Title: {selectedBlog.title}
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
