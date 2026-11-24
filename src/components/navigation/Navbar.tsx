'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { Box, Flex, Button, Text } from '@/components/ui/primitives';
import { SearchModal } from '@/components/common/SearchModal';
import { useAppTheme } from '@/context/ThemeContext';
import {
  Search,
  BookOpen,
  CodeXml,
  Menu,
  X,
  Compass,
  Home,
  Code2,
  TrendingUp,
  FolderGit2,
  Sun,
  Moon,
} from 'lucide-react';

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 8px 10px 0;
  background-color: transparent;
  pointer-events: none;
  transition: all 0.25s ease;

  @media (min-width: 480px) {
    padding: 8px 12px 0;
  }

  @media (min-width: 768px) {
    padding: 10px 16px 0;
  }
`;

const NavHeader = styled.header<{ $isScrolled: boolean }>`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  height: 52px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  pointer-events: auto;
  background-color: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.colors.navbarGlass : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(20px) saturate(180%)' : 'none'};
  -webkit-backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(20px) saturate(180%)' : 'none'};
  border: 1px solid
    ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.colors.navbarBorder : 'transparent'};
  box-shadow: ${({ $isScrolled, theme }) =>
    $isScrolled
      ? (theme.mode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)')
      : 'none'};
  transition:
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    -webkit-backdrop-filter 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 480px) {
    padding: 0 14px;
  }
`;

const NavPlaceholder = styled.div`
  height: 60px;
  width: 100%;
  pointer-events: none;
  visibility: hidden;

  @media (min-width: 768px) {
    height: 62px;
  }
`;

const BrandLogo = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  flex-shrink: 0;
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
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textInverse};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.9;
  }
`;

const NavList = styled.nav`
  display: none;
  align-items: center;
  gap: 2px;

  @media (min-width: 900px) {
    display: flex;
  }
`;

const NavItemLink = styled(Link) <{ $isActive: boolean }>`
  font-size: 12px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  padding: 5px 8px;
  border-radius: 6px;
  transition: all 0.15s ease;
  position: relative;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.surface};
  }

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    background-color: ${theme.mode === 'dark' ? '#1E1E1E' : '#F4F4F5'};
  `}
`;

const SearchTriggerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 6px 9px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;

  @media (min-width: 480px) {
    padding: 5px 10px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#171717' : '#ffffff')};
  }
`;

const SearchLabel = styled.span`
  @media (max-width: 479px) {
    display: none;
  }
`;

const KbdShortcut = styled.kbd`
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 600;
  background-color: ${({ theme }) => (theme.mode === 'dark' ? '#1A1A1A' : '#ffffff')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  padding: 1px 4px;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 767px) {
    display: none;
  }
`;

const ThemeToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.borderHover};
    background-color: ${({ theme }) => (theme.mode === 'dark' ? '#171717' : '#ffffff')};
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) =>
      theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileMenuBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 1050;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease, visibility 0.2s ease;

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileMenuDrawer = styled(Box) <{ $isOpen: boolean }>`
  position: fixed;
  top: 66px;
  left: 10px;
  right: 10px;
  max-width: 600px;
  margin: 0 auto;
  background: ${({ theme }) => (theme.mode === 'dark' ? '#0D0D0D' : '#ffffff')};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.mode === 'dark'
      ? '0 16px 40px rgba(0, 0, 0, 0.8)'
      : '0 16px 40px rgba(0, 0, 0, 0.15)'};
  z-index: 1100;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: calc(100vh - 84px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link) <{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '450')};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.textSecondary};
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.surface : 'transparent'};
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export function Navbar() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useAppTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    queueMicrotask(() => setIsMobileMenuOpen(false));
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Learning Paths', href: '/learning-paths', icon: Compass },
    { label: 'Full Stack', href: '/full-stack', icon: Code2 },
    { label: 'Digital Marketing', href: '/digital-marketing', icon: TrendingUp },
    { label: 'Documentation', href: '/docs', icon: BookOpen },
    { label: 'Projects', href: '/projects', icon: FolderGit2 },
  ];

  const isLinkActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href === '/projects') {
      return pathname === '/projects' || pathname.startsWith('/projects/');
    }
    if (href === '/full-stack') {
      return pathname === '/full-stack' || pathname.startsWith('/full-stack/');
    }
    if (href === '/digital-marketing') {
      return pathname === '/digital-marketing' || pathname.startsWith('/digital-marketing/');
    }
    if (href === '/docs') {
      return pathname === '/docs' || pathname.startsWith('/docs/');
    }
    if (href === '/learning-paths') {
      return pathname === '/learning-paths' || pathname.startsWith('/learning-paths/');
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      <NavWrapper>
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
              const isActive = isLinkActive(link.href);
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
              <SearchLabel>Search docs...</SearchLabel>
              <KbdShortcut>⌘K</KbdShortcut>
            </SearchTriggerButton>

            {/* Theme Toggle Button */}
            <ThemeToggleBtn
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </ThemeToggleBtn>

            <Box display={['none', 'none', 'none', 'block']}>
              <Button as={Link} href="/full-stack" size="sm" variant="primary">
                Start Learning
              </Button>
            </Box>

            {/* Mobile Menu Hamburger */}
            <HamburgerButton
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </HamburgerButton>
          </Flex>
        </NavHeader>
      </NavWrapper>

      {/* Spacing placeholder for document flow */}
      <NavPlaceholder aria-hidden="true" />

      {/* Mobile Menu Backdrop */}
      <MobileMenuBackdrop
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer $isOpen={isMobileMenuOpen}>
        <Flex alignItems="center" justifyContent="space-between" mb="8px" pb="8px" borderBottom="1px solid" borderColor="border">
          <Text fontSize="11px" fontWeight="700" color="textMuted" letterSpacing="0.06em">
            PLATFORM NAVIGATION
          </Text>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ padding: '4px', color: isDark ? '#A1A1AA' : '#888888', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
        </Flex>

        {/* Mobile Theme Toggle Row */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          p="8px 10px"
          mb="8px"
          borderRadius="8px"
          bg={isDark ? '#141414' : '#F5F5F5'}
          border="1px solid"
          borderColor="border"
        >
          <Flex alignItems="center" gap="8px">
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
            <Text fontSize="12.5px" fontWeight="500">
              {isDark ? 'Dark Theme' : 'Light Theme'}
            </Text>
          </Flex>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleTheme}
            style={{ height: '26px', padding: '2px 8px', fontSize: '11px' }}
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </Flex>

        <Box mb="8px">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = isLinkActive(link.href);
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

        <Box mt="auto" pt="12px" borderTop="1px solid" borderColor="border">
          <Button
            as={Link}
            href="/learning-paths"
            variant="primary"
            fullWidth
            size="sm"
            mb="8px"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Explore Learning Paths
          </Button>
          <Button
            as={Link}
            href="/docs"
            variant="outline"
            fullWidth
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Documentation Hub
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
