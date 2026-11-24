'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button, Badge } from '@/components/ui/primitives';
import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QuizCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 16px 14px;
  margin: 24px 0;

  @media (min-width: 640px) {
    padding: 24px;
    margin: 28px 0;
  }
`;

const OptionButton = styled.button<{
  $isSelected: boolean;
  $isSubmitted: boolean;
  $isCorrect: boolean;
}>`
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 13.5px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.15s ease;
  cursor: pointer;

  @media (min-width: 640px) {
    gap: 12px;
    padding: 12px 16px;
    font-size: 14px;
  }

  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
    border-color: ${theme.mode === 'dark' ? '#FFFFFF' : '#000000'};
    background-color: ${theme.mode === 'dark' ? '#222222' : '#F0F0F0'};
    font-weight: 500;
  `}

  ${({ $isSubmitted, $isCorrect, $isSelected, theme }) => {
    if ($isSubmitted) {
      if ($isCorrect) {
        return theme.mode === 'dark'
          ? `
            border-color: #10B981 !important;
            background-color: rgba(16, 185, 129, 0.15) !important;
            color: #6EE7B7 !important;
          `
          : `
            border-color: #10B981 !important;
            background-color: #ECFDF5 !important;
            color: #065F46 !important;
          `;
      }
      if ($isSelected && !$isCorrect) {
        return theme.mode === 'dark'
          ? `
            border-color: #EF4444 !important;
            background-color: rgba(239, 68, 68, 0.15) !important;
            color: #FCA5A5 !important;
          `
          : `
            border-color: #EF4444 !important;
            background-color: #FEF2F2 !important;
            color: #991B1B !important;
          `;
      }
    }
  }}

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const OptionCircle = styled.span<{ $isSelected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid
    ${({ $isSelected, theme }) =>
      $isSelected
        ? (theme.mode === 'dark' ? '#FFFFFF' : '#000000')
        : (theme.mode === 'dark' ? '#444444' : '#CCCCCC')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
    display: ${({ $isSelected }) => ($isSelected ? 'block' : 'none')};
  }
`;

const FeedbackBox = styled(Box)<{ $isCorrect: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: ${({ $isCorrect, theme }) =>
    $isCorrect
      ? (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.15)' : '#ECFDF5')
      : (theme.mode === 'dark' ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2')};
  border: 1px solid
    ${({ $isCorrect, theme }) =>
      $isCorrect
        ? (theme.mode === 'dark' ? 'rgba(16, 185, 129, 0.35)' : '#A7F3D0')
        : (theme.mode === 'dark' ? 'rgba(239, 68, 68, 0.35)' : '#FECACA')};
`;

export function QuizComponent({
  title = 'Knowledge Check: Verify Your Understanding',
  questions,
}: {
  title?: string;
  questions: QuizQuestion[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <QuizCard textAlign="center">
        <CheckCircle2 size={36} color="#10B981" style={{ margin: '0 auto 12px' }} />
        <Text fontSize="18px" fontWeight="600" mb="6px">
          Quiz Completed!
        </Text>
        <Text fontSize="14px" color="#555555" mb="16px">
          You scored {score} out of {questions.length} questions correctly.
        </Text>
        <Button onClick={handleReset} variant="outline" size="sm">
          <RotateCcw size={14} /> Retry Knowledge Check
        </Button>
      </QuizCard>
    );
  }

  return (
    <QuizCard>
      <Flex alignItems="center" justifyContent="space-between" mb="14px">
        <Flex alignItems="center" gap="8px">
          <HelpCircle size={16} color="currentColor" />
          <Text fontSize="14px" fontWeight="600" color="text">
            {title}
          </Text>
        </Flex>
        <Badge variant="neutral">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
      </Flex>

      <Text fontSize="15px" fontWeight="600" mb="16px" color="text">
        {currentQ.question}
      </Text>

      <Box mb="16px">
        {currentQ.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            onClick={() => !isSubmitted && setSelectedOption(idx)}
            $isSelected={selectedOption === idx}
            $isSubmitted={isSubmitted}
            $isCorrect={idx === currentQ.correctIndex}
            disabled={isSubmitted}
          >
            <OptionCircle $isSelected={selectedOption === idx} />
            <span>{opt}</span>
          </OptionButton>
        ))}
      </Box>

      {isSubmitted && (
        <FeedbackBox $isCorrect={selectedOption === currentQ.correctIndex}>
          <Flex alignItems="center" gap="6px" mb="4px">
            {selectedOption === currentQ.correctIndex ? (
              <CheckCircle2 size={16} color="#10B981" />
            ) : (
              <AlertCircle size={16} color="#EF4444" />
            )}
            <Text
              fontSize="13px"
              fontWeight="700"
              color={
                selectedOption === currentQ.correctIndex
                  ? '#10B981'
                  : '#EF4444'
              }
            >
              {selectedOption === currentQ.correctIndex
                ? 'Correct Answer!'
                : 'Not quite correct.'}
            </Text>
          </Flex>
          <Text fontSize="13px" color="text">
            {currentQ.explanation}
          </Text>
        </FeedbackBox>
      )}

      <Flex justifyContent="flex-end" gap="10px">
        {!isSubmitted ? (
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="sm"
            disabled={selectedOption === null}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} variant="primary" size="sm">
            {currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}
          </Button>
        )}
      </Flex>
    </QuizCard>
  );
}
