const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector("info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button");
let keyApi = "0cfc9d368c5821df643eb77f4182320d";
let api;

inputField.addEventListener("keyup", (e) => {
  //se o usuário pressionar o botão enter e se o valor do input não for vazio
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
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
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keyApi}`;
  fetchData();
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}`;
}

function fetchData() {
  infoTxt.innerText = "Obtendo detalhes do tempo...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  infoTxt.classList.replace("pending", "error");
  if (info.cod == "404") {
    infoTxt.innerText = `${input.inputField} não é um nome válido para cidade`;
  } else {
    infoTxt.classList.remove("pending", "error");
    console.log(info);
  }
}
