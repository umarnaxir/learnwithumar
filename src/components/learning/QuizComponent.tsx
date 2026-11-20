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
  background-color: #fafafa;
  border: 1px solid #eaeaea;
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
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  transition: all 0.15s ease;
  cursor: pointer;

  @media (min-width: 640px) {
    gap: 12px;
    padding: 12px 16px;
    font-size: 14px;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    border-color: #000000;
    background-color: #F8F8F8;
    font-weight: 500;
  `}

  ${({ $isSubmitted, $isCorrect, $isSelected }) => {
    if ($isSubmitted) {
      if ($isCorrect) {
        return `
          border-color: #10B981 !important;
          background-color: #ECFDF5 !important;
          color: #065F46;
        `;
      }
      if ($isSelected && !$isCorrect) {
        return `
          border-color: #EF4444 !important;
          background-color: #FEF2F2 !important;
          color: #991B1B;
        `;
      }
    }
  }}

  &:hover {
    border-color: #000000;
  }
`;

const OptionCircle = styled.span<{ $isSelected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid
    ${({ $isSelected }) => ($isSelected ? '#000000' : '#CCCCCC')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000000;
    display: ${({ $isSelected }) => ($isSelected ? 'block' : 'none')};
  }
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
          <HelpCircle size={16} color="#000000" />
          <Text fontSize="14px" fontWeight="600">
            {title}
          </Text>
        </Flex>
        <Badge variant="neutral">
          Question {currentIndex + 1} of {questions.length}
        </Badge>
      </Flex>

      <Text fontSize="15px" fontWeight="600" mb="16px" color="#111111">
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
        <Box
          p="12px 16px"
          borderRadius="8px"
          mb="16px"
          bg={
            selectedOption === currentQ.correctIndex
              ? '#ECFDF5'
              : '#FEF2F2'
          }
          border={`1px solid ${
            selectedOption === currentQ.correctIndex
              ? '#A7F3D0'
              : '#FECACA'
          }`}
        >
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
                  ? '#065F46'
                  : '#991B1B'
              }
            >
              {selectedOption === currentQ.correctIndex
                ? 'Correct Answer!'
                : 'Not quite correct.'}
            </Text>
          </Flex>
          <Text fontSize="13px" color="#333333">
            {currentQ.explanation}
          </Text>
        </Box>
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
