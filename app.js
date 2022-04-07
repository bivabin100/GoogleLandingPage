window.addEventListener("load", function() {
  userNaming();
  initClock();
  if (localStorage.getItem("city")) {
    displayWeather(localStorage.getItem("city"));
  }
  TypingEffect();
  initWebsiteShortcut();

})

//Thay đổi thời tiết
document.querySelector('.city_search').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
  updateWeather();
  }
})
//Xóa sạch dữ liệu
document.querySelector('.right_bot_box i').addEventListener('click', function() {
  localStorage.clear();
  location.reload();
})
//Google
GoogleSearch()
//Mở box thêm website shortcut
document.querySelector('#addmore').addEventListener('click', function() {
  document.querySelector('.website_form').classList.remove('hide');
})
//Đóng box them website shortcut
var wsCloseIcon = document.querySelector('.website_form_header i');
wsCloseIcon.addEventListener('click', function() {
  document.querySelector('.website_form').classList.add('hide');
})
document.querySelector('.website_form').addEventListener('click', function(e) {
  if (e.target === e.currentTarget) {
    document.querySelector('.website_form').classList.add('hide');
  }
})
//
//Xóa website website_shortcut



document.querySelector('.website_form_footer button').addEventListener('click', function() {
  addWebsiteShortcut();
  document.querySelector('#websiteName').value = '';
  document.querySelector('#websiteAddress').value = '';
  document.querySelector('.website_form').classList.add('hide');
})
document.querySelector('#websiteAddress').addEventListener('keypress', function(e) {
  if (e.code === 'Enter') {
    ddWebsiteShortcut();
    document.querySelector('#websiteName').value = '';
    document.querySelector('#websiteAddress').value = '';
    document.querySelector('.website_form').classList.add('hide');
  }
})




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
function addWebsiteShortcut() {
  var websiteName = document.querySelector('#websiteName').value;
  var websiteAddress = document.querySelector('#websiteAddress').value;
  websiteAddress = "https://".concat(websiteAddress);
  var websiteArray = JSON.parse(localStorage.getItem('websiteArray'));
  if (!websiteArray) {
    websiteArray =[];
  }
  websiteArray.push([websiteName,websiteAddress]);
  localStorage.setItem('websiteArray', JSON.stringify(websiteArray));
  displayAWebsiteShortcut(websiteArray.length-1);
}
function displayAWebsiteShortcut(i, websiteShortcutList) {
  var websiteArray = JSON.parse(localStorage.getItem('websiteArray'));
  var websiteShortcutList = document.querySelector(".website_shortcut");
  var div = document.createElement("div");
  div.className = "website_item";
  var img = document.createElement('img');
  img.src = `img/ws/${websiteArray[i][0]}.png`;
  img.onload = function() {
    var imgLink = `img/ws/${websiteArray[i][0]}.png`;
    div.innerHTML = `<a href="${websiteArray[i][1]}" target="_blank"><img src="${imgLink}" alt="icon"></a><span>${websiteArray[i][0]}</span><i class="fa-solid fa-circle-xmark" id="wsdelete"></i>`;
    websiteShortcutList.insertBefore(div, websiteShortcutList.children[i])
  }
  img.onerror = function() {
    var imgLink = `img/ws/${websiteArray[i][0].charAt(0).toLowerCase()}.png`;
    div.innerHTML = `<a href="${websiteArray[i][1]}" target="_blank"><img src="${imgLink}" alt="icon"></a><span>${websiteArray[i][0]}</span><i class="fa-solid fa-circle-xmark" id="wsdelete"></i>`;
    websiteShortcutList.insertBefore(div, websiteShortcutList.children[i])
  }
}
function initWebsiteShortcut() {
  var websiteArray = JSON.parse(localStorage.getItem('websiteArray'));
  var websiteShortcutList = document.getElementById("website_shortcut");
  if (!websiteArray) {
    websiteArray = [];
  }
  if (websiteArray.length != 0) {
    for (var i = 0; i < websiteArray.length; i++) {
      displayAWebsiteShortcut(i);
    }
  }
}
