<?php
/**
 * Template Name: Word Stack Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

?>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Latest compiled JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.2/gsap.min.js"></script>
<style>
    #svg-container {
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        height: 200px;
        position: relative;
        width: 100%;
    }

    .wide-container {
        display: flex;
        flex-direction: row;
        width: 200%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        height: 100%;
    }

    .word-svg {
        height: 100%;
        transform-origin: top left;
        opacity: 1;
    }
</style>
<div class="container-fluid px-0" style="height:70vh"></div>
<div class="container-fluid px-0">
    <div id="svg-container">
        <div class="wide-container" id="wide-container"></div>
    </div>
</div>
<script>
    // SVG data for letters and blank space
    const svgData = {
        A: { viewBox: "6 0 727 719", path: "M507 0H733L493 719H246L6 0H232L263 114H476ZM309 280 364 483H375L430 280Z" },
        B: { viewBox: "69 0 581 721", path: "M69 0H353C557 0 650 62 650 199C650 282 606 333 530 362V370C597 398 627 452 627 518C627 649 547 721 354 721L69 720ZM278 435V553H344C386 553 406 532 406 494C406 457 385 435 347 435ZM278 165V292H356C401 292 422 268 422 227C422 183 397 165 353 165Z" },
        C: { viewBox: "35 0 573 735", path: "M429 -16C495 -16 553 -7 608 18V217C564 194 496 185 448 185C344 185 262 242 262 359C262 476 342 534 447 534C493 534 562 525 607 502V701C549 727 491 735 429 735C196 735 35 592 35 359C35 127 193 -16 429 -16Z" },
        D: { viewBox: "69 0 651 720", path: "M69 0H346C592 0 720 136 720 360C720 584 592 720 346 720H69ZM288 190V530H352C437 530 493 481 493 360C493 243 443 190 352 190Z" },
        E: { viewBox: "69 0 485 720", path: "M69 0H554V170H288V272H525V448H288V550H554V720H69Z" },
        F: { viewBox: "69 0 491 720", path: "M69 0H288V272H531V448H288V550H560V720H69Z" },
        G: { viewBox: "36 0 635 735", path: "M428 -15C517 -15 590 -3 671 34V372H479V182C465 178 450 176 434 176C339 176 263 234 263 356C263 478 342 543 463 543C533 543 596 528 643 504V696C583 722 506 735 427 735C198 735 36 596 36 359C36 122 194 -15 428 -15Z" },
        H: { viewBox: "69 0 669 722", path: "M69 0H288V258H519V0H738V722H519L518 464H288V722H69Z" },
        I: { viewBox: "69 0 219 720", path: "M69 0H288V720H69Z" },
        J: { viewBox: "25 0 372 720", path: "M140 -14C332 -14 397 98 397 326V720H178V356C178 230 156 194 79 194C63 194 45 196 25 201V2C60 -8 99 -14 140 -14Z" },
        K: { viewBox: "69 0 667 720", path: "M69 -1 288 0V259H349L484 0H736L539 362L732 720H486L355 464H288V720L69 719Z" },
        L: { viewBox: "69 0 460 720", path: "M69 0H529V206H289L288 720H69Z" },
        M: { viewBox: "42 0 850 719", path: "M42 0H256L284 328H293L409 0H526L641 328H649L678 0H892L827 719H593L471 331H463L341 719H107Z" },
        N: { viewBox: "69 0 700 720", path: "M69 0H288L287 344H296L546 0H729V720H510L511 362H502L250 720H69Z" },
        O: { viewBox: "35 0 773 735", path: "M423 -15C666 -15 808 139 808 359C808 573 661 735 421 735C181 735 35 573 35 359C35 139 179 -15 423 -15ZM421 181C328 181 262 243 262 359C262 480 330 538 421 538C513 538 580 480 581 359C581 243 517 181 421 181Z" },
        P: { viewBox: "69 0 584 720", path: "M69 0H288V180H350C541 180 653 274 653 450C653 624 544 720 350 720H69ZM288 370V531H344C403 531 432 500 432 450C432 398 403 370 344 370Z" },
        Q: { viewBox: "35 0 790 735", path: "M694 168V177C741 220 788 284 788 402C788 565 676 735 412 735C178 735 35 573 35 359C35 159 154 -15 444 -15H825V168ZM413 177C328 177 256 239 256 359C256 483 330 543 411 543C501 543 574 483 575 359C575 239 517 177 413 177Z" },
        R: { viewBox: "69 0 622 720", path: "M457 0H691C691 110 652 201 582 254V263C631 288 677 358 677 464C677 636 564 719 362 719L69 720V0H288V210H380C435 162 457 89 457 0ZM288 386V533H359C415 533 447 510 447 460C447 411 418 386 362 386Z" },
        S: { viewBox: "47 0 625 734", path: "M329 -15C515 -15 622 62 622 219C622 392 464 426 364 455C322 467 284 476 284 509C284 538 306 550 348 550C418 550 526 513 583 479V688C516 715 421 734 321 734C158 734 51 656 51 516C51 354 178 307 273 277C330 259 386 256 386 216C386 187 362 171 314 171C239 171 131 205 47 256V46C96 21 205 -15 329 -15Z" },
        T: { viewBox: "24 0 581 720", path: "M205 0H424V515H605V720H24V515H204Z" },
        U: { viewBox: "60 0 660 720", path: "M391 -15C601 -15 720 82 720 322V720H501V293C501 221 469 182 391 182C312 182 279 221 279 293V720H60V322C60 90 178 -15 391 -15Z" },
        V: { viewBox: "5 0 735 720", path: "M247 0H498L740 720H511L381 259H372L239 720H5Z" },
        W: { viewBox: "6 0 1014 720", path: "M235 0H440L534 381H542L635 0H841L1069 720H840L742 304H733L634 720H442L343 304H334L235 720H6Z" },
        X: { viewBox: "0 0 711 720", path: "M-5 0H232L349 202H358L474 0H711L476 370L700 720H463L358 529H349L243 720H7L230 370Z" },
        Y: { viewBox: "6 0 706 720", path: "M245 0H475V256L712 720H467L364 457H355L254 720H6L245 256Z" },
        Z: { viewBox: "38 0 630 720", path: "M38 0H668V195H336L655 557V720H53V525H350L38 158Z" },
        ' ': { viewBox: "0 0 200 200", path: "" } // Blank space SVG
    };

    const kerningPairs = {
        'IS': 35, 'YO': -116, // Adjust the value as needed
        'UT': 50, 'OW': -45, // Add more pairs as needed
        'TU': -25, 'NO': 10, // Add more pairs as needed
        'FU': 20, 'HE': 15, // Add more pairs as needed
        'EN': 5, 'OU': -10, // Add more pairs as needed
        'RE': 20, 'UR': 10, // Add more pairs as needed
        'HE': 15, 'EN': 15, // Add more pairs as needed
    };

    const svgColor = "#3498db"; // Define your color variable here

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
            let adjustment = baseSpacing;

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
    svg.style.opacity = "1";

    let totalWidth = 0;
    const groups = [];

    const heightPercentage = 0.1;
    const baseSpacing = 200 * heightPercentage;

    letters.forEach(letter => {
        const letterData = svgData[letter.toUpperCase()];
        if (letterData) {
            const g = document.createElementNS(svgNS, "g");
            g.setAttribute("class", `letter-${letter.toLowerCase()}`);
            g.setAttribute("data-letter", letter.toUpperCase());
            g.setAttribute("data-width", letterData.viewBox.split(' ')[2]);

            const path = document.createElementNS(svgNS, "path");
            path.setAttribute("d", letterData.path);
            path.setAttribute("class", `letter-${letter.toLowerCase()}-path`);
            path.setAttribute("fill", svgColor); // Apply the color variable here
            g.appendChild(path);
            svg.appendChild(g);
            groups.push(g);

            totalWidth += parseInt(letterData.viewBox.split(' ')[2]) + baseSpacing;
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
        const totalWidth = word.split('').reduce((acc, letter) => acc + parseInt(svgData[letter.toUpperCase()].viewBox.split(' ')[2]) + (200 * 0.1), 0);
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
    const padding = 200 * 0.1;

    const clonedContainer = wideContainer.cloneNode(true);
    clonedContainer.style.left = `${totalWidth + padding}px`;
    svgContainer.appendChild(clonedContainer);

    const slideTimeline = gsap.timeline({ repeat: -1, ease: "none" })
        .to([wideContainer, clonedContainer], { x: -totalWidth - padding, duration: 10, force3D: true, ease: "none" })
        .set(wideContainer, { x: totalWidth + padding })
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

displayWords(["      ", "when ", "your ", "future ", " is ", "now", "  "], 150);
</script>
<?php
get_footer();
?>