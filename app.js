window.addEventListener("load", function() {
  userNaming();
  initClock();
  document.querySelector('.city_search').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
    updateWeather();
    }
  });
  if (localStorage.getItem("city")) {
    displayWeather(localStorage.getItem("city"));
  }
  GoogleSearch();
  TypingEffect();
  document.querySelector('.right_bot_box i').addEventListener('click', function() {
    localStorage.clear();
    location.reload();
  });
});

function userNaming() {
  var modal = document.querySelector('.modal');
  if (!localStorage.getItem("username")) {
    modal.classList.remove('hide');
    document.querySelector('.modal_inner input').addEventListener('keypress', function(e) {
      console.log(e);
      if (e.key === 'Enter') {
        var username = document.querySelector('.modal_inner input').value;
        localStorage.setItem("username", username);
        location.reload();
      }
    });
  }
  else {
    modal.classList.add('hide');
  }
}
function updateWeather() {
  var search = document.querySelector('.city_search');
  var city = search.value.trim();
  localStorage.setItem("city", city);
  displayWeather(city);
}
async function displayWeather(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b580e06f424ebd79a85ac6452975649d`;
  let data = await fetch(apiURL).then(res=> res.json());
  if (data.cod == 200) {
    document.querySelector('.weather_content').classList.remove('hide');
    document.querySelector('#temp').innerText = data.main.temp;
    document.querySelector('.short_desc').innerText = data.weather[0].main;
    document.querySelector('#visibility').innerText = data.visibility;
    document.querySelector('#wind').innerText = data.wind.speed;
    document.querySelector('#humidity').innerText = data.main.humidity;
    document.querySelector('.city_name').innerText = data.name;
    document.querySelector('.city_name').innerText = data.name;
  }
  else {
    document.querySelector('.weather_content').classList.add('hide');
  }
}
function updateClock() {
  const now = new Date();
  const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.getElementById("dayname").innerText = dayName[now.getDay()]+ ",";
  document.getElementById("daynum").innerText = now.getDate();
  document.getElementById("month").innerText = monthName[now.getMonth()];
  document.getElementById("year").innerText = now.getFullYear();
  document.getElementById("hour").innerText = now.getHours();
  document.getElementById("minute").innerText = now.getMinutes();
  document.getElementById("second").innerText = now.getSeconds();
  if (now.getHours() >= 12) {
    document.getElementById("period").innerText = "PM";
  }
  else {
    document.getElementById("period").innerText = "AM";
  }
}
function initClock() {
  updateClock();
  window.setInterval("updateClock()",1)
}
function GoogleSearch() {
  let ggSearch = document.querySelector('.google_search');
  let gging = document.querySelector('.google_bar i:last-child')

  gging.addEventListener('click', function(e) {
    Googling();
  })
  ggSearch.addEventListener('keypress', function(e) {
    if (e.code == 'Enter') {
      Googling();
    }
  })

  function Googling() {
    var keySearch = document.querySelector('.google_search');
    let url ='https://www.google.com/search?q=' + keySearch.value;
    window.open(url, '_blank');
    keySearch.value = "";
  }
}
function TypingEffect() {
  var txt = "Hello " + localStorage.getItem("username") + ",...";
  var txtIndex = 0;
  var intervalValue;
  var el = document.querySelector('.uwu');
  var cursor = document.querySelector('.cursor');

  function Type() {
    var display = txt.substring(0, txtIndex + 1);
    el.innerHTML = display;
    txtIndex++;

    if(display === txt) {
      cursor.style.display = 'none';

      clearInterval(intervalValue);
      setTimeout(function() {
        intervalValue = setInterval(Delete, 50);
      }, 5000);
    }
  }

  function Delete() {
    var display = txt.substring(0, txtIndex - 1);
    el.innerHTML = display;
    txtIndex--;

    if (display === '') {
      clearInterval(intervalValue);

      setTimeout(function() {
        cursor.style.display = 'inline-block';
        intervalValue = setInterval(Type, 75);
      }, 75);
    }
  }
  intervalValue = setInterval(Type, 75);
}
