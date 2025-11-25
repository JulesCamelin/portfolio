document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. LOGIQUE LIGHTBOX (Pour l'affichage des images de projets)
    // ==========================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const projectImages = document.querySelectorAll('.open-lightbox-trigger');

    if (lightbox && lightboxImg && closeBtn && projectImages.length > 0) {
        projectImages.forEach(img => {
            img.addEventListener('click', () => {
                const imgSrc = img.getAttribute('data-src') || img.src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    // ==========================================================
    // 2. LOGIQUE CANVAS F1 FUTURISTE (10 LIGNES Subtiles)
    // ==========================================================
    const canvas = document.getElementById('speedCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H;
        
        const MAX_LINES = 10; 
        const MAX_LENGTH = 50; 
        const MIN_LENGTH = 20; 
        const LINE_WIDTH = 2; 

        let lines = [];

        function resizeCanvas() {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); 

        class Line {
            constructor() {
                this.reset();
                this.y = Math.random() * H;
            }

            reset() {
                this.x = Math.random() * W;
                this.y = -MIN_LENGTH;
                this.length = Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH;
                this.vy = Math.random() * 1.5 + 1; 
                this.opacity = Math.random() * 0.2 + 0.05; 
                this.color = `rgba(255, 0, 0, ${this.opacity})`;
                this.vx = (Math.random() - 0.5) * 0.05; 
            }

            update() {
                this.y += this.vy;
                this.x += this.vx;

                if (this.y > H + this.length) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = LINE_WIDTH; 
                ctx.lineCap = 'round'; 

                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.stroke();
                ctx.closePath();
            }
        }

        for (let i = 0; i < MAX_LINES; i++) {
            lines.push(new Line());
        }

        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; 
            ctx.fillRect(0, 0, W, H);

            for (let i = 0; i < lines.length; i++) {
                lines[i].update();
                lines[i].draw();
            }

            requestAnimationFrame(animate);
        }

        animate();
    }
    
    // ==========================================================
    // 3. LOGIQUE INDICATEUR F1 (Allumage des points) - MAINTENANT EN BOUCLE
    // ==========================================================
    const indicatorContainer = document.querySelector('.f1-indicator-container');
    const indicatorDots = document.querySelectorAll('.f1-indicator-dots .dot');

    if (indicatorContainer && indicatorDots.length > 0) {
        
        const animateF1Indicator = () => {
            indicatorContainer.style.opacity = '1'; 

            // Étape 1: Allumage progressif
            indicatorDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.classList.add('active');
                }, index * 200); 
            });

            // Étape 2: Extinction (après 1 seconde de pause à l'état MAX)
            setTimeout(() => {
                indicatorDots.forEach(dot => dot.classList.remove('active'));
            }, indicatorDots.length * 200 + 1000); 
        };
        
        // 1. Lancement immédiat de la première animation
        animateF1Indicator();
        
        // 2. Répétition de l'animation toutes les 3 secondes (3000 ms)
        setInterval(animateF1Indicator, 3000); 
    }


    // ==========================================================
    // 4. LOGIQUE DE FILTRAGE DES PROJETS
    // ==========================================================
    const filterButtons = document.querySelectorAll('.filters button');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    
                    card.style.opacity = '0';
                    card.style.display = 'none';

                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        
                        card.style.display = 'block'; 
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50); 
                    }
                });
            });
        });
    }

    
    // ==========================================================
    // 5. LOGIQUE : FEUX DE DÉPART F1 (ANIMATION NAVIGATION) - MAINTENANT EN BOUCLE
    // ==========================================================
    const startLights = document.querySelectorAll('.f1-start-lights .start-light');
    
    if (startLights.length > 0) {
        // Le bouton "All" des filtres de projets est activé après l'animation.
        // Si vous ne voulez pas ce comportement à chaque boucle, nous devrons ajuster.
        const filterAllButton = document.querySelector('.filters button[data-filter="all"]');

        const animateStartLights = () => { // La fonction n'a plus besoin du paramètre 'loop'
            let delay = 0;
            // On s'assure que tous les feux sont éteints avant de relancer l'animation
            startLights.forEach(light => light.classList.remove('active'));

            startLights.forEach((light, index) => {
                setTimeout(() => {
                    light.classList.add('active');
                }, delay);
                delay += 300; // Délai entre chaque allumage
            });

            // Une fois que tous les feux sont allumés, on les éteint après une pause.
            setTimeout(() => {
                startLights.forEach(light => light.classList.remove('active'));
                // Si vous voulez que le bouton "All" soit actif à la fin de chaque boucle :
                if (filterAllButton) {
                    filterAllButton.classList.add('active');
                }
            }, delay + 1000); // 1000 ms de pause après l'allumage du dernier feu
        };

        // Lancement initial de l'animation des feux de navigation (après 2 secondes de chargement)
        setTimeout(() => {
            animateStartLights();
            // Puis, répétez l'animation toutes les 3 secondes
            setInterval(animateStartLights, 10000);
        }, 2000);


        // Rendre les feux cliquables pour naviguer (ce comportement reste le même)
        startLights.forEach(light => {
            light.addEventListener('click', (e) => {
                e.preventDefault(); 
                const targetId = light.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                
                // Active le feu cliqué, et désactive les autres (pour une navigation)
                startLights.forEach(btn => btn.classList.remove('active'));
                light.classList.add('active');
            });
        });
    }

    // ==========================================================
    // 6. LOGIQUE KONAMI CODE (REDIRECTION VERS UNE NOUVELLE PAGE)
    // ==========================================================
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown','4','2'
    ];
    let konamiCodePosition = 0;
    const targetPage = 'konami.html';

    // ⚠️ AJOUT DE LA VÉRIFICATION DU FOCUS POUR ÉVITER LES CONFLITS AVEC LES CHAMPS DE FORMULAIRE
    document.addEventListener('keydown', (e) => {
        
        // Ignorer si l'utilisateur est dans un champ de formulaire (input ou textarea)
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return; 
        }

        const key = e.key.toLowerCase();
        
        // Vérifie si la touche correspond à l'étape actuelle
        if (key === konamiCode[konamiCodePosition].toLowerCase()) { 
            
            // AJOUT TEMPORAIRE : LOG dans la console pour déboguer.
            console.log(`Touche correcte: ${key} | Prochaine position: ${konamiCodePosition + 1}`);

            konamiCodePosition++;

            // Si le code est complet
            if (konamiCodePosition === konamiCode.length) {
                console.log("Konami Code Activé! Redirection...");
                
                // --- ACTION DE REDIRECTION ---
                window.location.href = targetPage; 
                
                konamiCodePosition = 0; 
            }
        } else {
            // Si une touche incorrecte est pressée, réinitialise TOUJOURS la position
            konamiCodePosition = 0;
            
            // Tente de redémarrer le code si la touche était le début du code (ArrowUp)
            if (key === konamiCode[0].toLowerCase()) {
                 konamiCodePosition = 1;
            }
        }
    });

}); // ⬅️ FIN UNIQUE DU document.addEventListener('DOMContentLoaded', ...)
