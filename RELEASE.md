# Release and Deployment Guide

This project uses Semantic Release to automate versioning and application deployment.

## How It Works

### 1. Automatic Staging Deployment
- **When**: Whenever code is sent to the `master` branch
- **What happens**: Automatic deployment to staging for testing
- **Workflow**: `.github/workflows/main.yml`

### 2. Automatic Release
- **When**: Whenever a Pull Request is merged into the `master` branch
- **What happens**: 
  - Semantic Release analyzes commits and determines the new version
  - Automatically creates a tag in the format `v*` (e.g., `v1.0.0`)
- **Workflow**: `.github/workflows/release.yml`

### 3. Production Deployment
- **When**: Only when a tag in the format `prod/v*` is manually created
- **What happens**: Automatic deployment to production
- **Workflow**: `.github/workflows/production-deploy.yml`

## Commit Conventions

For Semantic Release to work correctly, use commits in the conventional format:

### Accepted Formats:
```
feat: add new functionality
fix: fix bug
docs: update documentation
style: code formatting
refactor: code refactoring
perf: performance improvement
test: add or fix tests
chore: maintenance tasks
ci: CI configuration changes
build: build changes
```

### Examples:
```bash
git commit -m "feat: add authentication system"
git commit -m "fix: fix validation error in form"
git commit -m "docs: update README with installation instructions"
git commit -m "BREAKING CHANGE: remove deprecated API"
```

### Using Commitizen (Recommended):
To facilitate the use of conventions, use commitizen:

```bash
npm run commit
```

This will open an interactive assistant that will guide you through the process of creating conventional commits.

## How to Make a Release

### Option 1: Automatic (Recommended)
1. Make commits following the conventions
2. Create a Pull Request to `master`
3. Merge the PR
4. Semantic Release will detect changes and automatically create a `v*` tag
5. **For production deployment**: Manually create a `prod/v*` tag

### Option 2: Manual Production Deployment
When you want to deploy to production, manually create a tag in the format `prod/v*`:
```bash
git tag prod/v1.0.0
git push origin prod/v1.0.0
```

## Available Workflows

- **`.github/workflows/main.yml`**: Staging deployment when code goes to master
- **`.github/workflows/release.yml`**: Automatic release when PR is merged to master (creates `v*` tag)
- **`.github/workflows/production-deploy.yml`**: Production deployment when `prod/v*` tag is manually created

## Configuration

Semantic Release is configured in `.releaserc.json` with:
- Angular preset for commit conventions
- Plugins for commit analysis and note generation
- Tag format `v${version}` (automatically created)

## Dependencies

The main dependencies are in `package.json`:
- `semantic-release` (version 22.0.7)
- `commitizen` to facilitate conventional commits
- `cz-conventional-changelog` for commitizen preset

## Available Scripts

```bash
npm run commit          # Open interactive assistant for conventional commits
npm run release         # Execute release
npm run release:dry-run # Simulate release without making changes
```

## Deployment Structure

- **Staging**: Automatic deployment on every push to `master`
- **Release**: Automatic creation of `v*` tag when PR is merged
- **Production**: Automatic deployment when `prod/v*` tag is manually created
- **Environments**: Uses separate `.env.staging` and `.env.production` files
- **Docker**: Uses `docker-compose-staging.yml` for staging and `docker-compose.yml` for production

## Recommended Workflow

1. **Development**: Work on a feature branch
2. **Commit**: Use `npm run commit` for conventional commits
3. **Pull Request**: Create a PR to `master`
4. **Merge**: Merge the PR to master
5. **Staging**: Automatic deployment to staging
6. **Release**: Semantic Release automatically creates `v*` tag
7. **Production**: **Manually create a `prod/v*` tag when you want to deploy**

## Tag Examples

### Automatic Tags (created by Semantic Release):
- `v1.0.0` - First version
- `v1.1.0` - New functionality
- `v1.0.1` - Bug fix
- `v2.0.0` - Breaking change

### Manual Tags (created by developers for production):
- `prod/v1.0.0` - Deploy version 1.0.0 to production
- `prod/v1.1.0` - Deploy version 1.1.0 to production
- `prod/v1.0.1` - Deploy version 1.0.1 to production

## Deployment Control

- **Staging**: Always automatically updated
- **Production**: **Under total control of developers** - only deploys when `prod/v*` tag is created
- **Versions**: Automatically created for control and history
