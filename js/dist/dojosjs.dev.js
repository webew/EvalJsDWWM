"use strict";

// PROGRAMME PRINCIPAL
handleAsideEvents();
handleAccordions(); // On s'occupe maintenant des menus
// D'abord, récupérons le fichier JSON
// On utilise fetch pour faire une requête Ajax. Fetch renvoie une promesse que nous chaînons pour récupérer les données JSON

fetch("data/menu.json").then(function (data) {
  return data.json();
}).then(function (json) {
  // Les données du fichier JSON sont maintenant disponibles dans la variable json
  // Nous pouvons maintenant itérer dans le JSON pour créer notre fichier
  // Nous passons par une fonction pour avoir quelque chose de plus lisible
  creeMenus(json);
})["catch"](function () {
  console.log("Erreur dans le chargement du fichier JSON");
}); // FONCTIONS
// gére les événements sur l'image du aside

function handleAsideEvents() {
  // Gérer le over sur l'image dans le aside
  var logo = document.querySelector("aside > div");
  logo.addEventListener("mouseenter", function (e) {
    e.target.style.borderRadius = 0;
  });
  logo.addEventListener("mouseleave", function (e) {
    e.target.style.borderRadius = "50%";
  });
} // gére les événements sur les header


function handleAccordions() {
  // Gérer l'ouverture des articles au clic
  // On récupère la liste des headers de l'ensemble des articles
  var headers_ar = document.querySelectorAll("main>section>section>article>header"); // On applique une méthode permettant d'itérer dans les headers pour ajouter un clic à chacun d'eux

  headers_ar.forEach(function (f) {
    var div = f.nextElementSibling;
    div.style.visibility = "hidden";
    f.addEventListener("click", function (e) {
      if (div.style.visibility == "hidden") {
        div.style.visibility = "visible";
        div.style.height = "auto";
      } else {
        div.style.visibility = "hidden";
        div.style.height = "0px";
      }
    });
  });
} // Fonction traitant le menu pour l'ajouter au DOM


function creeMenus(dataMenus) {
  creerNav(dataMenus);
  creerFooter(dataMenus);
} // crée des liens à partir des données de dataMenus, et les ajoute à nav


function creerNav(dataMenus) {
  var navPrincipale = document.querySelector("main>header>nav");
  dataMenus.principal.forEach(function (m) {
    var lien = creerLien(m);
    navPrincipale.appendChild(lien);
  });
} // crée des liens à partir des données de dataMenus, et les ajoute à footer


function creerFooter(dataMenus) {
  var navPied = document.querySelector("main>footer");
  dataMenus.pied.forEach(function (m) {
    var lien = creerLien(m);
    navPied.appendChild(lien);
  });
} // renvoie un lien dont l'affichage correspond à element.nom et l'attribut href à element.href


function creerLien(element) {
  var a = document.createElement("a"); // On crée une balise a

  a.textContent = element.nom;
  a.setAttribute("href", element.lien);
  return a;
}