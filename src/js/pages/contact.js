window.onload = function() {
    const bodyClass = document.body.className;

    if (bodyClass.includes('page-template-sample-page')) {
        console.log("Sample Page detected");

        findContentWrapper().then(contentWrapper => {
            const wordsConfig = [
                ['ERIC', true],
                ['CLAY', false],
                ['MINE', true],
                ['RRRR', true]
            ]; // Example words with spacing configuration
            const rows = document.querySelectorAll('.ticker-row');

            const kerningPairs = {
                'AY': -123, // Adjust the value as needed
                'YC': -15,  // Adjust the value as needed
                // Add other pairs as needed
            };

            const pastelColors = [
                '#AEC6CF', '#B0D1D6', // Pastel Blue variations
                '#FFB3BA', '#FFCCD4', // Pastel Pink variations
                '#FFDFBA', '#FFE7C2', // Pastel Orange variations
                '#FFFFBA', '#FFFFC2', // Pastel Yellow variations
                '#B4E7B7', '#C4F7C7', // Pastel Green variations
                '#B39EB5', '#C3AEC5', // Pastel Purple variations
                '#C8A2C8', '#D8B2D8', // Additional colors
                '#E0B3E0', '#F0C3F0'  // Additional colors
            ];

            function getDifferentColor(excludedColors) {
                let newColor;
                do {
                    newColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
                } while (excludedColors.includes(newColor));
                return newColor;
            }

            function getSVGDimensions(svgElement) {
                return new Promise((resolve, reject) => {
                    fetch(svgElement.src)
                        .then(response => response.text())
                        .then(svgText => {
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(svgText, "image/svg+xml");
                            const svg = doc.querySelector('svg');
                            if (svg) {
                                const viewBox = svg.getAttribute('viewBox').split(' ');
                                const width = parseFloat(viewBox[2]);
                                const height = parseFloat(viewBox[3]);
                                resolve({ width, height, svgText });
                            } else {
                                reject(new Error('SVG not found'));
                            }
                        })
                        .catch(err => reject(err));
                });
            }

            function colorizeLetters(svgText, color) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(svgText, "image/svg+xml");
                const paths = doc.querySelectorAll('path');
                paths.forEach(path => {
                    path.setAttribute('fill', color);
                });
                return new XMLSerializer().serializeToString(doc);
            }

            function applyKerning(container, kerningPairs, baseSpacing, dimensions, addSpacingToEnd) {
                const images = container.querySelectorAll('img');
                let totalWidth = 0;

                images.forEach((img, index) => {
                    const width = dimensions[index].width;
                    totalWidth += width;

                    if (index < images.length - 1) {
                        const currentPair = img.alt.toUpperCase() + images[index + 1].alt.toUpperCase();
                        let adjustment = baseSpacing; // Start with base spacing

                        if (kerningPairs[currentPair]) {
                            adjustment += kerningPairs[currentPair];
                        }

                        img.style.marginRight = `${adjustment}px`;
                        totalWidth += adjustment;
                        console.log(`Applied kerning for pair "${currentPair}": ${adjustment}px`); // Debugging output
                    }
                });

                // Add spacing to the end of the word if the variable is set to true
                if (addSpacingToEnd) {
                    totalWidth += baseSpacing;
                }

                return totalWidth;
            }

            function adjustDimensionsAndAnimate(word, row, container, dimensions, index, addSpacingToEnd) {
                let maxHeight = Math.max(...dimensions.map(dim => dim.height));
                let baseSpacing = maxHeight * 0.1; // Base spacing based on the height of the word

                // Apply kerning and get the new total width
                const totalWidth = applyKerning(container, kerningPairs, baseSpacing, dimensions, addSpacingToEnd);

                // Set the container width and height manually
                container.style.width = `${totalWidth}px`;
                container.style.height = `${maxHeight}px`;

                // Adjust the row height based on the container height
                const rowWidth = row.getBoundingClientRect().width;
                const scaleFactor = rowWidth / totalWidth;

                // Adjust the total width based on the scale factor
                const scaledTotalWidth = totalWidth * scaleFactor;

                // Adjust the row height and container scale based on the total width and aspect ratio
                row.style.height = `${maxHeight * scaleFactor}px`;

                gsap.set(container, {
                    scale: scaleFactor,
                    transformOrigin: 'left top'
                });

                console.log(`Total width for word "${word}": ${totalWidth}px`); // Debugging output
                console.log(`Max height for word "${word}": ${maxHeight}px`); // Debugging output
                console.log(`Scaled height for row: ${maxHeight * scaleFactor}px`); // Debugging output

                // Ensure rows are hidden initially
                row.style.visibility = 'hidden';

                // Clone the container for seamless animation
                let clone = container.cloneNode(true);
                row.appendChild(clone);

                // Set the clone's initial position based on the row index
                const direction = (index % 2 === 0) ? scaledTotalWidth : -scaledTotalWidth;
                gsap.set(clone, { x: direction });

                // Set the animation duration based on the width
                const baseDuration =15; // Base duration for the first row
                const animationDuration = baseDuration / (1 + 0.00 * index); // Each row is slightly faster

                // Determine the animation direction based on the row index
                const animationDirection = index % 2 === 0 ? -scaledTotalWidth : scaledTotalWidth;

                // Reveal rows and start animation
                row.classList.remove('hidden');
                row.classList.add('loaded');

                // Ensure both containers are visible and animate their letters
                container.style.visibility = 'visible';
                clone.style.visibility = 'visible';
                animateLetters(container, clone);

                gsap.to([container, clone], {
                    x: `+=${animationDirection}`,
                    duration: animationDuration,
                    ease: "none",
                    force3D: true,
                    repeat: -1,
                    modifiers: {
                        x: gsap.utils.unitize(x => parseFloat(x) % scaledTotalWidth)
                    },
                    onStart: () => {
                        row.style.visibility = 'visible';
                    }
                });

                console.log(`Animation started for word "${word}"`);
            }

            function ensureDifferentColors(container) {
                const letters = container.children;
                const usedColors = new Set();

                // Ensure each letter has a different color
                for (let i = 0; i < letters.length; i++) {
                    const letter = letters[i];
                    let newColor = getDifferentColor(Array.from(usedColors));
                    if (i > 0 && newColor === letters[i - 1].dataset.currentColor) {
                        newColor = getDifferentColor([letters[i - 1].dataset.currentColor]);
                    }

                    letter.dataset.currentColor = newColor;
                    usedColors.add(newColor);

                    const coloredSVG = colorizeLetters(letter.getAttribute('data-svg'), newColor);
                    letter.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(coloredSVG)));
                }

                // Ensure first and last letters have different colors
                const firstLetter = letters[0];
                const lastLetter = letters[letters.length - 1];
                if (firstLetter.dataset.currentColor === lastLetter.dataset.currentColor) {
                    let newColor = getDifferentColor([firstLetter.dataset.currentColor]);
                    lastLetter.dataset.currentColor = newColor;
                    const lastLetterSVG = colorizeLetters(lastLetter.getAttribute('data-svg'), newColor);
                    lastLetter.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(lastLetterSVG)));
                    console.log('Adjusted color of last letter to ensure it differs from the first letter.');
                }
            }

            function animateLetters(container, clone) {
                const letters = [...container.children, ...clone.children];
                gsap.fromTo(letters, {
                    y: '105%'
                }, {
                    y: '0%',
                    opacity: 1,
                    force3D: true,
                    duration: 1.2,
                    ease: 'power2.inOut',
                    stagger: 0.03
                });
            }

            // Wait until all promises are resolved before starting animation
            Promise.all(wordsConfig.map(([word, addSpacingToEnd], index) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        let row = rows[index % rows.length];
                        row.innerHTML = ''; // Clear any previous content
                        let container = document.createElement('div');
                        container.className = 'ticker-container';
                        container.style.visibility = 'hidden'; // Initially hide the container

                        let promises = word.split('').map((letter, i, arr) => {
                            let svgElement = document.createElement('img');
                            svgElement.src = `${window.location.origin}/wp-content/themes/understrap-child-main/svg/${letter.toLowerCase()}.svg`;
                            svgElement.className = 'img-fluid'; // Add Bootstrap img-fluid class
                            svgElement.alt = letter.toLowerCase(); // Set alt attribute for easy identification
                            svgElement.onerror = function() { console.error('Failed to load', svgElement.src); }; // Log errors
                            container.appendChild(svgElement);
                            return getSVGDimensions(svgElement).then(dim => {
                                svgElement.setAttribute('data-svg', dim.svgText); // Store original SVG text
                                return dim;
                            });
                        });

                        row.appendChild(container);

                        Promise.all(promises).then(dimensions => {
                            ensureDifferentColors(container);
                            setTimeout(() => {
                                console.log('All SVG images loaded.');
                                adjustDimensionsAndAnimate(word, row, container, dimensions, index, addSpacingToEnd);
                                row.classList.add('loaded'); // Mark the row as loaded
                                resolve(); // Resolve the promise after processing the row
                            }, 100); // Small delay to ensure rendering
                        }).catch(err => console.error('Error loading SVG dimensions:', err));
                    }, index * 100); // Delay each word processing by 100ms to avoid blocking
                });
            })).then(() => {
                // All rows are built and animations are ready to start
                contentWrapper.classList.remove('hidden');
            });
        }).catch(error => console.error(error));
    }
};
