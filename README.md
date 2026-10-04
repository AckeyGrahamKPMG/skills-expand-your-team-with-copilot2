# Mergington High School Activities

A modern web application for managing extracurricular activities at Mergington High School. Students can easily discover, view details about, and sign up for various activities offered by the school.

## Features

- 📋 **Browse Activities** - View all available extracurricular activities
- ✍️ **Sign Up** - Easy registration for activities using your student email
- 🔗 **Share** - Share activity details with friends
- ⚡ **Fast & Responsive** - Built with FastAPI for optimal performance

## Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AckeyGrahamKPMG/skills-expand-your-team-with-copilot2.git
   cd skills-expand-your-team-with-copilot2
   ```

2. Install dependencies:
   ```bash
   pip install -r src/requirements.txt
   ```

### Running the Application

1. Start the application:
   ```bash
   python -m uvicorn src.app:app --host 0.0.0.0 --port 8000
   ```

2. Open your browser and navigate to:
   - **Website**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

> [!IMPORTANT]
> All data is stored in memory and will reset when the server restarts.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/activities` | Get all activities with details and participant count |
| POST | `/activities/{activity_name}/signup?email=student@mergington.edu` | Sign up for an activity |

## Development

For detailed setup and development instructions, including debugging tips and development environment configuration, refer to our [Development Guide](docs/how-to-develop.md).

### Quick Development Setup

The project is best developed using GitHub Codespaces for a consistent development environment:

1. Open the repository in a GitHub Codespace
2. Wait for the container to finish building
3. Install dependencies: `pip install -r src/requirements.txt`
4. Use VS Code's Run and Debug view (Ctrl+Shift+D) to launch "Launch Mergington WebApp"

## Technologies

- **FastAPI** - Modern web framework for building APIs
- **Uvicorn** - ASGI server for running the application
- **Python** - Backend logic

---

<div align="center">

### 🎉 Congratulations AckeyGrahamKPMG! 🎉

<img src="https://octodex.github.com/images/welcometocat.png" height="150px" />

**You've successfully completed the "Expand your team with GitHub Copilot" exercise!** 🌟

#### Share Your Achievement

<a href="https://twitter.com/intent/tweet?text=I%20just%20completed%20the%20%22Expand%20your%20team%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2FAckeyGrahamKPMG%2Fskills-expand-your-team-with-copilot2%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20X-1da1f2?style=for-the-badge&logo=x&logoColor=white" alt="Share on X" />
</a>
<a href="https://bsky.app/intent/compose?text=I%20just%20completed%20the%20%22Expand%20your%20team%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2FAckeyGrahamKPMG%2Fskills-expand-your-team-with-copilot2%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20Bluesky-0085ff?style=for-the-badge&logo=bluesky&logoColor=white" alt="Share on Bluesky" />
</a>
<a href="https://www.linkedin.com/feed/?shareActive=true&text=I%20just%20completed%20the%20%22Expand%20your%20team%20with%20GitHub%20Copilot%22%20GitHub%20Skills%20hands-on%20exercise!%20%F0%9F%8E%89%0A%0Ahttps%3A%2F%2Fgithub.com%2FAckeyGrahamKPMG%2Fskills-expand-your-team-with-copilot2%0A%0A%23GitHubSkills%20%23OpenSource%20%23GitHubLearn" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/Share%20on%20LinkedIn-0077b5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Share on LinkedIn" />
</a>

#### What's Next?

[![](https://img.shields.io/badge/Return%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/AckeyGrahamKPMG/skills-expand-your-team-with-copilot2/issues/1)
[![GitHub Skills](https://img.shields.io/badge/Explore%20GitHub%20Skills-000000?style=for-the-badge&logo=github&logoColor=white)](https://learn.github.com/skills)

*There's no better way to learn than building things!* 🚀

</div>
