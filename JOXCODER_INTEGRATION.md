# 🚀 JoxCoder V2.0 - Integration Guide for AUTOCREA

## 📋 Overview

JoxCoder V2.0 is a **hybrid AI system** that combines two specialized models:

1. **DeepSeek-Coder-33B** - Expert in:
   - 🏗️ System architecture and design
   - ⛓️ Blockchain and smart contracts
   - 🚀 DevOps and infrastructure
   - 🛡️ Security auditing

2. **CodeLlama-34B** - Expert in:
   - 🎨 Frontend development (React, Vue, Angular)
   - ⚙️ Backend development (Python, Node.js, APIs)
   - 🐛 Debugging and error fixing
   - 📊 Data science and ML

## 🎯 How It Works

### Smart Router System

AUTOCREA uses an intelligent router that automatically selects the best model for each task:

```
User Request: "Create an e-commerce with Stripe and React"
        ↓
   Router Analyzes:
   - Keywords: React, Stripe, e-commerce
   - Agent Role: Frontend, Backend
        ↓
    Decisions:
    ├─ Frontend → CodeLlama-34B
    ├─ Backend → CodeLlama-34B  
    ├─ Architecture → DeepSeek-33B
    ├─ DevOps → DeepSeek-33B
    └─ Security → DeepSeek-33B
        ↓
   Generated Code ✅
```

## 🔧 Setup Instructions

### Step 1: Train Your Models

Follow the training script provided in `attached_assets/JoxCoder_V2_Training.txt`:

1. **Train DeepSeek-Coder-33B**
   - Specialization: Architecture, Blockchain, DevOps, Security
   - Training time: ~4-5 hours on A100
   - Upload to Hugging Face

2. **Train CodeLlama-34B**
   - Specialization: Frontend, Backend, Python/JS, Debugging
   - Training time: ~4-5 hours on A100
   - Upload to Hugging Face

### Step 2: Configure Environment Variables

Create a `.env.local` file with your trained models:

```bash
# DeepSeek-Coder-33B (your trained model)
JOXCODER_DEEPSEEK_API_URL=https://api-inference.huggingface.co/models/YOUR_USERNAME/joxcoder-deepseek-33b
JOXCODER_DEEPSEEK_API_KEY=hf_YOUR_HUGGING_FACE_API_KEY

# CodeLlama-34B (your trained model)
JOXCODER_CODELLAMA_API_URL=https://api-inference.huggingface.co/models/YOUR_USERNAME/joxcoder-codellama-34b
JOXCODER_CODELLAMA_API_KEY=hf_YOUR_HUGGING_FACE_API_KEY
```

### Step 3: Test the Integration

```bash
# Start AUTOCREA
npm run dev

# Go to http://localhost:5000/chat
# Create a test project
# Watch the multi-agent system work!
```

## 🏗️ Architecture

### Multi-Agent Workflow

When you generate a project, AUTOCREA uses 5 AI agents in sequence:

```typescript
Agent 1: Architect (DeepSeek-33B)
  ├─ Analyzes project requirements
  ├─ Designs system architecture
  └─ Selects technology stack

Agent 2: Backend (CodeLlama-34B)
  ├─ Creates API endpoints
  ├─ Designs database schema
  └─ Implements business logic

Agent 3: Frontend (CodeLlama-34B)
  ├─ Creates UI components
  ├─ Implements user flows
  └─ Adds styling and animations

Agent 4: DevOps (DeepSeek-33B)
  ├─ Sets up deployment pipeline
  ├─ Configures infrastructure
  └─ Creates Docker/K8s configs

Agent 5: Security (DeepSeek-33B)
  ├─ Audits generated code
  ├─ Adds security measures
  └─ Implements best practices
```

## 🎨 UI Integration

The UI automatically shows which model is being used:

- **Purple gradient** = Architect (DeepSeek)
- **Blue gradient** = Backend (CodeLlama)
- **Green gradient** = Frontend (CodeLlama)
- **Orange gradient** = DevOps (DeepSeek)
- **Yellow gradient** = Security (DeepSeek)

## 📊 Router Logic

The router uses keyword analysis and agent roles to decide:

### DeepSeek Triggers:
- Keywords: `arquitectura`, `blockchain`, `devops`, `kubernetes`, `security`
- Roles: `architect`, `devops`, `security`

### CodeLlama Triggers:
- Keywords: `react`, `vue`, `angular`, `python`, `javascript`, `api`, `debug`
- Roles: `frontend`, `backend`

### Example Decisions:

```typescript
Input: "Create a microservices architecture with Docker"
→ DeepSeek-33B (keywords: microservices, architecture, Docker)

Input: "Build a React dashboard with charts"
→ CodeLlama-34B (keywords: React, dashboard)

Input: "Implement secure JWT authentication"
→ DeepSeek-33B (keywords: secure, authentication)

Input: "Debug this Python FastAPI error"
→ CodeLlama-34B (keywords: debug, Python, FastAPI)
```

## 🔌 API Endpoints

### `/api/joxcoder` - Model Selection
Tests the router and returns which model would be used:

```typescript
POST /api/joxcoder
{
  "prompt": "Create a React app",
  "agentRole": "frontend",
  "preferredModel": "auto"
}

Response:
{
  "modelSelected": "codellama",
  "confidence": 0.85,
  "hybridInfo": {
    "deepSeek": "DeepSeek-Coder-33B (...)",
    "codeLlama": "CodeLlama-34B (...)"
  }
}
```

### `/api/generate` - Full Generation
Starts a multi-agent generation:

```typescript
POST /api/generate
{
  "projectName": "My E-commerce",
  "description": "E-commerce with Stripe and React"
}

Response:
{
  "agentPlan": [
    { "role": "architect", "model": "DeepSeek-33B" },
    { "role": "backend", "model": "CodeLlama-34B" },
    { "role": "frontend", "model": "CodeLlama-34B" },
    { "role": "devops", "model": "DeepSeek-33B" },
    { "role": "security", "model": "DeepSeek-33B" }
  ]
}
```

## 💡 Tips for Best Results

### 1. Model Selection
- ✅ Let the router decide automatically (`preferredModel: "auto"`)
- ✅ Use specific keywords in your prompts
- ⚠️ Override only when you have a specific reason

### 2. Prompt Engineering
```typescript
// Good prompts:
"Create a full-stack e-commerce with React frontend, Node.js backend, and Stripe payments"
"Design a microservices architecture for a social media platform using Docker and Kubernetes"
"Build a data science dashboard with Python, FastAPI, and interactive charts"

// Avoid vague prompts:
"Make an app"
"Create something cool"
```

### 3. Context Matters
The router considers:
- Agent role (architect, backend, frontend, devops, security)
- Previous steps in the generation
- Keywords in the prompt
- Project type

## 🐛 Troubleshooting

### Issue: "JoxCoder Hybrid API not configured"
**Solution:** Add all 4 required environment variables to `.env.local`

### Issue: Poor model selection
**Solution:** Use more specific keywords in your prompts

### Issue: Slow generation
**Solution:** 
- Ensure models are fully loaded on Hugging Face
- Check your Hugging Face API tier (free tier has rate limits)
- Consider upgrading to Hugging Face Pro

## 📈 Monitoring

Track which models are being used:

```typescript
// In browser console:
Watch for: "🎯 Router decision: deepseek (confidence: 0.85)"

// In the UI:
- Purple/Orange/Yellow badges = DeepSeek
- Blue/Green badges = CodeLlama
```

## 🚀 Advanced: FastAPI Router (Optional)

For production, you can deploy a separate FastAPI router:

```python
# router.py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.post("/route")
async def route_request(request: RequestData):
    # Implement advanced routing logic
    # Cache frequently used prompts
    # Load balance between models
    return {"model": "deepseek", "confidence": 0.9}
```

Then set:
```bash
JOXCODER_ROUTER_URL=https://your-router.fly.dev/route
```

## 📚 Resources

- [DeepSeek-Coder Documentation](https://github.com/deepseek-ai/deepseek-coder)
- [CodeLlama Documentation](https://github.com/facebookresearch/codellama)
- [Hugging Face Inference API](https://huggingface.co/docs/api-inference)
- [PEFT Fine-tuning Guide](https://huggingface.co/docs/peft)

## 🎯 Next Steps

1. ✅ Train both models (DeepSeek + CodeLlama)
2. ✅ Upload to Hugging Face
3. ✅ Add API keys to `.env.local`
4. ✅ Test in AUTOCREA Chat
5. ✅ Monitor performance
6. ✅ Iterate on prompts and routing logic

---

**Questions?** Check the main README.md or create an issue.

**Happy Coding with JoxCoder V2.0!** 🚀
