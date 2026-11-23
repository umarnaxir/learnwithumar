'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Box, Flex, Text, Badge } from '@/components/ui/primitives';
import { FULL_STACK_MODULES } from '@/data/curriculum/full-stack-curriculum';
import { DIGITAL_MARKETING_MODULES } from '@/data/curriculum/digital-marketing-curriculum';
import { ALL_ASSIGNMENTS } from '@/data/assignments/assignments-data';
import { ALL_BACKLINK_SOURCES } from '@/data/backlinks/backlinks-data';
import { Search, X, Code2, TrendingUp, FolderGit2, ArrowRight } from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  category:
    | 'Full Stack'
    | 'Digital Marketing'
    | 'Project'
    | 'Documentation'
    | 'SEO Directory'
    | 'Backlink Source';
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1200;
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: flex-start;
  justify-content: center;
  padding: 16px 10px 12px;

  @media (min-width: 640px) {
    padding: 80px 16px 24px;
  }
`;

const DialogContainer = styled.div`
  width: 100%;
  max-width: 640px;
  max-height: calc(100vh - 32px);
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: modalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.97) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const SearchInputHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid #eaeaea;

  @media (min-width: 640px) {
    gap: 12px;
    padding: 16px 20px;
  }
`;

const SearchInputElement = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #000000;
  outline: none;
  min-width: 0;

  @media (min-width: 640px) {
    font-size: 16px;
  }

  &::placeholder {
    color: #888888;
  }
`;

const ResultsList = styled.div`
  max-height: 420px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: 640px) {
    padding: 12px;
  }
`;

const ResultItemLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.15s ease;
  min-width: 0;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const FooterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-top: 1px solid #eaeaea;
  background-color: #fafafa;
  font-size: 11.5px;
  color: #888888;

  @media (min-width: 640px) {
    padding: 10px 20px;
    font-size: 12px;
  }

  .shortcut-hint {
    @media (max-width: 480px) {
      display: none;
    }
  }
`;

export function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      queueMicrotask(() => setQuery(''));
    }
  }, [isOpen]);

  // Aggregate searchable items
  const allSearchableItems: SearchResultItem[] = [];

  // Full Stack modules and topics
  FULL_STACK_MODULES.forEach((mod) => {
    allSearchableItems.push({
      id: `fs-mod-${mod.id}`,
      title: mod.title,
      subtitle: `Module ${mod.moduleNumber} • Full Stack Development`,
      href: `/full-stack/${mod.id}`,
      category: 'Full Stack',
    });
    mod.topics.forEach((topic) => {
      allSearchableItems.push({
        id: `fs-topic-${topic.id}`,
        title: topic.title,
        subtitle: `${mod.title} • ${topic.duration}`,
        href: `/full-stack/${mod.id}/${topic.id}`,
        category: 'Full Stack',
      });
    });
  });

  // Digital Marketing modules and topics
  DIGITAL_MARKETING_MODULES.forEach((mod) => {
    allSearchableItems.push({
      id: `dm-mod-${mod.id}`,
      title: mod.title,
      subtitle: `Module ${mod.moduleNumber} • Digital Marketing`,
      href: `/digital-marketing/${mod.id}`,
      category: 'Digital Marketing',
    });
    mod.topics.forEach((topic) => {
      allSearchableItems.push({
        id: `dm-topic-${topic.id}`,
        title: topic.title,
        subtitle: `${mod.title} • ${topic.duration}`,
        href: `/digital-marketing/${mod.id}/${topic.id}`,
        category: 'Digital Marketing',
      });
    });
  });

  // Projects & Assignments
  ALL_ASSIGNMENTS.forEach((asgn) => {
    allSearchableItems.push({
      id: `asgn-${asgn.id}`,
      title: asgn.title,
      subtitle: `${asgn.type} • ${asgn.difficulty} • ${asgn.estimatedHours}h`,
      href: '/projects',
      category: 'Project',
    });
  });

  // Backlink Directory
  allSearchableItems.push({
    id: 'backlinks-directory-hub',
    title: 'Backlink Directory',
    subtitle: '160+ High-Authority Sources (DR 99 to DR 18) • Top Picks & Search',
    href: '/backlinks',
    category: 'SEO Directory',
  });

  ALL_BACKLINK_SOURCES.slice(0, 40).forEach((bl) => {
    allSearchableItems.push({
      id: `bl-${bl.id}`,
      title: bl.name,
      subtitle: `DR ${bl.dr} • DA ${bl.da} • ${bl.category} (${bl.submissionType})`,
      href: '/backlinks',
      category: 'Backlink Source',
    });
  });

  const filtered = query.trim()
    ? allSearchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchableItems.slice(0, 8); // Top suggested items by default

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay $isOpen={isOpen} onClick={handleBackdropClick}>
      <DialogContainer>
        <SearchInputHeader>
          <Search size={18} color="#555555" />
          <SearchInputElement
            ref={inputRef}
            placeholder="Search concepts, modules, lessons, projects (e.g. Next.js, SEO, SQL, React)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            style={{ color: '#888888', padding: '4px' }}
          >
            <X size={18} />
          </button>
        </SearchInputHeader>

        <ResultsList>
          {filtered.length === 0 ? (
            <Box p="32px" textAlign="center">
              <Text color="#555555" fontSize="14px">
                No matching results found for &quot;{query}&quot;
              </Text>
              <Text color="#888888" fontSize="12px" mt="6px">
                Try searching for HTML, Flexbox, React, NestJS, SEO, Google Ads, or Meta Ads.
              </Text>
            </Box>
          ) : (
            filtered.map((item) => {
              const getIcon = () => {
                switch (item.category) {
                  case 'Full Stack':
                    return <Code2 size={16} color="#000000" />;
                  case 'Digital Marketing':
                    return <TrendingUp size={16} color="#000000" />;
                  case 'Project':
                    return <FolderGit2 size={16} color="#000000" />;
                  default:
                    return <Search size={16} color="#555555" />;
                }
              };

              return (
                <ResultItemLink
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                >
                  <Flex alignItems="center" gap="12px">
                    <Box
                      p="8px"
                      borderRadius="6px"
                      bg="#F4F4F5"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {getIcon()}
                    </Box>
                    <Box>
                      <Text
                        fontSize="14px"
                        fontWeight="600"
                        color="#000000"
                      >
                        {item.title}
                      </Text>
                      <Text fontSize="12px" color="#666666">
                        {item.subtitle}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex alignItems="center" gap="8px">
                    <Badge variant="neutral">{item.category}</Badge>
                    <ArrowRight size={14} color="#888888" />
                  </Flex>
                </ResultItemLink>
              );
            })
          )}
        </ResultsList>

        <FooterBar>
          <span className="shortcut-hint">Navigate with arrows • Press ESC to dismiss</span>
          <span>{filtered.length} results available</span>
        </FooterBar>
      </DialogContainer>
    </Overlay>
  );
}
