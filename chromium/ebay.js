function getBlacklist() {
  // TODO: get blacklist from local storage or database:

  let blacklist = {};
  let users = {};
  blacklist.users = users;

  let reason = "bad shipping";
  users["welovebasic_de"] = reason;

  return blacklist;
}

function userIsBlacklisted(userName) {
  let blacklist = getBlacklist();

  return blacklist.users[userName] != null;
}

function disableButton(buttonElement) {
  if(buttonElement == null)
    return;

  buttonElement.setAttribute('disabled', '');
  buttonElement.style = 'pointer-events: none;'
}

var sellerElement = document.getElementById('mbgLink');

if(sellerElement != null) {
  let sellerName = sellerElement.getElementsByTagName('span')[0].innerHTML;
  console.log('Detected seller: "%s". Blacklisted: %s', sellerName, userIsBlacklisted(sellerName) ? "Yes" : "No");

  if (userIsBlacklisted(sellerName)) {
    sellerName.style = 'color:red !important';

    let buyButton = document.getElementById('binBtn_btn');
    let cartButton = document.getElementById('isCartBtn_btn');
    let barterButton = document.getElementById('boBtn_btn');

    disableButton(buyButton);
    disableButton(cartButton);
    disableButton(barterButton);
  }
}

