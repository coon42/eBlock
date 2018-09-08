// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');

changeColor.onclick = function(element) {
  let color = element.target.value;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: "                                                   \
          function removeAllEventListenersFromElement(element) {    \
            let clone = element.cloneNode();                        \
                                                                    \
             while (element.firstChild) {                           \
               clone.appendChild(element.lastChild);                \
           }                                                        \
                                                                    \
           element.parentNode.replaceChild(clone, element);         \
         }                                                          \
                                                                    \
         function disableButton(buttonElement) {                    \
           buttonElement.setAttribute('disabled', '');              \
           buttonElement.style = 'color:yellow';                    \
           buttonElement.innerHTML = 'Seller is blacklisted';       \
                                                                    \
           removeAllEventListenersFromElement(buttonElement);       \
         }                                                          \
                                                                    \
         var buyButton = document.getElementById('binBtn_btn');     \
         var cartButton = document.getElementById('isCartBtn_btn'); \
         var barterButton = document.getElementById('boBtn_btn');   \
                                                                    \
         disableButton(buyButton);                                  \
         disableButton(cartButton);                                 \
         disableButton(barterButton);                               \
                                                                    \
         var sellerName = document.getElementById('mbgLink');       \
         sellerName.style = 'color:red !important';                 \
         "
       });
  });
};

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

