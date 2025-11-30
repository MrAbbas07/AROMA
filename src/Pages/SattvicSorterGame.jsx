
import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const SattvicSorterGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game Constants
  const sattvicItems = [
    { name: "Apple", emoji: "🍎" },
    { name: "Banana", emoji: "🍌" },
    { name: "Spinach", emoji: "🥬" },
    { name: "Almonds", emoji: "🥜" },
    { name: "Milk", emoji: "🥛" },
    { name: "Coconut", emoji: "🥥" }
  ];
  const junkItems = [
    { name: "Burger", emoji: "🍔" },
    { name: "Pizza", emoji: "🍕" },
    { name: "Soda", emoji: "🥤" },
    { name: "Candy", emoji: "🍬" },
    { name: "Chips", emoji: "🍟" },
    { name: "Chicken", emoji: "🍗" }
  ];

  const colors = {
    bgLeft: '#FFF3E0',  // Light Orange/Cream
    bgRight: '#E8F5E9', // Light Green
    text: '#3E2723'     // Dark Brown
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Game State
    let items = [];
    let particles = [];
    let lastSpawnTime = 0;
    let spawnInterval = 2000;
    let speedMultiplier = 1.0;
    let gameTime = 0;
    let isGameOver = false;
    let isGameStarted = gameStarted;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 64;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Input Handling
    let touchStartX = 0;

    const handleKeyDown = (e) => {
      if (isGameOver || !isGameStarted || items.length === 0) return;

      // Control the oldest item (items[0])
      const currentItem = items[0];
      const moveSpeed = 40; // Increased speed for better responsiveness

      if (e.key === 'ArrowLeft') {
        currentItem.x = Math.max(currentItem.width / 2, currentItem.x - moveSpeed);
      } else if (e.key === 'ArrowRight') {
        currentItem.x = Math.min(canvas.width - currentItem.width / 2, currentItem.x + moveSpeed);
      }
    };

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      if (isGameOver || !isGameStarted || items.length === 0) return;

      const currentItem = items[0];
      const touchX = e.touches[0].clientX;
      const diff = touchX - touchStartX;

      currentItem.x = Math.max(currentItem.width / 2, Math.min(canvas.width - currentItem.width / 2, currentItem.x + diff));
      touchStartX = touchX;
    };

    window.addEventListener('keydown', handleKeyDown);
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);

    // Particle Class
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
        this.color = color;
        this.life = 1.0;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.02;
      }
      draw() {
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }

    // Item Class
    class Item {
      constructor() {
        this.type = Math.random() > 0.5 ? 'sattvic' : 'junk';
        const data = this.type === 'sattvic'
          ? sattvicItems[Math.floor(Math.random() * sattvicItems.length)]
          : junkItems[Math.floor(Math.random() * junkItems.length)];

        this.name = data.name;
        this.emoji = data.emoji;
        this.width = 60;
        this.height = 60;
        this.x = Math.random() * (canvas.width - this.width) + this.width / 2;
        this.y = -this.height;
        this.speed = (2 + Math.random()) * speedMultiplier;
      }

      draw() {
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.emoji, this.x, this.y);

        // Optional: Debug box
        // ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        // ctx.strokeRect(this.x - 30, this.y - 30, 60, 60);
      }

      update() {
        this.y += this.speed;
      }
    }

    // Game Loop
    const loop = (timestamp) => {
      if (!isGameStarted) return;
      if (isGameOver) return;

      // Difficulty Progression
      if (timestamp - lastSpawnTime > spawnInterval) {
        items.push(new Item());
        lastSpawnTime = timestamp;

        gameTime += spawnInterval;
        if (gameTime % 20000 < spawnInterval) {
          speedMultiplier *= 1.1;
          spawnInterval = Math.max(800, spawnInterval * 0.95);
        }
      }

      // Clear Canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Background
      ctx.fillStyle = colors.bgLeft;
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
      ctx.fillStyle = colors.bgRight;
      ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

      // Draw Divider
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Labels
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText("AVOID ❌", canvas.width * 0.25, canvas.height - 50);
      ctx.fillText("CONSUME ✅", canvas.width * 0.75, canvas.height - 50);

      // Update and Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) particles.splice(i, 1);
      }

      // Update and Draw Items
      // Iterate backwards for rendering order, but logic handles items[0]
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.update();
        item.draw();

        // Highlight the active item (items[0])
        if (i === 0) {
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(item.x, item.y, 35, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Collision with bottom
        if (item.y > canvas.height - 30) {
          const isRightSide = item.x > canvas.width / 2;
          let correct = false;

          if (item.type === 'sattvic' && isRightSide) correct = true;
          if (item.type === 'junk' && !isRightSide) correct = true;

          if (correct) {
            setScore(s => s + 10);
            // Spawn particles
            for (let k = 0; k < 10; k++) {
              particles.push(new Particle(item.x, canvas.height - 30, '#4CAF50'));
            }
          } else {
            setLives(l => {
              const newLives = l - 1;
              if (newLives <= 0) {
                isGameOver = true;
                setGameOver(true);
              }
              return newLives;
            });
            // Spawn particles
            for (let k = 0; k < 10; k++) {
              particles.push(new Particle(item.x, canvas.height - 30, '#F44336'));
            }
          }

          items.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    if (gameStarted) {
      animationFrameId = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted, gameOver]);

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f5' }}>
      {/* HUD */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10, bgcolor: 'rgba(255,255,255,0.8)', p: 1, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
          Lives: {'❤️'.repeat(Math.max(0, lives))}
        </Typography>
      </Box>
      <Box sx={{ position: 'absolute', top: 20, right: 20, zIndex: 10, bgcolor: 'rgba(255,255,255,0.8)', p: 1, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ color: '#388e3c', fontWeight: 'bold' }}>
          Score: {score}
        </Typography>
      </Box>

      {/* Game Canvas */}
      <canvas ref={canvasRef} style={{ display: 'block' }} />

      {/* Start Screen */}
      {!gameStarted && !gameOver && (
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 20,
          backdropFilter: 'blur(5px)'
        }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Sattvic Sorter
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Sort the food! 🍎 → Right | 🍔 → Left
          </Typography>
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleStart}
            sx={{ fontSize: '1.5rem', px: 6, py: 2, borderRadius: 50, boxShadow: '0 4px 20px rgba(0,255,0,0.4)' }}
          >
            Start Game
          </Button>
        </Box>
      )}

      {/* Game Over Overlay */}
      {gameOver && (
        <Box sx={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          zIndex: 20,
          backdropFilter: 'blur(5px)'
        }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#ef5350' }}>Game Over</Typography>
          <Typography variant="h4" gutterBottom>Final Score: {score}</Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStart}
            sx={{ mt: 3, fontSize: '1.5rem', px: 5, borderRadius: 50 }}
          >
            Try Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SattvicSorterGame;

