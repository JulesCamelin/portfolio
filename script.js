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
    // ==========================================================
    // 7. NOUVEAU KONAMI CODE : SAPIN DE NOËL (DRAWING)
    // Séquence : ↑ ↑ ↓ ↓ ← → ← → B A
    // ==========================================================
    const xmasCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        
    ];
    let xmasPosition = 0;

    document.addEventListener('keydown', (e) => {
        // Ignorer les inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const key = e.key.toLowerCase();
        const targetKey = xmasCode[xmasPosition].toLowerCase();

        if (key === targetKey) {
            xmasPosition++;
            if (xmasPosition === xmasCode.length) {
                triggerChristmasTree(); // Lancer l'animation
                xmasPosition = 0;
            }
        } else {
            xmasPosition = 0;
            // Restart si la touche est le début de la séquence
            if (key === xmasCode[0].toLowerCase()) xmasPosition = 1;
        }
    });

    function triggerChristmasTree() {
        // 1. Création de l'overlay (fond sombre)
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'pointer';
        
        // Message de fermeture
        const closeText = document.createElement('div');
        closeText.innerText = "Joyeux Noël ! (Cliquez pour fermer)";
        closeText.style.position = 'absolute';
        closeText.style.bottom = '20px';
        closeText.style.color = '#FFF';
        closeText.style.fontFamily = "'Oswald', sans-serif";
        closeText.style.opacity = '0';
        closeText.style.transition = 'opacity 1s';
        overlay.appendChild(closeText);

        // 2. Création du Canvas
        const canvas = document.createElement('canvas');
        // Taille carrée responsive
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
        canvas.width = size;
        canvas.height = size;
        overlay.appendChild(canvas);
        document.body.appendChild(overlay);

        const ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // 3. Définition des points du sapin (coordonnées normalisées 0-1)
        const path = [
            {x: 0.5, y: 0.1},  // Sommet
            {x: 0.35, y: 0.3}, // Étage 1 Gauche
            {x: 0.45, y: 0.3}, // Rentrée 1
            {x: 0.25, y: 0.5}, // Étage 2 Gauche
            {x: 0.4, y: 0.5},  // Rentrée 2
            {x: 0.15, y: 0.8}, // Base Gauche
            {x: 0.85, y: 0.8}, // Base Droite
            {x: 0.6, y: 0.5},  // Rentrée 2 Droite
            {x: 0.75, y: 0.5}, // Étage 2 Droite
            {x: 0.55, y: 0.3}, // Rentrée 1 Droite
            {x: 0.65, y: 0.3}, // Étage 1 Droite
            {x: 0.5, y: 0.1}   // Retour au sommet
        ];

        // 4. Animation du dessin
        let currentPoint = 0;
        let progress = 0;
        const speed = 0.05; // Vitesse du dessin

        function animateDraw() {
            if (!document.body.contains(overlay)) return;

            // Calcul des points actuels
            const p1 = path[currentPoint];
            const p2 = path[currentPoint + 1];

            if (p2) {
                // Interpolation
                const x = p1.x + (p2.x - p1.x) * progress;
                const y = p1.y + (p2.y - p1.y) * progress;

                // Dessin du trait vert néon
                ctx.beginPath();
                ctx.moveTo(
                    (p1.x + (p2.x - p1.x) * (progress - speed)) * size, 
                    (p1.y + (p2.y - p1.y) * (progress - speed)) * size
                );
                ctx.lineTo(x * size, y * size);
                ctx.strokeStyle = '#0f0'; // Vert hacker/Noël
                ctx.lineWidth = 4;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#0f0';
                ctx.stroke();

                progress += speed;
                if (progress >= 1) {
                    currentPoint++;
                    progress = 0;
                    // Dessiner le point complet pour éviter les trous
                    ctx.lineTo(p2.x * size, p2.y * size);
                    ctx.stroke();
                }
                requestAnimationFrame(animateDraw);
            } else {
                // 5. Fin du dessin : Ajouter tronc, étoile et boules
                drawDecorations(ctx, size);
                closeText.style.opacity = '1';
            }
        }

        animateDraw();

        // Gestion de la fermeture
        overlay.addEventListener('click', () => {
            overlay.remove();
        });
    }

    function drawDecorations(ctx, size) {
        // 1. DESSIN DU TRONC
        ctx.fillStyle = '#8B4513';
        ctx.shadowBlur = 0;
        ctx.fillRect(size * 0.45, size * 0.8, size * 0.1, size * 0.15);

        // 2. DESSIN DE L'ÉTOILE
        ctx.beginPath();
        ctx.fillStyle = '#FFD700';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 20;
        const cx = size * 0.5;
        const cy = size * 0.1;
        const r = size * 0.04;
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((18 + i * 72) * 0.01745) * r + cx, 
                       -Math.sin((18 + i * 72) * 0.01745) * r + cy);
            ctx.lineTo(Math.cos((54 + i * 72) * 0.01745) * (r / 2) + cx, 
                       -Math.sin((54 + i * 72) * 0.01745) * (r / 2) + cy);
        }
        ctx.closePath();
        ctx.fill();

        // 3. DESSIN DES BOULES (Positions calculées à l'avance)
        const colors = ['#FF0000', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
        const pA = {x: 0.5, y: 0.2};   // Sommet
        const pB = {x: 0.25, y: 0.75}; // Bas Gauche
        const pC = {x: 0.75, y: 0.75}; // Bas Droite
        
        const balls = [];
        const maxBalls = 15;      // Nombre de boules
        const minDistance = size * 0.06; // Distance minimale entre les boules (6% de la taille)
        const safetyLimit = 500;  // Pour éviter une boucle infinie

        let attempts = 0;

        // Génération des positions valides
        while (balls.length < maxBalls && attempts < safetyLimit) {
            attempts++;

            // Point aléatoire dans le triangle
            let r1 = Math.random();
            let r2 = Math.random();
            if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }

            const bx = (pA.x + r1 * (pB.x - pA.x) + r2 * (pC.x - pA.x)) * size;
            const by = (pA.y + r1 * (pB.y - pA.y) + r2 * (pC.y - pA.y)) * size;

            // Vérification de la distance avec les autres boules
            let tooClose = false;
            for (let b of balls) {
                const dx = bx - b.x;
                const dy = by - b.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                if (distance < minDistance) {
                    tooClose = true;
                    break;
                }
            }

            // Si la place est libre, on valide
            if (!tooClose) {
                balls.push({ x: bx, y: by });
            }
        }

        // 4. ANIMATION DE L'APPARITION
        balls.forEach((ball, i) => {
            setTimeout(() => {
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, size * 0.015, 0, Math.PI * 2);
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                ctx.shadowColor = ctx.fillStyle;
                ctx.shadowBlur = 10;
                ctx.fill();
            }, i * 150); // Délai un peu plus long pour savourer
        });
    }

}); // ⬅️ FIN UNIQUE DU document.addEventListener('DOMContentLoaded', ...)
