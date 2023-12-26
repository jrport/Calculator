const display = document.querySelector("#screen>p");
const btnList = document.querySelectorAll(".row>button");

const symbSet = new Set(["-","+","×","÷","←"])
const simpleOp = new Set(["+","-"])
const convertSet = new Set(["Enter","*","/","Backspace"])
//const convertMap = new Map([["/","÷"],["*", "×"], ["Enter","="],["Backspace","←"]])

//document.addEventListener("keydown",(kEvent)=>{
//    if (convertSet.has(kEvent.key)) {
//        console.log(kEvent.key);
//        console.log(convertMap[String(kEvent.key)])
//        addElement(convertMap[kEvent.key]);
//        return;
//    }
//    if ((Number.isInteger(Number(kEvent.key))) || simpleOp.has(kEvent.key)){
//        addElement(kEvent.key);
//    }
//})

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
    display.textContent = "";
}

function addElement(element) {
    if ((symbSet.has(element))){
        switch (buffer) {
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
