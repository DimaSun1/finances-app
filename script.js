// Elementele din DOM
const form = document.getElementById('form');
const sumaInput = document.getElementById('suma');
const descriereInput = document.getElementById('descriere');
const tipSelect = document.getElementById('tip');
const listaTranzactii = document.getElementById('lista-tranzactii');
const rezultatNet = document.getElementById('rezultat-net');

// Datele locale
let tranzactii = [];

// Adaugă tranzacție
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const suma = parseFloat(sumaInput.value);
  const descriere = descriereInput.value || 'Fără descriere';
  const tip = tipSelect.value;

  if (isNaN(suma) || suma <= 0) {
    alert('Introdu o sumă validă!');
    return;
  }

  const tranzactie = { suma, descriere, tip };
  tranzactii.push(tranzactie);

  sumaInput.value = '';
  descriereInput.value = '';

  actualizeazaUI();
});

// Actualizează interfața utilizatorului
function actualizeazaUI() {
  listaTranzactii.innerHTML = '';

  let totalVenituri = 0;
  let totalCheltuieli = 0;

  tranzactii.forEach((tranzactie, index) => {
    const li = document.createElement('li');
    li.classList.add(tranzactie.tip === 'venit' ? 'venit' : 'cheltuiala');
    li.innerHTML = `
      ${tranzactie.descriere} - <strong>${tranzactie.suma} RON</strong>
      <button onclick="stergeTranzactie(${index})">🗑️</button>
    `;

    listaTranzactii.appendChild(li);

    // Calculează sumele
    if (tranzactie.tip === 'venit') {
      totalVenituri += tranzactie.suma;
    } else {
      totalCheltuieli += tranzactie.suma;
    }
  });

  const venitNet = totalVenituri - totalCheltuieli;
  rezultatNet.innerText = `Venit Net: ${venitNet} RON`;
}

// Șterge tranzacție
function stergeTranzactie(index) {
  tranzactii.splice(index, 1);
  actualizeazaUI();
}
