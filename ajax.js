// creation de l'objet xmlhttprequest pour Dialoguer avec le serveur de maniere asynchrone
var xmlHttp = CreateXmlHttpRequestObject();

/********** Function de Creation de l'objet xmlHttpRequest Pour la communication asynchrone avec le serveur **********/

function CreateXmlHttpRequestObject() {
  var xmlHttp;

  //le try or catch est utiliser car il y'a crtain navigateur qui ne prend pas en compte l'objet xmlhttprequest
  try {
    // si a ce niveau l'objet n'est pas creer ce que le navigateur est peut-etre vieux
    xmlHttp = new XMLHttpRequest();
  } catch (e) {
    // on essaye de creer l'objet XmlHttpRequest pour les ancien Navigateur
    try {
      xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
      alert("erreur lors de la creation de l'objet XMLHttpRequest");
    }
  }
  if (!xmlHttp) {
    alert("erreur lors de la creation de l'objet XMLHttpRequest");
  } else {
    return xmlHttp;
  }
}

//*************phase de  creation de la requête*******************/

function process() {
  /* Verication de l'etat du serveur si le serveur est prêt a communiquer*/
  if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
    // recuperation de la valeur tapez dans le champs input

    var name;
    name = encodeURIComponent(document.getElementById("name").value);

    //ouverture de la connexion avec le serveur
    //...Get/nom_ressource .. on envoi la valeur saisie dans le champs input via la methode GET tout en indiquant la ressource que nous voulons atteindre

    xmlHttp.open("GET", "ex1.php?name=" + name, true);

    //on attend la reponce du serveur pour  ce qui concerne l'initialisation

    //puis une fois que le serveur aura repondu on fait appelle directement a cette Function qui a pour but la manipulation de la reponse
    xmlHttp.onreadystatechange = handleResponse;

    //enfin on envoi la requette au serveur
    xmlHttp.send(null);
  } else {
    //sinon on essaye de recontacter le serveur dans une second == 1000 milliseconde
    setTimeout("process()", 1000);
  }
}

//******* Function de Manipulation de la Reponse et de modification du contenue HTML *****************/

function handleResponse() {
  //on verifier si le serveur a fini de traité la requette c'est a dire s'il a completement fini de transmetres les données par ce qu'il peut etre dans une phase intermedière
  if (xmlHttp.readyState == 4) {
    //si tout c'est bien passé on verifier si notre requete est un succes ou pas?
    if (xmlHttp.status == 200) {
      // responseXML = retourne un Document qui contient la réponse serveur ou null si la requête a échoué ;
      reponse = xmlHttp.responseXML;
      xmlRoot = reponse.documentElement;
      message = xmlRoot.firstChild.data;

      document.getElementById("answer").innerHTML =
        '<span style="color: red">' + message + "</span>";
      setTimeout("process()", 1000);
    } else {
      alert("erreur  au niveau de la lecture des données");
    }
  }
}
