function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getBlacklist() {
  // TODO: get blacklist from local storage or database:

  let blacklist = {};
  let users = {};
  let user = {};

  user["date"] = "2018-09-28";
  user["reason"] = "DPD did not leave a message after failed delivery. Seller wanted 10€ extra for another shipping attempt and refused cancellation. Seller has lots of negative feedback with similiar issues.";
  users["welovebasic_de"] = user;

  blacklist.users = users;

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

function renderWarningBox(sellerName, user) {
  let warningBoxContainer = getElementByXpath('//*[@id="mainContent"]/form/div[2]/div[1]/table/tbody/tr/td[2]');
  let warningBoxPosition = getElementByXpath('//*[@id="mainContent"]/form/div[2]/div[1]/table/tbody/tr/td[2]/div[2]');
  let warningBox = document.createElement("DIV");

  date = new Date(user['date']);
  dateStr = date.toLocaleDateString("de-DE");

  warningBox.innerHTML = '<div>Seller was blacklisted on ' + dateStr + '.</div><div style="margin-top: 15px;">Reason: ' + user['reason'] + '</div>';
  warningBox.style = 'border: 1px solid black; background-color: yellow; padding: 10px; margin-bottom: 10px';

  warningBoxContainer.insertBefore(warningBox, warningBoxPosition);
}

let sellerElement = document.getElementById('mbgLink');

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

    user = getBlacklist().users[sellerName];
    renderWarningBox(sellerName, user);
  }
}

