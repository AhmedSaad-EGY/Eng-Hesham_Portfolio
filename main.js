(function () {
            const body = document.body;
            const themeToggleBtn = document.getElementById('themeToggle');
            const savedTheme = localStorage.getItem('portfolio-theme');

            if (savedTheme === 'light') {
                body.classList.add('light-theme');
            }

            themeToggleBtn.addEventListener('click', () => {
                body.classList.toggle('light-theme');
                localStorage.setItem('portfolio-theme', body.classList.contains('light-theme') ? 'light' : 'dark');
            });

            AOS.init({
                duration: 650,
                easing: 'ease-out-cubic',
                once: true,
                offset: 70
            });

            const typingTextEl = document.getElementById('typingText');
            const titles = [
                'Full Stack Developer',
                '.NET Core Specialist',
                'Angular Builder',
                'SQL Server Problem Solver',
                'API-Focused Engineer'
            ];

            let titleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingSpeed = 90;
            const deletingSpeed = 45;
            const pauseAfterType = 1500;
            const pauseAfterDelete = 350;

            function typeEffect() {
                const currentTitle = titles[titleIndex];

                if (!isDeleting) {
                    typingTextEl.textContent = currentTitle.substring(0, charIndex + 1);
                    charIndex += 1;

                    if (charIndex === currentTitle.length) {
                        isDeleting = true;
                        setTimeout(typeEffect, pauseAfterType);
                        return;
                    }

                    setTimeout(typeEffect, typingSpeed);
                    return;
                }

                typingTextEl.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex -= 1;

                if (charIndex === 0) {
                    isDeleting = false;
                    titleIndex = (titleIndex + 1) % titles.length;
                    setTimeout(typeEffect, pauseAfterDelete);
                    return;
                }

                setTimeout(typeEffect, deletingSpeed);
            }

            setTimeout(typeEffect, 500);

            const header = document.getElementById('header');
            const scrollToTopBtn = document.getElementById('scrollToTop');
            const navProgress = document.getElementById('navProgress');
            const navLinksContainer = document.getElementById('navLinks');
            const navLinks = document.querySelectorAll('.nav-links a');
            const hamburger = document.getElementById('hamburger');
            const sections = document.querySelectorAll('section[id], footer[id]');

            function updateHeaderState() {
                const scrollY = window.scrollY;
                header.classList.toggle('scrolled', scrollY > 16);
                scrollToTopBtn.classList.toggle('visible', scrollY > 540);
            }

            function updateActiveLink() {
                let currentSectionId = 'hero';
                const scrollPosition = window.scrollY + window.innerHeight * 0.3;

                sections.forEach((section) => {
                    if (scrollPosition >= section.offsetTop) {
                        currentSectionId = section.id;
                    }
                });

                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.dataset.section === currentSectionId);
                });
            }

            function updateProgress() {
                const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
                navProgress.style.width = Math.min(progress, 100) + '%';
            }

            function openMobileNav() {
                navLinksContainer.classList.add('open');
                hamburger.classList.add('active');
                hamburger.setAttribute('aria-expanded', 'true');
            }

            function closeMobileNav() {
                navLinksContainer.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }

            hamburger.addEventListener('click', () => {
                if (navLinksContainer.classList.contains('open')) {
                    closeMobileNav();
                } else {
                    openMobileNav();
                }
            });

            navLinks.forEach((link) => {
                link.addEventListener('click', () => {
                    closeMobileNav();
                });
            });

            document.addEventListener('click', (event) => {
                if (!navLinksContainer.contains(event.target) && !hamburger.contains(event.target)) {
                    closeMobileNav();
                }
            });

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    closeMobileNav();
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener('click', function (event) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') {
                        return;
                    }

                    const target = document.querySelector(targetId);
                    if (!target) {
                        return;
                    }

                    event.preventDefault();
                    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) + 12;
                    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({ top: targetTop, behavior: 'smooth' });
                });
            });

            // Read More Toggle for mobile
            const readMoreButtons = document.querySelectorAll('.read-more-btn');
            readMoreButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const card = btn.closest('.project-card');
                    const isExpanded = card.classList.toggle('expanded');
                    btn.setAttribute('aria-expanded', isExpanded);
                    btn.innerHTML = isExpanded ? 'Read less <span class="arrow">↑</span>' : 'Read more <span class="arrow">↓</span>';
                });
            });

            const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

            if (!reducedMotionQuery.matches) {
                const glowTargets = document.querySelectorAll('.nav-links a, .btn, .contact-link, .theme-toggle, .hamburger');
                glowTargets.forEach((element) => {
                    const updateGlowPosition = (event) => {
                        const rect = element.getBoundingClientRect();
                        const glowX = ((event.clientX - rect.left) / rect.width) * 100;
                        const glowY = ((event.clientY - rect.top) / rect.height) * 100;
                        element.style.setProperty('--glow-x', `${glowX}%`);
                        element.style.setProperty('--glow-y', `${glowY}%`);
                    };

                    element.addEventListener('pointermove', updateGlowPosition);
                    element.addEventListener('pointerenter', updateGlowPosition);
                    element.addEventListener('pointerleave', () => {
                        element.style.removeProperty('--glow-x');
                        element.style.removeProperty('--glow-y');
                    });
                });

                const motionTargets = [
                    ['.logo-mark', 8],
                    ['.hero-title', 10],
                    ['.section-title', 6]
                ];

                motionTargets.forEach(([selector, strength]) => {
                    document.querySelectorAll(selector).forEach((element) => {
                        element.addEventListener('pointermove', (event) => {
                            const rect = element.getBoundingClientRect();
                            const x = (event.clientX - rect.left) / rect.width - 0.5;
                            const y = (event.clientY - rect.top) / rect.height - 0.5;
                            element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
                        });

                        element.addEventListener('pointerleave', () => {
                            element.style.transform = '';
                        });
                    });
                });
            }

            document.getElementById('currentYear').textContent = new Date().getFullYear();

            let ticking = false;
            function onScroll() {
                if (ticking) {
                    return;
                }

                ticking = true;
                requestAnimationFrame(() => {
                    updateHeaderState();
                    updateActiveLink();
                    updateProgress();
                    ticking = false;
                });
            }

            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', updateProgress);

            updateHeaderState();
            updateActiveLink();
            updateProgress();

            (function initFloatingDots() {
                const canvas = document.getElementById('floatingDots');
                if (!canvas) {
                    return;
                }

                const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
                if (prefersReducedMotion.matches) {
                    canvas.style.display = 'none';
                    return;
                }

                const ctx = canvas.getContext('2d');
                const particles = [];
                let animationFrameId = null;
                let width = 0;
                let height = 0;
                let dpr = Math.max(1, window.devicePixelRatio || 1);

                function resizeCanvas() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    dpr = Math.max(1, window.devicePixelRatio || 1);

                    canvas.width = Math.floor(width * dpr);
                    canvas.height = Math.floor(height * dpr);
                    canvas.style.width = width + 'px';
                    canvas.style.height = height + 'px';
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                }

                function createParticles() {
                    particles.length = 0;
                    const count = Math.max(32, Math.floor((width * height) / 18000));

                    for (let index = 0; index < count; index += 1) {
                        particles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            radius: Math.random() * 2.2 + 0.8,
                            velocityX: (Math.random() - 0.5) * 4,
                            velocityY: (Math.random() - 0.5) * 3,
                            alpha: Math.random() * 0.22 + 0.08
                        });
                    }
                }

                function draw() {
                    ctx.clearRect(0, 0, width, height);

                    const isLightTheme = body.classList.contains('light-theme');
                    const baseColor = isLightTheme ? '16, 24, 37' : '255, 255, 255';
                    const accentColor = isLightTheme ? '13, 140, 133' : '95, 209, 194';

                    particles.forEach((particle, index) => {
                        particle.x += particle.velocityX;
                        particle.y += particle.velocityY;

                        if (particle.x < -20) particle.x = width + 20;
                        if (particle.x > width + 20) particle.x = -20;
                        if (particle.y < -20) particle.y = height + 20;
                        if (particle.y > height + 20) particle.y = -20;

                        const useAccent = index % 7 === 0;
                        const color = useAccent ? accentColor : baseColor;
                        const alpha = isLightTheme ? particle.alpha * 0.9 : particle.alpha * 0.75;

                        ctx.beginPath();
                        ctx.fillStyle = `rgba(${color}, ${alpha})`;
                        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                        ctx.fill();
                    });

                    animationFrameId = window.requestAnimationFrame(draw);
                }

                function handleResize() {
                    resizeCanvas();
                    createParticles();
                }

                handleResize();
                draw();

                window.addEventListener('resize', handleResize);
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        if (animationFrameId) {
                            window.cancelAnimationFrame(animationFrameId);
                            animationFrameId = null;
                        }
                        return;
                    }

                    if (!animationFrameId) {
                        draw();
                    }
                });
            })();
        })();