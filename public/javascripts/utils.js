function errorOut(message){
  document.getElementById("error-message").innerHTML = message;
}

function redBorder(element){
    document.getElementById(element).style.borderColor = "red";
}
function removeRedBorder(element){
    document.getElementById(element).style.borderColor = "#EBE9ED";
}

function hideButton(permission){
  var exec = document.getElementById('exec');
  var urgentExec = document.getElementById('urgentExec');
  if(permission != "administrator")
    urgentExec.style.display = "none";
  else
    exec.style.display = "none";
}

function hideBanner(){
  document.getElementById('error-banner').style.display = "none";
}

function showBanner(){
  document.getElementById('error-banner').style.display = "block";
}
