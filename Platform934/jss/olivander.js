// Database delle bacchette
const wands = [
    { id: 1, name: "Bacchetta di Harry Potter", wood: "Agrifoglio", core: "Piuma di Fenice", length: "11 pollici", price: 7 },
    { id: 2, name: "Bacchetta di Hermione Granger", wood: "Vite", core: "Cuore di Drago", length: "10 pollici e ¾", price: 8 },
    { id: 3, name: "Bacchetta di Ron Weasley", wood: "Salice", core: "Crine di Unicorno", length: "14 pollici", price: 7 },
    { id: 4, name: "La Bacchetta di Sambuco", wood: "Sambuco", core: "Crine di Thestral", length: "15 pollici", price: 150 },
    { id: 5, name: "Bacchetta di Draco Malfoy", wood: "Biancospino", core: "Crine di Unicorno", length: "10 pollici", price: 10 },
    { id: 6, name: "Bacchetta di Lord Voldemort", wood: "Tasso", core: "Piuma di Fenice", length: "13 pollici e ½", price: 15 }
];

// INIZIALIZZAZIONE CON LOCALSTORAGE
let cart = JSON.parse(localStorage.getItem('bauleOlivander')) || [];

// Selezione elementi del DOM
const productGrid = document.getElementById('product-grid');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

// Elementi per la Cassa Magica
const magicModal = document.getElementById('magic-checkout-modal');
const closeCassaBtn = document.getElementById('close-cassa');
const checkoutForm = document.getElementById('magic-checkout-form');
const finalTotalSpan = document.getElementById('final-total');

// Rendering dei Prodotti
function renderProducts() {
    productGrid.innerHTML = '';
    wands.forEach(wand => {
        const card = document.createElement('div');
        card.classList.add('wand-card');
        card.innerHTML = `
            <div class="wand-icon">🪄</div>
            <h3>${wand.name}</h3>
            <p>${wand.wood} - ${wand.core}</p>
            <p>${wand.length}</p>
            <div class="price">${wand.price} Galleoni</div>
            <button class="add-btn" type="button" data-add-to-cart="${wand.id}">Aggiungi al Baule</button>
        `;
        productGrid.appendChild(card);
    });
}

// Aggiungere al carrello
function addToCart(id) {
    const wand = wands.find(w => w.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...wand, quantity: 1 });
    }
    
    updateCartUI();
    
    // Animazione bottone baule
    const currentCartToggle = document.getElementById('cart-toggle');
    if (currentCartToggle) {
        currentCartToggle.style.transform = "scale(1.1)";
        setTimeout(() => currentCartToggle.style.transform = "translateY(0)", 200);
    }
}

// Modificare la quantità (+ e -)
function changeQty(id, amount) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += amount;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
        updateCartUI();
    }
}

// Rimuovere completamente dal carrello
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Aggiornare UI del Carrello e salvare nel LocalStorage
function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; opacity:0.7; margin-top:2rem;">Il tuo baule è vuoto.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div>
                    <h4 style="margin: 0 0 5px 0; color: #f5d79a;">${item.name}</h4>
                    <span>${item.price * item.quantity} G</span>
                </div>
                <div class="qty-controls">
                    <button type="button" data-cart-qty="${item.id}" data-cart-amount="-1">-</button>
                    <span>${item.quantity}</span>
                    <button type="button" data-cart-qty="${item.id}" data-cart-amount="1">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartTotal.innerText = total;

    const currentCartCount = document.getElementById('cartCount');
    if (currentCartCount) {
        currentCartCount.innerText = count;
    }
    
    // Salvataggio nel browser
    localStorage.setItem('bauleOlivander', JSON.stringify(cart));
}

// Gestione Apertura/Chiusura Drawer
function toggleCart() {
    cartDrawer.classList.toggle('hidden');
    cartOverlay.classList.toggle('hidden');
}

document.addEventListener('click', (e) => {
    const cartButton = e.target.closest('#cart-toggle');
    if (cartButton) {
        e.preventDefault();
        toggleCart();
        return;
    }

    const addButton = e.target.closest('[data-add-to-cart]');
    if (addButton) {
        addToCart(Number(addButton.dataset.addToCart));
        return;
    }

    const qtyButton = e.target.closest('[data-cart-qty]');
    if (qtyButton) {
        changeQty(Number(qtyButton.dataset.cartQty), Number(qtyButton.dataset.cartAmount));
    }
});

closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Apertura della Cassa Gringott
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        window.pfAlert("cart_empty");
    } else {
        toggleCart(); // Chiude il drawer laterale
        finalTotalSpan.innerText = cartTotal.innerText;
        magicModal.classList.remove('hidden'); // Apre la modale
    }
});

// Chiusura Cassa
closeCassaBtn.addEventListener('click', () => {
    magicModal.classList.add('hidden');
});

// Simulazione Pagamento con connessione al DB
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const shippingMethod = document.querySelector('input[name="shipping"]:checked').value;
    const vaultNumber = document.getElementById('gringott-vault').value;
    const vaultPass = document.getElementById('gringott-pass').value; // Prendiamo la password
    const totaleDaPagare = parseInt(finalTotalSpan.innerText);
    
    // Mostriamo che stiamo elaborando
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    const testoOriginaleBtn = submitBtn.innerHTML;
    submitBtn.innerHTML = "Contattando i folletti...";
    submitBtn.disabled = true;

    try {
        // Inviamo i dati al PHP
        const response = await fetch('php/checkout.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                vault_number: vaultNumber,
                password: vaultPass,
                total: totaleDaPagare
            })
        });

        const data = await response.json();

        if (data.success) {
            // PAGAMENTO ACCETTATO
            window.pfAlert(shippingMethod === "gufo" ? "checkout_success_owl" : "checkout_success_pickup", {
                total: totaleDaPagare,
                vault: data.vault,
                balance: data.remaining_balance
            });
            
            // Svuota carrello, aggiorna UI e chiudi modale
            cart = [];
            updateCartUI();
            magicModal.classList.add('hidden');
            checkoutForm.reset();
        } else {
            // PAGAMENTO RIFIUTATO (Fondi insufficienti o Password errata)
            window.pfAlert("gringott_error", { message: data.message });
        }
    } catch (error) {
        console.error("Errore di connessione", error);
        window.pfAlert("gringott_unreachable");
    } finally {
        // Ripristina il bottone
        submitBtn.innerHTML = testoOriginaleBtn;
        submitBtn.disabled = false;
    }
});

// Inizializzazione al caricamento
renderProducts();
updateCartUI(); // Importante per visualizzare il carrello salvato appena la pagina si apre
window.addEventListener('DOMContentLoaded', updateCartUI);
