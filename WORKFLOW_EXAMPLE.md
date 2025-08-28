# New Workflow Example

This file demonstrates how the new automated release system based on Pull Requests works.

## 🔄 Complete Workflow

### 1. Development
```bash
# Create a new branch for your feature
git checkout -b feature/new-functionality

# Make your changes
# ... code ...

# Add the changes
git add .

# Make commit using the assistant
npm run commit
# Select: feat
# Description: add notification system
# Body: implement real-time notifications
# Breaking change: N
# Issues: #123

# Push the branch
git push origin feature/new-functionality
```

### 2. Pull Request
1. Go to GitHub and create a Pull Request
2. Title: "feat: add notification system"
3. Base: `master`
4. Compare: `feature/new-functionality`

### 3. Code Review
- Ask someone to review your code
- Make necessary corrections
- Push corrections if needed

### 4. Merge PR
- When approved, merge the PR to `master`
- **IMPORTANT**: The PR must be MERGED, not just closed

## 🚀 What happens automatically

### After merging the PR:

1. **Staging Deployment** (`.github/workflows/main.yml`)
   - Executes automatically
   - Deploys the application to staging environment
   - For testing and validation

2. **Automatic Release** (`.github/workflows/release.yml`)
   - Semantic Release analyzes commits
   - Determines new version based on conventions
   - Automatically creates a tag in the format `v*`
   - Example: `v1.2.0`

## 🎯 Production Deployment (Manual)

### When you want to deploy to production:
```bash
# Create a tag in the format prod/v*
git tag prod/v1.2.0
git push origin prod/v1.2.0
```

### What happens:
3. **Production Deployment** (`.github/workflows/production-deploy.yml`)
   - Executes when the `prod/v*` tag is created
   - Automatic deployment to production
   - Application becomes available to end users

## 📋 Complete Practical Example

### Scenario: Add email validation

```bash
# 1. Create branch
git checkout -b feature/email-validation

# 2. Make changes
# - Add validation to form
# - Create tests
# - Update documentation

# 3. Conventional commit
npm run commit
# Type: fix
# Description: add email validation
# Body: implement validation using regex for email format
# Breaking change: N
# Issues: #456

# 4. Push branch
git push origin feature/email-validation

# 5. Create Pull Request on GitHub
# Title: "fix: add email validation"
# Base: master
# Compare: feature/email-validation

# 6. Code Review and approval

# 7. Merge PR
```

### Automatic result:

1. **Staging**: Automatic deployment for testing
2. **Tag created**: `v1.0.1` (patch version for being a fix)

### For production deployment (when you want):

```bash
# Create the production tag
git tag prod/v1.0.1
git push origin prod/v1.0.1
```

3. **Production**: Automatic deployment to production

## 🎯 Commit Types and Versions

### Patch (1.0.0 → 1.0.1)
```bash
fix: fix bug
docs: update documentation
style: formatting
refactor: refactoring
perf: performance
test: tests
chore: maintenance
```

### Minor (1.0.0 → 1.1.0)
```bash
feat: new functionality
```

### Major (1.0.0 → 2.0.0)
```bash
feat!: breaking change
BREAKING CHANGE: description
```

## 🔍 Monitoring

### Check workflow status:
1. Go to the "Actions" tab on GitHub
2. Check executed workflows:
   - `Deploy to Staging (Master Branch)`
   - `Auto Release on PR Merge`
   - `Deploy to Production (Manual Release)`

### Check created tags:
```bash
# Automatic tags
git tag --list "v*"

# Production tags (manual)
git tag --list "prod/v*"

# See details
git show v1.0.0
git show prod/v1.0.0
```

### Check deployments:
- Staging: Application available in test environment
- Production: Application available to end users

## ⚠️ Important Points

1. **Always use conventional commits** with `npm run commit`
2. **PRs must be MERGED**, not just closed
3. **Tags `v*` are created automatically** by Semantic Release
4. **Tags `prod/v*` are created manually** by developers when they want to deploy
5. **Production deployment only happens** when `prod/v*` tag is created
6. **Staging is updated** on every push to `master`

## 🚨 Troubleshooting

### Tag `v*` was not created:
- Verify if the PR was MERGED (not closed)
- Verify if commits follow conventions
- Check release workflow logs

### Production deployment did not execute:
- Verify if the `prod/v*` tag was manually created
- Check production workflow logs
- Verify if secrets are configured

### Staging deployment did not execute:
- Verify if the push was to `master`
- Check staging workflow logs
- Verify if secrets are configured

## 🎯 Deployment Control

- **Staging**: Always automatically updated
- **Production**: **Under total control of developers** - only deploys when `prod/v*` tag is created
- **Versions**: Automatically created for control and history
