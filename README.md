# Marketplace JSON Editor App

[![TypeScript](https://img.shields.io/badge/TypeScript-4.5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)

A powerful and user-friendly JSON editor application designed for Contentstack's marketplace. This app provides an enhanced JSON editing experience with support for both object and stringified JSON formats, making it ideal for adding JSON data.

## 🚀 Features

- **Advanced JSON Editor**: Built with `jsoneditor-react` for a rich editing experience
- **Multiple View Modes**: Support for code, form, text, tree, and view modes
- **Flexible Data Format**: Choose between JSON object and stringified JSON formats
- **Contentstack Integration**: Seamless integration with Contentstack App SDK
- **Error Tracking**: Built-in error tracking and analytics
- **Responsive Design**: Modern UI with Venus design system
- **TypeScript Support**: Full TypeScript implementation for better development experience
- **Comprehensive Testing**: Unit tests with Jest and E2E tests with Playwright

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Contentstack account and stack

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/marketplace-jsoneditor-app.git
   cd marketplace-jsoneditor-app
   ```

2. **Install dependencies**
   ```bash
   cd ui
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the `ui` directory:
   ```bash
   cp .env.example .env
   ```
   
   Add your Contentstack configuration:
   ```env
   ENV_URL=https://your-contentstack-instance.com
   STACK_UID=your-stack-uid
   APP_HOST_URL=http://localhost:3000
   ```

## 🚀 Usage

### Development Mode

```bash
cd ui
npm start
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
cd ui
npm run build
```

### Configuration Screen

The app provides a configuration screen where you can set:

- **Data Format**: Choose between JSON Object and JSON Stringified formats
- **Help Tooltips**: Interactive help system for better user guidance

### Custom Field Usage

The JSON editor can be used as a custom field in Contentstack entries:

1. Navigate to your content type
2. Add the JSON Editor custom field
3. Configure the data format in the app configuration
4. Start editing JSON data with the rich editor interface

## ⚙️ Configuration

### App Configuration

The app supports the following configuration options:

| Option | Type | Description |
|--------|------|-------------|
| `isStringified` | boolean | Controls whether data is saved as stringified JSON or object |

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ENV_URL` | Contentstack environment URL | Yes |
| `STACK_UID` | Your Contentstack stack UID | Yes |
| `APP_HOST_URL` | App host URL for testing | Yes |

## 🧪 Testing

### Unit Tests

Run unit tests with Jest:

```bash
cd ui
npm test
```

### E2E Tests

Run end-to-end tests with Playwright:

```bash
# Run all browsers
npm run test:chrome
npm run test:firefox
npm run test:safari

# Run with headed mode (visible browser)
npm run test:chrome-headed
npm run test:firefox-headed
npm run test:safari-headed
```

### Test Coverage

Generate coverage report:

```bash
npm test -- --coverage
```

## 🏗️ Development

### Project Structure

```
ui/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── jsoneditor/     # JSON editor component
│   │   ├── ErrorBoundary/  # Error boundary component
│   │   └── venus-help/     # Help icon component
│   ├── containers/         # Main app containers
│   │   ├── App/           # Main app component
│   │   ├── ConfigScreen/  # Configuration screen
│   │   └── CustomField/   # Custom field implementation
│   ├── common/            # Shared utilities and types
│   │   ├── constants/     # App constants
│   │   ├── locale/        # Internationalization
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── hooks/             # Custom React hooks
│   └── index.tsx          # App entry point
├── tests/                 # Test files
│   ├── e2e/              # End-to-end tests
│   └── pages/            # Page object models
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

### Key Components

#### JSONEditor Component
- **Location**: `src/components/jsoneditor/index.tsx`
- **Purpose**: Main JSON editing interface
- **Features**: Multiple view modes, syntax highlighting, validation

#### ConfigScreen Component
- **Location**: `src/containers/ConfigScreen/index.tsx`
- **Purpose**: App configuration interface
- **Features**: Data format selection, help tooltips

#### CustomField Component
- **Location**: `src/containers/CustomField/index.tsx`
- **Purpose**: Contentstack custom field implementation
- **Features**: SDK integration, data persistence

### Code Quality

#### Linting

```bash
# Fix linting issues
npm run lint:fix

# Pre-commit hook
npm run precommit
```

### Build Process

The app uses `react-app-rewired` for custom build configuration:

- **Babel Configuration**: Custom Babel setup for modern JavaScript features
- **Webpack Overrides**: Custom webpack configuration for JSON editor
- **TypeScript Support**: Full TypeScript compilation

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   npm run test:chrome
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style Guidelines

- Follow TypeScript best practices
- Use functional components with hooks
- Write comprehensive tests
- Follow the existing code structure
- Use meaningful commit messages

### Testing Requirements

- Unit tests for all new components
- E2E tests for user workflows
- Maintain test coverage above 80%



## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm run test:chrome` | Run E2E tests in Chrome |
| `npm run lint:fix` | Fix linting issues |

## 🐛 Troubleshooting

### Common Issues

1. **App SDK Initialization Error**
   - Ensure Contentstack credentials are correct
   - Check network connectivity
   - Verify app location configuration

2. **JSON Editor Not Loading**
   - Clear browser cache
   - Check for JavaScript errors in console
   - Verify JSON editor dependencies

3. **Test Failures**
   - Ensure all dependencies are installed
   - Check environment variables
   - Verify test data setup

### Debug Mode

Enable debug logging:

```bash
DEBUG=* npm start
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Contentstack](https://www.contentstack.com/) for the App SDK
- [JSONEditor](https://github.com/josdejong/jsoneditor) for the JSON editing capabilities
- [React](https://reactjs.org/) for the UI framework
- [Playwright](https://playwright.dev/) for E2E testing

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-org/marketplace-jsoneditor-app/issues)
- **Documentation**: [Wiki](https://github.com/your-org/marketplace-jsoneditor-app/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/marketplace-jsoneditor-app/discussions)

---

**Made with ❤️ for the Contentstack community**
