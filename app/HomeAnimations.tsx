'use client';
import { useEffect } from 'react';

export default function HomeAnimations() {
  useEffect(() => {
    const selectors = [
      { sel: '.eyebrow',   cls: 'anim-fade-up' },
      { sel: 'h1.sr',      cls: 'anim-fade-up' },
      { sel: 'h2.sr',      cls: 'anim-fade-up' },
      { sel: '.fg-card',   cls: 'anim-fade-up' },
      { sel: '.aud-card',  cls: 'anim-fade-up' },
      { sel: '.hw-card',   cls: 'anim-fade-up' },
      { sel: '.sc',        cls: 'anim-fade-up' },
      { sel: '.fw-card',   cls: 'anim-slide-right' },
      { sel: '.cta-panel', cls: 'anim-fade-in' },
      { sel: '.fw-note',   cls: 'anim-fade-in' },
    ];

    const staggerClasses = ['anim-d1','anim-d2','anim-d3','anim-d4'];
    const allTargets: Element[] = [];

    selectors.forEach(({ sel, cls }) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.classList.contains(cls)) {
          el.classList.add(cls);
          if (['anim-fade-up','anim-slide-right'].includes(cls)) {
            el.classList.add(staggerClasses[i % staggerClasses.length]);
          }
          allTargets.push(el);
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
          } else {
            // Reset when scrolled out so it re-animates on next scroll in
            entry.target.classList.remove('anim-visible');
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    );

    allTargets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
