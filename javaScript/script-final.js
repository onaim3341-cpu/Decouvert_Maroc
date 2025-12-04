document.addEventListener("DOMContentLoaded", function () {

    const searchIcon = document.getElementById("searchIcon");
    const searchInput = document.getElementById("searchInput");
    const langSelect = document.getElementById("langSelect");
    const cardsContainer = document.querySelector(".cards-container");

    // Petite fonction utilitaire pour savoir si on est sur la page index
    function isOnIndexPage() {
        const path = window.location.pathname;
        return path.endsWith("index.html") || path.endsWith("idex.htm") || path.endsWith("index");
    }

    // Fonction qui filtre les villes sur la page d'accueil
    function performCitySearch(query) {
        const cards = document.querySelectorAll(".cards-container .card-link");

        if (cards.length === 0) {
            return false; // aucune carte => pas sur la bonne page
        }

        let found = false;

        cards.forEach(card => {
            const titleElement = card.querySelector("h3");
            const cityName = titleElement
                ? titleElement.textContent.toLowerCase()
                : "";

            if (cityName.includes(query)) {
                card.style.display = "inline-block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (!found) {
            alert("Aucune ville trouvée !");
            cards.forEach(card => card.style.display = "inline-block");
            if (cardsContainer) {
                cardsContainer.classList.remove("single-result");
            }
            return true; // on a bien cherché, même si rien trouvé
        }

        const visibleCards = Array.from(cards).filter(card => card.style.display !== "none");

        // Centrage si une seule carte
        if (cardsContainer) {
            if (visibleCards.length === 1) {
                cardsContainer.classList.add("single-result");
            } else {
                cardsContainer.classList.remove("single-result");
            }
        }

        // Scroll vers la section Villes (titre + scroll-margin-top)
        const villeSection = document.getElementById("ville");
        if (villeSection) {
            villeSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        // Centrer horizontalement la première carte visible
        const firstVisibleCard = visibleCards[0];
        if (firstVisibleCard) {
            firstVisibleCard.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });
        }

        return true;
    }

    // Si la barre de recherche existe
    if (searchIcon && searchInput) {

        // Ouvrir / fermer le champ de recherche
        searchIcon.addEventListener("click", function () {
            searchInput.classList.toggle("active");

            if (searchInput.classList.contains("active")) {
                searchInput.focus();
            } else {
                searchInput.value = "";

                // Réafficher toutes les villes si on ferme la recherche (sur index)
                const cardsLinks = document.querySelectorAll(".cards-container .card-link");
                cardsLinks.forEach(a => {
                    a.style.display = "inline-block";
                });

                if (cardsContainer) {
                    cardsContainer.classList.remove("single-result");
                }
            }
        });

        // Touche Entrée dans le champ de recherche
        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();

                const query = searchInput.value.trim().toLowerCase();
                if (query === "") {
                    alert("Veuillez entrer un mot-clé.");
                    return;
                }

                // Si on est sur la page d'accueil → filtrer les villes
                if (isOnIndexPage()) {
                    performCitySearch(query);
                } else {
                    // Sinon → redirection vers index.html avec le mot recherché

                    const path = window.location.pathname;
                    let indexPath = "index.html";

                    // Si on est dans /villes/ ou autre sous-dossier → remonter d'un niveau
                    if (path.includes("/villes/")) {
                        indexPath = "../index.html";
                    }

                    const url = indexPath + "?search=" + encodeURIComponent(query) + "#ville";
                    window.location.href = url;
                }
            }
        });
    }

    // 🔁 Au chargement de la page d'accueil, on regarde s'il y a ?search= dans l'URL
    if (isOnIndexPage() && searchInput) {
        const params = new URLSearchParams(window.location.search);
        const initialSearch = params.get("search");

        if (initialSearch) {
            searchInput.classList.add("active");
            searchInput.value = initialSearch;
            performCitySearch(initialSearch.toLowerCase());
        }
    }




    /* ------------------------------------------------
       2) Traductions FR / EN (index + about + contact + footer)
       ------------------------------------------------ */

    const translations = {
        fr: {
            navHome: "Accueil",
            navVille: "Villes",
            navAbout: "À propos",
            navContact: "Contact",

            title: "Découvre le Maroc",
            intro: "Le Maroc t’invite à découvrir ses villes colorées, ses paysages variés et une hospitalité unique.",

            title_ville: "Villes",
            city_rabat: "Rabat",
            city_chefchaouen: "Chefchaouen",
            city_fes: "Fès",
            city_marrakech: "Marrakech",
            city_ouarzazate: "Ouarzazate",
            city_dakhla: "Dakhla",
            city_agadir: "Agadir",

            aboutTitle: "À propos",
            aboutText: " Découvre le Maroc  est un site web qui met en valeur les villes, la culture et la nature du Royaume. Parcours des itinéraires, découvre des activités authentiques et retrouve les essentiels pour planifier tes sorties.",
            aboutContactBtn: "Contactez-nous",

            contact_title: "Contactez <span>Nous</span>",
            contact_name: "Votre nom",
            contact_email: "Votre e-mail",
            contact_subject: "Qu'est-ce qui vous amène ?",
            contact_message: "Votre message",
            contact_submit: "Envoyer",

            footer_links_title: "Liens",
            footer_about: "À propos",
            footer_contact: "Contact",
            footer_social_title: "Réseaux sociaux",

            ouarz_span: "Ouarzazate, Tinghir et Merzouga",
            ouarz_text: "représentent trois destinations emblématiques du sud marocain, chacune offrant une expérience unique pour les visiteurs. Ces villes sont connues pour la richesse de leurs paysages, leur culture berbère authentique et leurs traditions encore très vivantes. Ouarzazate séduit par ses kasbahs en terre et son ambiance de porte du désert. Tinghir attire par ses oasis, ses montagnes et la chaleur de ses habitants, avec à proximité Kelaat M’Gouna, célèbre pour la culture des roses. Plus au sud, Merzouga impressionne par ses grandes dunes et l’accueil traditionnel du désert, où les voyageurs peuvent découvrir la vie saharienne. Ensemble, ces trois lieux offrent un aperçu magnifique de l’hospitalité, des coutumes et de la diversité naturelle du sud du Maroc.",
            ouarz_author: "M. John",
            ouarz_comment: "J'ai eu l'occasion de visiter le sud-est du Maroc et j'ai été fasciné par ses paysages à couper le souffle. Entre les dunes majestueuses, les oasis verdoyantes et la richesse culturelle des villages, c'était une expérience inoubliable. Un endroit à découvrir absolument !",

            dest_title: "Découvrez Ouarzazate, Tinghir et Merzouga",
            dest_places_title: "Endroits",
            dest_places_text: "Nous vous proposons une sélection de lieux incontournables pour admirer la région sous ses plus beaux angles.",
            dest_activities_title: "Activités",
            dest_activities_text: "Nous vous proposons une sélection d’activités pour découvrir la région autrement.",
            dest_stay_title: "Hébergement",
            dest_stay_text: "Nous vous proposons des hébergements soigneusement choisis pour un séjour confortable et authentique.",
            dest_resto_title: "Restaurants",
            dest_resto_text: "Nous vous proposons une sélection de restaurants pour savourer les spécialités locales en toute tranquillité.",
            dest_btn: "Découvrir",
            // Titres des sections
            act_section_title: "Activités",
            heb_section_title: "Hébergement",
            rest_section_title: "Restaurants",

            // Activités
            act1_title: "Merzouga - Balade à dos de dromadaire",
            act1_text: "Balade à dos de dromadaire au milieu des dunes dorées de l’Erg Chebbi, idéale pour admirer un coucher de soleil inoubliable.",
            act2_title: "Nuit en bivouac nomade",
            act2_text: "Nuit en camp nomade sous un ciel étoilé, avec musique traditionnelle et dîner autour du feu.",
            act3_title: "Excursion en 4x4 dans le désert",
            act3_text: "Excursion en 4x4 à travers dunes et plateaux désertiques, avec arrêts dans des villages sahariens.",
            act4_title: "Lever du soleil sur les dunes",
            act4_text: "Montée sur une dune à l’aube pour admirer un lever de soleil spectaculaire sur l’Erg Chebbi.",
            act5_title: "Sandboard sur les dunes",
            act5_text: "Descente des dunes en sandboard pour une expérience sportive et amusante dans le sable fin.",
            act6_title: "Musique Gnawa à Khamlia",
            act6_text: "Voir un spectacle Gnawa à Khamlia, connu pour ses rythmes traditionnels et ses chants spirituels.",
            act7_title: "Tour en quad",
            act7_text: "Balade en quad sur les dunes pour une expérience rapide et dynamique au cœur du désert.",
            act8_title: "Bain de sable",
            act8_text: "Pratiqué dans les dunes de l’Erg Chebbi, le bain de sable consiste à s’immerger quelques minutes dans le sable chaud pour profiter de ses bienfaits relaxants et thérapeutiques.",
            act9_title: "Balade à cheval",
            act9_text: "Promenade à cheval au pied des dunes pour profiter d’un paysage saharien calme et authentique.",
            act10_title: "Montée vers Tisadrine",
            act10_text: "Cette montée part de Boumalne Dadès et mène vers les Gorges du Dadès, offrant le célèbre point de vue de Tisadrine, connu pour ses virages en épingle et son panorama unique sur les gorges.",
            act11_title: "Ahidous – Activité culturelle",
            act11_text: "Voir un spectacle d’Ahidous, une danse amazighe traditionnelle rythmée par les tambours et les chants en cercle, dans une ambiance festive et authentique.",
            act12_title: "Restaurant de Dar Ahlam",
            act12_text: "Le restaurant de Dar Ahlam propose une cuisine marocaine raffinée, servie dans un cadre calme et élégant, avec un service attentionné.",
            act13_title: "Restaurant Eden Boutique",
            act13_text: "Un excellent choix pour déguster de bons plats dans un cadre moderne et chaleureux.",

            // Hébergement
            heb1_title: "Montée vers Tisadrine",
            heb1_text: "Cette montée part de Boumalne Dadès et mène vers les Gorges du Dadès, offrant le célèbre point de vue de Tisadrine, connu pour ses virages en épingle et son panorama unique sur les gorges.",
            heb2_title: "Restaurant Eden_Boutique",
            heb2_text: "Le restaurant de l’Eden Boutique Hotel offre une cuisine marocaine raffinée dans un cadre calme et élégant, idéal pour se détendre après les gorges du Dadès.",
            heb3_title: "Dar Ahlam — Skoura",
            heb3_text: "Séjour dans une kasbah de charme au cœur de la palmeraie de Skoura, avec jardins paisibles, service haut de gamme et ambiance traditionnelle raffinée.",

            // Restaurants
            rest1_title: "Riad Sahara Stars",
            rest1_text: "Riad-hôtel à Boumalne-Dadès, avec piscine, terrasse et restaurant, idéal pour découvrir la vallée du Dadès.",
            rest2_title: "Auberge-restaurant à Merzouga",
            rest2_text: "Petite auberge-restaurant chaleureuse à Merzouga, qui offre des plats marocains sur une terrasse avec vue sur les dunes de l’Erg Chebbi.",
            rest3_title: "Villa Australéis – Skoura",
            rest3_text: "Villa de charme au cœur de la palmeraie, avec jardin, piscine et espaces de détente.",
            rest4_title: "Eden Boutique Hotel – Dadès",
            rest4_text: "Hôtel moderne et chaleureux à Boumalne-Dadès, idéal pour se reposer après la découverte des gorges et de la vallée du Dadès.",
            // Endroits (slides)
            place1_title: "Kasbah Aït Ben Haddou",
            place1_text: "Visite de la célèbre kasbah en terre, classée au patrimoine mondial de l’UNESCO, avec ses ruelles anciennes et ses vues panoramiques sur la vallée.",

            place2_title: "Ouarzazate Studios de Cinéma",
            place2_text: "Découverte des studios où ont été tournés de nombreux films et séries internationales, avec décors de désert, temples et villes antiques.",

            place3_title: "Tapis berbères - Taznakht",
            place3_text: "Arrêt à Taznakht pour rencontrer les artisanes et découvrir le tissage traditionnel des tapis berbères aux motifs amazighs colorés.",

            place4_title: "Oasis de Fint",
            place4_text: "Une oasis paisible entourée de montagnes, idéale pour se détendre, rencontrer les habitants et profiter d’un paysage verdoyant.",

            place5_title: "Kasbah de Telouet",
            place5_text: "Visite de la kasbah de Telouet, ancienne demeure du Glaoui, avec ses salons décorés de zelliges, bois sculpté et plafonds peints dans l’Atlas.",

            place6_title: "Tinghir - Gorges du Todra",
            place6_text: "Balade au cœur des gorges du Todra, entre falaises hautes et rivière fraîche idéale pour marcher.",

            place7_title: "Oasis de Tinghir",
            place7_text: "Promenade dans l’oasis verdoyante de Tinghir avec ses palmiers, jardins et villages traditionnels.",

            place8_title: "Vallée des Roses",
            place8_text: "Découverte de la vallée des Roses avec ses champs parfumés et paysages colorés.",

            place9_title: "Coopératives d’eau de rose",
            place9_text: "Visite des coopératives locales pour voir la fabrication de l’eau de rose et des produits naturels.",

            place10_title: "Randonnée dans la vallée M’Goun",
            place10_text: "Marche entre montagnes, villages berbères et paysages verdoyants de la vallée.",

            place11_title: "Artisanat local",
            place11_text: "Découvrir les produits artisanaux : parfums, savons, huiles et objets traditionnels berbères.",
            places_section_title: "Endroits",
            weather_button: "Météo",
            weather_title: "Météo",
            weather_input_placeholder: "Entrez une ville",
            weather_search: "Chercher",

            act14_title: "Passerelle en corde à Tinghir",
            act14_text: "Traversée d’une passerelle en corde accrochée à flanc de montagne, pour une expérience vertigineuse avec une vue unique sur les gorges de Tinghir.",

            intro_long: "<span>Le Maroc</span> est un pays d’une grande diversité, où se côtoient océan, montagnes et désert, du bord de l’Atlantique et de la Méditerranée jusqu’aux dunes du Sahara. Chaque région raconte une facette différente : <span>Marrakech</span>, la ville ocre, séduit par sa médina vibrante, ses jardins et ses riads, tandis que <span>Fès</span> et <span>Rabat</span> mettent en lumière leur héritage culturel entre vieille médina et capitale ouverte sur l’océan. Plus au sud-est, <span>Ouarzazate</span>, <span>Tinghir</span> et <span>Merzouga</span> offrent un décor de kasbahs en terre, d’oasis, de gorges impressionnantes et de dunes dorées idéales pour les balades et les bivouacs sous les étoiles. Sur la côte, <span>Agadir</span> et <span>Dakhla</span> combinent plages ensoleillées et sports nautiques, alors que <span>Chefchaouen</span>, nichée dans les montagnes du Rif, enchante avec ses maisons bleues et son atmosphère douce et tranquille.",
            act15_title: "Hôtel Xaluca Dades",
            act15_text: "Hôtel de style kasbah avec piscine et vue sur les montagnes, idéal pour se détendre après les gorges du Dadès.",
            maroc: "À la Découverte du Maroc",
            cuisine: "Cuisine marocaine: authenticité et raffinement",
            // Tags & descriptions villes + bouton
            rabat_tag: "Capital",
            rabat_desc: "Ville Impériale",

            chefchaouen_tag: "Montagne",
            chefchaouen_desc: "La Perle Bleue",

            marrakech_tag: "Culture",
            marrakech_desc: "La Ville Rouge",

            fes_tag: "Histoire",
            fes_desc: "Capitale Spirituelle",

            ouarzazate_tag: "Désert",
            ouarzazate_desc: "Porte du Désert",

            dakhla_tag: "Surf",
            dakhla_desc: "Perle du Sud",

            agadir_tag: "Plage",
            agadir_desc: "Soleil et Mer",

            btn_visit: "Visiter",
            footer_about_title: "Découvre le Maroc",
            footer_about_text: "Explorez la magie du Maroc avec nous. Des montagnes de l'Atlas aux dunes du Sahara, nous vous guidons vers les meilleurs endroits.",

            footer_links_title: "Liens Rapides",
            footer_faq: "Questions fréquentes ?",
            footer_home: "Accueil",
            footer_villes: "Villes",
            footer_about: "À propos",
            footer_contact: "Contact",

            footer_contact_title: "Contact",
            footer_address: "Casablanca, Maroc",
            footer_phone: "+212 600 000 000",
            footer_email: "info@maroctrip.ma",

            footer_newsletter_title: "Newsletter",
            footer_newsletter_text: "Abonnez-vous pour recevoir nos meilleures offres.",
            newsletter_input: "Votre Email",
            newsletter_btn: "S'abonner",

            footer_copy: "© 2025 Découvre le Maroc. Tous droits réservés.",



        },

        en: {
            footer_about_title: "Discover Morocco",
            footer_about_text: "Explore the magic of Morocco with us. From the Atlas Mountains to the Sahara dunes, we guide you to the best places.",

            footer_links_title: "Quick Links",
            footer_faq: "Frequently Asked Questions",
            footer_home: "Home",
            footer_villes: "Cities",
            footer_about: "About",
            footer_contact: "Contact",

            footer_contact_title: "Contact",
            footer_address: "Casablanca, Morocco",
            footer_phone: "+212 600 000 000",
            footer_email: "info@maroctrip.ma",

            footer_newsletter_title: "Newsletter",
            footer_newsletter_text: "Subscribe to receive our best offers.",
            newsletter_input: "Your Email",
            newsletter_btn: "Subscribe",

            footer_copy: "© 2025 Discover Morocco. All rights reserved.",

            rabat_tag: "Capital",
            rabat_desc: "Imperial City",

            chefchaouen_tag: "Mountain",
            chefchaouen_desc: "The Blue Pearl",

            marrakech_tag: "Culture",
            marrakech_desc: "The Red City",

            fes_tag: "History",
            fes_desc: "Spiritual Capital",

            ouarzazate_tag: "Desert",
            ouarzazate_desc: "Gateway to the Desert",

            dakhla_tag: "Surf",
            dakhla_desc: "Pearl of the South",

            agadir_tag: "Beach",
            agadir_desc: "Sun and Sea",

            btn_visit: "Visit",

            cuisine: "Moroccan Cuisine: Authenticity and Refinement",
            maroc: "Discovering Morocco",
            navHome: "Home",
            navVille: "Cities",
            navAbout: "About",
            navContact: "Contact",

            title: "Discover Morocco",
            intro: "Morocco invites you to discover its colorful cities, diverse landscapes, and unique hospitality.",

            title_ville: "Cities",
            city_rabat: "Rabat",
            city_chefchaouen: "Chefchaouen",
            city_fes: "Fez",
            city_marrakech: "Marrakesh",
            city_ouarzazate: "Ouarzazate",
            city_dakhla: "Dakhla",
            city_agadir: "Agadir",

            aboutTitle: "About",
            aboutText: "Discover Morocco is a web site that highlights the cities, culture and nature of Morocco. Explore itineraries, discover authentic activities and find the essentials to plan your trips.",
            aboutContactBtn: "Contact us",

            contact_title: "Contact <span>Us</span>",
            contact_name: "Your Name",
            contact_email: "Your E-mail",
            contact_subject: "What brings you here?",
            contact_message: "Your Message",
            contact_submit: "Submit",

            footer_links_title: "Links",
            footer_about: "About",
            footer_contact: "Contact",
            footer_social_title: "Social Media",

            ouarz_span: "Ouarzazate, Tinghir and Merzouga",
            ouarz_text: "are three emblematic destinations of southeastern Morocco, each offering a unique experience to visitors. These places are known for their rich landscapes, authentic Berber culture and still-living traditions. Ouarzazate attracts with its earthen kasbahs and its role as a gateway to the desert. Tinghir charms with its oases, mountains and the warmth of its people, with nearby Kelaat M’Gouna, famous for its rose cultivation. Further south, Merzouga impresses with its large dunes and traditional desert hospitality, where travellers can discover Saharan life. Together, these three locations offer a beautiful glimpse of the hospitality, customs and natural diversity of southern Morocco.",
            ouarz_author: "Mr. John",
            ouarz_comment: "I had the opportunity to visit southeastern Morocco and was amazed by its breathtaking landscapes. Between the majestic dunes, the lush oases and the cultural richness of the villages, it was an unforgettable experience. A place you absolutely must discover!",

            dest_title: "Discover Ouarzazate, Tinghir, and Merzouga",
            dest_places_title: "Places",
            dest_places_text: "We offer a selection of must-see spots to enjoy the region at its best.",
            dest_activities_title: "Activities",
            dest_activities_text: "We offer a selection of activities to discover the region in a different way.",
            dest_stay_title: "Accommodation",
            dest_stay_text: "We offer carefully chosen accommodation for a comfortable and authentic stay.",
            dest_resto_title: "Restaurants",
            dest_resto_text: "We offer a selection of restaurants where you can enjoy local specialties in a peaceful setting.",
            dest_btn: "Discover",
            act_section_title: "Activities",
            heb_section_title: "Accommodation",
            rest_section_title: "Restaurants",

            act1_title: "Merzouga - Camel ride",
            act1_text: "Camel ride in the golden dunes of Erg Chebbi, perfect to admire an unforgettable sunset.",
            act2_title: "Night in a nomad camp",
            act2_text: "Night in a nomad camp under a starry sky, with traditional music and dinner around the fire.",
            act3_title: "4x4 excursion in the desert",
            act3_text: "4x4 tour through dunes and desert plateaus, with stops in Saharan villages.",
            act4_title: "Sunrise over the dunes",
            act4_text: "Climb a dune at dawn to admire a spectacular sunrise over Erg Chebbi.",
            act5_title: "Sandboarding on the dunes",
            act5_text: "Ride down the dunes on a sandboard for a fun and sporty experience in the fine sand.",
            act6_title: "Gnawa music in Khamlia",
            act6_text: "Attend a Gnawa show in Khamlia, known for its traditional rhythms and spiritual songs.",
            act7_title: "Quad tour",
            act7_text: "Quad ride on the dunes for a fast and dynamic experience in the heart of the desert.",
            act8_title: "Sand bath",
            act8_text: "In the dunes of Erg Chebbi, the sand bath consists of being briefly buried in hot sand to enjoy its relaxing and therapeutic benefits.",
            act9_title: "Horse ride",
            act9_text: "Horse ride at the foot of the dunes to enjoy a peaceful and authentic Saharan landscape.",
            act10_title: "Road up to Tisadrine",
            act10_text: "This road starts from Boumalne Dadès and leads to the Dadès Gorges, offering the famous Tisadrine viewpoint, known for its hairpin bends and unique panorama.",
            act11_title: "Ahidous – Cultural activity",
            act11_text: "Watch an Ahidous show, a traditional Amazigh dance with drums and circle singing, in a festive and authentic atmosphere.",
            act12_title: "Dar Ahlam restaurant",
            act12_text: "Dar Ahlam’s restaurant offers refined Moroccan cuisine in a calm and elegant setting, with attentive service.",
            act13_title: "Eden Boutique restaurant",
            act13_text: "An excellent choice to enjoy delicious dishes in a modern and warm atmosphere.",

            heb1_title: "Road up to Tisadrine",
            heb1_text: "This road starts from Boumalne Dadès and leads to the Dadès Gorges, offering the famous Tisadrine viewpoint with its hairpin bends and unique panorama.",
            heb2_title: "Restaurant Eden_Boutique",
            heb2_text: "The restaurant at Eden Boutique Hotel offers refined Moroccan cuisine in a calm and elegant setting, ideal for relaxing after visiting the Dadès Gorges.",

            heb3_title: "Dar Ahlam — Skoura",
            heb3_text: "Stay in a charming kasbah in the heart of Skoura’s palm grove, with peaceful gardens, high-end service and a refined traditional atmosphere.",

            rest1_title: "Riad Sahara Stars",
            rest1_text: "Riad-hotel in Boumalne-Dadès with pool, terrace and restaurant, ideal to discover the Dadès valley.",
            rest2_title: "Inn-restaurant in Merzouga",
            rest2_text: "Small and welcoming inn-restaurant in Merzouga, serving Moroccan dishes on a terrace overlooking the Erg Chebbi dunes.",
            rest3_title: "Villa Australéis – Skoura",
            rest3_text: "Charming villa in the heart of the palm grove, with garden, pool and relaxing areas.",
            rest4_title: "Eden Boutique Hotel – Dadès",
            rest4_text: "Modern and cozy hotel in Boumalne-Dadès, perfect to rest after exploring the gorges and the Dadès valley.",
            // Endroits (Places – slides)
            place1_title: "Kasbah Aït Ben Haddou",
            place1_text: "Visit the famous earthen kasbah, listed as a UNESCO World Heritage site, with its old alleys and panoramic views over the valley.",

            place2_title: "Ouarzazate Film Studios",
            place2_text: "Discover the studios where many international films and series were shot, with desert, temple and ancient city sets.",

            place3_title: "Berber Rugs – Taznakht",
            place3_text: "Stop in Taznakht to meet craftswomen and discover the traditional weaving of Berber rugs with colorful Amazigh patterns.",

            place4_title: "Fint Oasis",
            place4_text: "A peaceful oasis surrounded by mountains, perfect for relaxing, meeting locals and enjoying lush green scenery.",

            place5_title: "Telouet Kasbah",
            place5_text: "Visit Telouet Kasbah, former residence of the Glaoui, with lounges decorated with zellige tiles, carved wood and painted ceilings in the Atlas mountains.",

            place6_title: "Tinghir – Todra Gorges",
            place6_text: "Walk in the heart of the Todra Gorges, between high cliffs and a cool river ideal for walking.",

            place7_title: "Tinghir Oasis",
            place7_text: "Stroll through the lush oasis of Tinghir with its palm trees, gardens and traditional villages.",

            place8_title: "Valley of the Roses",
            place8_text: "Discover the Valley of the Roses with its fragrant fields and colorful landscapes.",

            place9_title: "Rose Water Cooperatives",
            place9_text: "Visit local cooperatives to see how rose water and natural products are made.",

            place10_title: "Hiking in the M’Goun Valley",
            place10_text: "Hike through the M’Goun valley between mountains, Berber villages and green landscapes.",

            place11_title: "Local Handicrafts",
            place11_text: "Discover local handicrafts: perfumes, soaps, oils and traditional Berber items.",
            places_section_title: "Places",
            weather_button: "Weather",
            weather_title: "Weather",
            weather_input_placeholder: "Enter a city",
            weather_search: "Search",
            intro_long: "<span>Morocco</span> is a country of great diversity, where ocean, mountains and desert meet, from the shores of the Atlantic and the Mediterranean to the dunes of the Sahara. Each region reveals a different side: <span>Marrakesh</span>, the red city, charms with its vibrant medina, gardens and riads, while <span>Fez</span> and <span>Rabat</span> highlight their cultural heritage, between historic medinas and a capital open to the ocean. Further to the southeast, <span>Ouarzazate</span>, <span>Tinghir</span> and <span>Merzouga</span> offer a landscape of earthen kasbahs, oases, impressive gorges and golden dunes, ideal for walks and desert camps under the stars. On the coast, <span>Agadir</span> and <span>Dakhla</span> combine sunny beaches and water sports, while <span>Chefchaouen</span>, nestled in the Rif mountains, enchants with its blue houses and calm, peaceful atmosphere.",
            act14_title: "Rope Bridge in Tinghir",
            act14_text: "Cross a rope bridge clinging to the mountainside for a thrilling experience and a unique view over the Tinghir gorges.",
            act15_title: "Hotel Xaluca Dades",
            act15_text: "Kasbah-style hotel with a swimming pool and mountain views, perfect for relaxing after visiting the Dadès Gorges.",

        }
    };

    function applyLanguage(lang) {
        const t = translations[lang] || translations.fr;

        const navHome = document.getElementById("nav-home");
        const navVille = document.getElementById("nav-ville");
        const navAbout = document.getElementById("nav-about");
        const navContact = document.getElementById("nav-contact");

        if (navHome) navHome.textContent = t.navHome;
        if (navVille) navVille.textContent = t.navVille;
        if (navAbout) navAbout.textContent = t.navAbout;
        if (navContact) navContact.textContent = t.navContact;

        const mainTitle = document.getElementById("main-title");
        const mainIntro = document.getElementById("main-intro");
        if (mainTitle) mainTitle.textContent = t.title;
        if (mainIntro) mainIntro.textContent = t.intro;

        const titleVille = document.getElementById("title-ville");
        if (titleVille) titleVille.textContent = t.title_ville;

        const cityRabat = document.getElementById("city-rabat");
        const cityChefchaouen = document.getElementById("city-chefchaouen");
        const cityFes = document.getElementById("city-fes");
        const cityMarrakech = document.getElementById("city-marrakech");
        const cityOuarzazate = document.getElementById("city-ouarzazate");
        const cityDakhla = document.getElementById("city-dakhla");
        const cityAgadir = document.getElementById("city-agadir");

        if (cityRabat) cityRabat.textContent = t.city_rabat;
        if (cityChefchaouen) cityChefchaouen.textContent = t.city_chefchaouen;
        if (cityFes) cityFes.textContent = t.city_fes;
        if (cityMarrakech) cityMarrakech.textContent = t.city_marrakech;
        if (cityOuarzazate) cityOuarzazate.textContent = t.city_ouarzazate;
        if (cityDakhla) cityDakhla.textContent = t.city_dakhla;
        if (cityAgadir) cityAgadir.textContent = t.city_agadir;

        const aboutTitle = document.getElementById("about-title");
        const aboutText = document.getElementById("about-text");
        const aboutBtn = document.getElementById("about-contact-btn");

        if (aboutTitle) {
            aboutTitle.innerHTML = (lang === "fr")
                ? "À <span>propos</span>"
                : "About <span>us</span>";
        }
        if (aboutText) aboutText.textContent = t.aboutText;
        if (aboutBtn) aboutBtn.textContent = t.aboutContactBtn;

        const contactTitle = document.getElementById("contact-title");
        const contactName = document.getElementById("contact-name");
        const contactEmail = document.getElementById("contact-email");
        const contactSubject = document.getElementById("contact-subject");
        const contactMsg = document.getElementById("contact-message");
        const contactSubmit = document.getElementById("contact-submit");

        if (contactTitle) contactTitle.innerHTML = t.contact_title;
        if (contactName) contactName.placeholder = t.contact_name;
        if (contactEmail) contactEmail.placeholder = t.contact_email;
        if (contactSubject) contactSubject.placeholder = t.contact_subject;
        if (contactMsg) contactMsg.placeholder = t.contact_message;
        if (contactSubmit) contactSubmit.value = t.contact_submit;

        const footerLinksTitle = document.getElementById("footer-links-title");
        const footerAbout = document.getElementById("footer-about");
        const footerContact = document.getElementById("footer-contact");
        const footerSocialTitle = document.getElementById("footer-social-title");

        if (footerLinksTitle) footerLinksTitle.textContent = t.footer_links_title;
        if (footerAbout) footerAbout.textContent = t.footer_about;
        if (footerContact) footerContact.textContent = t.footer_contact;
        if (footerSocialTitle) footerSocialTitle.textContent = t.footer_social_title;

        const ouarzSpan = document.getElementById("ouarz-span");
        const ouarzText = document.getElementById("ouarz-text");
        const ouarzAuthor = document.getElementById("ouarz-author");
        const ouarzComment = document.getElementById("ouarz-comment");

        if (ouarzSpan) ouarzSpan.textContent = t.ouarz_span;
        if (ouarzText) ouarzText.textContent = t.ouarz_text;
        if (ouarzAuthor) ouarzAuthor.textContent = t.ouarz_author;
        if (ouarzComment) ouarzComment.textContent = t.ouarz_comment;

        const destTitle = document.getElementById("destinations-title");
        if (destTitle) destTitle.textContent = t.dest_title;

        const cardPlacesTitle = document.getElementById("Endroits");
        const cardPlacesText = document.getElementById("card-places-text");
        const cardActivitiesTitle = document.getElementById("card-activities-title");
        const cardActivitiesText = document.getElementById("card-activities-text");
        const cardStayTitle = document.getElementById("card-stay-title");
        const cardStayText = document.getElementById("card-stay-text");
        const cardRestoTitle = document.getElementById("card-resto-title");
        const cardRestoText = document.getElementById("card-resto-text");

        if (cardPlacesTitle) cardPlacesTitle.textContent = t.dest_places_title;
        if (cardPlacesText) cardPlacesText.textContent = t.dest_places_text;
        if (cardActivitiesTitle) cardActivitiesTitle.textContent = t.dest_activities_title;
        if (cardActivitiesText) cardActivitiesText.textContent = t.dest_activities_text;
        if (cardStayTitle) cardStayTitle.textContent = t.dest_stay_title;
        if (cardStayText) cardStayText.textContent = t.dest_stay_text;
        if (cardRestoTitle) cardRestoTitle.textContent = t.dest_resto_title;
        if (cardRestoText) cardRestoText.textContent = t.dest_resto_text;

        const destButtons = document.querySelectorAll(".dest-discover-btn");
        destButtons.forEach(btn => {
            btn.textContent = t.dest_btn;
        });
        const actSectionTitle = document.getElementById("Activités");
        const hebSectionTitle = document.getElementById("Hébergement");
        const restSectionTitle = document.getElementById("Restaurants");
        const endSectionTitle = document.getElementById("Endroits-title");
        if (endSectionTitle) endSectionTitle.textContent = t.places_section_title;


        if (actSectionTitle) actSectionTitle.textContent = t.act_section_title;
        if (hebSectionTitle) hebSectionTitle.textContent = t.heb_section_title;
        if (restSectionTitle) restSectionTitle.textContent = t.rest_section_title;
        // --- Météo (labels, placeholder, bouton) ---
        const weatherToggle = document.getElementById("showWeatherBtn");
        const weatherTitle = document.getElementById("weather-title");
        const weatherCityInput = document.getElementById("city");
        const weatherSearchBtn = document.getElementById("btn");

        if (weatherToggle) weatherToggle.textContent = t.weather_button;
        if (weatherTitle) weatherTitle.textContent = t.weather_title;
        if (weatherCityInput) weatherCityInput.placeholder = t.weather_input_placeholder;
        if (weatherSearchBtn) weatherSearchBtn.textContent = t.weather_search;
        const introLong = document.getElementById("Intro-maroc");
        if (introLong && t.intro_long) {
            introLong.innerHTML = t.intro_long;
        }

        const maroc = document.getElementById("maroc-title");
        if (maroc && t.maroc) {
            maroc.innerHTML = t.maroc;
        }
        const cuisine = document.getElementById("slider-title");
        if (cuisine && t.cuisine) {
            cuisine.innerHTML = t.cuisine;
        }
        // --- Tags & descriptions des villes ---
        const tagRabat = document.getElementById("tag-rabat");
        const descRabat = document.getElementById("desc-rabat");
        const btnRabat = document.getElementById("btn-rabat");

        const tagChef = document.getElementById("tag-chefchaouen");
        const descChef = document.getElementById("desc-chefchaouen");
        const btnChef = document.getElementById("btn-chefchaouen");

        const tagMarr = document.getElementById("tag-marrakech");
        const descMarr = document.getElementById("desc-marrakech");
        const btnMarr = document.getElementById("btn-marrakech");

        const tagFes = document.getElementById("tag-fes");
        const descFes = document.getElementById("desc-fes");
        const btnFes = document.getElementById("btn-fes");

        const tagOuarz = document.getElementById("tag-ouarzazate");
        const descOuarz = document.getElementById("desc-ouarzazate");
        const btnOuarz = document.getElementById("btn-ouarzazate");

        const tagDakhla = document.getElementById("tag-dakhla");
        const descDakhla = document.getElementById("desc-dakhla");
        const btnDakhla = document.getElementById("btn-dakhla");

        const tagAgadir = document.getElementById("tag-agadir");
        const descAgadir = document.getElementById("desc-agadir");
        const btnAgadir = document.getElementById("btn-agadir");

        if (tagRabat) tagRabat.textContent = t.rabat_tag;
        if (descRabat) descRabat.textContent = t.rabat_desc;
        if (btnRabat) btnRabat.textContent = t.btn_visit;

        if (tagChef) tagChef.textContent = t.chefchaouen_tag;
        if (descChef) descChef.textContent = t.chefchaouen_desc;
        if (btnChef) btnChef.textContent = t.btn_visit;

        if (tagMarr) tagMarr.textContent = t.marrakech_tag;
        if (descMarr) descMarr.textContent = t.marrakech_desc;
        if (btnMarr) btnMarr.textContent = t.btn_visit;

        if (tagFes) tagFes.textContent = t.fes_tag;
        if (descFes) descFes.textContent = t.fes_desc;
        if (btnFes) btnFes.textContent = t.btn_visit;

        if (tagOuarz) tagOuarz.textContent = t.ouarzazate_tag;
        if (descOuarz) descOuarz.textContent = t.ouarzazate_desc;
        if (btnOuarz) btnOuarz.textContent = t.btn_visit;

        if (tagDakhla) tagDakhla.textContent = t.dakhla_tag;
        if (descDakhla) descDakhla.textContent = t.dakhla_desc;
        if (btnDakhla) btnDakhla.textContent = t.btn_visit;

        if (tagAgadir) tagAgadir.textContent = t.agadir_tag;
        if (descAgadir) descAgadir.textContent = t.agadir_desc;
        if (btnAgadir) btnAgadir.textContent = t.btn_visit;


        // Activités
        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };
        setText("act15-title", t.act15_title);
        setText("act15_text", t.act15_text);
        setText("act1-title", t.act1_title);
        setText("act1-text", t.act1_text);
        setText("act2-title", t.act2_title);
        setText("act2-text", t.act2_text);
        setText("act3-title", t.act3_title);
        setText("act3-text", t.act3_text);
        setText("act4-title", t.act4_title);
        setText("act4-text", t.act4_text);
        setText("act5-title", t.act5_title);
        setText("act5-text", t.act5_text);
        setText("act6-title", t.act6_title);
        setText("act6-text", t.act6_text);
        setText("act7-title", t.act7_title);
        setText("act7-text", t.act7_text);
        setText("act8-title", t.act8_title);
        setText("act8-text", t.act8_text);
        setText("act9-title", t.act9_title);
        setText("act9-text", t.act9_text);
        setText("act10-title", t.act10_title);
        setText("act10-text", t.act10_text);
        setText("act11-title", t.act11_title);
        setText("act11-text", t.act11_text);
        setText("act12-title", t.act12_title);
        setText("act12-text", t.act12_text);
        setText("act13-title", t.act13_title);
        setText("act13-text", t.act13_text);
        setText("act14-title", t.act14_title);
        setText("act14-text", t.act14_text);


        // Hébergement
        setText("heb1-title", t.heb1_title);
        setText("heb1-text", t.heb1_text);
        setText("heb2-title", t.heb2_title);
        setText("heb2-text", t.heb2_text);
        setText("heb3-title", t.heb3_title);
        setText("heb3-text", t.heb3_text);

        // Restaurants
        setText("rest1-title", t.rest1_title);
        setText("rest1-text", t.rest1_text);
        setText("rest2-title", t.rest2_title);
        setText("rest2-text", t.rest2_text);
        setText("rest3-title", t.rest3_title);
        setText("rest3-text", t.rest3_text);
        setText("rest4-title", t.rest4_title);
        setText("rest4-text", t.rest4_text);
        // Endroits (Places)
        setText("place1-title", t.place1_title);
        setText("place1-text", t.place1_text);
        setText("place2-title", t.place2_title);
        setText("place2-text", t.place2_text);
        setText("place3-title", t.place3_title);
        setText("place3-text", t.place3_text);
        setText("place4-title", t.place4_title);
        setText("place4-text", t.place4_text);
        setText("place5-title", t.place5_title);
        setText("place5-text", t.place5_text);
        setText("place6-title", t.place6_title);
        setText("place6-text", t.place6_text);
        setText("place7-title", t.place7_title);
        setText("place7-text", t.place7_text);
        setText("place8-title", t.place8_title);
        setText("place8-text", t.place8_text);
        setText("place9-title", t.place9_title);
        setText("place9-text", t.place9_text);
        setText("place10-title", t.place10_title);
        setText("place10-text", t.place10_text);
        setText("place11-title", t.place11_title);
        setText("place11-text", t.place11_text);
        // Footer - About
        setText("footer-about-title", t.footer_about_title);
        setText("footer-about-text", t.footer_about_text);

        // Footer - Links
        setText("footer-links-title", t.footer_links_title);
        setText("footer-faq", t.footer_faq);
        setText("footer-home", t.footer_home);
        setText("footer-villes", t.footer_villes);
        setText("footer-about", t.footer_about);
        setText("footer-contact", t.footer_contact);

        // Footer - Contact
        setText("footer-contact-title", t.footer_contact_title);
        setText("footer-address", t.footer_address);
        setText("footer-phone", t.footer_phone);
        setText("footer-email", t.footer_email);

        // Footer - Newsletter
        setText("footer-newsletter-title", t.footer_newsletter_title);
        setText("footer-newsletter-text", t.footer_newsletter_text);

        // Input + bouton
        const newsletterInput = document.getElementById("newsletter-input");
        if (newsletterInput) newsletterInput.placeholder = t.newsletter_input;

        const newsletterBtn = document.getElementById("newsletter-btn");
        if (newsletterBtn) newsletterBtn.textContent = t.newsletter_btn;

        // Footer copyright
        setText("footer-copy", t.footer_copy);



        document.documentElement.setAttribute("lang", lang);
    }

    /* ------------------------------------------------
       3) Gestion langue + mémorisation (localStorage)
       ------------------------------------------------ */

    const defaultLang = "fr";
    const savedLang = localStorage.getItem("lang") || defaultLang;

    // Appliquer langue sauvegardée au chargement
    applyLanguage(savedLang);

    // Mettre à jour la valeur du select si présent
    if (langSelect) {
        langSelect.value = savedLang;

        langSelect.addEventListener("change", function () {
            const lang = this.value;
            localStorage.setItem("lang", lang); // mémorise la langue choisie
            applyLanguage(lang);
        });
    }

    /* ------------------------------------------------
       4) MÉTÉO : affichage + traduction FR/EN + sécurisation
       ------------------------------------------------ */

    const btn = document.getElementById("btn");
    const resultDiv = document.getElementById("result");
    const showWeatherBtn = document.getElementById("showWeatherBtn");
    const weatherCard = document.getElementById("weatherCard");

    // Textes météo selon la langue
    function getWeatherTexts(lang) {
        if (lang === "en") {
            return {
                emptyCity: "Please enter a city.",
                notFound: "City not found.",
                error: "Error while fetching the weather.",
                sentence: (city, temp, desc) =>
                    `In ${city}, it is ${temp}°C (${desc}).`
            };
        }

        // Par défaut : français
        return {
            emptyCity: "Veuillez entrer une ville.",
            notFound: "Ville non trouvée.",
            error: "Erreur lors de la récupération de la météo.",
            sentence: (city, temp, desc) =>
                `À ${city}, il fait ${temp}°C (${desc}).`
        };
    }

    // Afficher / masquer la carte météo (si les éléments existent)
    if (showWeatherBtn && weatherCard) {
        showWeatherBtn.addEventListener("click", () => {
            weatherCard.style.display =
                weatherCard.style.display === "flex" ? "none" : "flex";
        });
    }

    // Recherche météo (si les éléments existent)
    if (btn && resultDiv) {
        btn.addEventListener("click", () => {
            const cityInput = document.getElementById("city");
            const city = cityInput ? cityInput.value.trim() : "";

            const currentLang = localStorage.getItem("lang") || defaultLang;
            const texts = getWeatherTexts(currentLang);

            if (!city) {
                resultDiv.textContent = texts.emptyCity;
                return;
            }

            const apiKey = "ea24d016d26bfa4ed5a5a0c09e47eb90";
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${currentLang}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod !== 200) {
                        resultDiv.textContent = texts.notFound;
                        return;
                    }

                    const temp = data.main.temp;
                    const desc = data.weather[0].description;

                    resultDiv.textContent = texts.sentence(city, temp, desc);
                })
                .catch(() => {
                    resultDiv.textContent = texts.error;
                });
        });
    }

    const cards = document.querySelectorAll(".location-card");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));


    document.querySelectorAll('.detail-section').forEach(section => {
        const slides = section.querySelectorAll('.slide');
        if (!slides.length) return;

        let current = 0;

        const updateSlides = () => {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === current);
            });
        };

        updateSlides();

        const btnPrev = section.querySelector('.arrow.left');
        const btnNext = section.querySelector('.arrow.right');

        if (btnNext) {
            btnNext.addEventListener('click', () => {
                current = (current + 1) % slides.length;
                updateSlides();
            });
        }

        if (btnPrev) {
            btnPrev.addEventListener('click', () => {
                current = (current - 1 + slides.length) % slides.length;
                updateSlides();
            });
        }
    });

});



/* =======================================================
   6) SLIDER 3D (doit être en-dehors du DOMContentLoaded)
   ======================================================= */
let angle = 0;
const ring = document.querySelector(".ring");
const items = document.querySelectorAll(".img");

if (ring && items.length) {
    const deg = 360 / items.length;

    items.forEach((item, i) => {
        item.style.transform = `
            translate(-50%, -50%)
            rotateY(${i * deg}deg)
            translateZ(300px)
        `;
    });

    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    if (next) {
        next.onclick = () => {
            angle -= deg;
            ring.style.transform = `rotateY(${angle}deg)`;
        };
    }

    if (prev) {
        prev.onclick = () => {
            angle += deg;
            ring.style.transform = `rotateY(${angle}deg)`;
        };
    }
}

