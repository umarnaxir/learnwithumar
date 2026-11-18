'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from '@/components/ui/primitives';
import { Check, Copy, Terminal } from 'lucide-react';

const CodeContainer = styled(Box)`
  background-color: #0c0c0c;
  border: 1px solid #222222;
  border-radius: 10px;
  overflow: hidden;
  margin: 16px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const CodeHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #161616;
  border-bottom: 1px solid #222222;
`;

const CopyButton = styled.button<{ $copied: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ $copied }) => ($copied ? '#10B981' : '#A0A0A0')};
  background-color: ${({ $copied }) =>
    $copied ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ $copied }) => ($copied ? 'rgba(16, 185, 129, 0.3)' : 'transparent')};
  border-radius: 6px;
  padding: 4px 8px;
  transition: all 0.15s ease;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const PreformattedCode = styled.pre`
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13.5px;
  line-height: 1.6;
  color: #e4e4e7;
  tab-size: 2;

  code {
    font-family: inherit;
    font-size: inherit;
  }
`;

const OutputBox = styled(Box)`
  background-color: #121212;
  border-top: 1px dashed #282828;
  padding: 12px 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12.5px;
  color: #a1a1aa;
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Failed to copy to clipboard', e);
    }
  };

  return (
    <CodeContainer>
      <CodeHeader>
        <Flex alignItems="center" gap="8px">
          <Terminal size={13} color="#888888" />
          <Text fontSize="12px" fontWeight="600" color="#D4D4D8">
            {title || language.toUpperCase()}
          </Text>
          <span
            style={{
              fontSize: '10px',
              color: '#71717A',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {language}
          </span>
        </Flex>

        <CopyButton
          onClick={handleCopy}
          $copied={copied}
          title="Copy code to clipboard"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </CopyButton>
      </CodeHeader>

      <PreformattedCode>
        <code>{code}</code>
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
