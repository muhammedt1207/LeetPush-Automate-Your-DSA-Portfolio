# LeetCode Solution Uploader with GitHub Integration

![LeetCode Solution Uploader Banner](https://via.placeholder.com/1200x300/0a0c10/ffffff?text=LeetCode+Solution+Uploader)

## 📋 Overview

LeetCode Solution Uploader is a full-stack application that simplifies the process of documenting and storing your LeetCode solutions. The application automatically organizes your solutions, creates structured documentation, and pushes them to your GitHub repository—all through an intuitive, multi-language interface.

## ✨ Features

- **📝 Solution Management**: Upload, organize, and view your LeetCode solutions
- **🔄 GitHub Integration**: Automatic commits and pushes to your repository
- **📂 Structured Organization**: Automated creation of folders and files in a standardized format
- **📱 Responsive UI**: Built with Next.js and Tailwind CSS for a seamless experience across devices
- **🌐 Multi-language Support**: Interface available in multiple languages
- **🔠 Multiple Programming Languages**: Support for JavaScript, TypeScript, Python, Java, and more
- **🔍 Search & Filter**: Find solutions by question number, title, difficulty, or tags

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express**: Core server framework
- **Git CLI Integration**: For repository operations
- **RESTful API**: For communication between frontend and backend

### Frontend
- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework
- **i18next**: Internationalization framework for multi-language support
- **SWR**: For data fetching and caching
- **React Hook Form**: For form validation

## 🏗️ System Architecture

The application follows a client-server architecture:

1. **Frontend (Next.js)**: 
   - User interface for submitting solutions
   - Solution browser and viewer
   - Language selection and preferences

2. **Backend (Node.js/Express)**:
   - Solution processing and validation
   - File/folder generation
   - GitHub repository integration
   - Authentication and authorization

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Git installed and configured
- GitHub account with personal access token
- LeetCode account (optional, for fetching problem details)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/leetcode-solution-uploader.git
cd leetcode-solution-uploader

# Install dependencies for both backend and frontend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your GitHub token and other configuration

# Start the development server
npm run dev
```

### Configuration

Create a `.env` file in the project root with the following variables:

```
# GitHub Configuration
GITHUB_TOKEN=your_personal_access_token
GITHUB_USERNAME=your_github_username
GITHUB_REPO=your_leetcode_repo_name

# Server Configuration
PORT=3000
NODE_ENV=development

# Optional LeetCode API Configuration (if using)
LEETCODE_SESSION=your_leetcode_session_cookie
```

## 💻 Usage

1. Access the application through your browser at `http://localhost:3000`
2. Select your preferred language from the language dropdown
3. Enter LeetCode problem details:
   - Question number
   - Question title
   - Problem description
   - Your solution code
   - Any notes or explanations
4. Submit the form to upload your solution
5. The application will automatically:
   - Create a structured folder (`{questionNo}.{questionTitle}`)
   - Generate README.md with problem details and your notes
   - Add your solution in the appropriate file format
   - Commit and push to your GitHub repository



To add a new language, create a new translation file in the `public/locales/` directory.


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- LeetCode API integration for auto-fetching problem details
- Support for code execution and testing
- User authentication and profiles
- Performance metrics and solution comparisons
- Collaborative features for team learning
- Code snippet sharing and social features

---

Made with ❤️ by Muhammed T
