import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (progressRef.current) {
        progressRef.current.style.width = scrollPercent + '%';
      }
      if (backToTopRef.current) {
        if (scrollTop > 500) {
          backToTopRef.current.classList.add('visible');
        } else {
          backToTopRef.current.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { progressRef, backToTopRef };
}

export function useIntersectionObserver() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          const children = entry.target.querySelectorAll('[data-aos-delay]');
          children.forEach((child, index) => {
            const delay = parseInt(child.getAttribute('data-aos-delay') || String(index * 100));
            setTimeout(() => child.classList.add('aos-animate'), delay);
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export function useTiltEffect() {
  useEffect(() => {
    const handleMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.zIndex = '10';
      updateGlare(card, x, y);
    };

    const handleLeave = (card: HTMLElement) => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.zIndex = '1';
      const glare = card.querySelector('.glare') as HTMLElement | null;
      if (glare) glare.style.opacity = '0';
    };

    const updateGlare = (card: HTMLElement, x: number, y: number) => {
      let glare = card.querySelector('.glare') as HTMLElement | null;
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'glare';
        Object.assign(glare.style, {
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: '0',
          transition: 'opacity 0.2s',
          mixBlendMode: 'overlay',
        });
        card.appendChild(glare);
      }
      glare.style.left = `${x - 100}px`;
      glare.style.top = `${y - 100}px`;
      glare.style.opacity = '1';
    };

    const cards = document.querySelectorAll<HTMLElement>('.card');
    const listeners: Array<{ card: HTMLElement; onMove: (e: MouseEvent) => void; onLeave: () => void }> = [];

    cards.forEach(card => {
      const onMove = (e: MouseEvent) => handleMove(e, card);
      const onLeave = () => handleLeave(card);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      listeners.push({ card, onMove, onLeave });
    });

    return () => {
      listeners.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}

export function useMouseTrail() {
  useEffect(() => {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    document.body.appendChild(trail);

    let timeout: ReturnType<typeof setTimeout>;
    const handleMouseMove = (e: MouseEvent) => {
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = '0.3';
      clearTimeout(timeout);
      timeout = setTimeout(() => { trail.style.opacity = '0'; }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      trail.remove();
    };
  }, []);
}

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        window.scrollTo({ top: (el as HTMLElement).offsetTop - 80, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
