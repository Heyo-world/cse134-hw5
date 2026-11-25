const FACT_URL = "https://uselessfacts.jsph.pl/api/v2/facts/random";

/*
Left over from part 1
const factList = [
    {text: "The fear of long words is called Hippopotomonstrosesquippedaliophobia",
     detail: "The word is a combination of 'Hippopotamus', 'Monster', and 'Phobia'",},
    {text: "It's illegal to own just one guinea pig in Switzerland",
     detail: "It's considered animal abuse because they're social beings and get lonely",},
    {text: "Strawberries are not berries",
     detail: "Strawberries actually share the same family as roses",
    },
]
*/

class FactPanel extends HTMLElement {
    static observedAttributes = ["compact"];

    constructor() {
        super();
        this.currIndex = 0;
        this.built = false;
    }

    connectedCallback(){
        if (!this.built) {
            this.build();
            this.built = true;
        }
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "compact" && this.built) {
            this.render();
        }
    }

    build() {
        const heading = document.createElement("h3");
        heading.textContent = "Fun facts";
        this.appendChild(heading);

        this.factText = document.createElement("p");
        this.factText.className = "fact-text";
        this.factText.textContent = "Press the button to load a fact.";
        this.appendChild(this.factText);

        this.factDetail = document.createElement("small");
        this.factDetail.className = "fact-detail";
        this.appendChild(this.factDetail);

        this.nextButton = document.createElement("button");
        this.nextButton.type = "button";
        this.nextButton.textContent = "Next fact";
        this.nextButton.addEventListener("click", () => {
            this.loadFact();
        });
        this.appendChild(this.nextButton);

        this.status = document.createElement("p");
        this.status.className = "fact-status";
        this.status.setAttribute("role", "status");
        this.status.setAttribute("aria-live", "polite");
        this.status.textContent = "Ready.";
        this.appendChild(this.status);
    }

    async loadFact(){
        if (this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.nextButton.disabled = true;
        this.status.textContent = "Loading a fact...";

        try {
            const response = await fetch(FACT_URL, {
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();

            if (typeof data?.text !== "string" ) {
                throw new Error("Expected a valid fact in the response.");
            }

            this.factText.textContent = data.text;
            this.factDetail.textContent = typeof data.source === "string" ? `Source: ${data.source}` : "Useless Facts API";
            this.currIndex++;
            this.nextButton.textContent = "Next fact";
            this.status.textContent = `Fact #${this.currIndex}`;
            this.render();

        } catch (error) {
            console.error("Could not load the fact.", error);
            this.nextButton.textContent = "Try again";
            this.status.textContent = `Could not load a fact. Try again.`;
        } finally {
            this.isLoading = false;
            this.nextButton.disabled = false;
        }
    }

    render() {
        this.factDetail.hidden = this.hasAttribute("compact");
    }
}
customElements.define("fact-panel", FactPanel);

const MODE_KEY = "fact-panel-detail-view-mode";
//Expanded mode is default
function readCompactMode(){
    try{
        const saved = localStorage.getItem(MODE_KEY);
        if(saved === "true"){
            return true;
        }
        return false;
    }
    catch(error){
        console.warn("Couldn't read preference. ", error);
        return false;
    }
}

function saveCompactMode(isCompact){
    try{
        localStorage.setItem(MODE_KEY, String(Boolean(isCompact)));
    }
    catch(error){
        console.warn("Couldn't save preference. ", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const panel = document.querySelector("fact-panel");
    const toggleBtn = document.querySelector("#show-hide-detail");

    if (panel && toggleBtn) {
        const initialMode = readCompactMode();
        panel.toggleAttribute("compact", initialMode);
        toggleBtn.setAttribute("aria-pressed", String(initialMode));

        toggleBtn.addEventListener("click", () => {
            const isCompact = panel.toggleAttribute("compact");
            toggleBtn.setAttribute("aria-pressed", String(isCompact));
            saveCompactMode(isCompact);
        });
    }
});


