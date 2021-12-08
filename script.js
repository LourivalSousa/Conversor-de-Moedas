document.addEventListener("DOMContentLoaded",()=>{
    const botao = document.querySelector("#botao");
    botao.addEventListener("click",fetchData);
    switchOptions();
})

function getCurrencies(){
    return currency = {
        firstCurrency : document.getElementById("firstOption").value,
        secondCurrency : document.getElementById("secondOption").value
    }
}

function getUrl(){
    const currency = getCurrencies();
    const url = `https://economia.awesomeapi.com.br/json/${currency.firstCurrency}-${currency.secondCurrency}`;
    return url;
}

function convertCurrency (data) {
    const valueToConvert = document.getElementById("value").value; 
    const resultado = (data[0].bid*valueToConvert).toFixed(2);
    const texto = document.getElementById("content");
    texto.innerHTML = "R$ " +resultado;
}

function fetchData(){
    const url = getUrl();
    fetch(url)
        .then(response => response.json())  
        .then(convertCurrency)
        .catch((erro)=> console.log(erro))
}

function switchOptions(){
    /* if both options have the same value this function will switch the option that's wasn't 
    changed for the last time, for the changed option previous value */
   const selectors = document.querySelectorAll(".select");
   let formerFirst = selectors[0].value;
   let formerSecond = selectors[1].value;
   selectors.forEach(selector =>{
       selector.addEventListener('change',()=>{
           if(selectors[0].value === selectors[1].value){
               selectors[0].value = formerSecond;
               selectors[1].value = formerFirst;
           }
           formerFirst = selectors[0].value;
           formerSecond = selectors[1].value;
       })
   })
}

