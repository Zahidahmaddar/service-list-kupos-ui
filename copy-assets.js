const fs = require('fs');
const path = require('path');

// Function to create directory recursively if it doesn't exist
function ensureDirectoryExistence(dirPath) {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  ensureDirectoryExistence(path.dirname(dirPath));
  fs.mkdirSync(dirPath);
}

// Function to copy a file
function copyFile(source, target) {
  const targetDir = path.dirname(target);
  ensureDirectoryExistence(targetDir);
  fs.copyFileSync(source, target);
}

// Function to copy a directory recursively
function copyDirectory(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Read directory contents
  const entries = fs.readdirSync(source, { withFileTypes: true });

  // Process each entry
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directory
      copyDirectory(sourcePath, targetPath);
    } else {
      // Copy file
      copyFile(sourcePath, targetPath);
    }
  }
}

// Copy assets from src to dist
console.log('Copying assets...');
copyDirectory(
  path.resolve(__dirname, './src/assets/images'),
  path.resolve(__dirname, './dist/assets/images')
);
console.log('Assets copied successfully!');
