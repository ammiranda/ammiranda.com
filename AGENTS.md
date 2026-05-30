# AGENTS.md - Agentic Coding Guidelines for ammiranda.com

## Project Overview
- **Type**: Hugo static site (personal blog/portfolio)
- **Theme**: hugo-coder (git submodule)
- **Language**: Markdown content, TOML config, HTML/CSS/JS assets
- **Hugo Version**: 0.148.2 (as used in CI)

## Directory Structure
```
/Users/alexandermichaelmiranda/projects/ammiranda.com/
├── .github/workflows/   # CI/CD pipelines
│   ├── build.yml        # Hugo build workflow
│   └── deploy.yml       # Deployment workflow
├── content/
│   ├── posts/           # Blog posts (Markdown)
│   │   ├── post-1.md
│   │   └── post-2.md
│   ├── about.md         # About page
│   └── contact.md       # Contact page
├── layouts/             # Custom layouts (empty - uses theme)
├── static/
│   ├── css/             # Custom CSS
│   ├── images/          # Images and assets
│   ├── webfonts/        # Font files
│   ├── resume.pdf       # Resume
│   └── pgp.txt          # PGP public key
├── themes/hugo-coder/   # Theme submodule
├── config.toml          # Site configuration
├── .eslintrc.json       # ESLint config
├── .stylelintrc         # Stylelint config
├── .prettierrc         # Prettier config
└── public/              # Build output (generated)
```

## Build Commands

### Local Development
```bash
hugo server -D    # Start dev server with draft content
hugo server       # Start dev server (drafts hidden)
hugo build        # Build for production (outputs to ./public)
```

### CI/CD (GitHub Actions)
- **Build**: Uses `lowply/build-hugo@v0.148.2` in `.github/workflows/build.yml`
- **Deploy**: See `.github/workflows/deploy.yml`

## Testing
- There are no automated tests in this project
- Manual testing via `hugo server` to preview changes

## Linting Commands

### JavaScript (ESLint)
```bash
eslint .           # Lint all JavaScript files
```
- Config: `.eslintrc.json`
- Extends: `gatsby-standard`
- Note: The `no-unsafe-finally` rule is disabled

### CSS (Stylelint)
```bash
stylelint "**/*.css"   # Lint all CSS files
```
- Config: `.stylelintrc`
- Extends: stylelint-config-standard, stylelint-config-prettier, stylelint-config-styled-components

### Prettier (Formatting)
```bash
prettier --check .    # Check formatting
prettier --write .    # Format files
```
- Config: `.prettierrc`
- Options: no semicolons, single quotes, trailing commas (es5)

### Running All Linters
```bash
eslint . && stylelint "**/*.css" && prettier --check .
```

## Code Style Guidelines

### Markdown Content (Blog Posts)
- Frontmatter required fields:
  ```yaml
  title: "Post Title"
  date: "2024-01-15"
  slug: "post-slug"
  tags: ["tag1", "tag2"]
  categories: ["category1"]
  draft: false  # or true for drafts
  ```
- Date format: `2006-01-02` (Hugo standard, e.g., "2024-01-15")
- Use fenced code blocks with language identifier for syntax highlighting
- Internal links: relative paths (e.g., `/posts/my-post/`)
- External links: full URLs (e.g., `https://example.com`)
- Code block example:
  ```javascript
  const greeting = 'Hello, World!'
  console.log(greeting)
  ```

### Markdown Content (Pages)
- Single pages in `/content/` (about.md, contact.md)
- Same frontmatter format as posts but no tags/categories needed

### Configuration (config.toml)
- 2-space indentation for TOML
- Do not modify `[params.csp]` without understanding security implications
- CSP currently allows:
  - connectsrc: self, google-analytics
  - fontsrc: self, fonts.gstatic.com, cdn.jsdelivr.net
  - stylesrc: self, fonts.googleapis.com, cdn.jsdelivr.net
  - scriptsrc: self, google-analytics

### CSS
- Located in `static/css/`
- Two main files: `all.css` (Font Awesome), `syntax.css` (code highlighting)
- Follow Prettier formatting rules (singleQuote, no semicolons, trailing commas)
- Do not modify theme CSS directly; use custom CSS files if needed

### JavaScript
- Place in `static/js/` if adding new scripts
- Follow ESLint rules from `.eslintrc.json`
- Use ES6+ features appropriately
- No framework - vanilla JavaScript only

## Error Handling
- Hugo templates: always use `{{ with }}` and `{{ if }}` to check for missing data
- Check build output for warnings about missing assets or taxonomy terms
- Verify taxonomies (tags, categories) are defined in content

## Git Workflow
- Commit messages: clear, descriptive, reference issues if applicable
- Branch naming: descriptive (e.g., `add-new-post`, `fix-css-issue`)
- Submodules: theme is a git submodule
  - Update with: `git submodule update --remote`
  - Commit submodule changes separately

## Agent Instructions
- Do NOT modify `public/` directory (generated, not version controlled)
- Do NOT modify theme files directly in `themes/hugo-coder/`
  - Override via layouts or params instead
  - Create custom layouts in `/layouts/` if needed
- Test build with `hugo build` before committing changes
- Verify external links work (especially in config.toml)
- Respect `.gitignore`: do not commit env files, logs, or build output
- Run linting before committing: `eslint . && stylelint "**/*.css" && prettier --check .`

## Important Notes
- This is a personal blog/portfolio - prioritize readability and maintainability
- No tests exist - manual verification required
- Theme is loaded from submodule - updates may be needed periodically
- Build is handled by GitHub Actions - local testing mirrors CI behavior