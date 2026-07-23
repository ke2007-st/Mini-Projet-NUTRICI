const panier = new Map();

async function chargerCategories() {
  const res = await fetch('/api/categories');
  const json = await res.json();
  const sel = document.getElementById('filtre-categorie');
  (json.data || []).forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.nom;
    sel.appendChild(opt);
  });
  sel.onchange = chargerProduits;
}

async function chargerProduits() {
  const cat = document.getElementById('filtre-categorie').value;
  const url = cat ? `/api/produits/categorie/${cat}` : '/api/produits';
  const res = await fetch(url);
  const json = await res.json();
  const root = document.getElementById('catalogue');
  root.innerHTML = '';
  (json.data || []).forEach(p => {
    const row = document.createElement('div');
    row.className = 'produit';
    row.innerHTML = `
      <div>
        <strong>${p.nom}</strong><br>
        <small>${p.reference} — stock ${p.qte_stock} — ${p.prix_unitaire} FCFA</small>
      </div>
      <button>Ajouter</button>`;
    row.querySelector('button').onclick = () => ajouter(p.reference);
    root.appendChild(row);
  });
}

function ajouter(ref) {
  panier.set(ref, (panier.get(ref) || 0) + 1);
  afficherPanier();
  majTotal();
}

function retirer(ref) {
  const q = (panier.get(ref) || 0) - 1;
  if (q <= 0) panier.delete(ref);
  else panier.set(ref, q);
  afficherPanier();
  majTotal();
}

function articles() {
  return [...panier.entries()].map(([reference, quantite]) => ({ reference, quantite }));
}

function afficherPanier() {
  const root = document.getElementById('panier');
  root.innerHTML = '';
  if (panier.size === 0) {
    root.textContent = 'Panier vide.';
    return;
  }
  articles().forEach(a => {
    const row = document.createElement('div');
    row.className = 'ligne-panier';
    row.innerHTML = `<span>${a.reference} x ${a.quantite}</span><button>-</button>`;
    row.querySelector('button').onclick = () => retirer(a.reference);
    root.appendChild(row);
  });
}

async function majTotal() {
  const msg = document.getElementById('message');
  if (panier.size === 0) {
    document.getElementById('total').textContent = '0';
    return;
  }
  const res = await fetch('/api/panier/total', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(articles())
  });
  const json = await res.json();
  if (!json.success) {
    msg.className = 'message erreur';
    msg.textContent = json.message || 'Erreur total';
    document.getElementById('total').textContent = '?';
    return;
  }
  msg.textContent = '';
  document.getElementById('total').textContent = json.data.total;
}

document.getElementById('btn-payer').onclick = async () => {
  const msg = document.getElementById('message');
  const body = {
    clientEmail: document.getElementById('email').value,
    operateur: document.getElementById('operateur').value,
    articles: articles()
  };
  const res = await fetch('/api/commandes/payer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const json = await res.json();
  if (!json.success) {
    msg.className = 'message erreur';
    msg.textContent = json.message || 'Paiement refuse';
    return;
  }
  msg.className = 'message';
  msg.textContent = `Paiement OK — commande ${json.data.numero} (${json.data.statut})`;
  panier.clear();
  afficherPanier();
  document.getElementById('total').textContent = '0';
  chargerProduits();
};

chargerCategories().then(chargerProduits);
afficherPanier();
