

document.addEventListener("DOMContentLoaded",()=>{
    const botao = document.querySelector("#botao");
    botao.addEventListener("click",convertCurrency);
    swapOptions();
    

})

function getCurrencies(){

    let currency = {
        firstCurrency : document.getElementById("firstOption").value,
        secondCurrency : document.getElementById("secondOption").value
    }
    return currency;
}

function getUrl(){
    const currency = getCurrencies();
    const url = `https://economia.awesomeapi.com.br/json/${currency.firstCurrency}-${currency.secondCurrency}`;
    return url;
}



function convertCurrency(){
    const valueToConvert = document.getElementById("value").value; 
    const url = getUrl();
    fetch(url)
        .then((response)=>{
            return response.json();
        })  
        .then((data)=>{  
            const resultado = (data[0].bid*valueToConvert).toFixed(2);
            const texto = document.getElementById("content");
            texto.innerHTML = "R$ " +resultado;
        

        })
        .catch((erro)=> console.log(erro))
}

function swapOptions(){

    const firstOption = document.querySelector("#firstOption")
    let formerFirstOpt = firstOption.value;

    const secondOption = document.querySelector("#secondOption");
    let formerSecondOpt = secondOption.value;
    
    firstOption.addEventListener('change',()=>{
        if(firstOption.value===secondOption.value){
            secondOption.value = formerFirstOpt;
            formerSecondOpt = secondOption.value;
        }
        formerFirstOpt = firstOption.value;
    });

    secondOption.addEventListener('change',()=>{
        if(secondOption.value===firstOption.value){
            firstOption.value = formerSecondOpt;
            formerFirstOpt = firstOption.value;
        }
        formerSecondOpt = secondOption.value;
    });
}
