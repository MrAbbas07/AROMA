import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizIcon from '@mui/icons-material/Quiz';
import ScienceIcon from '@mui/icons-material/Science';

const GamesPage = () => {
    const navigate = useNavigate();

    const games = [
        {
            title: "Sattvic Sorter",
            description: "Sort healthy and unhealthy foods in this fast-paced arcade game!",
            icon: <SportsEsportsIcon sx={{ fontSize: 60, color: '#4CAF50' }} />,
            path: "/sattvic-sorter",
            color: "#E8F5E9"
        },
        {
            title: "Wellness Quiz",
            description: "Test your knowledge about Ayurveda and wellness.",
            icon: <QuizIcon sx={{ fontSize: 60, color: '#2196F3' }} />,
            path: "/quiz",
            color: "#E3F2FD"
        },
        {
            title: "The Spice Lab",
            description: "Mix ingredients to create traditional remedies.",
            icon: <ScienceIcon sx={{ fontSize: 60, color: '#FFB300' }} />,
            path: "/spice-lab",
            color: "#FFF8E1"
        }
    ];

    return (
        <Box sx={{ p: 4, minHeight: '80vh', bgcolor: '#f9f9f9' }}>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#2E7D32', fontWeight: 'bold', mb: 6 }}>
                Wellness Games
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {games.map((game, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
                        }}>
                            <CardActionArea onClick={() => navigate(game.path)} sx={{ height: '100%', p: 2, bgcolor: game.color }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    {game.icon}
                                </Box>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                        {game.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {game.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default GamesPage;
