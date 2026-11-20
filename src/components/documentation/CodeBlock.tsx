'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from '@/components/ui/primitives';
import { Check, Copy, Terminal } from 'lucide-react';
import { highlightCode } from './syntax-highlight';

const CodeContainer = styled(Box)`
  background-color: #0c0c0c;
  border: 1px solid #222222;
  border-radius: 10px;
  overflow: hidden;
  margin: 16px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`;

const CodeHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  background-color: #161616;
  border-bottom: 1px solid #222222;
  min-width: 0;

  @media (min-width: 480px) {
    padding: 8px 12px;
    gap: 10px;
  }

  @media (min-width: 768px) {
    padding: 8px 16px;
  }
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  color: ${({ $copied }) => ($copied ? '#10B981' : '#A0A0A0')};
  background-color: ${({ $copied }) =>
    $copied ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ $copied }) => ($copied ? 'rgba(16, 185, 129, 0.3)' : 'transparent')};
  border-radius: 6px;
  padding: 4px 8px;
  height: 28px;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const PreformattedCode = styled.pre`
  margin: 0;
  padding: 12px 14px 14px;
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  line-height: 1.6;
  color: #e4e4e7;
  tab-size: 2;
  -webkit-overflow-scrolling: touch;

  @media (min-width: 768px) {
    font-size: 13.5px;
    padding: 14px 16px 16px;
    line-height: 1.65;
  }

  code {
    font-family: inherit;
    font-size: inherit;
  }

  .token-comment {
    color: #7f848e;
    font-style: italic;
  }

  .token-string {
    color: #98c379;
  }

  .token-keyword {
    color: #c678dd;
  }

  .token-number {
    color: #d19a66;
  }

  .token-function {
    color: #61afef;
  }

  .token-tag {
    color: #e06c75;
  }

  .token-attribute {
    color: #d19a66;
  }

  .token-property {
    color: #61afef;
  }

  .token-operator {
    color: #56b6c2;
  }

  .token-punctuation {
    color: #abb2bf;
  }
`;

const OutputBox = styled(Box)`
  background-color: #121212;
  border-top: 1px dashed #282828;
  padding: 10px 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11.5px;
  color: #a1a1aa;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding: 12px 16px;
    font-size: 12.5px;
  }
`;

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
  output?: string;
}

export function CodeBlock({
  title,
  language = 'typescript',
  code,
  output,
}: CodeBlockProps) {
  // Track which snippet was copied rather than a boolean. When the lesson
  // changes, a new code string no longer matches, so the label resets without
  // an extra render triggered from an effect.
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const copied = copiedCode === code;
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tokens = useMemo(() => highlightCode(code, language), [code, language]);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyWithFallback = () => {
    if (navigator.clipboard?.writeText) {
      return navigator.clipboard.writeText(code);
    }

    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    const didCopy = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (!didCopy) throw new Error('Clipboard is not available in this browser.');
    return Promise.resolve();
  };

  const handleCopy = async () => {
    try {
      await copyWithFallback();
      setCopiedCode(code);

      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => {
        setCopiedCode((current) => (current === code ? null : current));
      }, 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard', error);
    }
  };

  return (
    <CodeContainer>
      <CodeHeader>
        <Flex alignItems="center" gap="8px" style={{ minWidth: 0, flex: 1 }}>
          <Terminal size={13} color="#888888" style={{ flexShrink: 0 }} />
          <Text
            fontSize="12px"
            fontWeight="600"
            color="#D4D4D8"
            truncate
            title={title || language}
          >
            {title || language.toUpperCase()}
          </Text>
          <span
            style={{
              fontSize: '10px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              flexShrink: 0,
            }}
          >
            {language}
          </span>
        </Flex>

        <CopyButton
          type="button"
          onClick={handleCopy}
          $copied={copied}
          title="Copy code to clipboard"
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </CopyButton>
      </CodeHeader>

      <PreformattedCode>
        <code>
          {tokens.map((token, index) => (
            <span key={index} className={`token-${token.kind}`}>
              {token.value}
            </span>
          ))}
        </code>
      </PreformattedCode>

      {output && (
        <OutputBox>
          <Text
            fontSize="11px"
            fontWeight="600"
            color="#71717A"
            textTransform="uppercase"
            letterSpacing="0.06em"
            mb="4px"
          >
            Expected Result / Terminal Output
          </Text>
          <div style={{ color: '#34D399' }}>{output}</div>
        </OutputBox>
      )}
    </CodeContainer>
  );
}
