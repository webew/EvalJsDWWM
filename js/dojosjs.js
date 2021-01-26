// PROGRAMME PRINCIPAL

handleAsideEvents();

handleAccordions();

// On s'occupe maintenant des menus
// D'abord, récupérons le fichier JSON
// On utilise fetch pour faire une requête Ajax. Fetch renvoie une promesse que nous chaînons pour récupérer les données JSON
fetch("data/menu.json")
    .then((data) => data.json())
    .then((json) => {
        // Les données du fichier JSON sont maintenant disponibles dans la variable json
        // Nous pouvons maintenant itérer dans le JSON pour créer notre fichier
        // Nous passons par une fonction pour avoir quelque chose de plus lisible
        creeMenus(json);
    })
    .catch(function () {
        console.log("Erreur dans le chargement du fichier JSON");
    });

// FONCTIONS

// gére les événements sur l'image du aside
function handleAsideEvents() {
    // Gérer le over sur l'image dans le aside
    const logo = document.querySelector("aside > div");
    logo.addEventListener("mouseenter", function (e) {
        e.target.style.borderRadius = 0;
    });
    logo.addEventListener("mouseleave", function (e) {
        e.target.style.borderRadius = "50%";
    });
}
// gére les événements sur les header
function handleAccordions() {
    // Gérer l'ouverture des articles au clic
    // On récupère la liste des headers de l'ensemble des articles
    const headers_ar = document.querySelectorAll(
        "main>section>section>article>header"
    );
    // On applique une méthode permettant d'itérer dans les headers pour ajouter un clic à chacun d'eux
    headers_ar.forEach((f) => {
        const div = f.nextElementSibling;
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
}

// Fonction traitant le menu pour l'ajouter au DOM
function creeMenus(dataMenus) {
    creerNav(dataMenus);
    creerFooter(dataMenus);
}
// crée des liens à partir des données de dataMenus, et les ajoute à nav
function creerNav(dataMenus) {
    const navPrincipale = document.querySelector("main>header>nav");
    dataMenus.principal.forEach((m) => {
        const lien = creerLien(m);
        navPrincipale.appendChild(lien);
        if (m.sousmenus) {
            const ul = creerUl(m.sousmenus); // m.sousmenus est un tableau d'objets
            navPrincipale.appendChild(ul);
        }
    });
}
// crée des liens à partir des données de dataMenus, et les ajoute à footer
function creerFooter(dataMenus) {
    const navPied = document.querySelector("main>footer");
    dataMenus.pied.forEach((m) => {
        const lien = creerLien(m);
        navPied.appendChild(lien);
    });
}
function creerUl(sousMenus) {
    console.log(sousMenus);
    const ul = document.createElement("ul");
    sousMenus.forEach((sousMenu) => {
        const li = creerLi(sousMenu);
        ul.appendChild(li);
    });
    return ul;
}
function creerLi(sousMenu) {
    const li = document.createElement("li");
    const a = creerLien(sousMenu);
    li.appendChild(a);
    return li;
}

// renvoie un lien dont l'affichage correspond à element.nom et l'attribut href à element.href
function creerLien(element) {
    const a = document.createElement("a"); // On crée une balise a
    a.textContent = element.nom; // on crée le contenu de la balise a
    a.setAttribute("href", element.lien); // on attribue une valeur à l'attribut href de la balise a
    return a;
}
