'use strict';

let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
  let color = element.target.value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: "                                                     \
                                                                      \
          function removeAllEventListenersFromElement(element) {      \
            let clone = element.cloneNode();                          \
                                                                      \
             while (element.firstChild) {                             \
               clone.appendChild(element.lastChild);                  \
             }                                                        \
                                                                      \
            element.parentNode.replaceChild(clone, element);          \
          }                                                           \
                                                                      \
          function getBlacklist() {                                   \
           let xhr = new XMLHttpRequest();                            \
                                                                      \
           let blacklist = JSON.parse(                                \
             '                                                        \
             {                                                        \
             \"users\":                                              \
               [                                                      \
                 \"welovebasic_de\"                                   \
               ]                                                      \
             }                                                        \
             '                                                        \
           );                                                         \
                                                                      \
           return blacklist;                                          \
         }                                                            \
                                                                      \
         function userIsBlacklisted(userName) {                       \
           let blacklist = getBlacklist();                            \
                                                                      \
           console.log('blacklist: ');                                \
           console.log(blacklist);                                    \
                                                                      \
           for (let i in blacklist.users) {                           \
             console.log(blacklist.users[i]);                         \
             console.log(userName);                                   \
                                                                      \
             if (blacklist.users[i] == userName)                      \
               return true;                                           \
           }                                                          \
                                                                      \
           return false;                                              \
         }                                                            \
                                                                      \
         var sellerName = document.getElementById('mbgLink').getElementsByTagName('span')[0].innerHTML; \
                                                                      \
         function disableButton(buttonElement) {                      \
           buttonElement.setAttribute('disabled', '');                \
           buttonElement.style = 'color:yellow';                      \
           buttonElement.innerHTML = 'Seller is blacklisted';         \
                                                                      \
           removeAllEventListenersFromElement(buttonElement);         \
         }                                                            \
                                                                      \
         if (userIsBlacklisted(sellerName)) {                         \
           sellerName.style = 'color:red !important';                 \
                                                                      \
           var buyButton = document.getElementById('binBtn_btn');     \
           var cartButton = document.getElementById('isCartBtn_btn'); \
           var barterButton = document.getElementById('boBtn_btn');   \
                                                                      \
           disableButton(buyButton);                                  \
           disableButton(cartButton);                                 \
           disableButton(barterButton);                               \
         }                                                            \
         "
       });
  });
};

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

