# Info OS Frontend

A modern React-based frontend application with automated CI/CD pipeline using Semantic Release and GitHub Actions.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **React Hook Form** with Zod validation
- **React Query** for data fetching
- **Automated CI/CD** with Semantic Release
- **Docker** support for containerization
- **Conventional Commits** for automated versioning

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── Pages/         # Page components
├── Routes/        # Routing configuration
├── hook/          # Custom React hooks
├── context/       # React context providers
├── lib/           # Utility libraries
├── schemas/       # Zod validation schemas
├── tests/         # Test files
├── types.ts       # TypeScript type definitions
└── constants.ts   # Application constants
```

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Forms**: React Hook Form, Zod
- **State Management**: React Query, Context API
- **Build Tool**: Vite
- **Linting**: ESLint
- **CI/CD**: GitHub Actions, Semantic Release
- **Containerization**: Docker, Docker Compose

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd info-os-fontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🚀 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm run commit           # Interactive conventional commit
npm run release          # Run semantic release
npm run release:dry-run  # Dry run semantic release
```

## 🔄 CI/CD Pipeline

This project uses a sophisticated CI/CD pipeline with the following workflow:

### 1. **Staging Deployment**
- **Trigger**: Push to `master` branch
- **Action**: Automatic deployment to staging environment
- **Workflow**: `.github/workflows/main.yml`

### 2. **Automatic Versioning**
- **Trigger**: Pull Request merged to `master`
- **Action**: Semantic Release analyzes commits and creates `v*` tags
- **Workflow**: `.github/workflows/release.yml`

### 3. **Production Deployment**
- **Trigger**: Manual creation of `prod/v*` tags
- **Action**: Automatic deployment to production
- **Workflow**: `.github/workflows/production-deploy.yml`

## 📝 Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning:

```bash
feat: add new feature
fix: fix a bug
docs: update documentation
style: formatting changes
refactor: code refactoring
perf: performance improvements
test: add or fix tests
chore: maintenance tasks
ci: CI/CD changes
build: build system changes
```

### Using Commitizen (Recommended)
```bash
npm run commit
```

## 🐳 Docker Support

### Development
```bash
docker compose up -d
```

### Staging
```bash
docker compose -f docker-compose-staging.yml up -d
```

### Production
```bash
docker compose -f docker-compose.yml up -d
```

## 🔧 Configuration Files

- **`.releaserc.json`**: Semantic Release configuration
- **`.czrc`**: Commitizen configuration
- **`vite.config.ts`**: Vite configuration
- **`tailwind.config.js`**: Tailwind CSS configuration
- **`tsconfig.json`**: TypeScript configuration
- **`eslint.config.js`**: ESLint configuration

## 📚 Documentation

- **[RELEASE.md](RELEASE.md)**: Complete release and deployment guide
- **[COMMIT_EXAMPLES.md](COMMIT_EXAMPLES.md)**: Conventional commit examples
- **[WORKFLOW_EXAMPLE.md](WORKFLOW_EXAMPLE.md)**: Workflow examples
- **[NEW_WORKFLOW.md](NEW_WORKFLOW.md)**: New workflow explanation
- **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)**: Setup summary

## 🚀 Deployment Workflow

### 1. **Development**
   - Work on feature branch
   - Use `npm run commit` for conventional commits
   - Push to feature branch

### 2. **Pull Request**
   - Create PR to `master`
   - Code review and approval

### 3. **Merge & Release**
   - Merge PR to `master`
   - Automatic staging deployment
   - Automatic `v*` tag creation

### 4. **Production**
   - Create `prod/v*` tag when ready
   - Automatic production deployment

## 🔍 Monitoring

### GitHub Actions
- Check workflow execution in the Actions tab
- Monitor deployment status
- View logs for troubleshooting

### Tags
```bash
# View automatic version tags
git tag --list "v*"

# View production tags
git tag --list "prod/v*"
```

## ⚠️ Important Notes

1. **Always use conventional commits** with `npm run commit`
2. **PRs must be MERGED**, not just closed
3. **Tags `v*` are created automatically** by Semantic Release
4. **Tags `prod/v*` are created manually** by developers
5. **Production deployment only happens** when `prod/v*` tags are created

## 🚨 Troubleshooting

### Common Issues

- **Semantic Release not detecting changes**: Verify commits follow conventions
- **Deploy not executing**: Check GitHub secrets configuration
- **Tag not created**: Ensure PR was merged (not just closed)
- **Permission errors**: Verify GITHUB_TOKEN permissions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes following conventional commits
4. Create a Pull Request
5. Wait for review and approval
6. Merge when approved

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions:
- Check the documentation files
- Review GitHub Actions logs
- Contact the development team

---

**Status**: 🔧 in development

The CI/CD pipeline is fully configured and ready to automate your deployment workflow! 🎯
