'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Flex, Container, Text, Card, Button, Badge } from '@/components/ui/primitives';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import {
  Search,
  Code2,
  TrendingUp,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

const DocHeader = styled.section`
  padding: 44px 0 32px;
  background-color: #ffffff;
  border-bottom: 1px solid #eaeaea;
  text-align: center;
`;

const SearchInputWrap = styled.div`
  max-width: 500px;
  margin: 18px auto 0;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 8px 14px;
  transition: all 0.15s ease;

  &:focus-within {
    border-color: #000000;
    background-color: #ffffff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
`;

const DocInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  outline: none;
  color: #000000;

  &::placeholder {
    color: #888888;
  }
`;

const ExternalDocsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export function DocsClientView() {
  const [filterQuery, setFilterQuery] = useState('');

  const officialDocs = [
    { title: 'React Documentation', url: 'https://react.dev', tag: 'Frontend Library' },
    { title: 'Next.js App Router', url: 'https://nextjs.org/docs', tag: 'Full Stack Framework' },
    { title: 'TypeScript Reference', url: 'https://www.typescriptlang.org/docs', tag: 'Type System' },
    { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', tag: 'Web Standards' },
    { title: 'Node.js API Reference', url: 'https://nodejs.org/docs/latest/api/', tag: 'Backend Runtime' },
    { title: 'NestJS Enterprise', url: 'https://docs.nestjs.com', tag: 'Architecture Framework' },
    { title: 'Prisma ORM Guides', url: 'https://www.prisma.io/docs', tag: 'Data Access Layer' },
    { title: 'Google Search Central', url: 'https://developers.google.com/search/docs', tag: 'SEO Specifications' },
  ];

  const filteredFullStack = FULL_STACK_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.topics.some((t) => t.title.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const filteredMarketing = DIGITAL_MARKETING_MODULES.filter(
    (m) =>
      m.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.topics.some((t) => t.title.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  return (
    <>
      <Navbar />
      <main>
        <DocHeader>
          <Container>
            <Box maxWidth="640px" mx="auto">
              <Badge variant="dark" mb="10px">
                Reference Architecture
              </Badge>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  marginBottom: '8px',
                }}
              >
                Global Documentation Hub
              </h1>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                Explore the complete index of 40 structured learning modules and
                380+ reference documentation topics across both mastery tracks.
              </Text>

              <SearchInputWrap>
                <Search size={15} color="#888888" />
                <DocInput
                  placeholder="Filter documentation topics (e.g. Next.js, SEO, React, SQL)..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                />
              </SearchInputWrap>
            </Box>
          </Container>
        </DocHeader>

        <Container style={{ padding: '40px 20px 64px' }}>
          {/* Official Standards Section */}
          <Box mb="48px">
            <Text
              fontSize="11px"
              fontWeight="700"
              color="#888888"
              textTransform="uppercase"
              letterSpacing="0.06em"
              mb="10px"
            >
              Verified Official Reference Manuals
            </Text>
            <ExternalDocsGrid>
              {officialDocs.map((doc, idx) => (
                <Card
                  key={idx}
                  p="14px"
                  bg="#FFFFFF"
                  border="1px solid #EAEAEA"
                  borderRadius="8px"
                  as="a"
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  interactive
                  style={{ textDecoration: 'none' }}
                >
                  <Flex alignItems="center" justifyContent="space-between" mb="6px">
                    <Text fontSize="10.5px" fontWeight="600" color="#888888">
                      {doc.tag}
                    </Text>
                    <ExternalLink size={12} color="#888888" />
                  </Flex>
                  <Text fontSize="13px" fontWeight="600" color="#000000">
                    {doc.title}
                  </Text>
                </Card>
              ))}
            </ExternalDocsGrid>
          </Box>

          {/* Full Stack Documentation Section */}
          <Box mb="48px">
            <Flex alignItems="center" gap="8px" mb="16px">
              <Code2 size={18} color="#000000" />
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#000000' }}>
                Full Stack Web Development Documentation ({filteredFullStack.length} Modules)
              </h2>
            </Flex>

            <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr']} gap="16px">
              {filteredFullStack.map((mod) => (
                <Card key={mod.id} p="18px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="10px">
                  <Flex alignItems="center" justifyContent="space-between" mb="6px">
                    <Badge variant="dark">Module {mod.moduleNumber}</Badge>
                    <span style={{ fontSize: '11px', color: '#888888' }}>
                      {mod.topics.length} Lessons
                    </span>
                  </Flex>
                  <Text fontSize="14px" fontWeight="600" color="#000000" mb="4px">
                    {mod.title}
                  </Text>
                  <Text fontSize="12px" color="#555555" mb="12px">
                    {mod.description}
                  </Text>

                  <Flex gap="5px" flexWrap="wrap" mb="12px">
                    {mod.topics.slice(0, 4).map((t) => (
                      <Link
                        key={t.id}
                        href={`/full-stack/${mod.id}/${t.id}`}
                        style={{
                          fontSize: '11px',
                          padding: '2.5px 7px',
                          backgroundColor: '#F4F4F5',
                          borderRadius: '4px',
                          color: '#333333',
                          textDecoration: 'none',
                        }}
                      >
                        {t.title}
                      </Link>
                    ))}
                    {mod.topics.length > 4 && (
                      <span style={{ fontSize: '10.5px', color: '#888888', alignSelf: 'center' }}>
                        +{mod.topics.length - 4} more
                      </span>
                    )}
                  </Flex>

                  <Button
                    as={Link}
                    href={`/full-stack/${mod.id}/${mod.topics[0]?.id || ''}`}
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    <span>Read Module Docs</span>
                    <ArrowRight size={12} />
                  </Button>
                </Card>
              ))}
            </Box>
          </Box>

          {/* Digital Marketing Documentation Section */}
          <Box>
            <Flex alignItems="center" gap="8px" mb="16px">
              <TrendingUp size={18} color="#000000" />
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#000000' }}>
                Digital Marketing Documentation ({filteredMarketing.length} Modules)
              </h2>
            </Flex>

            <Box display="grid" gridTemplateColumns={['1fr', '1fr', '1fr 1fr']} gap="16px">
              {filteredMarketing.map((mod) => (
                <Card key={mod.id} p="18px" bg="#FFFFFF" border="1px solid #EAEAEA" borderRadius="10px">
                  <Flex alignItems="center" justifyContent="space-between" mb="6px">
                    <Badge variant="dark">Module {mod.moduleNumber}</Badge>
                    <span style={{ fontSize: '11px', color: '#888888' }}>
                      {mod.topics.length} Lessons
                    </span>
                  </Flex>
                  <Text fontSize="14px" fontWeight="600" color="#000000" mb="4px">
                    {mod.title}
                  </Text>
                  <Text fontSize="12px" color="#555555" mb="12px">
                    {mod.description}
                  </Text>

                  <Flex gap="5px" flexWrap="wrap" mb="12px">
                    {mod.topics.slice(0, 4).map((t) => (
                      <Link
                        key={t.id}
                        href={`/digital-marketing/${mod.id}/${t.id}`}
                        style={{
                          fontSize: '11px',
                          padding: '2.5px 7px',
                          backgroundColor: '#F4F4F5',
                          borderRadius: '4px',
                          color: '#333333',
                          textDecoration: 'none',
                        }}
                      >
                        {t.title}
                      </Link>
                    ))}
                    {mod.topics.length > 4 && (
                      <span style={{ fontSize: '10.5px', color: '#888888', alignSelf: 'center' }}>
                        +{mod.topics.length - 4} more
                      </span>
                    )}
                  </Flex>

                  <Button
                    as={Link}
                    href={`/digital-marketing/${mod.id}/${mod.topics[0]?.id || ''}`}
                    variant="outline"
                    size="sm"
                    fullWidth
                  >
                    <span>Read Module Docs</span>
                    <ArrowRight size={12} />
                  </Button>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
