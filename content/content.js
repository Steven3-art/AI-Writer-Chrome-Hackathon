const TEXTAREA_SELECTORS = [
    // LinkedIn
    'textarea[name="text"]', '.ql-editor', 
    // Twitter / X
    '[data-testid="tweetTextarea_0"]', '.DraftEditor-editorContainer', 'textarea.r-1qd0xha',
    // WhatsApp Web
    'div[contenteditable="true"][role="textbox"]', 
    '#main div[contenteditable="true"][spellcheck="true"]',
    // Facebook
    'div[aria-label="Écrire une publication..."]',
    // Instagram
    'textarea[aria-label="Ajouter un commentaire..."]', 'textarea[placeholder="Écrire une légende..."]'
];

const BUTTON_ID = 'ai-writer-injector-button';

// Suppression de l'ancienne variable globale activeTextArea car on utilise le storage

/**
 * Crée le bouton "Générer avec l'IA" à insérer.
 */
function createAIButton(textAreaElement) {
    const button = document.createElement('button');
    button.id = BUTTON_ID;
    button.textContent = '🧠 AI Writer';
    // Style pour l'intégration
    button.style.all = 'unset'; 
    button.style.backgroundColor = '#3b5998'; 
    button.style.color = 'white';
    button.style.padding = '3px 8px';
    button.style.borderRadius = '3px';
    button.style.fontSize = '11px';
    button.style.cursor = 'pointer';
    button.style.marginLeft = '10px';
    button.style.display = 'inline-block';

    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
		
		// 1. Ajout d'un identifiant unique au champ de texte (Si non présent)
		if (!textAreaElement.id) {
			textAreaElement.id = 'ai-writer-active-field-' + Date.now(); // J'ai renommé en 'ai-writer' pour cohérence
		}
		
		// 2. Stocker l'ID de l'élément actif dans le storage de Chrome (Clé unique et cohérente)
		chrome.storage.local.set({ activeFieldId: textAreaElement.id}, () => { // <--- L'appel est maintenant sur une ligne propre
     console.log('Active field ID stored:', textAreaElement.id);
    });
        
        // Message pour l'utilisateur
        alert("Zone de saisie sélectionnée. Cliquez sur l'icône '🧠 AI Writer' pour générer le contenu.");
    });
    
    return button;
}

function injectAIButton() {
    TEXTAREA_SELECTORS.forEach(selector => {
        const textAreas = document.querySelectorAll(selector);

        textAreas.forEach(textArea => {
            // S'assurer que le bouton n'est pas déjà présent
            if (textArea.dataset.aiWriterBound) return; 

            // Créer et insérer le bouton
            const aiButton = createAIButton(textArea);
            
            // Trouver le meilleur emplacement (souvent le parent)
            let container = textArea.parentElement;
            
            if (container) {
                // Créer un wrapper pour le bouton
                const wrapper = document.createElement('div');
                wrapper.className = 'ai-writer-button-wrapper';
                wrapper.style.display = 'inline-block';
                wrapper.appendChild(aiButton);

                // Insérer le wrapper après le champ de texte ou dans un conteneur d'outils
                // Simplification: insérer le bouton après l'élément, dans son parent
                textArea.parentNode.insertBefore(wrapper, textArea.nextSibling);
                textArea.dataset.aiWriterBound = true;
            }
        });
    });
}

// Réception du texte généré 
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "insertContent" && request.text) {
			
			// Récupération de l'ID du champ actif depuis le storage
			chrome.storage.local.get('activeFieldId', (data) => {
				// Assurer que l'ID est bien là
				const targetFieldId = data.activeFieldId; 
				
				if (targetFieldId) {
					// Recherche de l'élément ACTIF dans le DOM ( Document object Model ) ou Module d'objet de document
					const activeTextArea = document.getElementById(targetFieldId); 
					
					// Nettoyage Immédiat du storage
					chrome.storage.local.remove('activeFieldId');
					
					if (activeTextArea) { 
						const textToInsert = request.text;
						
						// Utilisation de la simulation de collage (plus fiable pour les DIVs complexes)
						
						// Fonction pour insérer du texte via simulation de collage
						const insertTextBySimulatingPaste = (element, text) => {
							element.focus();

							// Créer un objet de données pour simuler le presse-papiers
							const dataTransfer = new DataTransfer();
							dataTransfer.setData('text/plain', text);

							// Créer un événement de collage
							const pasteEvent = new ClipboardEvent('paste', {
								clipboardData: dataTransfer,
								bubbles: true
							});

							// Déclencher l'événement sur l'élément (WhatsApp l'intercepte)
							element.dispatchEvent(pasteEvent);
						};

						// Appliquer la méthode de simulation de collage
						insertTextBySimulatingPaste(activeTextArea, textToInsert);

						// Déclencher des événements supplémentaires pour s'assurer que l'interface le reconnaît
						const inputEvent = new Event('input', { bubbles: true });
						activeTextArea.dispatchEvent(inputEvent);

						const changeEvent = new Event('change', { bubbles: true });
						activeTextArea.dispatchEvent(changeEvent);

						const keyUpEvent = new KeyboardEvent('keyup' , {'key': ' '}); 
						activeTextArea.dispatchEvent(keyUpEvent);
						
						sendResponse({ status: "success" }); // Maintenir la réponse de succès ici
					} else {
						console.error("Erreur critique: L'élément actif avec l'ID " + targetFieldId + " est introuvable dans le DOM.");
						sendResponse({ status: "error", message: "Élément introuvable." });
					}
				} else {
					console.error("Aucune zone de texte active n'a été trouvée pour insérer le contenu. (ID manquant dans le storage)");
					sendResponse({ status: "error", message: "Aucune zone de texte active." });
				}
			});
            
            return true; // cette instruction Indique que nous allons répondre de manière asynchrone (nécessaire)
        }
    }
);

// Obeserver et exécuter l'injection 
const observer = new MutationObserver(injectAIButton);
observer.observe(document.body, { childList: true, subtree: true });
injectAIButton();