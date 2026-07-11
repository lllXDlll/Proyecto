## ADDED Requirements

### Requirement: Provide professional root README
The project SHALL include a root `README.md` that documents the Equipment Loan Management System for GitHub contributors, reviewers, and maintainers.

#### Scenario: README exists at project root
- **GIVEN** the documentation change has been applied
- **WHEN** the repository root is inspected
- **THEN** `README.md` exists
- **AND** it is written in Markdown

### Requirement: Include required README sections
The README SHALL include sections for project title, description, features, technology stack, project structure, prerequisites, installation, environment variables, database setup, running the application, available scripts, running tests, deployment overview, OpenSpec workflow, sprint organization, contributing guidelines, and license.

#### Scenario: Required sections are present
- **GIVEN** `README.md` has been generated
- **WHEN** the document headings are reviewed
- **THEN** all required sections are present
- **AND** they appear in a clear, maintainable order

### Requirement: Document project stack and architecture
The README SHALL describe the current technology stack and architecture practices used by the project.

#### Scenario: Stack is documented
- **GIVEN** `README.md` has been generated
- **WHEN** the technology stack section is reviewed
- **THEN** it documents React, TypeScript, Vite, Express, PostgreSQL, Supabase, Prisma, JWT, bcrypt, Jest, Supertest, Playwright, k6, Render, Scrum, OpenSpec, Clean Architecture, and REST API

### Requirement: Document setup, testing, and deployment
The README SHALL provide maintainable setup, testing, and deployment instructions without exposing secrets.

#### Scenario: Developer can follow setup instructions
- **GIVEN** a new developer reads the README
- **WHEN** they inspect the prerequisites, installation, environment variables, database setup, running, scripts, and tests sections
- **THEN** the document provides commands and examples needed to configure and run the project
- **AND** no real production secrets are included

### Requirement: Document OpenSpec workflow and sprint organization
The README SHALL explain the project's Spec-Driven Development workflow and six-sprint Scrum organization.

#### Scenario: Development process is clear
- **GIVEN** a contributor reads the README
- **WHEN** they inspect the OpenSpec workflow and sprint organization sections
- **THEN** the README explains Create a Change, Generate Proposal, Generate Design, Generate Tasks, Implement, Test, and Archive
- **AND** it lists Sprint 1 through Sprint 6 with their business focus
