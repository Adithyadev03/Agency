import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  useEffect(() => {
    // 1. Fade Up Reveal
    const fadeUpElements = document.querySelectorAll(".gsap-fade-up");
    fadeUpElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 2. Blur Lens Reveal (luxury editorial reveal)
    const blurRevealElements = document.querySelectorAll(".gsap-blur-reveal");
    blurRevealElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, filter: "blur(12px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 3. Scale Reveal (zoom-in effect)
    const scaleElements = document.querySelectorAll(".gsap-scale-reveal");
    scaleElements.forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 4. Slide Left (slides from right to left)
    const slideLeftElements = document.querySelectorAll(".gsap-slide-left");
    slideLeftElements.forEach((el) => {
      gsap.fromTo(
        el,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 5. Slide Right (slides from left to right)
    const slideRightElements = document.querySelectorAll(".gsap-slide-right");
    slideRightElements.forEach((el) => {
      gsap.fromTo(
        el,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 6. Rotate Into View (luxury perspective tilt)
    const rotateIntoViewElements = document.querySelectorAll(".gsap-rotate-view");
    rotateIntoViewElements.forEach((el) => {
      gsap.fromTo(
        el,
        { rotationX: -15, y: 30, opacity: 0 },
        {
          rotationX: 0,
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // 7. Staggered Children list reveals
    const staggerContainers = document.querySelectorAll(".gsap-stagger-container");
    staggerContainers.forEach((container) => {
      const children = container.children;
      if (children.length > 0) {
        gsap.fromTo(
          Array.from(children),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Refresh ScrollTrigger to ensure accurate layout metrics
    ScrollTrigger.refresh();

    return () => {
      // Clear triggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}
export default useScrollAnimations;
