
import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Fade } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';

const SpiceLabGame = () => {
    const [potItems, setPotItems] = useState([]);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [gameState, setGameState] = useState('playing'); // playing, success, failure, completed
    const [message, setMessage] = useState("Goal: Create Golden Milk (Haldi Doodh) for Immunity.");

    const ingredients = [
        { id: 'water', name: 'Water', icon: '💧', color: '#E3F2FD' },
        { id: 'milk', name: 'Milk', icon: '🥛', color: '#F5F5F5' },
        { id: 'tea', name: 'Tea Leaves', icon: '🍂', color: '#5D4037' },
        { id: 'turmeric', name: 'Turmeric', icon: '🟧', color: '#FFC107' },
        { id: 'ginger', name: 'Ginger', icon: '🫚', color: '#D7CCC8' },
        { id: 'pepper', name: 'Black Pepper', icon: '⚫', color: '#212121' },
        { id: 'cardamom', name: 'Cardamom', icon: '🟢', color: '#C5E1A5' },
        { id: 'cloves', name: 'Cloves', icon: '🏵️', color: '#8D6E63' },
        { id: 'cinnamon', name: 'Cinnamon', icon: '🪵', color: '#8D6E63' },
        { id: 'lemon', name: 'Lemon', icon: '🍋', color: '#FFF176' },
        { id: 'honey', name: 'Honey', icon: '🍯', color: '#FFB300' },
    ];

    const levels = [
        {
            name: "Golden Milk (Haldi Doodh)",
            goal: "Goal: Create Golden Milk for Immunity.",
            description: "Turmeric (Curcumin) is a powerful anti-inflammatory, boosted by black pepper.",
            required: ['milk', 'turmeric', 'honey'],
            alternatives: [['pepper'], ['cinnamon']], // One from each sub-array if present
            forbidden: ['lemon', 'water', 'tea']
        },
        {
            name: "Masala Chai",
            goal: "Goal: Brew a strong Masala Chai for Energy.",
            description: "A warming blend of spices, tea, and milk to awaken the senses.",
            required: ['water', 'milk', 'tea', 'ginger', 'cardamom'],
            alternatives: [],
            forbidden: ['lemon', 'turmeric']
        },
        {
            name: "Digestive Tea",
            goal: "Goal: Soothe the stomach with a Digestive Tea.",
            description: "Simple, effective relief using ginger and lemon.",
            required: ['water', 'ginger', 'lemon', 'honey'],
            alternatives: [],
            forbidden: ['milk', 'tea', 'turmeric']
        }
    ];

    const handleDragStart = (e, ingredient) => {
        e.dataTransfer.setData("ingredient", JSON.stringify(ingredient));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (gameState !== 'playing') return;

        const ingredientData = e.dataTransfer.getData("ingredient");
        if (ingredientData) {
            const ingredient = JSON.parse(ingredientData);
            if (potItems.length < 6) {
                setPotItems([...potItems, ingredient]);
            } else {
                setMessage("The pot is full! Remove items or mix now.");
            }
        }
    };

    const handleMix = () => {
        if (potItems.length === 0) {
            setMessage("The pot is empty! Add ingredients first.");
            return;
        }

        const level = levels[currentLevel];
        const itemIds = potItems.map(i => i.id);
        const has = (id) => itemIds.includes(id);

        // Check Required
        const missingRequired = level.required.filter(req => !has(req));

        // Check Alternatives (if any)
        let missingAlternative = false;
        if (level.alternatives) {
            // For Golden Milk: Needs either Pepper OR Cinnamon
            // Logic: For each group in alternatives, must have at least one
            // But my structure above is [['pepper'], ['cinnamon']] which implies both? 
            // Wait, the previous logic was (Pepper OR Cinnamon).
            // Let's simplify: 
            // Golden Milk: Milk, Turmeric, Honey + (Pepper OR Cinnamon)
            if (level.name.includes("Golden Milk")) {
                if (!has('pepper') && !has('cinnamon')) missingAlternative = true;
            }
        }

        // Check Forbidden
        const hasForbidden = level.forbidden.some(forbid => has(forbid));

        if (missingRequired.length === 0 && !missingAlternative && !hasForbidden) {
            setGameState('success');
            setMessage(`Success! ${level.description} `);
        } else {
            setGameState('failure');
            if (hasForbidden) {
                setMessage("Oops! You added something that doesn't belong.");
            } else {
                setMessage("Not quite right. Check the recipe and try again!");
            }
        }
    };

    const handleNextLevel = () => {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel(c => c + 1);
            setPotItems([]);
            setGameState('playing');
            setMessage(levels[currentLevel + 1].goal);
        } else {
            setGameState('completed');
            setMessage("Congratulations! You've mastered all the recipes!");
        }
    };

    const handleClear = () => {
        setPotItems([]);
        setGameState('playing');
        setMessage(levels[currentLevel].goal);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#3E2723',
            color: '#EFEBE9',
            p: 3,
            backgroundImage: 'radial-gradient(#5D4037 20%, #3E2723 90%)'
        }}>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 1, fontFamily: 'serif', color: '#FFECB3' }}>
                The Unani Spice Lab
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 4, color: '#BCAAA4' }}>
                {gameState === 'completed' ? "Master Apothecary Status Achieved! 🏆" : message}
            </Typography>

            {gameState === 'completed' ? (
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                    <Typography variant="h1">🎓</Typography>
                    <Typography variant="h4" sx={{ mt: 2 }}>You have completed the course.</Typography>
                    <Button variant="contained" color="secondary" sx={{ mt: 4 }} onClick={() => window.location.reload()}>Restart Course</Button>
                </Box>
            ) : (
                <Grid container spacing={4} sx={{ height: '70vh' }}>
                    {/* Pantry */}
                    <Grid item xs={12} md={5}>
                        <Paper sx={{
                            p: 3,
                            height: '100%',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(5px)',
                            border: '2px solid #8D6E63',
                            overflowY: 'auto'
                        }}>
                            <Typography variant="h5" sx={{ mb: 3, color: '#FFECB3', textAlign: 'center' }}>Pantry</Typography>
                            <Grid container spacing={2}>
                                {ingredients.map((ing) => (
                                    <Grid item xs={4} key={ing.id}>
                                        <Paper
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, ing)}
                                            sx={{
                                                p: 1,
                                                textAlign: 'center',
                                                cursor: 'grab',
                                                bgcolor: 'rgba(255,255,255,0.9)',
                                                transition: 'transform 0.2s',
                                                '&:hover': { transform: 'scale(1.1)' },
                                                '&:active': { cursor: 'grabbing' }
                                            }}
                                        >
                                            <Typography variant="h3">{ing.icon}</Typography>
                                            <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', lineHeight: 1 }}>{ing.name}</Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Mixing Vessel */}
                    <Grid item xs={12} md={7}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                sx={{
                                    width: 300,
                                    height: 300,
                                    borderRadius: '50%',
                                    border: '10px solid #5D4037',
                                    bgcolor: gameState === 'success' ? '#FFD54F' : (gameState === 'failure' ? '#5D4037' : '#3E2723'),
                                    boxShadow: 'inset 0 0 50px #000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    transition: 'background-color 1s',
                                    mb: 4
                                }}
                            >
                                {gameState === 'success' ? (
                                    <Fade in={true}>
                                        <Typography variant="h1">✨🍵✨</Typography>
                                    </Fade>
                                ) : (
                                    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                        {potItems.map((item, index) => (
                                            <Typography
                                                key={index}
                                                variant="h4"
                                                sx={{
                                                    position: 'absolute',
                                                    left: `${50 + (Math.random() * 40 - 20)}% `,
                                                    top: `${50 + (Math.random() * 40 - 20)}% `,
                                                    transform: 'translate(-50%, -50%)',
                                                    animation: 'float 3s infinite ease-in-out'
                                                }}
                                            >
                                                {item.icon}
                                            </Typography>
                                        ))}
                                        {potItems.length === 0 && (
                                            <Typography sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#8D6E63', textAlign: 'center' }}>
                                                Drop Ingredients Here
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {gameState === 'success' ? (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="large"
                                        onClick={handleNextLevel}
                                        sx={{ px: 4, py: 1.5, fontSize: '1.2rem' }}
                                    >
                                        Next Recipe ➡️
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        size="large"
                                        onClick={handleMix}
                                        disabled={gameState !== 'playing'}
                                        startIcon={<ScienceIcon />}
                                        sx={{ px: 4, py: 1.5, fontSize: '1.2rem' }}
                                    >
                                        Mix Potions
                                    </Button>
                                )}

                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    onClick={handleClear}
                                    sx={{ px: 4, py: 1.5 }}
                                >
                                    Clear Pot
                                </Button>
                            </Box>

                            <Typography variant="caption" sx={{ mt: 2, color: '#BCAAA4' }}>
                                Level {currentLevel + 1} of {levels.length}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default SpiceLabGame;

