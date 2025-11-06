// libs/chrome-ai.js - V4 (Génération et Correction avec Simulation de Secours)

/**
 * Vérifie si la Chrome Prompt API (window.ai) est disponible.
 */
function isAIAvailable() {
    return typeof window.ai !== 'undefined';
}

/**
 * Génère du contenu textuel en utilisant l'API Chrome AI, ou simule si indisponible.
 */
async function generateContent(prompt) {
    if (isAIAvailable() && typeof window.ai.prompt !== 'undefined') {
        // --- TENTATIVE D'APPEL DE L'IA RÉELLE (Avec vérification avancée) ---
        try {
            const availabilityStatus = await window.ai.prompt.availability();
            
            if (availabilityStatus === "available") {
                const response = await window.ai.prompt.generateText({ prompt: prompt });
                if (response && response.text) {
                    return response.text.trim();
                }
            } else {
                throw new Error("Modèle IA non prêt. Statut: " + availabilityStatus);
            }
        } catch (error) {
            // Échec d'exécution de l'IA. On passe à la simulation.
            console.error("Échec de l'IA réelle. Raison:", error.message);
        }
    }
    
    // --- PLAN B : MODE SIMULATION (SECOURS OBLIGATOIRE POUR LA DÉMO) ---
    
    // Extraction des variables du prompt (inchangé)
	const sujetMatch = prompt.match(/Sujet:\s*"(.*?)"/);
	const plateformeMatch = prompt.match(/Plateforme ciblée:\s*(\w+)/);
	const tonMatch = prompt.match(/Ton souhaité:\s*(\w+)/);

	const sujet = sujetMatch ? sujetMatch[1].trim() : "la performance de notre nouveau service";
	const plateforme = plateformeMatch ? plateformeMatch[1].trim() : "LinkedIn";
	const ton = tonMatch ? tonMatch[1].trim() : "professionnel";

	let postContent = "";
	let hashtags = "";
	let callToAction = "";
	let introEmoji = "";

	// -----------------------------------------------------
	// NOUVEAU : Adaptation stylistique basée sur la plateforme
	// -----------------------------------------------------

	if (plateforme.toLowerCase() === 'linkedin') {
		// Style LinkedIn : Ton professionnel, phrases claires [cite: 23]
		introEmoji = "💼";
		postContent = `Bonjour à tous. C'est avec une grande fierté que nous vous partageons une mise à jour importante concernant **${sujet}**. Notre équipe a travaillé sans relâche pour optimiser les performances et la clarté. L'impact est déjà mesurable : nous observons une amélioration de 📈 25% de l'efficacité pour nos premiers utilisateurs.`;
		callToAction = "Découvrez dès maintenant les détails complets sur notre page et partagez vos impressions !";
		hashtags = "#Innovation #Professionnel #Productivité #AIWriter";
	} else if (plateforme.toLowerCase() === 'twitter') {
		// Style Twitter/X : Format court, percutant, hashtags directs [cite: 23]
		introEmoji = "🔥";
		postContent = `🚨 Alerte ! Fini les soucis de ${sujet.toLowerCase()} ! Notre solution est là. C'est rapide, c'est efficace, et ça tient en 280 caractères. Testé et approuvé par les pros. Qu'attendez-vous ?`;
		callToAction = "RT si vous aimez la vitesse ! Cliquez ci-dessous pour l'essayer.";
		hashtags = "#Tech #X #FastSolution #Hackathon";
	} else if (plateforme.toLowerCase() === 'instagram') {
		// Style Instagram : Ton visuel, hashtags émotionnels [cite: 23]
		introEmoji = "✨";
		postContent = `Wow ! C'est ce que vous allez dire après avoir vu **${sujet}** en action. Derrière chaque succès, il y a du travail acharné, et ce résultat en vaut la peine ! 💖 N'oubliez pas de mettre un cœur si cela vous inspire.`;
		callToAction = "Lien en bio pour ne rien manquer ! 👆";
		hashtags = "#Inspiration #VisualGoals #CréationDeContenu #InnovationIA";
	} else if (plateforme.toLowerCase() === 'whatsapp') {
		// Style WhatsApp : Ton conversationnel, direct, emojis [cite: 23]
		introEmoji = "💬";
		postContent = `Salut l'équipe ! 👋 Juste un petit message rapide concernant **${sujet}**. C'est opérationnel et ça marche du tonnerre. Pas besoin de longues explications, le résultat parle de lui-même.`;
		callToAction = "On en discute juste après ce message. 🗣️";
		hashtags = "#QuickUpdate #TeamWork #WhatsApp";
	}

	// -----------------------------------------------------
	// NOUVEAU : Adaptation stylistique basée sur le ton
	// -----------------------------------------------------

	// Nous ajustons l'emoji principal en fonction du ton, en plus de l'adaptation par plateforme
	if (ton.toLowerCase() === 'humoristique') {
		introEmoji = "🤣";
		postContent += "\n\n(Note : Attention, l'IA a ajouté une petite blague sur la fin, ne la ratez pas ! 😉)";
		callToAction = "Partagez la blague du jour ! 😂";
	} else if (ton.toLowerCase() === 'inspirant') {
		introEmoji = "🌟";
		postContent = postContent.replace("Bonjour à tous.", "Bonjour à tous. Votre succès commence ici.");
		callToAction = "Inspirez le changement. Lisez ceci et agissez ! 🚀";
	}


	// Construction du message final (formaté pour le champ de texte)
	const simulatedText = `${introEmoji} ${postContent}

	${callToAction}

	${hashtags}

	---
	*Généré par AI Writer Chrome (Mode Simulation pour la démo)*`;
		
	return simulatedText.trim();
 }
	



// ----------------------------------------------------------------------
// NOUVELLE FONCTION : Correction Grammaticale (Proofreader API)
// ----------------------------------------------------------------------

/**
 * Corrige le texte en utilisant l'API Proofreader ou simule la correction.
 * @param {string} text Le texte à corriger.
 * @returns {Promise<string>} Le texte corrigé.
 */
async function proofreadContent(text) {
    if (isAIAvailable() && typeof window.ai.proofreader !== 'undefined') {
        // --- TENTATIVE D'APPEL DE L'API RÉELLE (Proofreader API) ---
        try {
            const result = await window.ai.proofreader.proofread({ text: text });
            if (result && result.proofreadText) {
                return result.proofreadText.trim();
            }
        } catch (error) {
            console.error("Échec de l'API Proofreader, utilisation de la simulation.", error.message);
        }
    }
    
    // --- MODE SIMULATION DE LA CORRECTION (Plan de Secours) ---

    let correctedText = text;
    
    // Simuler une correction en ajoutant une marque pour la démonstration
    if (correctedText.includes("[Message généré par le Partenaire de code")) {
        // Ajouter une ligne pour indiquer la correction simulée sans modifier le texte
        correctedText = correctedText.replace('---', '--- \n✅ Correction grammaticale simulée (Proofreader API passée).');
    }

    // Le corps du message réel est utilisé.

    return correctedText;
}