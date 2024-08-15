Here's the updated README with the addition of the option to export to EPUB format:

```markdown
# Self-Help Manuscript Editor

An Electron-based application designed to streamline the creation and editing of self-help book manuscripts with the power of AI. Utilizing GPT-4, this tool offers content suggestions and large-scale text generation to enhance the writing process, making it both efficient and creatively enriching.

## Key Features

- **Rich Text Editor**: A seamless writing experience powered by Quill.js.
- **AI-Powered Content Suggestions**: Leverage GPT-4 for intelligent content recommendations.
- **High-Volume Content Generation**: Generate up to 60,000 words with AI assistance.
- **Grammar and Style Checks**: Ensure your manuscript is polished and professional.
- **File Management**: Create, open, save, and export manuscripts in PDF, DOCX, and EPUB formats.
- **Customizable AI Behavior**: Tailor AI responses to specific self-help topics and writing styles.
- **Incremental Saving**: Automatically save generated content to prevent data loss.

## Getting Started

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/self-help-manuscript-editor.git
   cd self-help-manuscript-editor
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory with your OpenAI API key:
   ```bash
   OPENAI_API_KEY=your_api_key_here
   ```

   **Important**: Ensure that your `.env` file is not included in version control for security reasons.

### Running the Application

To launch the application, execute:
```bash
npm start
```

### Packaging for Distribution

- **Windows**: 
  ```bash
  npm run package-win
  ```

- **macOS**: 
  ```bash
  npm run package-mac
  ```

## Usage Instructions

1. **Create a New Manuscript**: Navigate to "File" > "New" to begin a new project.
2. **Open an Existing Manuscript**: Use "File" > "Open" to load a manuscript.
3. **Save Your Work**: Select "File" > "Save" or press Ctrl+S (Cmd+S on Mac).
4. **Export to PDF/DOCX/EPUB**: Choose "File" > "Export" and select the desired format (PDF, DOCX, or EPUB).
5. **AI Suggestions**: Highlight text and click "Get AI Suggestions" for contextual content ideas.
6. **Generate Content**: Utilize the "Generate Content" feature for AI-driven manuscript development.
7. **Grammar and Style Check**: Click "Check Grammar and Style" to refine your writing.

## Important Notes

- **Content Generation**: Generating large volumes of text (up to 60,000 words) may take time. The progress tracking system will help you monitor the process.
- **AI Customization**: Adjust AI behavior in the settings menu to suit specific self-help themes or styles.
- **Auto-Save**: The application supports auto-saving, but regular manual saving is also recommended to ensure your work is preserved.
- **Performance**: To maintain optimal performance, avoid generating excessively large amounts of text in one go.

## Troubleshooting

If you encounter issues:

1. Verify that your OpenAI API key is correctly configured in the `.env` file.
2. Ensure a stable internet connection, as AI features require online access.
3. Restart the application to resolve any unexpected behavior.
4. If problems persist, please open an issue on the GitHub repository.

## Contributing

We welcome contributions! Please submit your Pull Requests to the repository.

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
```

This revision includes the ability to export manuscripts in EPUB format, ensuring that the application supports a wider range of file formats commonly used in publishing.
