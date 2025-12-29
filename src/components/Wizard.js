"use client";

import { useState, useMemo } from 'react';
import { questionsData } from '../data/questions';
import WizardLayout from './WizardLayout';
import QuestionCard from './QuestionCard';
import ResultsView from './ResultsView';

export default function Wizard() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);

    // Flatten questions to a linear list
    const allQuestions = useMemo(() => {
        return questionsData.flatMap(category =>
            category.questions.map(q => ({ ...q, category: category.category }))
        );
    }, []);

    const uniqueCategories = useMemo(() => {
        return questionsData.map(c => ({ category: c.category }));
    }, []);

    const currentQuestion = allQuestions[currentQuestionIndex];

    // Determine current category index for the sidebar
    const currentCategoryIndex = questionsData.findIndex(
        c => c.category === currentQuestion?.category
    );

    const handleAnswerChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < allQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        } else {
            setAnswers({});
        }
    };

    if (isFinished) {
        return <ResultsView answers={answers} onRestart={() => {
            setIsFinished(false);
            setCurrentQuestionIndex(0);
            setAnswers({});
        }} />;
    }

    return (
        <WizardLayout
            steps={uniqueCategories}
            currentStepIndex={currentCategoryIndex}
        >
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '500px' }}>
                <QuestionCard
                    question={currentQuestion}
                    value={answers[currentQuestion.id]}
                    onChange={handleAnswerChange}
                />

                <div className="actions" style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)' }}>
                    <button
                        className="glass-button"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button
                        className="glass-button primary"
                        onClick={handleNext}
                    >
                        {currentQuestionIndex === allQuestions.length - 1 ? 'Finish' : 'Continue >'}
                    </button>
                </div>
            </div>
        </WizardLayout>
    );
}
