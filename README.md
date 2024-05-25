<h1>Ecosphere Theme</h1>

Overview
Welcome to the Ecosphere theme repository, an optimized and customized WordPress theme built on BootPress Lite. This project aims to provide a robust, flexible, and scalable solution for the Ecosphere project, leveraging modern web technologies and best practices in theme development.

Table of Contents
About Ecosphere
Features
Installation
Usage
Development Workflow
Optimization Strategies
Contributing
License
About Ecosphere
Ecosphere is a cutting-edge project focused on creating a sustainable and user-friendly digital environment. Our theme is designed to be lightweight, responsive, and highly customizable, ensuring it meets the diverse needs of our users.

Features
Built with BootPress Lite: Combines the power of Bootstrap 5 without the overhead of Underscores (_s).
Responsive Design: Mobile-first approach to ensure seamless user experience across all devices.
Custom Widgets: Special widgets including a birthday dashboard and add-to-cart functionalities.
Optimized Performance: Lazy loading, minified assets, and optimized images for faster load times.
Advanced Animations: Integrates GSAP for smooth animations and interactions.
Developer Friendly: Clean, modular code with extensive documentation.
3D Rendering: Utilizes Three.js for advanced 3D graphics and animations.
Installation
Prerequisites
WordPress 5.7 or higher
Node.js and npm
Composer
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/eboy79/ecosphere.git
cd ecosphere
Install dependencies:

bash
Copy code
npm install
composer install
Build assets:

bash
Copy code
npm run build
Activate the theme in your WordPress admin panel.

Usage
Customizing the Theme
Ecosphere theme is highly customizable via the WordPress Customizer. Navigate to Appearance > Customize to access various theme settings.

Adding Widgets
Utilize our custom widgets for enhanced functionality:

Birthday Dashboard Widget: Displays upcoming user birthdays in the admin dashboard.
Add-to-Cart Widget: Allows users to create an add-to-cart checkout link with selected products.
Development Workflow
Local Development
Start the development server:

bash
Copy code
npm run dev
Make changes to the code and see live updates in your development environment.

Code Quality
Linting: Ensure your code adheres to our coding standards.

bash
Copy code
npm run lint
Unit Tests: Run our suite of tests to ensure everything is functioning correctly.

bash
Copy code
npm run test
Build Scripts
The theme utilizes several build scripts to streamline development and production workflows, as defined in the package.json:

json
Copy code
{
  "scripts": {
    "build": "npm run build-css && npm run build-js",
    "build-css": "sass --load-path=node_modules src/scss/main.scss css/style.min.css --style compressed",
    "build-js": "rollup -c rollup.config.js",
    "dist": "npm run dist-css && npm run dist-js && npm run copy-assets && npm run copy-php",
    "dist-css": "sass --load-path=node_modules src/scss/main.scss dist/css/style.min.css --style compressed",
    "dist-js": "rollup -c rollup.config.dist.js",
    "watch": "npm-run-all --parallel watch-css watch-js",
    "watch-css": "sass --load-path=node_modules --watch src/scss/main.scss:css/style.min.css --style compressed",
    "watch-js": "rollup -c rollup.config.js --watch",
    "copy-assets": "node src/build/copy-assets.cjs",
    "copy-php": "node src/build/copy-php.cjs"
  }
}
Optimization Strategies
Lazy Loading
Implemented lazy loading for images and other assets to improve initial load times and reduce bandwidth usage.

Minified Assets
All CSS and JavaScript files are minified using Rollup and Terser to decrease file size and improve load performance.

Image Optimization
Utilize modern image formats like WebP and implement responsive image techniques to serve the appropriate image size based on the device.

Code Splitting
Implemented code splitting to load only the necessary JavaScript on each page, reducing the overall amount of JavaScript that needs to be downloaded and executed.

Advanced Animations
Using GSAP and Three.js for advanced animations and 3D graphics, providing an engaging user experience. Example integrations include smooth scrolling with Lenis and interactive 3D models.

Contributing
We welcome contributions from the community. Please read our Contributing Guide to get started.

License
Ecosphere is licensed under the MIT License. See the LICENSE file for more information.
