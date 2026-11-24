'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Container, Text, Badge } from '@/components/ui/primitives';
import { ChevronDown, ChevronUp } from 'lucide-react';

const SectionWrapper = styled.section`
  padding: 48px 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FAQContainer = styled(Box)`
  max-width: 680px;
  margin: 32px auto 0;
`;

const AccordionCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
  }
`;

const QuestionBtn = styled.button`
  width: 100%;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.cardBg};
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
  cursor: pointer;

  @media (min-width: 640px) {
    padding: 14px 16px;
    gap: 12px;
    font-size: 13.5px;
  }
`;

const AnswerBox = styled.div`
  padding: 0 14px 14px;
  font-size: 12px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.cardBg};

  @media (min-width: 640px) {
    padding: 0 16px 16px;
    font-size: 12.5px;
  }
`;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who is Learn with Umar designed for?',
      a: 'The platform is engineered for interns, university students, and ambitious self-taught developers who want to transition from basic syntax tutorials to industry-grade software engineering and digital marketing mastery.',
    },
    {
      q: 'Why a documentation-driven approach instead of hours of video tutorials?',
      a: 'In professional tech companies and agencies, engineers and marketing directors do not learn new tools by watching passive videos. They read official specifications, understand API contracts, inspect schemas, and consult verified documentation. We train you in this exact high-value skill from day one.',
    },
    {
      q: 'Can absolute beginners start without prior coding or marketing experience?',
      a: 'Yes. Level 1 in both tracks begins with fundamental principles (how the internet works, HTTP protocols, client-server architecture, marketing funnels) before progressing to advanced concepts like NestJS microservices or Meta Conversion API integrations.',
    },
    {
      q: 'What technologies are covered in Full Stack Development?',
      a: 'The track covers HTML5, modern CSS3 (Flexbox/Grid), JavaScript ES6+ internals, React 19, TypeScript, Next.js App Router, Node.js, Express.js, NestJS, PostgreSQL, Prisma ORM, MongoDB, REST and GraphQL APIs, JWT security, Docker, CI/CD, and system design.',
    },
    {
      q: 'What is covered in the Digital Marketing track?',
      a: 'The curriculum spans SEO (on-page, off-page, technical, and local SEO), multi-platform social media algorithms, short-form viral video scripting, Google Search & Shopping Ads, Meta Ads Manager, lead generation funnels, Conversion Rate Optimization (CRO), Google Analytics 4 (GA4), and agency operations.',
    },
    {
      q: 'How do project evaluations work?',
      a: 'Every project includes detailed learning objectives, explicit acceptance criteria, submission guidelines, and weighted evaluation rubrics. Students follow clear step-by-step documentation, production requirements, and technical rubrics.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <SectionWrapper id="faq">
      <Container>
        <Box textAlign="center" maxWidth="560px" mx="auto">
          <Badge variant="dark" mb="8px">
            Frequently Asked Questions
          </Badge>
          <h2
            style={{
              fontSize: '23px',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              marginBottom: '8px',
            }}
          >
            Clear Answers to Common Questions.
          </h2>
          <Text fontSize="13.5px" color="textSecondary" lineHeight="relaxed">
            Everything you need to know about the Learn with Umar curriculum and
            training architecture.
          </Text>
        </Box>

        <FAQContainer>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <AccordionCard key={idx}>
                <QuestionBtn onClick={() => toggle(idx)}>
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp size={15} color="currentColor" />
                  ) : (
                    <ChevronDown size={15} color="currentColor" style={{ opacity: 0.6 }} />
                  )}
                </QuestionBtn>
                {isOpen && <AnswerBox>{faq.a}</AnswerBox>}
              </AccordionCard>
            );
          })}
        </FAQContainer>
      </Container>
    </SectionWrapper>
  );
}
