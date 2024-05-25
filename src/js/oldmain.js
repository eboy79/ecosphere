import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
import './page-load-info.js';
// other imports and code
import { TextScramble, initTickerRows, applyTextRevealAnimation, applyTextHideAnimation, initWordStack } from './animations';


gsap.defaults({ ease: "none", duration: 1 });
//initTickerRows(["ERIC", "CLAY", "MINE", "RRRR"]);

// Initialize Scramble Text
const el = document.querySelector('.scramble');
const scrambler = new TextScramble(el);

const phrases = ["Hello, World!", "Welcome to the Site", "Enjoy Your Visit", "Thank You!"];
let counter = 0;

const nextPhrase = () => {
    scrambler.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 800);
    });
    counter = (counter + 1) % phrases.length;
};

// Initialize Splitting.js (example)
Splitting();

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })
  
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf)
  }
  
  requestAnimationFrame(raf)

requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {
    const bodyClass = document.body.className;

    if (bodyClass.includes('home')) {
     
    } else if (bodyClass.includes('page-template-face-page')) {
        if (typeof wordStackData !== 'undefined') {
    
        }
    } else if (bodyClass.includes('services-page')) {
        console.log("Services page detected");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menuContainer = document.getElementById('menu-container');
    const menuItems = menuContainer.querySelectorAll('li');

    let menuOpen = false;

    menuToggle.addEventListener('click', () => {
        if (!menuOpen) {
            gsap.to(menuContainer, { duration: 0.5, display: 'block', width: '250px' });
            gsap.to(menuItems, { duration: 0.5, opacity: 1, x: 0, stagger: 0.1 });
            menuOpen = true;
        } else {
            gsap.to(menuItems, { duration: 0.5, opacity: 0, x: -20, stagger: 0.1 });
            gsap.to(menuContainer, { duration: 0.5, width: '0', display: 'none', delay: 0.5 });
            menuOpen = false;
        }
    });

    document.addEventListener('click', (e) => {
        if (menuOpen && !menuContainer.contains(e.target) && e.target !== menuToggle) {
            gsap.to(menuItems, { duration: 0.5, opacity: 0, x: -20, stagger: 0.1 });
            gsap.to(menuContainer, { duration: 0.5, width: '0', display: 'none', delay: 0.5 });
            menuOpen = false;
        }
    });
});
const bodyClass = document.body.className;
if (bodyClass.includes('page-template-test-page')) {
    console.log("Sample Page detected");

const section_1 = document.getElementById("vertical");
const col_left = document.querySelector(".col_left");
const timeln = gsap.timeline({ paused: true });

timeln.fromTo(col_left, {y: 0}, {y: '170vh', duration: 1, ease: 'none'}, 0);

const scroll_1 = ScrollTrigger.create({
    animation: timeln,
    trigger: section_1,
    start: 'top top',
    end: 'bottom center',
    scrub: true
});

const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: section_2,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + section_2.offsetWidth
  }
});
}

import { applyTextHideAnimation } from '../animations/textHideAnimation';
import { applyTextRevealAnimation } from '../animations/textRevealAnimation';

document.addEventListener('DOMContentLoaded', () => {
    nextPhrase();
    Splitting();
    setTimeout(() => {
        applyTextHideAnimation('.content__item--about');
    }, 3000);
    setTimeout(() => {
        applyTextRevealAnimation('.content__item--about');
    }, 1500);
});


