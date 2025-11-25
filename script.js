document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // LOGIQUE LIGHTBOX (Pour l'affichage des images de projets)
    // ==========================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const projectImages = document.querySelectorAll('.open-lightbox-trigger');

    if (lightbox && lightboxImg && closeBtn && projectImages.length > 0) {
        // Ouvre la Lightbox
        projectImages.forEach(img => {
            img.addEventListener('click', () => {
                const imgSrc = img.getAttribute('data-src') || img.src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Empêche le défilement
            });
        });

        // Ferme la Lightbox via le bouton X
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = ''; // Réactive le défilement
        });

        // Ferme la Lightbox en cliquant sur l'overlay
        lightbox.addEventListener('click', (e) => {
            if (e.target.id === 'lightbox') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    // ==========================================================
    // LOGIQUE CANVAS F1 FUTURISTE (10 LIGNES Subtiles)
    // ==========================================================
    const canvas = document.getElementById('speedCanvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H;
        
        // --- CONSTANTES AJUSTÉES POUR LE STYLE DEMANDÉ ---
        const MAX_LINES = 10;   // 10 traits maximum (discret)
        const MAX_LENGTH = 50;  // Longueur max 50px (plus gros)
        const MIN_LENGTH = 20; 
        const LINE_WIDTH = 2;   // Largeur des traits (plus gros)
        // --------------------------------------------------

        let lines = [];

        // Gestion du redimensionnement
        function resizeCanvas() {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); 

        // Classe pour gérer chaque trait individuel
        class Line {
            constructor() {
                this.reset();
                this.y = Math.random() * H; // Position initiale Y aléatoire pour peupler l'écran au démarrage
            }

            reset() {
                this.x = Math.random() * W;
                this.y = -MIN_LENGTH; // Redémarre au-dessus de l'écran
                this.length = Math.random() * (MAX_LENGTH - MIN_LENGTH) + MIN_LENGTH;
                
                // Vitesse verticale
                this.vy = Math.random() * 1.5 + 1; 
                
                // Opacité très faible (plus transparent)
                this.opacity = Math.random() * 0.2 + 0.05; 
                this.color = `rgba(255, 0, 0, ${this.opacity})`;

                // Très léger glissement horizontal
                this.vx = (Math.random() - 0.5) * 0.05; 
            }

            update() {
                this.y += this.vy;
                this.x += this.vx;

                // Réinitialise le trait s'il sort par le bas
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

        // Initialisation des 10 traits
        for (let i = 0; i < MAX_LINES; i++) {
            lines.push(new Line());
        }

        // Boucle d'animation
        function animate() {
            // Créer une légère traînée (motion blur) en recouvrant avec un fond très transparent
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
            ctx.fillRect(0, 0, W, H);

            for (let i = 0; i < lines.length; i++) {
                lines[i].update();
                lines[i].draw();
            }

            requestAnimationFrame(animate);
        }

        // Démarre l'animation
        animate();
    }
    // ... (dans votre script.js, à l'intérieur de DOMContentLoaded) ...

const indicatorContainer = document.querySelector('.f1-indicator-container');
const indicatorDots = document.querySelectorAll('.f1-indicator-dots .dot');

if (indicatorContainer && indicatorDots.length > 0) {
    const animateF1Indicator = () => {
        indicatorContainer.style.opacity = '1'; 

        indicatorDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.classList.add('active');
            }, index * 200); 
        });

        setTimeout(() => {
            indicatorDots.forEach(dot => dot.classList.remove('active'));
            // Optionnel: Rappeler la fonction pour une animation en boucle
            // animateF1Indicator(); 
        }, indicatorDots.length * 200 + 1000); 
    };
    setTimeout(animateF1Indicator, 1000); 
}
// ==========================================================
    // LOGIQUE DE FILTRAGE DES PROJETS (Pour #projects dans index.html)
    // ==========================================================
    const filterButtons = document.querySelectorAll('.filters button');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    // Vérifie si les éléments existent avant d'ajouter les écouteurs
    if (filterButtons.length > 0 && projectCards.length > 0) {
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                
                // 1. Gérer l'état actif du bouton
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // 2. Filtrer les cartes de projets
                projectCards.forEach(card => {
                    
                    // Masquer la carte par défaut (avec une transition pour l'effet)
                    card.style.opacity = '0';
                    card.style.display = 'none';

                    // Vérifier si la carte correspond au filtre
                    // Si 'all' est sélectionné OU si la carte contient la classe de filtre (ex: 'academic')
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        
                        // Afficher la carte
                        card.style.display = 'block'; // Remettre l'affichage en block (ou grid/flex selon votre mise en page)
                        
                        // Laissez un petit délai pour que la transition d'opacité fonctionne après l'affichage
                        setTimeout(() => {
                             card.style.opacity = '1';
                        }, 50); 
                    }
                });
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {

        // ... (Votre LOGIQUE LIGHTBOX existante) ...
        // ... (Votre LOGIQUE CANVAS F1 FUTURISTE existante) ...
        // ... (Votre LOGIQUE DE FILTRAGE DES PROJETS existante) ...
        // ... (Votre LOGIQUE INDICATEUR F1 (Allumage des points) si vous voulez la garder séparée) ...
    
    
        // ==========================================================
        // NOUVELLE LOGIQUE : FEUX DE DÉPART F1 (ANIMATION NAVIGATION)
        // ==========================================================
        const startLights = document.querySelectorAll('.f1-start-lights .start-light');
        const f1StartLightsNav = document.querySelector('.f1-start-lights');
    
        if (startLights.length > 0) {
            // Optionnel: Faire clignoter le bouton "All" des filtres pendant l'animation
            const filterAllButton = document.querySelector('.filters button[data-filter="all"]');
    
            const animateStartLights = (loop = false) => {
                let delay = 0;
                // Éteindre tous les feux d'abord
                startLights.forEach(light => light.classList.remove('active'));
    
                // Allumer les feux un par un
                startLights.forEach((light, index) => {
                    setTimeout(() => {
                        light.classList.add('active');
                        // Optionnel: Ajouter un son court ici pour chaque feu (non implémenté)
                    }, delay);
                    delay += 300; // 300ms entre chaque feu
                });
    
                // Après que tous les feux soient allumés, simuler le "GO!" ou le retour
                setTimeout(() => {
                    startLights.forEach(light => light.classList.remove('active')); // Éteindre tous les feux
                    if (filterAllButton) {
                        filterAllButton.classList.add('active'); // Réactiver le bouton 'All'
                    }
    
                    // Si la boucle est activée, relancer l'animation après un délai
                    if (loop) {
                        setTimeout(() => animateStartLights(true), 3000); // Attendre 3s avant de relancer
                    }
                }, delay + 1000); // 1 seconde après le dernier feu
            };
    
            // Déclencher l'animation des feux au chargement de la page
            // Lancer l'animation une seule fois ou en boucle au démarrage
            setTimeout(() => animateStartLights(false), 2000); // Démarrer 2 secondes après DOMContentLoaded
    
            // Rendre les feux cliquables pour naviguer
            startLights.forEach(light => {
                light.addEventListener('click', (e) => {
                    e.preventDefault(); // Empêcher le comportement de lien par défaut pour l'animation
                    const targetId = light.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    // Optionnel: Activer le feu cliqué
                    startLights.forEach(btn => btn.classList.remove('active'));
                    light.classList.add('active');
                });
            });
        }

        document.addEventListener('DOMContentLoaded', () => {

    // ... (Votre LOGIQUE LIGHTBOX existante) ...
    // ... (Votre LOGIQUE CANVAS F1 FUTURISTE existante) ...
    // ... (Votre LOGIQUE INDICATEUR F1 (Allumage des points) existante) ...
    // ... (Votre LOGIQUE DE FILTRAGE DES PROJETS existante) ...
    // ... (Votre NOUVELLE LOGIQUE : FEUX DE DÉPART F1 (ANIMATION NAVIGATION) existante) ...

    // ==========================================================
    // LOGIQUE KONAMI CODE (EASTER EGG)
    // ==========================================================
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiCodePosition = 0;

    const konamiOverlay = document.getElementById('konami-overlay');

    document.addEventListener('keydown', (e) => {
        // Vérifie si la touche pressée correspond à l'étape actuelle du Konami Code
        if (e.key === konamiCode[konamiCodePosition]) {
            konamiCodePosition++;

            // Si toutes les étapes du code sont réussies
            if (konamiCodePosition === konamiCode.length) {
                console.log("Konami Code Activated!");
                konamiOverlay.classList.add('active'); // Affiche l'overlay
                konamiCodePosition = 0; // Réinitialise pour une prochaine activation
            }
        } else {
            // Si une touche incorrecte est pressée, réinitialise la position
            konamiCodePosition = 0;
        }
    });

    // Cacher l'overlay quand on clique dessus
    if (konamiOverlay) {
        konamiOverlay.addEventListener('click', () => {
            konamiOverlay.classList.remove('active'); // Cache l'overlay
        });
    }

}); // Fin de DOMContentLoaded
    }); // Fin de DOMContentLoaded
});

