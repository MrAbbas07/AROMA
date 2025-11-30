import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Card, CardContent, CardActions, Grid, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GrassIcon from '@mui/icons-material/Grass';

const allQuestions = [
    {
        questionText: 'Which of the following is considered the "King of Herbs" in Ayurveda?',
        answerOptions: [
            { answerText: 'Tulsi', isCorrect: false },
            { answerText: 'Ashwagandha', isCorrect: false },
            { answerText: 'Haritaki', isCorrect: true },
            { answerText: 'Brahmi', isCorrect: false },
        ],
    },
    {
        questionText: 'What are the three Doshas in Ayurveda?',
        answerOptions: [
            { answerText: 'Vata, Pitta, Kapha', isCorrect: true },
            { answerText: 'Sattva, Rajas, Tamas', isCorrect: false },
            { answerText: 'Prana, Tejas, Ojas', isCorrect: false },
            { answerText: 'Earth, Water, Fire', isCorrect: false },
        ],
    },
    {
        questionText: 'Which herb is known for boosting memory and cognitive function?',
        answerOptions: [
            { answerText: 'Neem', isCorrect: false },
            { answerText: 'Brahmi', isCorrect: true },
            { answerText: 'Turmeric', isCorrect: false },
            { answerText: 'Ginger', isCorrect: false },
        ],
    },
    {
        questionText: 'Turmeric (Curcuma longa) is most famous for its property as an:',
        answerOptions: [
            { answerText: 'Anti-inflammatory', isCorrect: true },
            { answerText: 'Sedative', isCorrect: false },
            { answerText: 'Laxative', isCorrect: false },
            { answerText: 'Diuretic', isCorrect: false },
        ],
    },
    {
        questionText: 'Which part of the Neem tree is used for medicinal purposes?',
        answerOptions: [
            { answerText: 'Leaves only', isCorrect: false },
            { answerText: 'Bark only', isCorrect: false },
            { answerText: 'Seeds only', isCorrect: false },
            { answerText: 'All parts (Leaves, Bark, Seeds, Flowers, Roots)', isCorrect: true },
        ],
    },
    {
        questionText: 'Which herb is known as "Indian Ginseng"?',
        answerOptions: [
            { answerText: 'Tulsi', isCorrect: false },
            { answerText: 'Ashwagandha', isCorrect: true },
            { answerText: 'Amla', isCorrect: false },
            { answerText: 'Shatavari', isCorrect: false },
        ],
    },
    {
        questionText: 'Triphala is a combination of how many fruits?',
        answerOptions: [
            { answerText: 'Two', isCorrect: false },
            { answerText: 'Three', isCorrect: true },
            { answerText: 'Five', isCorrect: false },
            { answerText: 'Seven', isCorrect: false },
        ],
    },
    {
        questionText: 'Which Dosha is associated with fire and water elements?',
        answerOptions: [
            { answerText: 'Vata', isCorrect: false },
            { answerText: 'Pitta', isCorrect: true },
            { answerText: 'Kapha', isCorrect: false },
            { answerText: 'Agni', isCorrect: false },
        ],
    },
    {
        questionText: 'Amla (Indian Gooseberry) is an extremely rich source of:',
        answerOptions: [
            { answerText: 'Vitamin A', isCorrect: false },
            { answerText: 'Vitamin C', isCorrect: true },
            { answerText: 'Vitamin D', isCorrect: false },
            { answerText: 'Vitamin B12', isCorrect: false },
        ],
    },
    {
        questionText: 'Which herb is commonly used to relieve stress and anxiety?',
        answerOptions: [
            { answerText: 'Ashwagandha', isCorrect: true },
            { answerText: 'Ginger', isCorrect: false },
            { answerText: 'Cumin', isCorrect: false },
            { answerText: 'Fenugreek', isCorrect: false },
        ],
    },
    {
        questionText: 'What is the primary purpose of "Panchakarma" in Ayurveda?',
        answerOptions: [
            { answerText: 'Daily exercise', isCorrect: false },
            { answerText: 'Detoxification and rejuvenation', isCorrect: true },
            { answerText: 'Cooking method', isCorrect: false },
            { answerText: 'Meditation technique', isCorrect: false },
        ],
    },
    {
        questionText: 'Which spice is known to aid digestion and metabolism?',
        answerOptions: [
            { answerText: 'Cumin', isCorrect: true },
            { answerText: 'Saffron', isCorrect: false },
            { answerText: 'Vanilla', isCorrect: false },
            { answerText: 'Rosemary', isCorrect: false },
        ],
    }
];

export default function QuizPage() {
    const theme = useTheme();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);

    useEffect(() => {
        startQuiz();
    }, []);

    const startQuiz = () => {
        // Shuffle and pick 5
        const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
        setQuizQuestions(shuffled.slice(0, 5));
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizQuestions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    if (quizQuestions.length === 0) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><Typography>Loading Quiz...</Typography></Box>;
    }

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                    <GrassIcon fontSize="large" sx={{ mr: 1, verticalAlign: 'bottom' }} />
                    Ayurveda & Herbs Quiz
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Test your knowledge of ancient healing wisdom!
                </Typography>
            </Box>

            <Card elevation={6} sx={{ borderRadius: 4, background: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 100%)' }}>
                <CardContent sx={{ p: 4 }}>
                    {showScore ? (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="h4" gutterBottom>
                                You scored {score} out of {quizQuestions.length}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 4 }}>
                                {score === quizQuestions.length ? 'Perfect! You are an Ayurveda Master!' :
                                    score > quizQuestions.length / 2 ? 'Great job! You know your herbs well.' :
                                        'Keep learning! The world of Ayurveda is vast.'}
                            </Typography>
                            <Button variant="contained" color="success" size="large" onClick={startQuiz}>
                                Restart Quiz with New Questions
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h5" component="div" gutterBottom>
                                    Question {currentQuestion + 1}/{quizQuestions.length}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                                    {quizQuestions[currentQuestion].questionText}
                                </Typography>
                            </Box>
                            <Grid container spacing={2}>
                                {quizQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Button
                                            variant="outlined"
                                            color="success"
                                            fullWidth
                                            size="large"
                                            sx={{
                                                height: '100%',
                                                justifyContent: 'flex-start',
                                                textAlign: 'left',
                                                py: 2,
                                                borderColor: '#2e7d32',
                                                '&:hover': {
                                                    backgroundColor: '#2e7d32',
                                                    color: 'white',
                                                }
                                            }}
                                            onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                        >
                                            {answerOption.answerText}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}
