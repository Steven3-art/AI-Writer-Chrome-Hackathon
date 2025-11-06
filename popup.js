document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generationForm');
    const outputDiv = document.getElementById('output');
    const generateButton = document.getElementById('generateButton');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Récupération des données du formulaire
        const sujet = document.getElementById('sujet').value;
        const plateforme = document.getElementById('plateforme').value;
        const ton = document.getElementById('ton').value;
        const longueur = document.getElementById('longueur').value;

        if (!sujet) {
            outputDiv.textContent = "Veuillez entrer un sujet pour la rédaction.";
            return;
        }

        // 2. Construction de l'invite (Prompt) pour l'IA
        const prompt = `Génère un post pour les réseaux sociaux. 
        Sujet: "${sujet}". 
        Plateforme ciblée: ${plateforme}. 
        Ton souhaité: ${ton}. 
        Longueur désirée: ${longueur}. 
        Inclus des emojis, des hashtags pertinents et un Call-to-Action intelligent. 
        Adapte le style au format de la plateforme.`;
        
        // Affichage du prompt dans la console pour le débogage
        console.log("Prompt à envoyer à l'IA:", prompt);

        // Mise à jour de l'UI pendant l'attente
        outputDiv.textContent = "🧠 Génération en cours par l'IA locale... veuillez patienter.";
        generateButton.disabled = true;

        try {
            // 3. Appel direct à la fonction de génération
            let generatedText = await generateContent(prompt); 

            // 3.5. NOUVEAU : Application de la correction grammaticale
            outputDiv.textContent = "✅ Contenu généré. 📝 Correction grammaticale en cours...";
            
            const finalCorrectedText = await proofreadContent(generatedText);

            // 4. Envoi du résultat FINAL au content script
            const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

            chrome.tabs.sendMessage(tab.id, {
                action: "insertContent",
                text: finalCorrectedText // <-- Envoi du texte CORRIGÉ
            }, (response) =>{
                // ... (gestion de la réponse)
                // ...
            });

        } catch (error) {
            // Affichage de l'erreur d'exécution ou de l'échec de la simulation.
            outputDiv.textContent = `❌ Échec critique : ${error.message}. Utilisation du mode Secours.`;
        } finally {
            generateButton.disabled = false;
        }
    });
});