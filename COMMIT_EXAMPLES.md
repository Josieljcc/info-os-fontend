# Conventional Commit Examples

This guide provides practical examples of conventional commit messages for this project.

## 🎯 Commit Types

### `feat` - New Features
```bash
feat: add user authentication system
feat: implement dark mode toggle
feat: add search functionality with filters
feat: create dashboard analytics widget
feat: add multi-language support
```

### `fix` - Bug Fixes
```bash
fix: resolve login form validation error
fix: correct API endpoint URL
fix: fix memory leak in component
fix: resolve navigation menu alignment
fix: correct date formatting in table
```

### `docs` - Documentation
```bash
docs: update README with installation steps
docs: add API documentation
docs: update component usage examples
docs: add troubleshooting guide
docs: update deployment instructions
```

### `style` - Code Formatting
```bash
style: format code according to prettier rules
style: fix indentation in components
style: standardize import ordering
style: fix line length issues
style: apply consistent spacing
```

### `refactor` - Code Refactoring
```bash
refactor: extract reusable hook from component
refactor: simplify authentication logic
refactor: optimize database queries
refactor: restructure component hierarchy
refactor: improve error handling
```

### `perf` - Performance Improvements
```bash
perf: optimize image loading with lazy loading
perf: reduce bundle size by tree shaking
perf: implement virtual scrolling for large lists
perf: add caching for API responses
perf: optimize re-renders with useMemo
```

### `test` - Testing
```bash
test: add unit tests for authentication
test: create integration tests for API
test: add component testing with React Testing Library
test: implement E2E tests for critical flows
test: add test coverage reporting
```

### `chore` - Maintenance Tasks
```bash
chore: update dependencies to latest versions
chore: configure build optimization
chore: set up CI/CD pipeline
chore: add development tools configuration
chore: update project structure
```

### `ci` - CI/CD Changes
```bash
ci: add automated testing workflow
ci: configure deployment automation
ci: add code quality checks
ci: set up staging environment
ci: configure production deployment
```

### `build` - Build System
```bash
build: optimize webpack configuration
build: add environment-specific builds
build: configure code splitting
build: optimize asset compression
build: add build performance monitoring
```

## 🚨 Breaking Changes

### Using `!` in Type
```bash
feat!: remove deprecated API endpoints
fix!: change authentication method signature
refactor!: restructure component props interface
```

### Using `BREAKING CHANGE` in Body
```bash
feat: update user authentication system

BREAKING CHANGE: The login API now requires additional parameters and returns a different response format.
```

## 📝 Complete Examples

### Feature with Breaking Change
```bash
feat!: implement new authentication system

- Replace JWT with OAuth 2.0
- Add multi-factor authentication
- Support social login providers

BREAKING CHANGE: The login method signature has changed. Update your authentication calls accordingly.

Closes #123
```

### Bug Fix with Issue Reference
```bash
fix: resolve memory leak in data table component

The component was not properly cleaning up event listeners and timers, causing memory leaks during navigation.

Fixes #456
```

### Documentation Update
```bash
docs: add comprehensive API documentation

- Add endpoint descriptions
- Include request/response examples
- Add authentication requirements
- Document error codes

Closes #789
```

## 🔧 Using Commitizen

### Interactive Mode
```bash
npm run commit
```

### Command Line Mode
```bash
git cz -m "feat: add new feature"
```

## 📋 Commit Message Structure

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Examples with Scope
```bash
feat(auth): add OAuth 2.0 support
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
refactor(utils): optimize date formatting functions
```

## ⚠️ Important Notes

1. **Always use conventional commits** - this enables automated versioning
2. **Be descriptive** - explain what and why, not how
3. **Reference issues** - use `Closes #123` or `Fixes #456`
4. **Use present tense** - "add" not "added"
5. **Keep it concise** - description should be under 50 characters

## 🎯 Best Practices

- **Start with lowercase** - `feat:` not `Feat:`
- **No period at end** - `feat: add feature` not `feat: add feature.`
- **Use imperative mood** - "add", "fix", "update"
- **Be specific** - `fix: resolve login validation` not `fix: fix bug`
- **Group related changes** - one commit per logical change

## 🚀 Examples for Common Scenarios

### Adding New Component
```bash
feat: add user profile component

- Create ProfileCard component
- Add profile editing functionality
- Implement avatar upload
- Add form validation

Closes #234
```

### Fixing Production Bug
```bash
fix: resolve API timeout in production

The API was timing out due to incorrect timeout configuration in production environment.

Fixes #567
```

### Updating Dependencies
```bash
chore: update React to version 18.3.1

- Update React and React-DOM
- Update related dependencies
- Test compatibility
- Update build configuration

Closes #890
```

## 🔍 Validation

Your commits will be validated by:
- **Commitizen** - during commit creation
- **Semantic Release** - during version analysis
- **ESLint** - for code quality
- **GitHub Actions** - for CI/CD pipeline

## 📚 Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Commitizen Documentation](https://github.com/commitizen/cz-cli)
- [Semantic Release Documentation](https://semantic-release.gitbook.io/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format)
