# Boolokam - News, Videos, and Movies Platform

This is a Hugo-based website for Boolokam, a platform that hosts news, videos, and movies content.

## Features

- Responsive design with a clean, modern interface
- Categorized content for news, videos, and movies
- Section-specific layouts and templates
- Global elements including sidebar and navigation bar

## Directory Structure

The site follows a standard Hugo directory structure:

```
Boolokam/
  ├── archetypes/       # Content templates
  ├── assets/           # Unprocessed assets (optional)
  ├── content/          # All content pages
  │   ├── news/         # News articles
  │   ├── videos/       # Video content
  │   └── movies/       # Movie content
  ├── data/             # Site data files
  ├── layouts/          # Templates for rendering content
  │   ├── _default/     # Default templates
  │   ├── news/         # News-specific templates
  │   ├── videos/       # Video-specific templates
  │   ├── movies/       # Movie-specific templates
  │   └── partials/     # Reusable template parts
  ├── static/           # Static files
  │   ├── css/          # CSS files
  │   ├── js/           # JavaScript files
  │   └── images/       # Image files
  └── hugo.toml         # Site configuration
```

## Getting Started

### Prerequisites

- Hugo Extended version (0.80.0 or newer recommended)
- Git (optional, for version control)

### Installation

1. Clone this repository (or download as a ZIP file):
   ```
   git clone https://github.com/yourusername/boolokam.git
   ```

2. Navigate to the project directory:
   ```
   cd boolokam
   ```

3. Start the Hugo development server:
   ```
   hugo server -D
   ```

4. Visit `http://localhost:1313` in your web browser to see the site.

### Adding Content

Content is organized in sections under the `content/` directory:

- For news articles: `content/news/`
- For videos: `content/videos/`
- For movies: `content/movies/`

Each content file should use the appropriate front matter parameters as shown in the examples.

## Deployment

To build the site for production:

```
hugo --minify
```

This will generate a `public/` directory with the compiled site ready for deployment.

## Customization

- Edit `layouts/` to modify the site's templates
- Edit `static/css/main.css` to change the styling
- Modify `hugo.toml` to update site configuration

## License

[MIT License](LICENSE) 