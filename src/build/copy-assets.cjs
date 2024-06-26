const fs = require('fs');
const path = require('path');

function copyFileSync(source, target) {
    let targetFile = target;

    // If target is a directory, a new file with the same name will be created
    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
    let files = [];

    // Check if folder needs to be created or integrated
    const targetFolder = path.join(target, path.basename(source));
    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder);
    }

    // Copy
    if (fs.lstatSync(source).isDirectory()) {
        files = fs.readdirSync(source);
        files.forEach(file => {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, targetFolder);
            } else {
                copyFileSync(curSource, targetFolder);
            }
        });
    }
}

const assetsToCopy = [
    'index.php',
    'style.css',
    'screenshot.png',
    'footer.php',
    'assets',
    'templates'
];

assetsToCopy.forEach(item => {
    const srcPath = path.join(__dirname, '../../', item);
    const destPath = path.join(__dirname, '../../dist', item);
    if (fs.lstatSync(srcPath).isDirectory()) {
        copyFolderRecursiveSync(srcPath, path.join(__dirname, '../../dist'));
    } else {
        copyFileSync(srcPath, destPath);
    }
});
