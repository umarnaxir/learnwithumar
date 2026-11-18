'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Box, Flex, Button, Text } from '@/components/ui/primitives';
import { SearchModal } from '@/components/common/SearchModal';
import {
  Search,
  BookOpen,
  Code2,
  CodeXml,
  TrendingUp,
  LayoutDashboard,
  FolderGit2,
  Menu,
  X,
  Compass,
  Sparkles,
} from 'lucide-react';

const NavWrapper = styled.div<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 8px 12px 0;
  transition: all 0.2s ease;

  @media (min-width: 768px) {
    padding: 10px 16px 0;
  }
`;

const NavHeader = styled.header<{ $isScrolled: boolean }>`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  height: 52px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid
    ${({ $isScrolled, theme }) =>
      $isScrolled ? theme.colors.border : 'rgba(234, 234, 234, 0.85)'};
  border-radius: 10px;
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled
      ? '0 6px 24px rgba(0, 0, 0, 0.05)'
      : '0 1px 4px rgba(0, 0, 0, 0.02)'};
  transition: all 0.25s ease;
`;

const BrandLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    opacity: 0.85;
    transform: scale(1.04);
  }
`;

const LogoBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #1a1a1a;
  }
`;

const NavList = styled.nav`
  display: none;
  align-items: center;
  gap: 2px;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavItemLink = styled(Link)<{ $isActive: boolean }>`
  font-size: 12.5px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  padding: 5px 10px;
  border-radius: 6px;
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: #F4F4F5;
  `}
`;

const SearchTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #000000;
    color: ${({ theme }) => theme.colors.text};
    background-color: #ffffff;
  }
`;

const KbdShortcut = styled.kbd`
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 600;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  padding: 1px 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MobileMenuDrawer = styled(Box)<{ $isOpen: boolean }>`
  position: fixed;
  top: 66px;
  left: 12px;
  right: 12px;
  max-width: 1040px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  z-index: 45;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  padding: 9px 12px;
  border-radius: 6px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.surface : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: #000000;
  }
`;

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setIsMobileMenuOpen(false));
  }, [pathname]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Learning Paths', href: '/learning-paths', icon: Compass },
    { label: 'Full Stack', href: '/full-stack', icon: Code2 },
    { label: 'Digital Marketing', href: '/digital-marketing', icon: TrendingUp },
    { label: 'Docs', href: '/docs', icon: BookOpen },
    { label: 'Projects', href: '/projects', icon: FolderGit2 },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'About', href: '/about', icon: Sparkles },
  ];

  return (
    <>
      <NavWrapper $isScrolled={isScrolled}>
        <NavHeader $isScrolled={isScrolled}>
          {/* Brand Logo (</>) */}
          <BrandLogo href="/" aria-label="Learn with Umar Home" title="Learn with Umar">
            <LogoBox>
              <CodeXml size={16} strokeWidth={2.4} />
            </LogoBox>
          </BrandLogo>

          {/* Desktop Navigation Links */}
          <NavList>
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <NavItemLink
                  key={link.href}
                  href={link.href}
                  $isActive={isActive}
                >
                  {link.label}
                </NavItemLink>
              );
            })}
          </NavList>

          {/* Action Buttons */}
          <Flex alignItems="center" gap="8px">
            <SearchTriggerButton
              onClick={() => setIsSearchOpen(true)}
              title="Search documentation (Cmd+K)"
            >
              <Search size={13} />
              <span>Search docs...</span>
              <KbdShortcut>⌘K</KbdShortcut>
            </SearchTriggerButton>

            <Box display={['none', 'none', 'block']}>
              <Button as={Link} href="/full-stack" size="sm" variant="primary">
                Start Learning
              </Button>
            </Box>

            {/* Mobile Menu Hamburger */}
            <Box display={['block', 'block', 'none']}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                style={{
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000000',
                }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </Box>
          </Flex>
        </NavHeader>
      </NavWrapper>

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer $isOpen={isMobileMenuOpen}>
        <Box mb="8px">
          <Text fontSize="11px" fontWeight="700" color="#888888" mb="6px">
            PLATFORM NAVIGATION
          </Text>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <MobileNavLink
                key={link.href}
                href={link.href}
                $isActive={isActive}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={16} />
                <span>{link.label}</span>
              </MobileNavLink>
            );
          })}
        </Box>

        <Box mt="auto" pt="12px" borderTop="1px solid #EAEAEA">
          <Button
            as={Link}
            href="/dashboard"
            variant="secondary"
            fullWidth
            size="sm"
            mb="8px"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Student Dashboard
          </Button>
          <Button
            as={Link}
            href="/full-stack"
            variant="primary"
            fullWidth
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore Curriculum
          </Button>
        </Box>
      </MobileMenuDrawer>

      {/* Global Search Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
