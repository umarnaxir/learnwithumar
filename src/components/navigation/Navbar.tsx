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
  CodeXml,
  Menu,
  X,
  Compass,
  Home,
  Code2,
  TrendingUp,
  FolderGit2,
} from 'lucide-react';

const NavWrapper = styled.div<{ $isScrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  padding: 8px 10px 0;
  transition: all 0.25s ease;
  background-color: transparent;

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
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(16px)' : 'none'};
  -webkit-backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(16px)' : 'none'};
  border: 1px solid
    ${({ $isScrolled }) =>
    $isScrolled ? 'rgba(234, 234, 234, 0.9)' : 'transparent'};
  border-radius: 10px;
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled
      ? '0 6px 24px rgba(0, 0, 0, 0.05)'
      : 'none'};
  transition: all 0.25s ease;

  @media (min-width: 480px) {
    padding: 0 14px;
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
    border-color: #000000;
    color: ${({ theme }) => theme.colors.text};
    background-color: #ffffff;
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
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  padding: 1px 4px;
  color: ${({ theme }) => theme.colors.textSecondary};

  @media (max-width: 767px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileMenuBackdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 950;
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
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
  z-index: 960;
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

      {/* Mobile Menu Backdrop */}
      <MobileMenuBackdrop
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <MobileMenuDrawer $isOpen={isMobileMenuOpen}>
        <Flex alignItems="center" justifyContent="space-between" mb="8px" pb="8px" borderBottom="1px solid #EAEAEA">
          <Text fontSize="11px" fontWeight="700" color="#888888" letterSpacing="0.06em">
            PLATFORM NAVIGATION
          </Text>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ padding: '4px', color: '#888888', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>
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

        <Box mt="auto" pt="12px" borderTop="1px solid #EAEAEA">
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
