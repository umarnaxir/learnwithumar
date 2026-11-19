'use client';

import styled from 'styled-components';
import {
  space,
  color,
  layout,
  typography,
  flexbox,
  grid,
  border,
  position,
  shadow,
  SpaceProps,
  ColorProps,
  LayoutProps,
  TypographyProps,
  FlexboxProps,
  GridProps,
  BorderProps,
  PositionProps,
  ShadowProps,
} from 'styled-system';

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    LayoutProps,
    TypographyProps,
    FlexboxProps,
    GridProps,
    BorderProps,
    PositionProps,
    ShadowProps {
  cursor?: string;
  transition?: string;
  gap?: string | number;
  textTransform?: string;
  letterSpacing?: string | number;
}

const STYLED_SYSTEM_PROPS = new Set([
  'm', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY',
  'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY', 'space',
  'color', 'bg', 'backgroundColor', 'opacity',
  'width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'size', 'display', 'verticalAlign', 'overflow', 'overflowX', 'overflowY',
  'fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'textAlign', 'fontStyle', 'letterSpacing', 'textTransform',
  'alignItems', 'alignContent', 'justifyItems', 'justifyContent', 'flexWrap', 'flexDirection', 'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'justifySelf', 'alignSelf', 'order',
  'gridGap', 'gridColumnGap', 'gridRowGap', 'gridColumn', 'gridRow', 'gridAutoFlow', 'gridAutoRows', 'gridAutoColumns', 'gridTemplateRows', 'gridTemplateColumns', 'gridTemplateAreas', 'gridArea',
  'border', 'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft', 'borderX', 'borderY',
  'borderTopWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderRightWidth', 'borderTopColor', 'borderBottomColor', 'borderLeftColor', 'borderRightColor', 'borderTopStyle', 'borderBottomStyle', 'borderLeftStyle', 'borderRightStyle',
  'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
  'position', 'zIndex', 'top', 'right', 'bottom', 'left',
  'boxShadow', 'textShadow', 'cursor', 'transition', 'gap', 'truncate', 'interactive', 'glass', 'fullWidth', 'variant'
]);

export const shouldForwardProp = (prop: string) => !STYLED_SYSTEM_PROPS.has(prop);

export const Box = styled.div.withConfig({ shouldForwardProp })<BoxProps>`
  box-sizing: border-box;
  min-width: 0;
  ${space}
  ${color}
  ${layout}
  ${typography}
  ${flexbox}
  ${grid}
  ${border}
  ${position}
  ${shadow}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}
  ${({ transition }) => transition && `transition: ${transition};`}
  ${({ gap }) => gap && `gap: ${typeof gap === 'number' ? `${gap}px` : gap};`}
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
`;

export type FlexProps = BoxProps;

export const Flex = styled(Box).withConfig({ shouldForwardProp })<FlexProps>`
  display: flex;
`;

export interface GridContainerProps extends BoxProps {
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridGap?: string | number;
}

export const Grid = styled(Box).withConfig({ shouldForwardProp })<GridContainerProps>`
  display: grid;
  ${({ gridTemplateColumns }) =>
    gridTemplateColumns && `grid-template-columns: ${gridTemplateColumns};`}
  ${({ gridTemplateRows }) =>
    gridTemplateRows && `grid-template-rows: ${gridTemplateRows};`}
  ${({ gridGap, gap }) => (gridGap || gap) && `gap: ${gridGap || gap};`}
`;

export const Container = styled(Box).withConfig({ shouldForwardProp })`
  width: 100%;
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  @media (min-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export interface TextProps extends SpaceProps, TypographyProps, ColorProps {
  truncate?: boolean;
  textTransform?: string;
  letterSpacing?: string | number;
}

export const Text = styled.p.withConfig({ shouldForwardProp })<TextProps>`
  margin: 0;
  ${space}
  ${typography}
  ${color}
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ letterSpacing }) => letterSpacing && `letter-spacing: ${letterSpacing};`}
  ${({ truncate }) =>
    truncate &&
    `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`;

export interface HeadingProps extends SpaceProps, TypographyProps, ColorProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = styled.h2.withConfig({ shouldForwardProp })<HeadingProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  letter-spacing: -0.02em;
  ${space}
  ${typography}
  ${color}
`;

export const NumberText = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.numbers};
  font-feature-settings: 'tnum' on, 'lnum' on;
`;

export interface ButtonProps extends SpaceProps, LayoutProps, BorderProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = styled.button.withConfig({ shouldForwardProp })<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return `
          font-size: 11.5px;
          padding: 4px 10px;
          height: 28px;
        `;
      case 'lg':
        return `
          font-size: 13.5px;
          padding: 8px 18px;
          height: 38px;
          border-radius: 8px;
        `;
      case 'md':
      default:
        return `
          font-size: 12.5px;
          padding: 6px 14px;
          height: 34px;
        `;
    }
  }}

  ${({ variant = 'primary', theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          &:hover {
            background-color: ${theme.colors.surfaceHover};
            border-color: #CCCCCC;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          &:hover {
            border-color: #000000;
            background-color: ${theme.colors.surface};
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: ${theme.colors.textSecondary};
          border: 1px solid transparent;
          &:hover {
            color: ${theme.colors.text};
            background-color: ${theme.colors.surface};
          }
        `;
      case 'glass':
        return `
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: ${theme.colors.text};
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          &:hover {
            background: rgba(255, 255, 255, 0.95);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
          }
        `;
      case 'primary':
      default:
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.textInverse};
          border: 1px solid ${theme.colors.primary};
          &:hover {
            background-color: #222222;
            border-color: #222222;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          &:active {
            transform: translateY(0);
          }
        `;
    }
  }}

  ${({ fullWidth }) => fullWidth && 'width: 100%;'}
  ${space}
  ${layout}
  ${border}
`;

export interface CardProps extends BoxProps {
  interactive?: boolean;
  glass?: boolean;
}

export const Card = styled(Box).withConfig({ shouldForwardProp })<CardProps>`
  background-color: ${({ theme, glass }) =>
    glass ? theme.colors.surfaceGlass : theme.colors.cardBg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 20px;
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  ${({ glass }) =>
    glass &&
    `
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
  `}

  ${({ interactive }) =>
    interactive &&
    `
    cursor: pointer;
    &:hover {
      border-color: #000000;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    }
  `}
`;

export interface BadgeProps extends SpaceProps {
  variant?: 'neutral' | 'success' | 'warning' | 'info' | 'dark';
}

export const Badge = styled.span.withConfig({ shouldForwardProp })<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 2.5px 7px;
  border-radius: 9999px;

  ${({ variant = 'neutral', theme }) => {
    switch (variant) {
      case 'success':
        return `
          background-color: ${theme.colors.successBg};
          color: ${theme.colors.success};
          border: 1px solid rgba(16, 185, 129, 0.2);
        `;
      case 'warning':
        return `
          background-color: ${theme.colors.warningBg};
          color: ${theme.colors.warning};
          border: 1px solid rgba(245, 158, 11, 0.2);
        `;
      case 'info':
        return `
          background-color: ${theme.colors.infoBg};
          color: ${theme.colors.info};
          border: 1px solid rgba(59, 130, 246, 0.2);
        `;
      case 'dark':
        return `
          background-color: #000000;
          color: #FFFFFF;
          border: 1px solid #000000;
        `;
      case 'neutral':
      default:
        return `
          background-color: ${theme.colors.surface};
          color: ${theme.colors.textSecondary};
          border: 1px solid ${theme.colors.border};
        `;
    }
  }}

  ${space}
`;

export const Divider = styled.hr.withConfig({ shouldForwardProp })<SpaceProps>`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
  width: 100%;
  ${space}
`;
