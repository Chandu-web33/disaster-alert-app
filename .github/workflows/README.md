# 🚀 GitHub Actions Workflows

This directory contains automated CI/CD workflows for the Disaster Alert System.

## 📋 Available Workflows

### 1. **CI - Build and Test** (`ci.yml`)
**Trigger:** Push to master/main/develop, Pull Requests

**What it does:**
- ✅ Tests backend with Node.js versions 16, 18, 20
- ✅ Validates HTML/CSS files
- ✅ Checks JavaScript syntax
- ✅ Builds Docker images
- ✅ Runs code quality analysis with Super-Linter
- ✅ Provides build summary

**Status Badge:**
```markdown
![CI Status](https://github.com/Chandu-web33/disaster-alert-app/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

---

### 2. **Deploy to GitHub Pages** (`deploy.yml`)
**Trigger:** Push to master/main, Manual dispatch

**What it does:**
- 📦 Packages frontend files
- 🚀 Deploys to GitHub Pages
- 🌐 Makes your app accessible at: `https://chandu-web33.github.io/disaster-alert-app/`

**Status Badge:**
```markdown
![Deploy Status](https://github.com/Chandu-web33/disaster-alert-app/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

**To Enable:**
1. Go to Settings → Pages
2. Source: GitHub Actions
3. Your site will be live automatically!

---

### 3. **Security Scan** (`security-scan.yml`)
**Trigger:** Push, Pull Requests, Weekly schedule (Mondays)

**What it does:**
- 🔒 Scans dependencies with npm audit
- 🔍 CodeQL security analysis
- 🐳 Docker image vulnerability scanning with Trivy
- 🕵️ Secret detection with TruffleHog

**Status Badge:**
```markdown
![Security Status](https://github.com/Chandu-web33/disaster-alert-app/workflows/Security%20Scan/badge.svg)
```

---

### 4. **Docker Build and Push** (`docker-publish.yml`)
**Trigger:** Push to master/main, Tags (v*.*.*)

**What it does:**
- 🐳 Builds frontend and backend Docker images
- 📦 Pushes to GitHub Container Registry (ghcr.io)
- 🏷️ Tags images with version numbers
- 💾 Uses build cache for faster builds

**Status Badge:**
```markdown
![Docker Status](https://github.com/Chandu-web33/disaster-alert-app/workflows/Docker%20Build%20and%20Push/badge.svg)
```

**Pull Images:**
```bash
docker pull ghcr.io/chandu-web33/disaster-alert-app-frontend:latest
docker pull ghcr.io/chandu-web33/disaster-alert-app-backend:latest
```

---

### 5. **Auto Merge Dependabot** (`auto-merge.yml`)
**Trigger:** Dependabot Pull Requests

**What it does:**
- 🤖 Automatically merges patch version updates
- 💬 Comments on PRs
- ⚡ Speeds up dependency maintenance

---

## 🎯 How to Use

### View Workflow Runs
1. Go to **Actions** tab on GitHub
2. See all workflow runs and their status
3. Click on any run to see detailed logs

### Manual Deployment
1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages**
3. Click **Run workflow**
4. Choose branch and click **Run**

### Add Status Badges to README
Add these to your main README.md:

```markdown
## 📊 Build Status

![CI](https://github.com/Chandu-web33/disaster-alert-app/workflows/CI%20-%20Build%20and%20Test/badge.svg)
![Deploy](https://github.com/Chandu-web33/disaster-alert-app/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
![Security](https://github.com/Chandu-web33/disaster-alert-app/workflows/Security%20Scan/badge.svg)
![Docker](https://github.com/Chandu-web33/disaster-alert-app/workflows/Docker%20Build%20and%20Push/badge.svg)
```

---

## 🔧 Configuration

### Secrets Required
No secrets required for basic workflows!

**Optional (for advanced features):**
- `DOCKER_USERNAME` - DockerHub username
- `DOCKER_TOKEN` - DockerHub access token
- `DEPLOY_KEY` - For custom deployments

### Enable Dependabot
Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/backend"
    schedule:
      interval: "weekly"
```

---

## 📈 Monitoring

### Check Build Health
- **Green checkmark (✅):** Build passed
- **Red X (❌):** Build failed
- **Yellow dot (🟡):** Build in progress

### Email Notifications
GitHub automatically emails you when:
- Workflows fail
- Security vulnerabilities are found
- Dependabot creates PRs

---

## 🎨 Customization

### Modify CI Tests
Edit `ci.yml` to add your own tests:

```yaml
- name: Run custom tests
  run: |
    npm test
    npm run e2e-test
```

### Change Deployment Branch
Edit `deploy.yml`:

```yaml
on:
  push:
    branches: [ production ]  # Change this
```

### Add More Node Versions
Edit `ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x, 20.x, 21.x]  # Add more
```

---

## 🚨 Troubleshooting

### Workflow Failed?
1. Click on the failed workflow
2. Expand the failed step
3. Read the error message
4. Fix the issue and push again

### Pages Not Deploying?
1. Check Settings → Pages
2. Ensure source is "GitHub Actions"
3. Check workflow logs for errors

### Docker Push Failed?
1. Ensure packages permission is enabled
2. Check if image name is correct
3. Verify GITHUB_TOKEN has write access

---

## 📚 Learn More

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Pages](https://docs.github.com/en/pages)
- [Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

---

## ✨ Features

- ⚡ **Fast**: Uses caching for quicker builds
- 🔒 **Secure**: Automated security scanning
- 🤖 **Automated**: No manual intervention needed
- 📊 **Monitored**: Status badges and notifications
- 🚀 **Production Ready**: Docker images and deployments

---

Made with ❤️ for automated DevOps workflows!
