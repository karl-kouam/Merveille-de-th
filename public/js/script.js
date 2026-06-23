/* =========================
   🛒 PANIER GLOBAL
========================= */

let panier = JSON.parse(localStorage.getItem("panier")) || [];

/* =========================
   🧠 SYNC CENTRAL (IMPORTANT)
========================= */

function syncPanier() {
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
  updateCount();
}

/* =========================
   ➕ AJOUT PANIER
========================= */

function ajouterPanier(nom, prix) {
  const existe = panier.find(p => p.nom === nom);
  if (!nom || prix === undefined || prix === null) {
  return;
}

  if (existe) {
    existe.quantite++;
  } else {
    panier.push({
      nom,
      prix,
      quantite: 1
    });
  }

  const btn = event.target;
  btn.innerText = "Ajouté ✓";

  setTimeout(() => {
    btn.innerText = "Ajouter au panier";
  }, 800);

  syncPanier();
}

/* =========================
   ➕ AUGMENTER
========================= */

function augmenter(nom) {
  const produit = panier.find(p => p.nom === nom);

  if (!produit) return;

  produit.quantite++;

  syncPanier();
}

/* =========================
   ➖ DIMINUER
========================= */

function diminuer(nom) {
  const produit = panier.find(p => p.nom === nom);

  if (!produit) return;

  produit.quantite--;

  if (produit.quantite <= 0) {
    panier = panier.filter(p => p.nom !== nom);
  }

  syncPanier();
}

/* =========================
   🧾 AFFICHER PANIER
========================= */

function afficherPanier() {
  const contenu = document.getElementById("contenu-panier");
  const totalDiv = document.getElementById("total-panier");

  if (!contenu || !totalDiv) return;

  contenu.innerHTML = "";

  let total = 0;

  panier.forEach(produit => {
    const sousTotal = produit.prix * produit.quantite;
    total += sousTotal;

    contenu.innerHTML += `
      <div class="ligne-panier">
        <strong>${produit.nom}</strong>

        <div class="quantite">
          <button onclick="diminuer('${produit.nom}')">-</button>
          <span>${produit.quantite}</span>
          <button onclick="augmenter('${produit.nom}')">+</button>
        </div>

        <div>${sousTotal} FCFA</div>
      </div>
    `;
  });

  totalDiv.innerText = "Total : " + total + " FCFA";
}

/* =========================
   📲 WHATSAPP
========================= */

function envoyerWhatsapp() {
  let message = "Bonjour, je souhaite commander :%0A%0A";
  let total = 0;

  panier.forEach(p => {
    message += `- ${p.nom} x${p.quantite} = ${p.prix * p.quantite} FCFA%0A`;
    total += p.prix * p.quantite;
  });

  message += "%0ATotal : " + total + " FCFA";

  window.open(
    "https://wa.me/237650301122?text=" + message,
    "_blank"
  );
}

/* =========================
   📊 COMPTEUR PANIER
========================= */

function updateCount() {
  const count = panier.length;
  const el = document.getElementById("count");

  if (el) {
    el.innerText = count;
  }
}

/* =========================
   🛒 PANIER UI OPEN/CLOSE
========================= */

function togglePanier() {
  const panierEl = document.getElementById("panier-flottant");

  if (panierEl.classList.contains("active")) {
    fermerPanier();
  } else {
    ouvrirPanier();
  }
}

function ouvrirPanier() {
  console.log("Ouverture");
  document.getElementById("panier-flottant")
          .classList.add("active");
}

function fermerPanier() {
  document.getElementById("panier-flottant")
          .classList.remove("active");
}

/* =========================
   🚀 INIT PAGE
========================= */

window.onload = () => {
  afficherPanier();
  updateCount();
};

