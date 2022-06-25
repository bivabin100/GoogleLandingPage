window.addEventListener("load", function() {
  //Init Clock and Weather
  setInterval(initTime,500);
  if (localStorage.getItem("city")) {
    displayWeather(localStorage.getItem("city"));
  } else if (!localStorage.getItem("city")) {
    document.querySelector('.weather_display_container').classList.add("hidden");
  }
  initWebsiteShorcut();
  userNaming();
  typingEffect();
  initQuote();
})
//Update weather_status
document.querySelector('.city_input input').addEventListener('keypress', function(e) {
  if (e.key === "Enter") {
    updateWeather();
    document.querySelector('.city_input input').value = "";
  }
});
//Open and Close Website Shortcut Input Form
document.querySelector('#addwebsiteshortuct').addEventListener('click', function() {
  document.querySelector('.modal').classList.remove("hidden");
  document.querySelector('#websiteShortcut').classList.remove("hidden");
  document.querySelector('.modal').addEventListener('click', function(e) {
    if (e.target == e.currentTarget) {
      document.querySelector('.modal').classList.add("hidden");
      document.querySelector('#websiteShortcut').classList.add("hidden");
      document.querySelector('#websiteName').value = '';
      document.querySelector('#websiteAddress').value = '';
    }
  })
  document.querySelector('#websiteShortcut button').addEventListener('click', function() {
    saveAndCloseWebsiteShortcutInputForm();
  })
  document.querySelector('#websiteAddress').addEventListener('keypress', function(e) {
    if (e.key == "Enter") {
      saveAndCloseWebsiteShortcutInputForm();
    }
  })
  document.querySelector('#websiteName').addEventListener('keypress', function(e) {
    if (e.key == "Enter") {
      saveAndCloseWebsiteShortcutInputForm();
    }
  })
})
document.querySelector('#websiteShortcut i').addEventListener('click', function() {
  document.querySelector('.modal').classList.add("hidden");
  document.querySelector('#websiteShortcut').classList.add("hidden");
  document.querySelector('#websiteName').value = '';
  document.querySelector('#websiteAddress').value = '';
})
//Delete All localStorage
document.querySelector('.delete_data_container i').addEventListener('click', function() {
  document.querySelector('.modal').classList.remove("hidden");
  document.querySelector('#chooseDataDelete').classList.remove("hidden");
  document.querySelector('.modal').addEventListener('click', function(e) {
    if (e.target == e.currentTarget) {
      document.querySelector('.modal').classList.add("hidden");
      document.querySelector('#chooseDataDelete').classList.add("hidden");
      document.querySelectorAll('#chooseDataDelete input').value = '';
      document.querySelector('#delete1').checked = false;
      document.querySelector('#delete2').checked = false;
      document.querySelector('#delete3').checked = false;
    }
  })
  document.querySelector('#chooseDataDelete i').addEventListener('click', function() {
    document.querySelector('.modal').classList.add("hidden");
    document.querySelector('#chooseDataDelete').classList.add("hidden");
    document.querySelector('#delete1').checked = false;
    document.querySelector('#delete2').checked = false;
    document.querySelector('#delete3').checked = false;
  })
  document.querySelector('#chooseDataDelete button').addEventListener('click', function() {
    if (document.querySelector('#delete1').checked) {
      localStorage.removeItem('wsLocalStorageArray');
    }
    if (document.querySelector('#delete2').checked) {
      localStorage.removeItem('userName');
    }
    if (document.querySelector('#delete3').checked) {
      localStorage.removeItem('city');
    }
    document.querySelector('.modal').classList.add("hidden");
    document.querySelector('#chooseDataDelete').classList.add("hidden");
    document.querySelector('#delete1').checked = false;
    document.querySelector('#delete2').checked = false;
    document.querySelector('#delete3').checked = false;
    location.reload();
  })
})
//All of functions
//Function: user inputs their name
function userNaming() {
  if (!localStorage.getItem("userName")) {
    document.querySelector('.modal').classList.remove("hidden");
    document.querySelector('#userName').classList.remove("hidden");
    document.querySelector('.welcome_panel_container').classList.add("hidden")
    document.querySelector('#yourName').addEventListener('keypress', function(e) {
      if (e.key == "Enter") {
        var userName = this.value;
        localStorage.setItem("userName", userName);
        document.querySelector('#userName').classList.add("hidden");
        document.querySelector('.modal').classList.add("hidden");
        document.querySelector('.welcome_panel_container').classList.remove("hidden")
        location.reload();
      }
    })
    document.querySelector('#userName button').addEventListener('click', function() {
      var userName = this.value;
      localStorage.setItem("userName", userName);
      document.querySelector('#userName').classList.add("hidden");
      document.querySelector('.modal').classList.add("hidden");
      document.querySelector('.welcome_panel_container').classList.remove("hidden")
      location.reload();
    })
  }
}
//Function: typing
function typingEffect() {
  var txt = "Hello " + localStorage.getItem("userName") + ",...";
  var txtIndex = 0;
  var intervalValue;
  var el = document.querySelector('.name');
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
//Function: init Time
async function initTime() {
  var now = new Date();
  const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  document.querySelector('#datename').innerText = dayName[now.getDay()];
  document.querySelector('#date').innerText = now.getDate();
  document.querySelector('#month').innerText = monthName[now.getMonth()];
  document.querySelector('#year').innerText = now.getFullYear();
  document.querySelector('#hour').innerText = now.getHours();
  document.querySelector('#minute').innerText = now.getMinutes();
  document.querySelector('#second').innerText = now.getSeconds();
  if (now.getHours() >= 12) {
    document.getElementById("period").innerText = "PM";
  }
  else {
    document.getElementById("period").innerText = "AM";
  }
}
//Function: update Weather
function updateWeather() {
  var search = document.querySelector('.city_input input');
  var city = search.value.trim();
  localStorage.setItem("city", city);
  displayWeather(city);
}
//Function: show Weather on screen
async function displayWeather(city) {
  document.querySelector('.weather_display_container').classList.remove("hidden");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=b580e06f424ebd79a85ac6452975649d`;
  let data = await fetch(apiURL).then(res=> res.json());
  if (data.cod == 200) {
    document.querySelector('#temp').innerText = data.main.temp;
    document.querySelector('.weather_status span').innerText = data.weather[0].main;
    document.querySelector('#wind').innerText = data.wind.speed + "m/s";
    document.querySelector('#humidity').innerText = data.main.humidity + "%";
    document.querySelector('#tempFeel').innerHTML = data.main.feels_like + '<sup>o</sup>C'
    document.querySelector('.city_name span').innerText = data.name;
  }
}
//Function: close WebsiteShortcut Input Form and save data to localStorage
function saveAndCloseWebsiteShortcutInputForm() {
  var websiteName = document.querySelector('#websiteName').value;
  var websiteAddress = document.querySelector('#websiteAddress').value;
  if (websiteName && websiteAddress) {
    websiteAddress = "https://".concat(websiteAddress);
    websiteAddress = websiteAddress.toLowerCase();
    websiteName = websiteName.charAt(0).toUpperCase() + websiteName.slice(1);
    var wsLocalStorageArray = JSON.parse(localStorage.getItem('wsLocalStorageArray'));
    if (!wsLocalStorageArray) {
      wsLocalStorageArray = [];
    }
    wsLocalStorageArray.push([websiteName,websiteAddress]);
    localStorage.setItem('wsLocalStorageArray', JSON.stringify(wsLocalStorageArray));
    createAWebsiteShortcut(wsLocalStorageArray.length-1);
    document.querySelector('.modal').classList.add("hidden");
    document.querySelector('#websiteShortcut').classList.add("hidden");
    document.querySelector('#websiteName').value = '';
    document.querySelector('#websiteAddress').value = '';
  }
}
//Function: init WebsiteShortcut when starting
function initWebsiteShorcut() {
  var wsLocalStorageObject = JSON.parse(localStorage.getItem('wsLocalStorageArray'));
  if (!wsLocalStorageObject) {
    wsLocalStorageObject = [];
  }
  else {
    for (var i = 0; i < wsLocalStorageObject.length; i++) {
      createAWebsiteShortcut(i);
    }
  }
}
//Function: display a WebsiteShortcut on screen
function createAWebsiteShortcut(i) {
  var wsLocalStorageArray = JSON.parse(localStorage.getItem('wsLocalStorageArray'));
  var websiteShortcutArray = document.querySelector('.website_shortcut_container');
  var div = document.createElement("div");
  div.className = "website_shortcut_item";
  div.innerHTML = `<i class="fa-solid fa-circle-minus"></i><a href="${wsLocalStorageArray[i][1]}" target="_blank"><img src="img/${wsLocalStorageArray[i][0].toLowerCase()}.png" onerror="this.onerror=null;this.src='img/${wsLocalStorageArray[i][0].charAt(0).toUpperCase()}.png';"></a><span>${wsLocalStorageArray[i][0]}</span>`;
  websiteShortcutArray.insertBefore(div, websiteShortcutArray.children[i]);

  div.querySelector('i').addEventListener('click', function() {
    this.parentElement.remove();
    localStorage.removeItem('wsLocalStorageArray');
    wsLocalStorageArray.splice(i, 1);
    localStorage.setItem('wsLocalStorageArray', JSON.stringify(wsLocalStorageArray));
    location.reload();
  })
}
//Function generate random code
async function initQuote () {
  let quoteAPI = "https://type.fit/api/quotes";
  let data = await fetch(quoteAPI).then(res=> res.json());
  console.log(data);
  let quoteIndex = Math.floor(Math.random() * data.length);
  console.log(quoteIndex);
  console.log(data[quoteIndex]);
  document.querySelector('.quote_sentence q').innerText = data[quoteIndex].text;
  if (data[quoteIndex].author) {
    document.querySelector('.quote_sentence p i').innerText = data[quoteIndex].author;
  } else {
    document.querySelector('.quote_sentence p i').innerText = "Noname";
  }
}