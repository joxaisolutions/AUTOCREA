# AUTOCREA V2.0

## Overview

AUTOCREA V2.0 is an autonomous full-stack development platform designed to generate applications from idea to deployment. It supports multiple AI providers:

**Primary AI Options:**
- **Relevance AI** (Recommended): Custom trained agent with 2-minute setup
- **JoxCoder V2.0 Hybrid**: DeepSeek-Coder-33B + CodeLlama-34B with smart routing (requires training)

The platform aims for 100% autonomous app generation, offers real-time code preview, visualizes generation steps, and automates Git operations. Users can also integrate their own API keys for other AI models (OpenAI, Anthropic, Google).

## User Preferences

- **Communication Style:** Simple, everyday language
- **Design:** Dark theme, gradient accents (cyan/blue)
- **Framework:** Next.js 14 with App Router
- **Language:** Spanish UI throughout

## System Architecture

### Frontend Architecture

The frontend is built with **Next.js 14 (App Router)**, **TypeScript**, **React 18**, and styled using **Tailwind CSS** with **Framer Motion** for animations. Key UI components include a **Monaco Editor** for code preview, a chat interface for project definition, and pages for projects, settings, and authentication. **Zustand** is used for global state management.

### Backend Architecture

The backend primarily utilizes **Convex** as a real-time database, with a comprehensive schema for users, projects, generations, and API key storage. **Next.js API routes** serve as the API layer for integration with the JoxCoder system and optional external AI services.

### AI/ML Core - JoxCoder V2.0 Hybrid System

The core intelligence is the proprietary **JoxCoder Hybrid System**, which combines:
- **DeepSeek-Coder-33B**: Specialized in Architecture, Blockchain, DevOps, and Security.
- **CodeLlama-34B**: Specialized in Frontend, Backend, Python/JS, and Debugging.

A **Smart Router** analyzes prompts and agent roles to select the most appropriate model. The system employs a multi-agent architecture with five specialized AI roles: Architect, Backend, Frontend, DevOps, and Security, each assigned to the optimal model.

### UI/UX Decisions

The application features a dark theme with cyan/blue gradient accents. The user interface is designed for responsiveness and includes elements for token balance display, project management, and a detailed generation progress tracker.

## External Dependencies

**AI Providers (Choose One):**
- **Relevance AI** (Recommended): Custom agent API for code generation (pre-configured agent ID available)
- **Hugging Face Inference API**: For JoxCoder Hybrid System (DeepSeek-Coder-33B + CodeLlama-34B)

**Infrastructure:**
- **Convex**: Real-time database for storing application data
- **Clerk**: Authentication provider (pending API key integration)
- **Stripe**: Payment processing for subscriptions and token purchases (pending integration)

**Optional External AI:**
- **OpenAI API**: Optional integration for GPT-4 (user-provided API keys)
- **Anthropic API**: Optional integration for Claude (user-provided API keys)
- **Google AI API**: Optional integration for Gemini (user-provided API keys)