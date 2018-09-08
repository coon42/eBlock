// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1'];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });

    page.appendChild(button);
  }
}

function constructBlacklist() {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", "blacklist.json", true); // TODO: retreive blacklist from a server
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      let blacklist = JSON.parse(xhr.responseText);
      let blacklistDiv = document.getElementById('blacklistDiv');

      for (let i in blacklist.users) {
        blacklistDiv.innerHTML += blacklist.users[i] + "<br>";
      }
    }
  }

  xhr.send();
}

constructOptions(kButtonColors);
constructBlacklist()

