'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Button } from '@/components/ui/primitives';
import { useAppTheme } from '@/context/ThemeContext';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTAWrapper = styled.section`
  padding: 56px 0;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#FFFFFF' : '#000000')};
  color: ${({ theme }) => (theme.mode === 'dark' ? '#000000' : '#FFFFFF')};
  border-top: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#EAEAEA' : 'transparent')};
  border-bottom: 1px solid ${({ theme }) => (theme.mode === 'dark' ? '#EAEAEA' : 'transparent')};
  text-align: center;
  transition: background-color 0.25s ease, color 0.25s ease;
`;

const CTAHeading = styled.h2<{ $isDark: boolean }>`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ $isDark }) => ($isDark ? '#000000 !important' : '#FFFFFF !important')};
  margin-bottom: 10px;
  line-height: 1.25;
`;

const CTAPrimaryBtn = styled(Button)<{ $isDark: boolean }>`
  background-color: ${({ $isDark }) => ($isDark ? '#000000' : '#FFFFFF')};
  color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#000000')};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#000000' : '#FFFFFF')};

  &:hover {
    background-color: ${({ $isDark }) => ($isDark ? '#27272A' : '#F4F4F5')};
    border-color: ${({ $isDark }) => ($isDark ? '#27272A' : '#F4F4F5')};
    color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#000000')};
    transform: translateY(-1px);
  }
`;

const CTAOutlineBtn = styled(Button)<{ $isDark: boolean }>`
  background-color: transparent;
  color: ${({ $isDark }) => ($isDark ? '#000000' : '#FFFFFF')};
  border: 1px solid ${({ $isDark }) => ($isDark ? '#18181B' : '#52525B')};

  &:hover {
    background-color: ${({ $isDark }) => ($isDark ? '#000000' : '#FFFFFF')};
    color: ${({ $isDark }) => ($isDark ? '#FFFFFF' : '#000000')};
    border-color: ${({ $isDark }) => ($isDark ? '#000000' : '#FFFFFF')};
    transform: translateY(-1px);
  }
`;

export function FinalCTA() {
  const { isDark } = useAppTheme();

  return (
    <CTAWrapper>
      <Container>
        <Box maxWidth="600px" mx="auto">
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="6px"
            mb="12px"
            style={{
              color: isDark ? '#000000' : '#A1A1AA',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.06em',
            }}
          >
            <Sparkles size={13} color={isDark ? '#000000' : '#A1A1AA'} />
            <span>START YOUR TRAINING TODAY</span>
          </Flex>

          <CTAHeading $isDark={isDark}>
            Ready to Master Full Stack Development & Digital Marketing?
          </CTAHeading>

          <Text
            fontSize="13.5px"
            color={isDark ? '#000000' : '#FFFFFF'}
            lineHeight="relaxed"
            mb="24px"
            style={{ maxWidth: '520px', margin: '0 auto 24px' }}
          >
            Access 40 comprehensive modules, step-by-step documentation,
            practical exercises, and 24 production portfolio projects.
          </Text>

          <Flex
            justifyContent="center"
            alignItems="center"
            gap="10px"
            flexWrap="wrap"
          >
            <CTAPrimaryBtn
              as={Link}
              href="/learning-paths"
              size="md"
              $isDark={isDark}
            >
              <span>Explore Learning Paths</span>
              <ArrowRight size={14} />
            </CTAPrimaryBtn>

            <CTAOutlineBtn
              as={Link}
              href="/docs"
              size="md"
              $isDark={isDark}
            >
              <span>Explore Documentation</span>
            </CTAOutlineBtn>
          </Flex>
        </Box>
      </Container>
    </CTAWrapper>
  );
}
