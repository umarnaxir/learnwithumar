'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Text, Badge, Card } from '@/components/ui/primitives';
import { LessonContent } from '@/types/curriculum';
import { CodeBlock } from './CodeBlock';
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Briefcase,
  HelpCircle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Code2,
  Compass,
} from 'lucide-react';

const ContentSection = styled.section`
  margin-bottom: 36px;
  scroll-margin-top: 80px;
`;

const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15.5px;
  font-weight: 600;
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
  color: #333333;
  margin-bottom: 16px;
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
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
  font-feature-settings: 'tnum' on, 'lnum' on;
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

const CalloutBox = styled(Box)`
  border-left: 3px solid #000000;
  background-color: #fcfcfc;
  padding: 12px 14px;
  border-radius: 0 8px 8px 0;
  margin: 12px 0 16px;

  @media (min-width: 640px) {
    padding: 14px 16px;
  }
`;

function inferSyntaxLanguage(lesson: LessonContent): string {
  if (lesson.trackId === 'digital-marketing') return 'text';

  const moduleId = lesson.moduleId.toLowerCase();
  if (moduleId.includes('html')) return 'html';
  if (moduleId.includes('css')) return 'css';
  if (moduleId.includes('sql') || moduleId.includes('database')) return 'sql';

  return 'typescript';
}

export function LessonContentRenderer({ lesson }: { lesson: LessonContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const syntaxLanguage = inferSyntaxLanguage(lesson);
  const isDevelopment = lesson.trackId === 'full-stack';

  return (
    <Box>
      {/* 1. TOPIC INTRODUCTION */}
      <ContentSection id="introduction">
        <SectionHeading>
          <BookOpen size={16} color="#000000" />
          <span>Topic Introduction</span>
        </SectionHeading>
        <LeadParagraph>{lesson.summary}</LeadParagraph>
      </ContentSection>

      {/* 2. DEFINITION */}
      <ContentSection id="definition">
        <SectionHeading>
          <FileCheck2 size={16} color="#000000" />
          <span>Definition</span>
        </SectionHeading>
        <CalloutBox>
          <Text fontSize="13px" fontWeight="600" color="#000000" mb="4px">
            Core Definition:
          </Text>
          <Text fontSize="12.5px" color="#333333" lineHeight="relaxed">
            {lesson.definition ||
              `${lesson.title} is a verified standard and methodological foundation in modern ${
                lesson.trackId === 'full-stack' ? 'full-stack web development' : 'digital marketing'
              }.`}
          </Text>
        </CalloutBox>
      </ContentSection>

      {/* 3. EXPLANATION */}
      <ContentSection id="explanation">
        <SectionHeading>
          <Lightbulb size={16} color="#000000" />
          <span>In-Depth Explanation</span>
        </SectionHeading>
        <Card p="16px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="8px" mb="12px">
          <Text fontSize="13px" color="#444444" lineHeight="relaxed">
            {lesson.explanation ||
              `Understanding ${lesson.title} requires mastering both its internal mechanics and its practical integration across the engineering stack. In production, this concept guarantees consistency, performance, and fault tolerance under high-traffic conditions.`}
          </Text>
        </Card>
      </ContentSection>

      {/* 4. WHY IT IS USED */}
      <ContentSection id="why-used">
        <SectionHeading>
          <CheckCircle size={16} color="#000000" />
          <span>Why It Is Used & Significance</span>
        </SectionHeading>
        <Card p="16px" bg="#FBFBFC" border="1px solid #EAEAEA" borderRadius="8px">
          <ObjectiveList>
            {(lesson.whyItIsUsed && lesson.whyItIsUsed.length > 0
              ? lesson.whyItIsUsed
              : lesson.objectives
            ).map((reason, idx) => (
              <ObjectiveItem key={idx}>
                <CheckCircle size={14} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{reason}</span>
              </ObjectiveItem>
            ))}
          </ObjectiveList>
        </Card>
      </ContentSection>

      {/* 5. REAL-WORLD USE CASES */}
      <ContentSection id="use-cases">
        <SectionHeading>
          <Briefcase size={16} color="#000000" />
          <span>Real-World Use Cases</span>
        </SectionHeading>
        <Card p="16px" bg="#FAF9F6" border="1px solid #EAEAEA" borderRadius="8px">
          <Text fontSize="12.5px" color="#333333" lineHeight="relaxed" mb="10px">
            {lesson.realWorldApplication}
          </Text>
          {lesson.realWorldUseCases && lesson.realWorldUseCases.length > 0 && (
            <ObjectiveList>
              {lesson.realWorldUseCases.map((useCase, idx) => (
                <ObjectiveItem key={idx}>
                  <span style={{ fontWeight: 700, color: '#000000' }}>•</span>
                  <span>{useCase}</span>
                </ObjectiveItem>
              ))}
            </ObjectiveList>
          )}
        </Card>
      </ContentSection>

      {/* 6. KEY ARCHITECTURAL CONCEPTS */}
      {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
        <ContentSection id="key-concepts">
          <SectionHeading>
            <Lightbulb size={16} color="#000000" />
            <span>Key Architectural Concepts</span>
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
      )}

      {/* 7. SYNTAX */}
      {lesson.syntaxDefinition && (
        <ContentSection id="syntax">
          <SectionHeading>
            <Code2 size={16} color="#000000" />
            <span>{isDevelopment ? 'Syntax & Structural Blueprint' : 'Strategy & Execution Blueprint'}</span>
          </SectionHeading>
          <CodeBlock
            title={isDevelopment ? 'Syntax & Architecture Pattern' : 'Execution Workflow'}
            language={syntaxLanguage}
            code={lesson.syntaxDefinition}
          />
        </ContentSection>
      )}

      {/* 8. EXAMPLE CODE & EXPECTED OUTPUT */}
      <ContentSection id="code-examples">
        <SectionHeading>
          <Code2 size={16} color="#000000" />
          <span>{isDevelopment ? 'Example Code & Expected Output' : 'Campaign Workflow & Expected Outcome'}</span>
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

      {/* 9. STEP-BY-STEP CODE EXPLANATION */}
      <ContentSection id="step-by-step">
        <SectionHeading>
          <FileCheck2 size={16} color="#000000" />
          <span>
            {isDevelopment
              ? 'Step-by-Step Code & Implementation Walkthrough'
              : 'Step-by-Step Practical Workflow'}
          </span>
        </SectionHeading>
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

      {/* 10. BEST PRACTICES & COMMON MISTAKES */}
      <ContentSection id="best-practices-mistakes">
        <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr']} gap="16px">
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
        </Box>
      </ContentSection>

      {/* 11. PRACTICAL EXERCISES */}
      <ContentSection id="exercises">
        <SectionHeading>
          <Code2 size={16} color="#000000" />
          <span>{isDevelopment ? 'Practical Exercises & Technical Drills' : 'Practical Assignments'}</span>
        </SectionHeading>
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
      </ContentSection>

      {/* 12. INTERVIEW QUESTIONS */}
      <ContentSection id="interview-questions">
        <SectionHeading>
          <HelpCircle size={16} color="#000000" />
          <span>
            {isDevelopment
              ? 'Technical Interview Questions & Answers'
              : 'Marketing Interview Questions & Answers'}
          </span>
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
      </ContentSection>

      {/* 13. RELATED TOPICS */}
      {lesson.relatedTopics && lesson.relatedTopics.length > 0 && (
        <ContentSection id="related-topics">
          <SectionHeading>
            <Compass size={16} color="#000000" />
            <span>Related Topics in this Module</span>
          </SectionHeading>
          <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} gap="10px">
            {lesson.relatedTopics.map((rel) => (
              <Card
                key={rel.id}
                p="12px 14px"
                bg="#FFFFFF"
                border="1px solid #EAEAEA"
                borderRadius="6px"
                as={Link}
                href={rel.href}
                interactive
                style={{ textDecoration: 'none' }}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontSize="12.5px" fontWeight="600" color="#111111">
                    {rel.title}
                  </Text>
                  <ArrowRight size={13} color="#888888" />
                </Flex>
              </Card>
            ))}
          </Box>
        </ContentSection>
      )}

      {/* 14. OFFICIAL DOCUMENTATION LINKS */}
      <ContentSection id="official-docs">
        <SectionHeading>
          <ExternalLink size={16} color="#000000" />
          <span>
            {isDevelopment
              ? 'Official Documentation & Specifications'
              : 'Official Resources & Industry Guides'}
          </span>
        </SectionHeading>
        <Box display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} gap="10px">
          {lesson.officialDocs.map((doc, idx) => (
            <Card
              key={idx}
              p="14px 16px"
              bg="#FFFFFF"
              border="1px solid #EAEAEA"
              borderRadius="8px"
              as="a"
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              interactive
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                transition: 'all 0.2s ease',
              }}
            >
              <Flex alignItems="center" justifyContent="space-between" mb="4px">
                <Text
                  fontSize="13px"
                  fontWeight="600"
                  color="#000000"
                  style={{ textDecoration: 'underline', textUnderlineOffset: '2px' }}
                >
                  {doc.title}
                </Text>
                <ExternalLink size={12} color="#000000" style={{ flexShrink: 0 }} />
              </Flex>
              <Text fontSize="11.5px" color="#555555" lineHeight="relaxed">
                {doc.description}
              </Text>
            </Card>
          ))}
        </Box>
      </ContentSection>
    </Box>
  );
}
