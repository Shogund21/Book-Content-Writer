# Self-Help Manuscript Editor

This is an Electron-based application for creating and editing self-help book manuscripts with AI assistance.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

## Environment Variables

This application uses environment variables to securely store sensitive information. Before running the application, make sure to set up your environment variables:

1. Create a file named `.env` in the root directory of the project.
2. Add your OpenAI API key to the `.env` file:

   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Make sure to replace `your_api_key_here` with your actual OpenAI API key.

**Important:** Never commit your `.env` file to version control. It's already included in the `.gitignore` file, but always double-check to ensure your API key remains secure.

## Running the application

To start the application, run:

```
npm start
```

## Packaging the application

To package the application for Windows:

```
npm run package-win
```

To package the application for macOS:

```
npm run package-mac
```

## Features

- Rich text editor using Quill.js
- AI-powered content suggestions using GPT-4
- AI-powered content generation (up to 60,000 words)
- Grammar and style checking
- File management (create, open, save, export to PDF and DOCX)

## Additional Considerations

1. Ensure that the OpenAI API key is kept secure and not shared or committed to version control.
2. The content generation process for large amounts of text (up to 60,000 words) may take a significant amount of time. Consider implementing a more robust progress tracking system and allowing users to cancel or pause the generation process.
3. Implement proper error handling for API calls and file operations to provide a smooth user experience.
4. Consider adding a feature to save generated content incrementally to prevent data loss in case of application crashes or errors during the generation process.
5. Implement proper testing for all features, especially focusing on handling large documents and long-running API calls.
6. Consider adding a feature to customize AI behavior or fine-tune it for specific self-help topics or writing styles.