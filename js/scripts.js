class BoxShadowGenerator {

    constructor(horizontal, horizontalRef, vertical, verticalRef, blur, blurRef, spread, spreadRef, color, colorRef, opacity, opacityRef, inset, previewBox, rule, webkitRule, mozRule,) {

        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spread = spread;
        this.spreadRef = spreadRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.insetRef = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spreadRef.value = this.spread.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule();
        this.showRule();
    }

    applyRule() {
        const rgbValue = this.hexToRbg(this.colorRef.value);

        this.previewBox.style.boxShadow =
            `${this.insetRef ? "inset" : "" }
            rgba(${rgbValue}, ${this.opacityRef.value}) 
            ${this.horizontalRef.value}px 
            ${this.verticalRef.value}px 
            ${this.blurRef.value}px 
            ${this.spreadRef.value}px 
            `

        this.curentRule = this.previewBox.style.boxShadow
    }

    showRule() {
        this.rule.innerText = this.curentRule;
        this.webkitRule.innerText = this.curentRule;
        this.mozRule.innerText = this.curentRule;
    }

    updateValue(type, value) {
        switch (type) {
            case "horizontal":
                this.horizontalRef.value = value;
                break;

            case "vertical":
                this.verticalRef.value = value;
                break;

            case "blur":
                this.blurRef.value = value;
                break;

            case "spread":
                this.spreadRef.value = value;
                break;

            case "color":
                this.colorRef.value = value;
                break;

            case "opacity":
                this.opacityRef.value = value;
                break;

            case "inset":
                this.insetRef = value;
                break;
        }

        this.applyRule();
        this.showRule();
    }

    hexToRbg(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${("0x" + hex[3] + hex[4]) | 0}, ${("0x" + hex[5] + hex[6]) | 0}`
    }
}



// Selection
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spread = document.querySelector("#spread");
const spreadRef = document.querySelector("#spread-value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const boxShadow = new BoxShadowGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spread,
    spreadRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule,
);


boxShadow.initialize();


// Eventos

const inputs = [horizontal, vertical, blur, spread, color, opacity,];
const inputsString = ["horizontal", "vertical", "blur", "spread", "color", "opacity"];

inputs.forEach((input, i) => {
    input.addEventListener("input", (e) => {
        const value = e.target.value;
        boxShadow.updateValue(inputsString[i], value)
    })
})

inset.addEventListener("input", (e) => {
    const value = e.target.checked;
    boxShadow.updateValue("inset", value);
})


// Copy rule
const rulesArea = document.querySelector('#rules-area');
const copyInstuctions = document.querySelector('#copy-instructions');

rulesArea.addEventListener('click', () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {
        copyInstuctions.innerText = "Regra copiada com sucesso!"
    })

    setTimeout(() => {
        copyInstuctions.innerText = "Clique no quadro a cima para copiar as regras";
    },1500)
})