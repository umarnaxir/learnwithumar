'use client';

import Link from 'next/link';
import { Compass, Home, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { Box, Button, Container, Flex, Text } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <Container>
          <Box
            maxWidth="620px"
            mx="auto"
            py="80px"
            textAlign="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              width="52px"
              height="52px"
              bg="#000000"
              color="#FFFFFF"
              borderRadius="12px"
              mb="20px"
            >
              <Compass size={24} />
            </Flex>
            <Text
              fontSize="11px"
              fontWeight="700"
              color="#888888"
              textTransform="uppercase"
              letterSpacing="0.08em"
              mb="8px"
            >
              404 — Page Not Found
            </Text>
            <h1
              style={{
                fontSize: '26px',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#000000',
                marginBottom: '10px',
              }}
            >
              This lesson does not exist
            </h1>
            <Text fontSize="13.5px" color="#555555" lineHeight="relaxed" mb="24px">
              The URL may be outdated, or the topic may have moved. Return to the curriculum and
              choose a valid module or lesson.
            </Text>
            <Flex alignItems="center" gap="10px" flexWrap="wrap" justifyContent="center">
              <Button as={Link} href="/" variant="outline" size="md">
                <Home size={14} />
                <span>Home</span>
              </Button>
              <Button as={Link} href="/docs" variant="outline" size="md">
                <BookOpen size={14} />
                <span>Documentation Hub</span>
              </Button>
              <Button as={Link} href="/learning-paths" variant="primary" size="md">
                <Compass size={14} />
                <span>Explore Learning Paths</span>
              </Button>
            </Flex>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
