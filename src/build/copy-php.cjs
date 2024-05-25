const fs = require('fs');
const path = require('path');

const copyFolderRecursiveSync = (source, target) => {
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    fs.readdirSync(source).forEach(file => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        fs.copyFileSync(curSource, path.join(targetFolder, file));
      }
    });
  }
};

const copyFiles = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (!fs.existsSync(source)) {
    console.error(`Source directory "${source}" does not exist.`);
    return;
  }

  fs.readdirSync(source).forEach(file => {
    const curSource = path.join(source, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, target);
    } else {
      fs.copyFileSync(curSource, path.join(target, file));
    }
  });
};

// Copy PHP files
const phpSource = path.join(__dirname, '../../src/php');
const phpTarget = path.join(__dirname, '../../dist');

copyFiles(phpSource, phpTarget);

console.log('PHP files copied successfully.');
