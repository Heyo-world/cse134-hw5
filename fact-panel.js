const factList = [
    {text: "The fear of long words is called Hippopotomonstrosesquippedaliophobia",
     detail: "The word is a combination of 'Hippopotamus', 'Monster', and 'Phobia'",},
    {text: "It's illegal to own just one guinea pig in Switzerland",
     detail: "It's considered animal abuse because they're social beings and get lonely",},
    {text: "Strawberries are not berries",
     detail: "Strawberries actually share the same family as roses",
    },
]

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
        this.appendChild(this.factText);

        this.factDetail = document.createElement("small");
        this.factDetail.className = "fact-detail";
        this.appendChild(this.factDetail);

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.textContent = "Next fact";
        nextButton.addEventListener("click", () => {
            this.currIndex = (this.currIndex + 1) % factList.length;
            this.render();
        });
        this.appendChild(nextButton);

        this.status = document.createElement("p");
        this.status.className = "fact-status";
        this.status.setAttribute("role", "status");
        this.status.setAttribute("aria-live", "polite");
        this.appendChild(this.status);
    }

    render() {
        const fact = factList[this.currIndex];
        this.factText.textContent = fact.text;
        this.factDetail.textContent = fact.detail;
        this.factDetail.hidden = this.hasAttribute("compact");

        this.status.textContent = `Fact ${this.currIndex + 1} of ${factList.length}`;
    }
}
customElements.define("fact-panel", FactPanel);


document.addEventListener("DOMContentLoaded", () => {
    const panel = document.querySelector("fact-panel");
    const toggleBtn = document.querySelector("#show-hide-detail");

    if (panel && toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const hasCompact = panel.toggleAttribute("compact");
            toggleBtn.setAttribute("aria-pressed", String(hasCompact));
        });
    }
});