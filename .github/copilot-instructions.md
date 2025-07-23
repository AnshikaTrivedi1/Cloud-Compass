<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AWS Guide - Interactive Cloud Services Application

This is a Node.js web application that provides an interactive guide for cloud services across AWS, GCP, and Azure platforms.

## Project Structure
- **server.js**: Express.js server that serves the application and provides API endpoints
- **public/**: Contains static files (HTML, CSS, JavaScript)
- **data/**: Contains JSON data files with cloud service information
- **package.json**: Node.js project configuration

## Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: Vanilla HTML, CSS, and JavaScript
- **Styling**: Custom CSS with modern design patterns and animations
- **Data**: JSON-based service information

## Key Features
- Interactive cloud provider selection (AWS, GCP, Azure)
- Detailed service information with usage steps
- Real-world examples and use cases
- Responsive design with colorful, modern UI
- Modal-based service details
- Smooth animations and transitions

## Development Guidelines
- Use ES6+ JavaScript features
- Follow responsive design principles
- Maintain consistent color schemes for each cloud provider
- Ensure accessibility standards are met
- Keep API endpoints RESTful
- Add proper error handling for all user interactions

## API Endpoints
- `GET /`: Serves the main application
- `GET /api/services/:provider`: Returns service data for specified cloud provider (aws, gcp, azure)

## Cloud Provider Color Schemes
- **AWS**: Orange gradient (#ff9900 to #ff6600)
- **GCP**: Blue to green gradient (#4285f4 to #34a853)
- **Azure**: Blue gradient (#0078d4 to #00bcf2)
