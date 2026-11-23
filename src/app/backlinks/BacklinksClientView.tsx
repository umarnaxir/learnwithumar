'use client';

import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Container, Text } from '@/components/ui/primitives';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import {
  ALL_BACKLINK_SOURCES,
  TOP_PICK_SOURCES,
  BACKLINK_CATEGORIES,
  BACKLINK_TIERS,
  BACKLINK_SUBMISSION_TYPES,
  BacklinkCategory,
  BacklinkTier,
  BacklinkSubmissionType,
} from '@/data/backlinks/backlinks-data';
import {
  Search,
  ExternalLink,
  Copy,
  Check,
  X,
  ArrowRight,
} from 'lucide-react';

/* ================= HERO SECTION ================= */

const HeroSection = styled.section`
  padding: 56px 0 40px;
  background: radial-gradient(
    circle at 50% -10%,
    rgba(240, 240, 242, 0.75) 0%,
    rgba(255, 255, 255, 1) 80%
  );
  border-bottom: 1px solid #eaeaea;
  text-align: center;

  @media (min-width: 768px) {
    padding: 72px 0 52px;
  }
`;

const SectionBadge = styled.div`
  display: inline-block;
  background-color: #000000;
  color: #ffffff;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 18px;
`;

const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: #000000;
  max-width: 800px;
  margin: 0 auto 16px;

  @media (min-width: 640px) {
    font-size: 36px;
  }

  @media (min-width: 1024px) {
    font-size: 42px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 13.5px;
  font-weight: 450;
  line-height: 1.6;
  color: #555555;
  max-width: 680px;
  margin: 0 auto 28px;

  @media (min-width: 640px) {
    font-size: 14.5px;
  }
`;

const StatsStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #eaeaea;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 640px) {
    gap: 12px 40px;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  line-height: 1.1;
  letter-spacing: -0.03em;

  @media (min-width: 640px) {
    font-size: 28px;
  }
`;

const StatLabel = styled.div`
  font-size: 11.5px;
  color: #666666;
  font-weight: 500;
  margin-top: 4px;
`;

/* ================= TOP PICKS SECTION ================= */

const TopPicksSection = styled.section`
  padding: 56px 0;
  background-color: #fafafc;
  border-bottom: 1px solid #eaeaea;
`;

const TopPicksHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 36px;
`;

const TopPicksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
`;

const TopPickCard = styled.div`
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 18px 16px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: #000000;
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.06);
  }
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const RankBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  font-weight: 700;
  color: #666666;
  background-color: #f4f4f5;
  border: 1px solid #e5e5e7;
  padding: 2px 6px;
  border-radius: 4px;
`;

const DrBadge = styled.span<{ $high?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-size: 11px;
  font-weight: 800;
  background-color: ${({ $high }) => ($high ? '#000000' : '#f0f0f2')};
  color: ${({ $high }) => ($high ? '#ffffff' : '#111111')};
  border-radius: 9999px;
  padding: 3px 8px;
  letter-spacing: -0.01em;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.02em;
  margin: 0 0 6px;
  line-height: 1.25;
`;

const CardMeta = styled.p`
  font-size: 12px;
  color: #666666;
  margin: 0 0 16px;
  line-height: 1.4;

  strong {
    color: #000000;
    font-weight: 600;
  }
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`;

const VisitButton = styled.a`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #000000;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  height: 34px;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background-color: #222222;
    transform: translateY(-1px);
  }
`;

const CopyButton = styled.button<{ $copied?: boolean }>`
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $copied }) => ($copied ? '#000000' : '#ffffff')};
  color: ${({ $copied }) => ($copied ? '#ffffff' : '#333333')};
  border: 1px solid ${({ $copied }) => ($copied ? '#000000' : '#e5e7eb')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    border-color: #000000;
    color: ${({ $copied }) => ($copied ? '#ffffff' : '#000000')};
  }
`;

/* ================= FULL DIRECTORY SECTION ================= */

const DirectorySection = styled.section`
  padding: 64px 0 80px;
  background-color: #ffffff;
`;

const DirectoryHeader = styled.div`
  text-align: center;
  max-width: 640px;
  margin: 0 auto 36px;
`;

/* Controls: Search & Filters */
const ControlsContainer = styled.div`
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 28px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const SearchInputRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const SearchIconHolder = styled.div`
  position: absolute;
  left: 14px;
  color: #888888;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 42px 0 42px;
  font-size: 14px;
  color: #000000;
  background-color: #f7f7f8;
  border: 1px solid #e5e5e7;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    background-color: #ffffff;
    border-color: #000000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
  }

  &::placeholder {
    color: #888888;
  }
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #888888;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    color: #000000;
    background-color: #e5e5e7;
  }
`;

/* Category Ribbon */
const CategoryScroll = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 12px;
  margin-bottom: 14px;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryPill = styled.button<{ $active: boolean }>`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '600' : '450')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#444444')};
  background-color: ${({ $active }) => ($active ? '#000000' : '#f4f4f5')};
  border: 1px solid ${({ $active }) => ($active ? '#000000' : '#e5e5e7')};
  border-radius: 9999px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#1a1a1a' : '#eaeaea')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#000000')};
  }
`;

/* Secondary Filters & Sort Row */
const SecondaryFiltersRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectBox = styled.select`
  height: 34px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 500;
  color: #333333;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover,
  &:focus {
    border-color: #000000;
  }
`;

const ClearAllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  font-weight: 500;
  color: #888888;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;

  &:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

const ResultsCount = styled.div`
  font-size: 12.5px;
  font-weight: 500;
  color: #666666;
`;

/* Directory Grid */
const DirectoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 840px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
`;

const DirectoryCard = styled.div`
  background: #ffffff;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);

  &:hover {
    border-color: #000000;
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const MetricPills = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DaBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 10.5px;
  font-weight: 600;
  color: #555555;
  background-color: #f7f7f8;
  border: 1px solid #e5e5e7;
  padding: 2px 6px;
  border-radius: 4px;
`;

const SubmissionTag = styled.span<{ $type: string }>`
  font-size: 10.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 4px;
  background-color: ${({ $type }) =>
    $type === 'Free' ? '#F4F4F5' : $type === 'Free + Paid' ? '#EAEAEA' : '#E5E5E7'};
  color: #222222;
  display: inline-block;
  margin-bottom: 12px;
  align-self: flex-start;
`;

const UrlSnippet = styled.div`
  font-size: 11.5px;
  color: #777777;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 16px;
  word-break: break-all;
`;



const EmptyStateBox = styled.div`
  text-align: center;
  padding: 56px 20px;
  background-color: #fafafa;
  border: 1px dashed #cccccc;
  border-radius: 12px;
  margin: 20px 0;
`;

const ToastNotification = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #000000;
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 12.5px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(10px)')};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
`;

export function BacklinksClientView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BacklinkCategory>('All Categories');
  const [selectedTier, setSelectedTier] = useState<BacklinkTier>('All Tiers');
  const [selectedType, setSelectedType] = useState<BacklinkSubmissionType>('All Types');
  const [sortBy, setSortBy] = useState<'dr-desc' | 'dr-asc' | 'da-desc' | 'name-asc' | 'rank'>(
    'dr-desc'
  );
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyLink = (url: string, name: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedUrl(url);
        setToastMessage(`Copied ${name} link`);
        setTimeout(() => {
          setCopiedUrl(null);
          setToastMessage(null);
        }, 2200);
      });
    }
  };

  // Filtered & Sorted items
  const filteredSources = useMemo(() => {
    let result = [...ALL_BACKLINK_SOURCES];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.url.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      result = result.filter((s) => s.category === selectedCategory);
    }

    // Tier filter
    if (selectedTier !== 'All Tiers') {
      result = result.filter((s) => s.tier === selectedTier);
    }

    // Submission Type filter
    if (selectedType !== 'All Types') {
      result = result.filter((s) => s.submissionType === selectedType);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'dr-desc') return b.dr - a.dr || a.rank - b.rank;
      if (sortBy === 'dr-asc') return a.dr - b.dr || a.rank - b.rank;
      if (sortBy === 'da-desc') {
        const daA = typeof a.da === 'number' ? a.da : 0;
        const daB = typeof b.da === 'number' ? b.da : 0;
        return daB - daA || b.dr - a.dr;
      }
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return a.rank - b.rank;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedTier, selectedType, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All Categories' ||
    selectedTier !== 'All Tiers' ||
    selectedType !== 'All Types' ||
    sortBy !== 'dr-desc';

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedTier('All Tiers');
    setSelectedType('All Types');
    setSortBy('dr-desc');
  };

  return (
    <>
      <Navbar />

      <main>
        {/* ================= HERO ================= */}
        <HeroSection>
          <Container>
            <SectionBadge>SEO DIRECTORY</SectionBadge>
            <HeroHeading>Backlink Directory</HeroHeading>
            <HeroSubtitle>
              160+ verified high-authority platforms, directories, and communities to earn genuine
              editorial backlinks — sorted by Domain Rating.
            </HeroSubtitle>

            {/* 4 Minimal Metric Highlights */}
            <StatsStrip>
              <StatItem>
                <StatValue>{ALL_BACKLINK_SOURCES.length}+</StatValue>
                <StatLabel>Verified Sources</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>DR 99</StatValue>
                <StatLabel>Highest Authority</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>4</StatValue>
                <StatLabel>Authority Tiers</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>100%</StatValue>
                <StatLabel>Live & Active</StatLabel>
              </StatItem>
            </StatsStrip>
          </Container>
        </HeroSection>

        {/* ================= TOP PICKS (Priority Launch & Listing Platforms) ================= */}
        <TopPicksSection id="top-picks">
          <Container>
            <TopPicksHeader>
              <SectionBadge style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                TOP PICKS
              </SectionBadge>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  margin: '0 0 10px',
                }}
              >
                Priority Launch &amp; Listing Platforms
              </h2>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                The ten highest-value, most consistently effective platforms in the full directory
                below. Tap any card to visit.
              </Text>
            </TopPicksHeader>

            <TopPicksGrid>
              {TOP_PICK_SOURCES.map((pick) => {
                const isCopied = copiedUrl === pick.url;
                return (
                  <TopPickCard key={pick.id}>
                    <CardTopRow>
                      <RankBadge>#{pick.rank}</RankBadge>
                      <DrBadge $high={pick.dr >= 90}>DR {pick.dr}</DrBadge>
                    </CardTopRow>

                    <CardTitle>{pick.name}</CardTitle>
                    <CardMeta>
                      {pick.description} &middot; <strong>{pick.submissionType}</strong>
                    </CardMeta>

                    <CardActions>
                      <VisitButton
                        href={pick.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${pick.name}`}
                      >
                        <span>Visit Site</span>
                        <ArrowRight size={12} />
                      </VisitButton>
                      <CopyButton
                        $copied={isCopied}
                        onClick={() => handleCopyLink(pick.url, pick.name)}
                        aria-label={`Copy link for ${pick.name}`}
                        title="Copy direct website URL"
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      </CopyButton>
                    </CardActions>
                  </TopPickCard>
                );
              })}
            </TopPicksGrid>
          </Container>
        </TopPicksSection>

        {/* ================= FULL DIRECTORY ================= */}
        <DirectorySection id="full-directory">
          <Container>
            <DirectoryHeader>
              <SectionBadge style={{ backgroundColor: '#000000', color: '#ffffff' }}>
                FULL DIRECTORY
              </SectionBadge>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.025em',
                  color: '#000000',
                  margin: '0 0 10px',
                }}
              >
                Every Source, Sorted by Authority Tier
              </h2>
              <Text fontSize="13.5px" color="#555555" lineHeight="relaxed">
                Ranked #1&ndash;#{ALL_BACKLINK_SOURCES.length} by Domain Rating. Filter by category,
                tier, or search by name.
              </Text>
            </DirectoryHeader>

            {/* Controls: Search, Categories, Filters, Sorting */}
            <ControlsContainer>
              {/* Search input */}
              <SearchInputRow>
                <SearchIconHolder>
                  <Search size={16} />
                </SearchIconHolder>
                <SearchInput
                  type="text"
                  placeholder="Search by platform name, category, or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <ClearSearchBtn onClick={() => setSearchQuery('')} aria-label="Clear search">
                    <X size={14} />
                  </ClearSearchBtn>
                )}
              </SearchInputRow>

              {/* Category Ribbon */}
              <CategoryScroll>
                {BACKLINK_CATEGORIES.map((cat) => (
                  <CategoryPill
                    key={cat}
                    $active={selectedCategory === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </CategoryPill>
                ))}
              </CategoryScroll>

              {/* Secondary Filters & Sort Selector */}
              <SecondaryFiltersRow>
                <FilterGroup>
                  {/* Tier Filter */}
                  <SelectBox
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as BacklinkTier)}
                    aria-label="Filter by Authority Tier"
                  >
                    {BACKLINK_TIERS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </SelectBox>

                  {/* Submission Type Filter */}
                  <SelectBox
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as BacklinkSubmissionType)}
                    aria-label="Filter by Submission Type"
                  >
                    {BACKLINK_SUBMISSION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type === 'All Types' ? 'All Types (Free & Paid)' : type}
                      </option>
                    ))}
                  </SelectBox>

                  {/* Sort By Selector */}
                  <SelectBox
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as 'dr-desc' | 'dr-asc' | 'da-desc' | 'name-asc' | 'rank'
                      )
                    }
                    aria-label="Sort backlink sources"
                  >
                    <option value="dr-desc">Sort by: Highest DR (99 → 1)</option>
                    <option value="dr-asc">Sort by: Lowest DR (1 → 99)</option>
                    <option value="da-desc">Sort by: Highest DA</option>
                    <option value="name-asc">Sort by: Alphabetical (A–Z)</option>
                    <option value="rank">Sort by: Rank (#1 → #{ALL_BACKLINK_SOURCES.length})</option>
                  </SelectBox>

                  {hasActiveFilters && (
                    <ClearAllBtn onClick={resetAllFilters}>
                      <X size={12} />
                      <span>Reset Filters</span>
                    </ClearAllBtn>
                  )}
                </FilterGroup>

                <ResultsCount>
                  Showing {filteredSources.length} of {ALL_BACKLINK_SOURCES.length} platforms
                </ResultsCount>
              </SecondaryFiltersRow>
            </ControlsContainer>

            {/* Directory Cards Grid */}
            {filteredSources.length > 0 ? (
              <DirectoryGrid>
                {filteredSources.map((source) => {
                  const isCopied = copiedUrl === source.url;
                  const displayDomain = source.url.replace(/^https?:\/\//, '').replace(/\/$/, '');

                  return (
                    <DirectoryCard key={source.id}>
                      <CardHeaderRow>
                        <RankBadge>#{source.rank}</RankBadge>
                        <MetricPills>
                          <DrBadge $high={source.dr >= 90}>DR {source.dr}</DrBadge>
                          <DaBadge>DA {source.da}</DaBadge>
                        </MetricPills>
                      </CardHeaderRow>

                      <CardTitle>{source.name}</CardTitle>

                      <SubmissionTag $type={source.submissionType}>
                        {source.category} &middot; {source.submissionType}
                      </SubmissionTag>

                      <Text
                        fontSize="12px"
                        color="#555555"
                        lineHeight="relaxed"
                        mb="12px"
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {source.description}
                      </Text>

                      <UrlSnippet>
                        <ExternalLink size={11} />
                        <span>{displayDomain}</span>
                      </UrlSnippet>

                      <CardActions>
                        <VisitButton
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${source.name}`}
                        >
                          <span>Visit Site</span>
                          <ArrowRight size={12} />
                        </VisitButton>
                        <CopyButton
                          $copied={isCopied}
                          onClick={() => handleCopyLink(source.url, source.name)}
                          aria-label={`Copy link for ${source.name}`}
                          title="Copy direct website URL"
                        >
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        </CopyButton>
                      </CardActions>
                    </DirectoryCard>
                  );
                })}
              </DirectoryGrid>
            ) : (
              <EmptyStateBox>
                <Text fontSize="16px" fontWeight="600" color="#111111" mb="6px">
                  No backlink sources found
                </Text>
                <Text fontSize="13px" color="#666666" mb="16px">
                  Try adjusting your search query, clearing filters, or switching category tabs.
                </Text>
                <button
                  onClick={resetAllFilters}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Reset all filters
                </button>
              </EmptyStateBox>
            )}
          </Container>
        </DirectorySection>
      </main>

      <Footer />

      {/* Toast Notification */}
      <ToastNotification $visible={Boolean(toastMessage)}>
        <Check size={14} />
        <span>{toastMessage}</span>
      </ToastNotification>
    </>
  );
}
