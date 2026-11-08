import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

// Mesmas curvas de design-system/d1/tokens.css (--ease-draw, --ease-stamp).
CustomEase.create("drawEase", "0.65, 0, 0.35, 1");
CustomEase.create("stampEase", "0.2, 1.4, 0.4, 1");

export { gsap, ScrollTrigger };
