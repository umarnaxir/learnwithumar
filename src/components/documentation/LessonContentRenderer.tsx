'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Badge, Card } from '@/components/ui/primitives';
import { LessonContent } from '@/types/curriculum';
import { CodeBlock } from './CodeBlock';
import { QuizComponent } from '@/components/learning/QuizComponent';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  HelpCircle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const ContentSection = styled.section`
  margin-bottom: 40px;
  scroll-margin-top: 80px;
`;

const SectionHeading = styled.h2`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: #000000;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LeadParagraph = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: #444444;
  margin-bottom: 18px;
`;

const ObjectiveList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ObjectiveItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: #222222;
  line-height: 1.5;
`;

const StepContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
`;

const StepBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #000000;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
`;

const AccordionItemBox = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 6px;
  margin-bottom: 8px;
  overflow: hidden;
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: #fafafa;
  text-align: left;
  font-size: 12.5px;
  font-weight: 600;
  color: #111111;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const AccordionBody = styled.div`
  padding: 12px 14px;
  background-color: #ffffff;
  font-size: 12px;
  line-height: 1.55;
  color: #444444;
  border-top: 1px solid #eaeaea;
`;

export function LessonContentRenderer({ lesson }: { lesson: LessonContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const sampleQuiz = [
    {
      question: `Which fundamental principle is central to mastering "${lesson.title}"?`,
      options: [
        'Separation of concerns and systematic adherence to verified standards',
        'Skipping architecture planning to write faster unvalidated code',
        'Relying solely on third-party libraries without understanding internals',
        'Ignoring performance metrics and error handling mechanisms',
      ],
      correctIndex: 0,
      explanation:
        'Separation of concerns, clean design patterns, and rigorous validation guarantee robust, scalable systems that withstand real-world enterprise traffic.',
    },
    {
      question: 'When deploying to production, what is the most critical non-negotiable step?',
      options: [
        'Turn off all monitoring and error tracking tools to save bandwidth',
        'Validate security boundaries, test edge cases, and inspect response contracts',
        'Deploy without peer review or automated continuous integration runs',
        'Hardcode API secrets into the client-side JavaScript bundle',
      ],
      correctIndex: 1,
      explanation:
        'Production deployments must verify security headers, data validation contracts, and automated tests to prevent catastrophic data leaks or service downtime.',
    },
  ];

  return (
    <Box>
      {/* 1. OVERVIEW & SUMMARY */}
      <ContentSection id="overview">
        <LeadParagraph>{lesson.summary}</LeadParagraph>
      </ContentSection>

      {/* 2. LEARNING OBJECTIVES */}
      <ContentSection id="objectives">
        <Card p="16px" bg="#FBFBFC" border="1px solid #EAEAEA" borderRadius="8px">
          <SectionHeading style={{ fontSize: '14px', marginBottom: '10px' }}>
            <FileCheck2 size={16} color="#000000" />
            <span>Learning Objectives</span>
          </SectionHeading>
          <ObjectiveList>
            {lesson.objectives.map((obj, idx) => (
              <ObjectiveItem key={idx}>
                <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{obj}</span>
              </ObjectiveItem>
            ))}
          </ObjectiveList>
        </Card>
      </ContentSection>

      {/* 3. KEY CONCEPTS */}
      <ContentSection id="key-concepts">
        <SectionHeading>
          <Lightbulb size={17} color="#000000" />
          <span>Important Concepts & Definitions</span>
        </SectionHeading>
        <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr']} gap="12px" mt="12px">
          {lesson.keyConcepts.map((concept, idx) => (
            <Card key={idx} p="14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px">
              <Text fontSize="13px" fontWeight="700" color="#111111" mb="4px">
                {concept.title}
              </Text>
              <Text fontSize="12px" color="#555555" lineHeight="relaxed">
                {concept.explanation}
              </Text>
            </Card>
          ))}
        </Box>
      </ContentSection>

      {/* 4. SYNTAX / ARCHITECTURE SPECIFICATION */}
      {lesson.syntaxDefinition && (
        <ContentSection id="syntax">
          <SectionHeading>Syntax & Architectural Flow</SectionHeading>
          <CodeBlock
            title="Structural Pattern"
            language="typescript"
            code={lesson.syntaxDefinition}
          />
        </ContentSection>
      )}

      {/* 5. CODE EXAMPLES / STRATEGY WORKFLOWS */}
      <ContentSection id="implementation">
        <SectionHeading>
          {lesson.codeExamples ? 'Practical Code Implementations' : 'Strategic Workflows & Case Studies'}
        </SectionHeading>

        {lesson.codeExamples &&
          lesson.codeExamples.map((ex, idx) => (
            <Box key={idx} mb="20px">
              <Text fontSize="13px" fontWeight="600" color="#222222" mb="4px">
                {ex.title}
              </Text>
              <Text fontSize="12px" color="#666666" mb="8px">
                {ex.explanation}
              </Text>
              <CodeBlock
                title={ex.title}
                language={ex.language}
                code={ex.code}
                output={ex.output}
              />
            </Box>
          ))}

        {lesson.strategyExamples &&
          lesson.strategyExamples.map((strat, idx) => (
            <Card key={idx} p="16px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px" mb="12px">
              <Badge variant="dark" mb="6px">
                Scenario Case Study
              </Badge>
              <Text fontSize="14px" fontWeight="700" color="#111111" mb="6px">
                {strat.title}
              </Text>
              <Box mb="10px">
                <Text fontSize="11px" fontWeight="700" color="#888888" textTransform="uppercase">
                  Challenge / Scenario:
                </Text>
                <Text fontSize="12px" color="#444444" mt="2px">
                  {strat.scenario}
                </Text>
              </Box>
              <Box mb="10px">
                <Text fontSize="11px" fontWeight="700" color="#888888" textTransform="uppercase">
                  Strategic Execution:
                </Text>
                <Text fontSize="12px" color="#222222" mt="2px">
                  {strat.strategy}
                </Text>
              </Box>
              <Box p="8px 12px" bg="#ECFDF5" border="1px solid #A7F3D0" borderRadius="5px">
                <Text fontSize="11.5px" color="#065F46" fontWeight="600">
                  Target Outcome: {strat.expectedOutcome}
                </Text>
              </Box>
            </Card>
          ))}
      </ContentSection>

      {/* 6. STEP-BY-STEP EXPLANATION */}
      <ContentSection id="step-by-step">
        <SectionHeading>Step-by-Step Implementation Guide</SectionHeading>
        <Box mt="12px">
          {lesson.stepByStepGuide.map((step) => (
            <StepContainer key={step.step}>
              <StepBadge>{step.step}</StepBadge>
              <Box>
                <Text fontSize="13px" fontWeight="700" color="#111111" mb="2px">
                  {step.title}
                </Text>
                <Text fontSize="12px" color="#555555" lineHeight="relaxed">
                  {step.details}
                </Text>
              </Box>
            </StepContainer>
          ))}
        </Box>
      </ContentSection>

      {/* 7. REAL-WORLD APPLICATION */}
      <ContentSection id="real-world">
        <SectionHeading>
          <Briefcase size={16} color="#000000" />
          <span>Real-World Commercial Application</span>
        </SectionHeading>
        <Card p="16px" bg="#FAF9F6" border="1px solid #EAEAEA" borderRadius="8px">
          <Text fontSize="12.5px" color="#333333" lineHeight="relaxed">
            {lesson.realWorldApplication}
          </Text>
        </Card>
      </ContentSection>

      {/* 8. COMMON MISTAKES & BEST PRACTICES */}
      <ContentSection id="mistakes-practices">
        <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr']} gap="16px">
          {/* Common Mistakes */}
          <Box>
            <Flex alignItems="center" gap="6px" mb="10px">
              <AlertTriangle size={15} color="#EF4444" />
              <Text fontSize="13.5px" fontWeight="700" color="#111111">
                Common Mistakes to Avoid
              </Text>
            </Flex>
            {lesson.commonMistakes.map((m, idx) => (
              <Box
                key={idx}
                p="12px"
                bg="#FEF2F2"
                border="1px solid #FECACA"
                borderRadius="6px"
                mb="8px"
              >
                <Text fontSize="12px" fontWeight="700" color="#991B1B" mb="2px">
                  Mistake: {m.mistake}
                </Text>
                <Text fontSize="11.5px" color="#7F1D1D">
                  Solution: {m.solution}
                </Text>
              </Box>
            ))}
          </Box>

          {/* Best Practices */}
          <Box>
            <Flex alignItems="center" gap="6px" mb="10px">
              <CheckCircle size={15} color="#10B981" />
              <Text fontSize="13.5px" fontWeight="700" color="#111111">
                Industry Best Practices
              </Text>
            </Flex>
            <Box p="12px" bg="#ECFDF5" border="1px solid #A7F3D0" borderRadius="6px">
              <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {lesson.bestPractices.map((bp, idx) => (
                  <li key={idx} style={{ fontSize: '12px', color: '#065F46' }}>
                    {bp}
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </Box>
      </ContentSection>

      {/* 9. PRACTICAL EXERCISES */}
      <ContentSection id="exercises-questions">
        <SectionHeading>Practical Exercises & Technical Drills</SectionHeading>
        {lesson.exercises.map((ex, idx) => (
          <Card key={idx} p="14px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px" mb="10px">
            <Flex alignItems="center" gap="6px" mb="4px">
              <Badge variant="dark">Drill #{idx + 1}</Badge>
              <Text fontSize="13px" fontWeight="700" color="#111111">
                {ex.title}
              </Text>
            </Flex>
            <Text fontSize="12px" color="#444444" mb="6px">
              {ex.task}
            </Text>
            {ex.hints && (
              <Text fontSize="11px" color="#888888" fontStyle="italic">
                Hint: {ex.hints}
              </Text>
            )}
          </Card>
        ))}

        {/* Interview Questions */}
        <Box mt="22px">
          <SectionHeading>
            <HelpCircle size={16} color="#000000" />
            <span>Technical Interview Questions & Answers</span>
          </SectionHeading>
          <Box mt="10px">
            {lesson.interviewQuestions.map((q, idx) => {
              const isOpen = openFaq === idx;
              return (
                <AccordionItemBox key={idx}>
                  <AccordionHeader onClick={() => toggleFaq(idx)}>
                    <span>{q.question}</span>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </AccordionHeader>
                  {isOpen && <AccordionBody>{q.answer}</AccordionBody>}
                </AccordionItemBox>
              );
            })}
          </Box>
        </Box>
      </ContentSection>

      {/* 10. MINI ASSIGNMENT */}
      <ContentSection id="assignment">
        <Card p="18px" bg="#F9FAFB" border="1px solid #000000" borderRadius="8px">
          <Flex alignItems="center" gap="6px" mb="6px">
            <Badge variant="dark">Assignment Deliverable</Badge>
            <Text fontSize="14px" fontWeight="700" color="#000000">
              {lesson.miniAssignment.title}
            </Text>
          </Flex>
          <Text fontSize="12.5px" color="#333333" mb="10px">
            {lesson.miniAssignment.prompt}
          </Text>
          <Text fontSize="11px" fontWeight="700" color="#555555" textTransform="uppercase" mb="4px">
            Deliverables required:
          </Text>
          <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {lesson.miniAssignment.deliverables.map((item, idx) => (
              <li key={idx} style={{ fontSize: '12px', color: '#444444' }}>
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </ContentSection>

      {/* 11. INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      <ContentSection id="knowledge-check">
        <QuizComponent questions={sampleQuiz} />
      </ContentSection>
    </Box>
  );
}
