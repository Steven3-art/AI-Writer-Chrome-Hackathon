// libs/chrome-ai.js - Version Finale

function isAIAvailable() {
    return typeof window.ai !== 'undefined';
}

async function generateContent(prompt) {
    if (isAIAvailable() && typeof window.ai.prompt !== 'undefined') {
        // --- TENTATIVE D'APPEL DE L'IA RÉELLE ---
        try {
            const availabilityStatus = await window.ai.prompt.availability();
            
            if (availabilityStatus === "available") {
                // Note : En mode réel, l'IA gère l'instruction 'INSTRUCTION CRITIQUE'
                const response = await window.ai.prompt.generateText({ prompt: prompt });
                if (response && response.text) {
                    return response.text.trim();
                }
            } else {
                throw new Error("Modèle IA non prêt.");
            }
        } catch (error) {
            console.error("Échec de l'IA réelle. Utilisation de la simulation.", error.message);
        }
    }
    
    // --- PLAN B : MODE SIMULATION (SECOURS) ---
    
    // Extraction des variables du prompt
    const sujetMatch = prompt.match(/Sujet:\s*"(.*?)"/);
    const plateformeMatch = prompt.match(/Plateforme ciblée:\s*(\w+)/);
    const tonMatch = prompt.match(/Ton souhaité:\s*(\w+)/);
    const mediaRequired = prompt.includes("INSTRUCTION CRITIQUE"); // <-- DÉTECTION CRITIQUE DU CHOIX

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
        introEmoji = mediaRequired ? "💼" : "📢"; // Emoji différent selon le mode
        
        if (mediaRequired) {
            postContent = `Bonjour à tous. C'est avec une grande fierté que nous vous partageons les résultats de **${sujet}**. L'infographie ci-jointe montre clairement l'impact : nous observons une amélioration de 📈 25% de l'efficacité pour nos premiers utilisateurs.`;
            callToAction = "Découvrez l'analyse complète dans le média ci-dessous et partagez vos impressions ! 👇";
            hashtags = "#Innovation #Professionnel #Données #AIWriter";
        } else {
            postContent = `Bonjour à tous. Voici un point de situation essentiel sur **${sujet}**. Après analyse, nous confirmons une amélioration de l'efficacité de 25% pour nos premiers utilisateurs. L'accent est mis sur la simplicité et la fiabilité.`;
            callToAction = "Cliquez sur le lien en commentaire pour lire l'article complet et vous faire votre propre idée.";
            hashtags = "#News #Update #Stratégie #AIWriter";
        }
    } else if (plateforme.toLowerCase() === 'twitter') {
        introEmoji = mediaRequired ? "📸" : "🚨";
        
        if (mediaRequired) {
            postContent = `Le visuel vaut mille mots ! Fini les soucis de ${sujet.toLowerCase()} ! Découvrez l'image jointe pour un aperçu rapide de notre solution.`;
            callToAction = "RT si vous aimez cette clarté ! ⬆️";
            hashtags = "#Visuel #Tech #FastSolution";
        } else {
            postContent = `Alerte ! Fini les soucis de ${sujet.toLowerCase()} ! Notre solution est là. C'est rapide, efficace, et ça tient en 280 caractères. Testez-le !`;
            callToAction = "Cliquez ci-dessous pour l'essayer.";
            hashtags = "#News #FastSolution #Tech";
        }
    } else if (plateforme.toLowerCase() === 'whatsapp') {
        introEmoji = mediaRequired ? "👀" : "💬";
        
        if (mediaRequired) {
            postContent = `Salut l'équipe ! 👋 Juste un petit message rapide concernant **${sujet}**. L'image que je viens d'envoyer explique tout clairement. Pas besoin de longues explications.`;
            callToAction = "On en discute après avoir vu le visuel. 🗣️";
            hashtags = "#QuickUpdate #MediaMarketing";
        } else {
            postContent = `Salut l'équipe ! 👋 Juste un petit message rapide concernant **${sujet}**. Le lancement est une réussite ! J'envoie les résultats détaillés dans le prochain message.`;
            callToAction = "On en discute juste après ce message. 🗣️";
            hashtags = "#TeamWork #QuickUpdate";
        }
    }
    
    // -----------------------------------------------------
    // Adaptation stylistique basée sur le ton
    // -----------------------------------------------------

    // Cette adaptation s'ajoute au contenu généré, quel que soit le mode (média ou non)
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
} // Fin de generateContent

async function proofreadContent(text) {
    if (isAIAvailable() && typeof window.ai.proofreader !== 'undefined') {
        try {
            const result = await window.ai.proofreader.proofread({ text: text });
            if (result && result.proofreadText) {
                return result.proofreadText.trim();
            }
        } catch (error) {
            console.error("Échec de l'API Proofreader, utilisation de la simulation.", error.message);
        }
    }
    
    // --- MODE SIMULATION DE LA CORRECTION ---
    let correctedText = text;
    
    if (correctedText.includes('---')) {
        correctedText = correctedText.replace('---', '--- \n✅ Correction grammaticale simulée (Proofreader API passée).');
    }

    return correctedText;
}