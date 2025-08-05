import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcssPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import { fileURLToPath } from 'url';

// Get the current filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the CSS file with Tailwind directives
const css = fs.readFileSync(path.resolve(__dirname, './src/styles.css'), 'utf8');

// Process the CSS with Tailwind and autoprefixer
postcss([
  tailwindcssPlugin('./tailwind.config.js'),
  autoprefixer,
])
  .process(css, { from: './src/styles.css', to: './dist/styles.css' })
  .then((result) => {
    // Create the dist directory if it doesn't exist
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }
    
    // Write the processed CSS to the output file
    fs.writeFileSync('./dist/styles.css', result.css);
    console.log('CSS built successfully!');
  })
  .catch((error) => {
    console.error('Error building CSS:', error);
  });
