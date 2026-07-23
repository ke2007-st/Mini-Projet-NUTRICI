async function chargerCommandesPayees() {
  const res = await fetch('/api/admin/commandes/payees');
  const commandes = await res.json();
  const root = document.getElementById('liste-commandes');
  root.innerHTML = '';

  if (!commandes.length) {
    root.textContent = 'Aucune commande payee.';
    return;
  }

  commandes.forEach(c => {
    const row = document.createElement('div');
    row.className = 'commande-item';
    row.innerHTML = `
      <div>
        <strong>${c.numero}</strong><br>
        <small>${c.client?.nom || ''} — ${c.statut}</small>
      </div>
      <button data-num="${c.numero}">Generer bon</button>
    `;
    row.querySelector('button').onclick = () => genererBon(c.numero);
    root.appendChild(row);
  });
}

async function genererBon(numero) {
  const msg = document.getElementById('admin-message');
  const res = await fetch(`/api/admin/commandes/${numero}/bon-livraison`, {
    method: 'POST'
  });
  const data = await res.json();
  if (!res.ok) {
    msg.className = 'message erreur';
    msg.textContent = data.erreur || 'Erreur';
    return;
  }

  let texte = `BON DE LIVRAISON NutriCI\n`;
  texte += `Commande : ${data.numeroCommande}\n`;
  texte += `Statut   : ${data.statut}\n`;
  texte += `Client   : ${data.clientNom} (${data.clientEmail})\n`;
  texte += `Tel      : ${data.clientTelephone}\n`;
  texte += `Adresse  : ${data.clientAdresse}\n`;
  texte += `--------------------------------\n`;
  data.lignes.forEach(l => {
    texte += `${l.reference} | ${l.nomProduit} | x${l.quantite} | ${l.sousTotal} FCFA\n`;
  });
  texte += `--------------------------------\n`;
  texte += `TOTAL : ${data.total} FCFA\n`;

  document.getElementById('bon').textContent = texte;
  msg.className = 'message';
  msg.textContent = 'Bon genere — commande passee En livraison.';
  chargerCommandesPayees();
}

document.getElementById('btn-rafraichir').onclick = chargerCommandesPayees;
chargerCommandesPayees();
