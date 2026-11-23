'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Container, Text, Divider } from '@/components/ui/primitives';

const FooterWrapper = styled.footer`
  background-color: #ffffff;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 44px 0 24px;
  margin-top: auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 36px;
  }
`;

const FooterHeading = styled.h4`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FooterLink = styled(Link)`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: underline;
  }
`;

const StatusDot = styled.span`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.success};
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
`;

export function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <FooterGrid>
          {/* Brand Info */}
          <Box>
            <Flex alignItems="center" gap="6px" mb="10px">
              <Text fontSize="15px" fontWeight="600" letterSpacing="-0.02em">
                Learn with Umar
              </Text>
            </Flex>
            <Text
              fontSize="12.5px"
              color="#555555"
              lineHeight="relaxed"
              mb="14px"
              style={{ maxWidth: '300px' }}
            >
              A documentation-driven engineering and digital marketing training
              platform. Mentoring students and interns from fundamental
              principles to production-ready enterprise execution.
            </Text>
            <Flex alignItems="center" gap="6px">
              <StatusDot />
              <Text fontSize="11px" color="#555555" fontWeight="500">
                Curriculum Active • 40 Modules Published
              </Text>
            </Flex>
          </Box>

          {/* Column 1: Full Stack Track */}
          <Box>
            <FooterHeading>Full Stack Development</FooterHeading>
            <FooterLinkList>
              <li>
                <FooterLink href="/full-stack/intro-web-dev">
                  Web Fundamentals & HTTP
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/html-complete-guide">
                  HTML5 & Accessibility
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/css-complete-guide">
                  Modern CSS & Flexbox
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/javascript-fundamentals">
                  JavaScript ES6+
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/react-js">React 19 & Architecture</FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/next-js">Next.js App Router</FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/node-js">Node.js & Express APIs</FooterLink>
              </li>
              <li>
                <FooterLink href="/full-stack/sql-relational-databases">
                  PostgreSQL & Prisma
                </FooterLink>
              </li>
            </FooterLinkList>
          </Box>

          {/* Column 2: Digital Marketing Track */}
          <Box>
            <FooterHeading>Digital Marketing</FooterHeading>
            <FooterLinkList>
              <li>
                <FooterLink href="/digital-marketing/intro-digital-marketing">
                  Marketing Funnels & Strategy
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/seo-fundamentals">
                  SEO & Search Algorithms
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/technical-seo">
                  Technical SEO & Core Web Vitals
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/social-media-platforms">
                  Social Media & Short-Form Video
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/google-ads">
                  Google Ads (Search & Shopping)
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/meta-ads">
                  Meta Ads Manager & CAPI
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/lead-generation">
                  Lead Generation & CRO
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/digital-marketing/marketing-analytics">
                  Google Analytics 4 & Attribution
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/backlinks">
                  Backlink Directory (160+ Sources)
                </FooterLink>
              </li>
            </FooterLinkList>
          </Box>

          {/* Column 3: Platform & Docs */}
          <Box>
            <FooterHeading>Platform & Resources</FooterHeading>
            <FooterLinkList>
              <li>
                <FooterLink href="/learning-paths">Learning Paths Overview</FooterLink>
              </li>
              <li>
                <FooterLink href="/docs">Global Documentation Hub</FooterLink>
              </li>
              <li>
                <FooterLink href="/about">About Learn with Umar</FooterLink>
              </li>
              <li>
                <FooterLink href="/projects">Practical Deliverables (24 Projects)</FooterLink>
              </li>
              <li>
                <FooterLink href="https://react.dev" target="_blank" rel="noopener noreferrer">
                  React Official Docs ↗
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                  Next.js Official Docs ↗
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://developers.google.com/search/docs" target="_blank" rel="noopener noreferrer">
                  Google Search Central ↗
                </FooterLink>
              </li>
            </FooterLinkList>
          </Box>
        </FooterGrid>

        <Divider my="24px" />

        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap="12px"
        >
          <Text fontSize="12px" color="#555555" style={{ wordBreak: 'break-word' }}>
            Developed and Designed by{' '}
            <a
              href="https://umarnazir.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#000000',
                fontWeight: 600,
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
            >
              Umar Nazir
            </a>
          </Text>

          <Flex alignItems="center" gap="12px" flexWrap="wrap">
            <FooterLink href="/about" style={{ fontSize: '11px' }}>
              About & Mentorship
            </FooterLink>
            <FooterLink href="/learning-paths" style={{ fontSize: '11px' }}>
              Learning Paths
            </FooterLink>
            <FooterLink href="/docs" style={{ fontSize: '11px' }}>
              Documentation Index
            </FooterLink>
          </Flex>
        </Flex>
      </Container>
    </FooterWrapper>
  );
}
