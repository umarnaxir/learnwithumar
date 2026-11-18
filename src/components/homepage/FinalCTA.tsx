'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Button } from '@/components/ui/primitives';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTAWrapper = styled.section`
  padding: 56px 0;
  background-color: #000000;
  color: #ffffff;
  text-align: center;
`;

export function FinalCTA() {
  return (
    <CTAWrapper>
      <Container>
        <Box maxWidth="600px" mx="auto">
          <Flex
            justifyContent="center"
            alignItems="center"
            gap="6px"
            mb="12px"
            style={{ color: '#A1A1AA', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em' }}
          >
            <Sparkles size={13} />
            <span>START YOUR TRAINING TODAY</span>
          </Flex>

          <h2
            style={{
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
              marginBottom: '10px',
              lineHeight: 1.25,
            }}
          >
            Ready to Master Full Stack Development & Digital Marketing?
          </h2>

          <Text
            fontSize="13.5px"
            color="#A1A1AA"
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
            <Button
              as={Link}
              href="/learning-paths"
              size="md"
              variant="secondary"
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
              }}
            >
              <span>Explore Learning Paths</span>
              <ArrowRight size={14} />
            </Button>

            <Button
              as={Link}
              href="/dashboard"
              size="md"
              variant="outline"
              style={{
                borderColor: '#333333',
                color: '#FFFFFF',
              }}
            >
              <span>Student Dashboard</span>
            </Button>
          </Flex>
        </Box>
      </Container>
    </CTAWrapper>
  );
}
