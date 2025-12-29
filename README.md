# Scrum Agreement Builder (Team Charter Generator)

A modern, interactive tool designed to help agile teams create, visualize, and export their working agreements and team charters. 

![Project Poster Preview](public/window.svg) 
*(Note: Replace with actual screenshot if available)*

## 🚀 Features

- **Interactive Wizard**: A step-by-step questionnaire to guide teams through essential topics:
  - Project Identity (Name, Mission)
  - Team Logistics (Sprint duration, Core hours, Tools)
  - Team Composition (Members & Stakeholders)
  - Meetings & Rituals
  - Team Rules (Code Review, Estimation)
- **Visual Poster Generator**: Automatically generates a beautiful, shareable Team Charter poster.
- **Multi-Format Export**:
  - **Markdown**: For GitHub/GitLab repositories.
  - **Jira**: Formatted specifically for Jira Wiki syntax.
  - **Slack**: Formatted for copy-pasting into Slack channels.
- **Customizable**: Flexible inputs for custom meetings and team structure.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/eggofPdM-gif/scrum-agreement-builder.git
   cd scrum-agreement-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/)
- **Styling**: CSS Modules / Global CSS (Glassmorphism design)

## 🤝 Usage

1. **Start the Wizard**: Click "Start Wizard" on the landing page.
2. **Answer Questions**: Fill in your team's details. You can skip optional fields.
3. **View Results**:
   - **Poster**: View and screenshot the generated Team Charter poster.
   - **Document**: Switch tabs to get the text version. Select "Markdown", "Jira", or "Slack" to copy the format you need.

## 📄 License

This project is open source.
