export type DevCategory =
  | 'foundations'
  | 'html'
  | 'css'
  | 'javascript'
  | 'react'
  | 'typescript'
  | 'next'
  | 'node'
  | 'express'
  | 'nest'
  | 'sql'
  | 'nosql'
  | 'orm'
  | 'api'
  | 'security'
  | 'git'
  | 'testing'
  | 'devops'
  | 'professional';

export type MarketingCategory =
  | 'marketing'
  | 'seo'
  | 'social'
  | 'content'
  | 'ads'
  | 'conversion'
  | 'email'
  | 'analytics'
  | 'agency';

export interface GeneratedTopic {
  id: string;
  title: string;
  summary: string;
  duration: string;
}

export interface RelatedTopic {
  id: string;
  title: string;
  href: string;
}

export interface DevExample {
  language: string;
  syntax: string;
  code: string;
  title: string;
  explanation: string;
  output: string;
}

export interface MarketingExample {
  title: string;
  scenario: string;
  strategy: string;
  expectedOutcome: string;
  blueprint: string;
}
