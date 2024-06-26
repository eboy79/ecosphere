import { gsap } from 'gsap';
import { svgChars, kerningPairs } from './svgChars';

const svgColor = "#fff";
const letterSpacingMultiplier = 4.5; // Increase this value to add more space between letters

function applyKerning(groups, kerningPairs, baseSpacing) {
    let currentX = 0;
    groups.forEach((g, index) => {
        const letter = g.getAttribute("data-letter");
        const width = parseInt(g.getAttribute("data-width"));
        g.setAttribute("transform", `translate(${currentX}, 800) scale(1, -1)`);
        currentX += width;
        if (index < groups.length - 1) {
            const nextLetter = groups[index + 1].getAttribute("data-letter");
            const pair = letter + nextLetter;
            let adjustment = baseSpacing * letterSpacingMultiplier;
            if (kerningPairs[pair]) {
                adjustment += kerningPairs[pair];
            }
            currentX += adjustment;
        }
    });
}

function generateCombinedSVG(letters, combinedViewBox, wordClass, maxHeight) {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("viewBox", combinedViewBox);
    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("class", wordClass);
    svg.setAttribute("height", "100%");
    svg.setAttribute("shape-rendering", "geometricPrecision");
    svg.style.opacity = "1";
    let totalWidth = 0;
    const groups = [];
    const heightPercentage = 0.1;
    const baseSpacing = 200 * heightPercentage;
    letters.forEach(letter => {
        const letterData = svgChars[letter.toUpperCase()];
        if (letterData) {
            const g = document.createElementNS(svgNS, "g");
            g.setAttribute("class", `letter-${letter.toLowerCase()}`);
            g.setAttribute("data-letter", letter.toUpperCase());
            g.setAttribute("data-width", letterData.viewBox.split(' ')[2]);
            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", letterData.path);
            path.setAttribute("class", `letter-${letter.toLowerCase()}-path`);
            path.setAttribute("fill", svgColor);
            g.appendChild(path);
            svg.appendChild(g);
            groups.push(g);
            totalWidth += parseInt(letterData.viewBox.split(' ')[2]) + baseSpacing * letterSpacingMultiplier;
        } else {
            console.error(`No SVG data found for letter: ${letter}`);
        }
    });
    applyKerning(groups, kerningPairs, baseSpacing);
    const aspectRatio = totalWidth / 800;
    const scaledWidth = 200 * aspectRatio;
    const maxHeightScale = maxHeight / 200;
    svg.setAttribute("width", `${scaledWidth * maxHeightScale}px`);
    svg.setAttribute("height", `${200 * maxHeightScale}px`);
    return svg;
}

function displayWords(words, maxHeight) {
    const wideContainer = document.getElementById("wide-container");
    wideContainer.innerHTML = "";

    words.forEach(word => {
        const totalWidth = word.split('').reduce((acc, letter) => acc + parseInt(svgChars[letter.toUpperCase()].viewBox.split(' ')[2]) + (200 * 0.1 * letterSpacingMultiplier), 0);
        const combinedViewBox = `0 0 ${totalWidth} 800`;
        const svgElement = generateCombinedSVG(word.split(''), combinedViewBox, `word-svg word-${word.replace(/\s/g, '-').toLowerCase()}`, maxHeight);
        wideContainer.appendChild(svgElement);
    });

    animateIntroAndSlide();
}

function animateIntroAndSlide() {
    const words = document.querySelectorAll('.word-svg');
    const svgContainer = document.getElementById("svg-container");
    const wideContainer = document.getElementById("wide-container");
    const containerWidth = svgContainer.offsetWidth;
    const totalWidth = wideContainer.offsetWidth;
    const padding = 0;

    const clonedContainer = wideContainer.cloneNode(true);
    clonedContainer.style.left = `${totalWidth + padding}px`;
    svgContainer.appendChild(clonedContainer);

    const slideTimeline = gsap.timeline({ repeat: -1, ease: "none" })
        .to([wideContainer, clonedContainer], { x: -totalWidth, duration: 20, ease: "none", onComplete: resetPositions })
        .set(wideContainer, { x: 0 })
        .set(clonedContainer, { x: totalWidth + padding });

    words.forEach((word, index) => {
        gsap.from(word, {
            y: 240,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1
        });
    });

    slideTimeline.play();
}

function resetPositions() {
    const wideContainer = document.getElementById("wide-container");
    const clonedContainer = wideContainer.nextElementSibling;
    wideContainer.style.transform = 'translateX(0)';
    clonedContainer.style.transform = `translateX(${wideContainer.offsetWidth}px)`;
}

export function initWordStack(words) {
    displayWords(words, 180);
}
