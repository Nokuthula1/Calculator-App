let runnintTotal=0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen'); 

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
     rerender();
} 

function handleSymbol(symbol){
    // if(symbol==='C'){
    //     buffer='0';
    //     runnintTotal = 0;
    // }
    switch(symbol){
        case 'C':
            buffer='0';
            runnintTotal = 0;
            break;
        case '=':
            if(previousOperator == null){
                return;
            }
            flushOperation(parseInt(buffer));
                previousOperator = null;
                buffer = +runnintTotal;
                runnintTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
            case "+":
            case "-":
            case "×":
            case "÷":
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol){
    if(buffer==='0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runnintTotal===0){
        runnintTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator= symbol;
    buffer='0';
}

function  flushOperation(intBuffer){
    if(previousOperator ==='+'){
        runnintTotal += intBuffer;
    }else if (previousOperator === "-"){
        runnintTotal -= intBuffer;
    }else if(previousOperator ==='×'){
        runnintTotal *= intBuffer;
    }else if(previousOperator ==='/'){
        runnintTotal /= intBuffer;
    }
    
}
function rerender() {
    screen.innerText = buffer;
  }

function handleNumber(numberString){
    if(buffer==="0"){
        buffer=numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });

}

init()