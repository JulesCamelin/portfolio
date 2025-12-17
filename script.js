document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. GESTION DE LA LANGUE (UNIFIÉE POUR TOUT LE SITE)
    // ==========================================================
    const cvPaths = {
        en: 'assets/CV.pdf',      
        fr: 'assets/CV_fr.pdf' // Vérifiez bien que ce fichier existe dans le dossier assets !
    };

    const translations = {
        en: {
            // -- NAVIGATION GLOBAL --
            nav_about: "About",
            nav_skills: "Skills",
            nav_projects: "Projects",
            nav_refs: "Refs",
            nav_contact: "Contact",
            nav_home: "Back to Portfolio", // Pour la page mechanics

            // -- INDEX.HTML (Accueil) --
            intro_title: "Jules CAMELIN",
            intro_subtitle: "Data Analysis & Performance Engineering",
            intro_desc: "Mechanic & Developer based in France.",
            cv_button: "Download CV (PDF)",
            
            section_about: "My Profile and Vision",
            bio_title: "IT Student | Data & Performance Enthusiast",
            bio_age: "19 years old",
            bio_hobby: "Motorsport Enthusiast",
            bio_desc: "Hello! I'm a second-year IT student focused on Data Analysis and Performance Engineering. This portfolio presents my academic work, personal projects, and commitment to discipline, developed through my studies, my military service, and my passion for motorsport.",

            tl_academic_title: "🎓 Academic Background",
            tl_academic_desc: "I am currently a second-year student in Computer Science at IUT Annecy. This program allows me to acquire solid expertise in development and information systems, while fueling my passion for technological innovation.",
            
            tl_military_title: "🛡️ Military and Civic Commitment",
            tl_military_desc: "I am a reservist in the 13th Battalion of Chasseurs Alpins (13th BCA). This commitment reflects my sense of responsibility, discipline, and desire for self-improvement, qualities that I also apply in my professional projects.",

            tl_sports_title: "🤸 Sports and Hobbies",
            tl_sports_desc: "I have been practicing Gymnastics for 10 years. This sport has taught me rigor, perseverance, and precision—fundamental assets in the field of programming.",

            tl_meca_title: "⚙️ Personal Mechanical Projects",
            tl_meca_desc: "As a mechanic and restoration enthusiast, I am currently working on repairing my car, a Peugeot 205 Junior, as well as an MBK 40V moped. My next project will be the restoration of a Peugeot 125 LD 57 TAL motorcycle.",

            tl_club_title: "🚗 Associative Life: Club 205 Savoie",
            tl_club_desc: "I am the president of my 205 club in Savoie. This role allows me to develop my skills in team management, event organization, and sharing my passion for this iconic model with other enthusiasts.",

            section_exp: "Professional and Club Experience",
            exp_web_title: "Full-Stack Web Development Project (University of savoy / iut annecy – Annecy-le vieux, France- Humanis)",
            exp_web_desc: "Managed and developed a Laravel-based website for Humanis as part of a university project, handling data management, programming, and design. Coordinated team efforts to ensure successful project delivery.<br>Tech used: PHP, Laravel, HTML, CSS, SQL.",
            
            exp_coach_title: "Volunteer Coaching & Discipline (La Salesienne / Étoile Motteraine - Savoy, France)",
            exp_coach_desc: "Volunteered as a coach for children and teens (ages 4 to 15) in gymnastics, organizing sessions and leading activities. Focused on promoting discipline and teamwork in a sports environment.",
            
            exp_labor_title: "Physical Labor & Teamwork (Grand Chambéry - Chambéry, France)",
            exp_labor_desc: "Executed physical tasks for waste collection management, ensuring safety and demonstrating efficient collaboration and responsibility within the team.",

            section_skills: "SKILLS, TECHNOLOGIES & LANGUAGES",
            cat_dev: "DEVELOPMENT LANGUAGES",
            cat_data: "DATA & DATABASE",
            cat_tools: "TOOLS & DESIGN",
            cat_lang: "LANGUAGE SKILLS",
            lang_fr: "French: Native speaker",
            lang_en: "English: B2 (Upper intermediate)",
            lang_it: "Italian: B1 (Intermediate)",
            lang_fi: "Finnish: A0 (Beginner)",

            section_projects: "Projects",
            filter_all: "All",
            filter_academic: "Academic",
            filter_personal: "Personal",
            filter_company: "Company",

            proj_portfolio_title: "My Personal & Academic Portfolio (Jules CAMELIN)",
            proj_portfolio_desc: "Complete creation of this Formula 1-themed portfolio. It features a futuristic design, synchronized animations.",
            proj_portfolio_tech:"Tech Used: HTML5, CSS, JavaScript",

            proj_loxam_desc: "Academic project involving database design and application development for a rental company (LOXAM). Focus on system architecture and robust database interaction.",
            proj_loxam_tech:"Tech Used: Visual Studio, C#, PostgreSQL, UML",
            proj_loxam_date: "March 2025",

            proj_frog_desc: "Academic project completed as part of my first year of IT studies (BUT1). This was a group project (3 people) involving game development.",
            proj_frog_tech:"Tech Used: C#, Unity",
            proj_frog_date: "March 2025",
            
            proj_cupidon_desc: "Terminal-coded game (2023/2024).",
            proj_cupidon_tech:"Tech Used: Python, Command Line Interface",

            proj_club_title: "Club 205 – Membership Card Design",
            proj_club_desc: "Designed a full membership card.",
            proj_club_tech: "Tech Used: CANVA",
            proj_club_date: "October 2025",

            proj_gym_title: "Gym Club – Entrance Visual",
            proj_gym_desc: "Created the official gym entrance visual.",
            proj_gym_tech: "Tech Used: CANVA",
            proj_gym_date: "October 2025",
            
            
            date_ongoing: "Ongoing",
            btn_source: "View Source Code",
            btn_design: "View Design",
            view_other_projects: "View My Other Personal Projects",

            section_refs: "Professional References",
            ref_intro: "Two professional references are available upon request to validate my skills and commitment in professional and associative settings. They include:",
            ref_1_title: "Reference 1: Summer job",
            ref_1_desc : "Waste collection manager, Grand Chambéry",
            ref_2_title: "Reference 2: Military",
            ref_2_desc: "13th BCA's reserve Commander",
            ref_contact_info: "Please use the contact form or email below to request a direct connection with these individuals.",

            section_cv: "My CV",
            cv_preview: "You can preview and download my CV below:",
            
            section_contact: "Contact Me",
            contact_phone: "Phone",
            form_title: "Send Me a Message",
            form_name: "Name",
            form_email: "Email",
            form_phone: "Phone (Optional)",
            form_msg: "Your Message",
            form_btn: "Send Message",

            // Placeholders
            form_ph_name: "Your Name",
            form_ph_msg: "Tell me about your project or inquiry...",
            form_ph_email : "your.email@example.com",
            footer_txt: "© 2025 – Jules Camelin Portfolio",

            // -- MECHANICS.HTML (Page Méca - Nouveaux Textes) --
            meca_title: "🔧 Engine and Restoration Projects",
            meca_intro_desc: "Beyond IT, mechanics is a strong passion. These projects demonstrate my rigor, perseverance, and ability to manage hands-on projects, from initial diagnosis to final finishing.",
            
            meca_peugeot_title: "Peugeot 205 Junior (Repair and Bodywork)",
            meca_peugeot_desc: "Complete engine repair and ignition system maintenance, along with bodywork restoration. A long-term project that got the car back on the road.",
            meca_before: "Before",
            meca_after: "Finished result",

            meca_mbk_title: "MBK 40V (Full Restoration)",
            meca_mbk_desc: "Total disassembly for a complete restoration, including engine overhaul, frame painting, and reassembly using original parts.",
            meca_initial: "Initial state",
            meca_restored: "Restoration completed",

            meca_moto_title: "Peugeot 125 LD 57 TAL (Restoration In Progress)",
            meca_moto_desc: "My next major project. Restoring a vintage motorcycle requiring expertise in 2-stroke engines and full chassis repair. Work has just started.",
            meca_current: "Current state / Project start",
            
            nav_home: "← Back to Portfolio",
            footer_txt: "© 2025 – Jules Camelin Portfolio"
        },
        fr: {
            // -- NAVIGATION GLOBAL --
            nav_about: "Moi",
            nav_skills: "Compèt.",
            nav_projects: "Projets",
            nav_refs: "Refs",
            nav_contact: "Contact",
            nav_home: "Retour Portfolio",

            // -- INDEX.HTML (Accueil) --
            intro_title: "Jules CAMELIN",
            intro_subtitle: "Analyse de Données & Ingénierie de Performance",
            intro_desc: "Mécanicien & Développeur basé en France.",
            cv_button: "Télécharger le CV",
            
            section_about: "Mon Profil et ma Vision",
            bio_title: "Étudiant Informatique | Passionné de Data & Performance",
            bio_age: "19 ans",
            bio_hobby: "Passionné de Sport Automobile",
            bio_desc: "Bonjour ! Je suis étudiant en deuxième année d'informatique, spécialisé en Analyse de Données et Ingénierie de Performance. Ce portfolio présente mes travaux académiques, projets personnels et mon engagement envers la discipline, développés à travers mes études, mon service militaire et ma passion pour le sport automobile.",

            tl_academic_title: "🎓 Parcours Académique",
            tl_academic_desc: "Je suis actuellement étudiant en deuxième année de BUT Informatique à l'IUT d'Annecy. Ce cursus me permet d'acquérir une solide expertise en développement et systèmes d'information, tout en nourrissant ma passion pour l'innovation technologique.",
            
            tl_military_title: "🛡️ Engagement Militaire et Citoyen",
            tl_military_desc: "Je suis réserviste au 13ème Bataillon de Chasseurs Alpins (13e BCA). Cet engagement reflète mon sens des responsabilités, ma discipline et ma volonté de dépassement de soi, des qualités que j'applique également dans mes projets professionnels.",

            tl_sports_title: "🤸 Sports et Loisirs",
            tl_sports_desc: "Je pratique la gymnastique depuis 10 ans. Ce sport m'a enseigné la rigueur, la persévérance et la précision — des atouts fondamentaux dans le domaine de la programmation.",

            tl_meca_title: "⚙️ Projets Mécaniques Personnels",
            tl_meca_desc: "Passionné de mécanique et de restauration, je travaille actuellement sur la réparation de ma voiture, une Peugeot 205 Junior, ainsi que sur une mobylette MBK 40V. Mon prochain projet sera la restauration d'une moto Peugeot 125 LD 57 TAL.",

            tl_club_title: "🚗 Vie Associative : Club 205 Savoie",
            tl_club_desc: "Je suis président de mon club 205 en Savoie. Ce rôle me permet de développer mes compétences en gestion d'équipe, organisation d'événements et de partager ma passion pour ce modèle emblématique avec d'autres passionnés.",

            section_exp: "Expérience Professionnelle et Associative",
            exp_web_title: "Projet Développement Web Full-Stack (Université de Savoie / IUT Annecy – Humanis)",
            exp_web_desc: "Gestion et développement d'un site web basé sur Laravel pour Humanis dans le cadre d'un projet universitaire. Gestion des données, programmation et design. Coordination des efforts d'équipe pour assurer la réussite du projet.<br>Technos : PHP, Laravel, HTML, CSS, SQL.",
            
            exp_coach_title: "Coaching Bénévole & Discipline (La Salesienne / Étoile Motteraine - Savoie)",
            exp_coach_desc: "Bénévole en tant qu'entraîneur de gymnastique pour enfants et adolescents (4 à 15 ans). Organisation des séances et animation. Accent mis sur la discipline et le travail d'équipe dans un environnement sportif.",
            
            exp_labor_title: "Travail Physique & Équipe (Grand Chambéry - Chambéry)",
            exp_labor_desc: "Exécution de tâches physiques pour la gestion de la collecte des déchets, assurant la sécurité et faisant preuve d'une collaboration efficace et de responsabilité au sein de l'équipe.",

            section_skills: "COMPÉTENCES, TECHNOLOGIES & LANGUES",
            cat_dev: "LANGAGES DE DÉVELOPPEMENT",
            cat_data: "DONNÉES & BASES DE DONNÉES",
            cat_tools: "OUTILS & DESIGN",
            cat_lang: "COMPÉTENCES LINGUISTIQUES",
            lang_fr: "Français : Langue maternelle",
            lang_en: "Anglais : B2 (Intermédiaire supérieur)",
            lang_it: "Italien : B1 (Intermédiaire)",
            lang_fi: "Finnois : A0 (Débutant)",

            section_projects: "Projets",
            filter_all: "Tout",
            filter_academic: "Académique",
            filter_personal: "Personnel",
            filter_company: "Entreprise",

            proj_portfolio_title: "Mon Portfolio Personnel & Académique",
            proj_portfolio_desc: "Création complète de ce portfolio sur le thème de la Formule 1. Design futuriste et animations synchronisées.",
            proj_portfolio_tech:"Logiciels utilisés: HTML5, CSS, JavaScript",

            proj_loxam_desc: "Projet académique impliquant la conception de base de données et le développement d'une application pour une entreprise de location (LOXAM). Architecture système et interaction base de données robuste.",
            proj_loxam_tech:"Logiciels utilisés: Visual Studio, C#, PostgreSQL, UML",
            proj_loxam_date: "Mars 2025",

            proj_frog_desc: "Projet académique réalisé en première année (BUT1). Projet de groupe (3 personnes) de développement de jeu vidéo.",
            proj_frog_tech:"Logiciels utilisés: C#, Unity",
            proj_frog_date: "Mars 2025",

            proj_cupidon_desc: "Jeu codé dans un terminal (2023/2024).",
            proj_cupidon_tech:"Logiciels utilisés : Python, interface en ligne de commande",
            
            proj_club_title: "Club 205 – Design Carte Membre",
            proj_club_desc: "Design complet de la carte de membre.",
            proj_club_tech: "Logiciel utilisé: CANVA",
            proj_club_date: "Octobre 2025",
            
            proj_gym_title: "Club de Gym – Visuel Entrée",
            proj_gym_desc: "Création du visuel officiel pour l'entrée du gymnase.",
            proj_gym_tech: "Logiciel utilisé: CANVA",
            proj_gym_date: "Octobre 2025",
            
            date_ongoing: "En cours",
            btn_source: "Voir le Code Source",
            btn_design: "Voir le Design",
            view_other_projects: "Voir mes autres projets personnels",

            section_refs: "Références Professionnelles",
            ref_intro: "Deux références professionnelles sont disponibles sur demande pour valider mes compétences et mon engagement. Elles incluent :",
            ref_1_title: "Référence 1 : Job d'été",
            ref_1_desc : "Responsable de la collecte des déchets, Grand Chambéry",
            ref_2_title: "Référence 2 : Militaire",
            ref_2_desc: "Commandant réserve du 13e BCA",
            ref_contact_info: "Veuillez utiliser le formulaire de contact ou l'email ci-dessous pour demander une mise en relation directe.",

            section_cv: "Mon CV",
            cv_preview: "Vous pouvez prévisualiser et télécharger mon CV ci-dessous :",
            cv_button: "Télécharger mon CV (PDF)",

            section_contact: "Me Contacter",
            contact_phone: "Téléphone",
            form_title: "Envoyez-moi un message",
            form_name: "Nom",
            form_email: "Email",
            form_phone: "Téléphone (Optionnel)",
            form_msg: "Votre Message",
            form_btn: "Envoyer votre message",

            // Placeholders
            form_ph_name: "Votre Nom",
            form_ph_msg: "Parlez-moi de votre projet...",
            form_ph_email : "votre.email@exemple.com",

            footer_txt: "© 2025 – Portfolio Jules Camelin",

            // -- MECHANICS.HTML (Page Méca - Nouveaux Textes Traduits) --
            meca_title: "🔧 Projets Moteur et Restauration",
            meca_intro_desc: "Au-delà de l'informatique, la mécanique est une véritable passion. Ces projets démontrent ma rigueur, ma persévérance et ma capacité à gérer des projets concrets, du diagnostic initial aux finitions.",
            
            meca_peugeot_title: "Peugeot 205 Junior (Réparation et Carrosserie)",
            meca_peugeot_desc: "Réparation complète du moteur et maintenance de l'allumage, ainsi que restauration de la carrosserie. Un projet de longue haleine pour remettre la voiture sur la route.",
            meca_before: "Avant",
            meca_after: "Résultat final",

            meca_mbk_title: "MBK 40V (Restauration Complète)",
            meca_mbk_desc: "Démontage total pour une restauration complète, incluant la révision moteur, la peinture du cadre et le remontage avec des pièces d'origine.",
            meca_initial: "État initial",
            meca_restored: "Restauration terminée",

            meca_moto_title: "Peugeot 125 LD 57 TAL (Restauration en cours)",
            meca_moto_desc: "Mon prochain projet majeur. Restauration d'une moto ancienne nécessitant une expertise moteur 2 temps et une réparation complète du châssis. Le travail vient de commencer.",
            meca_current: "État actuel / Début de projet",
            
            nav_home: "← Retour au Portfolio",
            footer_txt: "© 2025 – Portfolio Jules Camelin"
        }
    };

    // --- LOGIQUE DE CHANGEMENT DE LANGUE (PERSISTANTE) ---
    const langBtn = document.getElementById('lang-toggle');
    const cvLink = document.getElementById('cv-link'); // Peut être null sur mechanics.html
    const cvLinkEmbed = document.querySelector('.cv-viewer'); // Pour l'aperçu PDF (si présent)
    
    // 1. Charger la langue sauvegardée ou défaut 'en'
    let currentLang = localStorage.getItem('preferredLang') || 'en';
    
    // Fonction pour appliquer la langue
    const applyLanguage = (lang) => {
        // Mise à jour du bouton
        if (langBtn) {
            langBtn.textContent = lang === 'en' ? '🇫🇷 FR' : '🇬🇧 EN';
        }

        // Changement du lien CV (Seulement si l'élément existe sur la page)
        if (cvLink) {
            // On vérifie le fichier avant d'appliquer
            cvLink.href = cvPaths[lang];
            // Optionnel: Mettre à jour l'embed viewer si présent
            if(cvLinkEmbed) {
                cvLinkEmbed.src = cvPaths[lang];
            }
        }

        // Traduction des textes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.type !== 'submit') element.placeholder = translations[lang][key];
                } 
                else if (element.tagName === 'SPAN' && element.parentElement.type === 'submit') {
                    element.innerText = translations[lang][key];
                }
                else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });
    };

    // 2. Appliquer la langue au chargement de la page
    applyLanguage(currentLang);

    // 3. Écouteur sur le bouton (S'il existe)
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            // Basculer la langue
            currentLang = currentLang === 'en' ? 'fr' : 'en';
            
            // Sauvegarder le choix
            localStorage.setItem('preferredLang', currentLang);
            
            // Appliquer les changements
            applyLanguage(currentLang);
        });
    }

    // ==========================================================
    // 2. LOGIQUE LIGHTBOX
    // ==========================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const projectImages = document.querySelectorAll('.open-lightbox-trigger');

    if (lightbox && lightboxImg && closeBtn && projectImages.length > 0) {
        projectImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault(); // Empêcher comportement par défaut
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
    // 3. FILTRES PROJETS (Index seulement)
    // ==========================================================
    const filterButtons = document.querySelectorAll('.filters button');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    card.style.display = 'none';
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    }
                });
            });
        });
    }

    // ==========================================================
    // 4. ANIMATION CANVAS (Lignes rouges)
    // ==========================================================
    const canvas = document.getElementById('speedCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, lines = [];
        const MAX_LINES = 10; 
        
        function resizeCanvas() {
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W;
            canvas.height = H;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Line {
            constructor() { this.reset(); this.y = Math.random() * H; }
            reset() {
                this.x = Math.random() * W;
                this.y = -50;
                this.length = Math.random() * 30 + 20;
                this.vy = Math.random() * 1.5 + 1; 
                this.color = `rgba(255, 0, 0, ${Math.random() * 0.2 + 0.05})`;
            }
            update() {
                this.y += this.vy;
                if (this.y > H + this.length) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x, this.y + this.length);
                ctx.stroke();
            }
        }
        for (let i = 0; i < MAX_LINES; i++) lines.push(new Line());
        function animate() {
            ctx.clearRect(0,0,W,H); // Clean canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'; 
            lines.forEach(l => { l.update(); l.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
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
                // AJOUT : Affiche dans la console sur quoi on clique
                console.log("Clic détecté sur :", light.textContent);
                
                e.preventDefault(); 
                const targetId = light.getAttribute('href');
                console.log("Cible visée :", targetId); // Vérifie si ça affiche #skills
        
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log("Element trouvé, on scroll !");
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else {
                    console.error("ERREUR : Impossible de trouver la section " + targetId);
                }
                
                // Gestion des classes active
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
    // 7. KONAMI CODE (SAPIN NOËL)
    // ==========================================================
    const xmasCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
    let xmasPosition = 0;

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const key = e.key.toLowerCase();
        const targetKey = xmasCode[xmasPosition].toLowerCase();

        if (key === targetKey) {
            xmasPosition++;
            if (xmasPosition === xmasCode.length) {
                triggerChristmasTree();
                xmasPosition = 0;
            }
        } else {
            xmasPosition = 0;
            if (key === xmasCode[0].toLowerCase()) xmasPosition = 1;
        }
    });

    function triggerChristmasTree() {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed'; overlay.style.top = '0'; overlay.style.left = '0';
        overlay.style.width = '100vw'; overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.9)'; overlay.style.zIndex = '99999';
        overlay.style.display = 'flex'; overlay.style.justifyContent = 'center'; overlay.style.alignItems = 'center';
        
        const canvas = document.createElement('canvas');
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
        canvas.width = size; canvas.height = size;
        overlay.appendChild(canvas);
        
        const closeText = document.createElement('div');
        closeText.innerText = "Joyeux Noël ! (Cliquez pour fermer)";
        closeText.style = 'position:absolute;bottom:20px;color:white;font-family:sans-serif;opacity:0;transition:opacity 1s';
        overlay.appendChild(closeText);
        
        document.body.appendChild(overlay);

        const ctx = canvas.getContext('2d');
        const path = [{x:0.5,y:0.1}, {x:0.35,y:0.3}, {x:0.45,y:0.3}, {x:0.25,y:0.5}, {x:0.4,y:0.5}, {x:0.15,y:0.8}, {x:0.85,y:0.8}, {x:0.6,y:0.5}, {x:0.75,y:0.5}, {x:0.55,y:0.3}, {x:0.65,y:0.3}, {x:0.5,y:0.1}];
        
        let currentPoint = 0; let progress = 0;
        function animateDraw() {
            if (!document.body.contains(overlay)) return;
            const p1 = path[currentPoint]; const p2 = path[currentPoint+1];
            if (p2) {
                const x = p1.x + (p2.x - p1.x) * progress;
                const y = p1.y + (p2.y - p1.y) * progress;
                ctx.beginPath();
                ctx.moveTo((p1.x + (p2.x - p1.x) * (progress - 0.05)) * size, (p1.y + (p2.y - p1.y) * (progress - 0.05)) * size);
                ctx.lineTo(x * size, y * size);
                ctx.strokeStyle = '#0f0'; ctx.lineWidth = 4; ctx.shadowBlur = 10; ctx.shadowColor = '#0f0'; ctx.stroke();
                progress += 0.05;
                if (progress >= 1) { currentPoint++; progress = 0; ctx.lineTo(p2.x*size, p2.y*size); ctx.stroke();}
                requestAnimationFrame(animateDraw);
            } else {
                drawDecorations(ctx, size); closeText.style.opacity = '1';
            }
        }
        animateDraw();
        overlay.addEventListener('click', () => overlay.remove());
    }

    function drawDecorations(ctx, size) {
        // Tronc
        ctx.fillStyle = '#8B4513'; ctx.shadowBlur = 0;
        ctx.fillRect(size * 0.45, size * 0.8, size * 0.1, size * 0.15);
        // Etoile
        ctx.beginPath(); ctx.fillStyle = '#FFD700'; ctx.shadowColor = '#FFD700'; ctx.shadowBlur = 20;
        const cx = size * 0.5, cy = size * 0.1, r = size * 0.04;
        for (let i=0; i<5; i++) {
            ctx.lineTo(Math.cos((18+i*72)*0.01745)*r+cx, -Math.sin((18+i*72)*0.01745)*r+cy);
            ctx.lineTo(Math.cos((54+i*72)*0.01745)*(r/2)+cx, -Math.sin((54+i*72)*0.01745)*(r/2)+cy);
        }
        ctx.closePath(); ctx.fill();
        // Boules
        const colors = ['#FF0000', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500'];
        const pA={x:0.5,y:0.2}, pB={x:0.25,y:0.75}, pC={x:0.75,y:0.75};
        let balls=[]; let attempts=0;
        while(balls.length < 15 && attempts < 500) {
            attempts++;
            let r1=Math.random(), r2=Math.random();
            if(r1+r2>1){r1=1-r1; r2=1-r2;}
            const bx=(pA.x+r1*(pB.x-pA.x)+r2*(pC.x-pA.x))*size;
            const by=(pA.y+r1*(pB.y-pA.y)+r2*(pC.y-pA.y))*size;
            let ok=true;
            for(let b of balls) { if(Math.hypot(bx-b.x, by-b.y) < size*0.06) ok=false; }
            if(ok) balls.push({x:bx, y:by});
        }
        balls.forEach((b,i) => {
            setTimeout(() => {
                ctx.beginPath(); ctx.arc(b.x, b.y, size*0.015, 0, Math.PI*2);
                ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
                ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 10; ctx.fill();
            }, i*150);
        });
    }

});
