const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button");
wIcon = document.querySelector(".weather-part img");
arrowBack = wrapper.querySelector("header i");

let keyApi = "0cfc9d368c5821df643eb77f4182320d";
let api;


inputField.addEventListener("keyup", e => {
  //se o usuário pressionar o botão enter e se o valor do input não for vazio
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
    console.log("teste.")
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    //se o navegador suporta a api de localização
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Seu navegador não suporta a API de geolocalização.");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords; // obtem latitude e longitude do user a partir do obj coord
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${keyApi}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${keyApi}`;
  fetchData();
}

function fetchData() {
  infoTxt.innerText = "Obtendo detalhes do tempo...";
  infoTxt.classList.add("pending");
  fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
    infoTxt.innerText = "Algo deu errado :(";
    infoTxt.classList.replace("pending", "error");
  })
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} não é um nome válido para cidade`;
  } else {
  
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0]; 
    const { feels_like, humidity, temp } = info.main;
    
    if(id ==800){
      wIcon.src = "assets/images/clear.svg";
    }else if(id >= 200 && id <= 232){
      wIcon.src = "assets/images/strom.svg"
    }else if(id >= 600 && id <= 622){
      wIcon.src = "assets/images/snow.svg"
    }else if(id >= 701 && id <= 781){
      wIcon.src = "assets/images/haze.svg"
    }else if(id >= 801 && id <= 804){
      wIcon.src = "assets/images/cloud.svg"
    }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
      wIcon.src = "assets/images/rain.svg"
    }
    
    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    infoTxt.classList.remove("pending", "error");

    infoTxt.innerText = "";
    inputField.value = "";
    wrapper.classList.add("active");
  }
}
arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active");
})