// FILTRO DE PRODUTOS
const categories = document.querySelectorAll('.categories .cat');
const products = document.querySelectorAll('.product-card');

function filterProducts(category) {
  products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    if (category === 'Todos' || productCategory === category) {
      product.style.display = 'flex';
    } else {
      product.style.display = 'none';
    }
  });
}

categories.forEach(cat => {
  cat.addEventListener('click', () => {
    const filter = cat.getAttribute('data-filter');
    filterProducts(filter);
    categories.forEach(c => c.classList.remove('active'));
    cat.classList.add('active');
  });
});

filterProducts('Todos');

// HEADER FIXO COM SCROLL
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// DESCRIÇÃO EXPANDÍVEL
const descriptionButtons = document.querySelectorAll('.description-btn');
descriptionButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const description = card.querySelector('.description-content');
    description.classList.toggle('show');
  });
});

// MINI-CART DINÂMICO COM REMOVER
const cart = document.querySelector('.mini-cart ul');
const totalDisplay = document.querySelector('.mini-cart .total');
let cartItems = [];
let total = 0;

const addCartButtons = document.querySelectorAll('.add-cart');

addCartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.name').textContent;
    const priceText = card.querySelector('.price').textContent.replace('R$', '').replace(',', '.');
    const price = parseFloat(priceText);

    // Adiciona produto ao array
    cartItems.push({ name, price });

    // Atualiza total
    total += price;

    // Atualiza display
    renderCart();
  });
});

function renderCart() {
  cart.innerHTML = '';
  cartItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';
    li.style.marginBottom = '6px';

    li.innerHTML = `
      <span>${item.name} - R$${item.price.toFixed(2).replace('.', ',')}</span>
      <button class="remove-btn" data-index="${index}">❌</button>
    `;

    cart.appendChild(li);
  });

  totalDisplay.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;

  // Adiciona evento aos botões remover
  const removeButtons = document.querySelectorAll('.remove-btn');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const index = parseInt(btn.getAttribute('data-index'));
      total -= cartItems[index].price;
      cartItems.splice(index, 1);
      renderCart();
    });
  });
}

// FINALIZAR COMPRA - REDIRECIONA PARA checkout.html
const checkoutBtn = document.querySelector('.checkout-btn');
checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  // Salva itens no localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // Abre a página de checkout
  window.open('checkout.html', '_blank');
});
