const display = document.querySelector("#screen>p");
const btnList = document.querySelectorAll(".row>button");

const symbSet = new Set(["-","+","×","÷","←"])
const simpleOp = new Set(["+","-"])

btnList.forEach(btn => {
    btn.addEventListener("click", (event) => {
        addElement(event.target.innerText);
    })
});

let buffer = "";
let rollingTotal;
let operation = "";
let result = "";

function handleSymb(symb){
    display.textContent = symb;
    if (operation == ""){
        rollingTotal = buffer;
    }
    operation = symb;
    buffer = "";
    return;
}

function endCalc(){
    result = doMath(Number(rollingTotal), Number(buffer), operation);
    display.textContent = result;
    buffer = "";
    rollingTotal = result;
    return;
}

function reset() {
    rollingTotal = "";
    operation = "";
    buffer = "";
    result = "";
    display.textContent = "0";
}

function addElement(element) {
    if ((symbSet.has(element))){
        switch (element) {
            case "":
                return;
            case "←":
                buffer = buffer.slice(0,-1);
                display.textContent = buffer;
                return;
            default:
                handleSymb(element);
                return;
        }
    } 
    switch (element) {
        case "=":
            endCalc()
            return;
        case "Clear":
            reset();
            return;
        default:
            break;
    }
    buffer += element;
    display.textContent = buffer;
}

const doMath = (numA, numB, op) => {
    switch (op) {
        case "+":
            return numA+numB;            
        case "-":
            return numA-numB;            
        case "×":
            return numA*numB;            
        case "÷":
            return numA/numB;            
        default:
            break;
    }
}
