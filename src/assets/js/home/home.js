document.addEventListener('DOMContentLoaded', function () {
    const cartMenu = document.getElementById('cart-menu');
    const cartBag = document.getElementById('header-bag');
    const cartCount = document.getElementById('cart-count');
    const cartItemsTable = document.getElementById('cart-items-table');
    const totalAmount = document.getElementById('total-amount');
    const checkoutButton = document.getElementById('checkout-button');
    let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

    /* Adiciona um evento de clique ào carrinho , verifica se esta aberto ou fechado e adiciona um evento de click 
    ao finalizar a compra  e redireciona para a pagina de pagamento*/
    cartBag.addEventListener('click', function () {
        const isOpen = cartMenu.style.right === '0px';
        cartMenu.style.right = isOpen ? '-300px' : '0px';
    });
        checkoutButton.addEventListener('click', function () {
        window.location.href = 'payment.html';
    });


    
    const shopItems = document.querySelectorAll('.shop__content__list__item');
    shopItems.forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const itemName = item.querySelector('.title--small').textContent;
            const itemPrice = parseFloat(item.querySelector('.text').textContent.replace('$', ''));
            const existingItem = cartData.find((cartItem) => cartItem.name === itemName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                const newItem = {
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                };
                cartData.push(newItem);
            }
            updateCart();
        });
    });

/* Limpa a tabela de itens do carrinho,  Adiciona os itens atualizados à tabela,
Adicione uma classe ao input e ao botão remover*/
    function updateCart() {

        cartItemsTable.innerHTML = '';
        cartData.forEach((item) => {
            const cartRow = document.createElement('tr');
            const nameCell = document.createElement('td');
            nameCell.textContent = item.name;
            cartRow.appendChild(nameCell);

            const priceCell = document.createElement('td');
            priceCell.textContent = `$${item.price.toFixed(2)}`;
            cartRow.appendChild(priceCell);

            const quantityCell = document.createElement('td');
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = '1';
            quantityInput.classList.add('quantity-input');  
            quantityInput.addEventListener('input', function () {
                item.quantity = parseInt(quantityInput.value, 10);
                updateCart();
            });
            quantityCell.appendChild(quantityInput);
            cartRow.appendChild(quantityCell);

            const removeCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.classList.add('remove-button');  
            removeButton.addEventListener('click', function () {
                cartData = cartData.filter((cartItem) => cartItem.name !== item.name);
                updateCart();
            });
            
            removeCell.appendChild(removeButton);
            cartRow.appendChild(removeCell);
            cartItemsTable.appendChild(cartRow);
        });

        /* Atualiza o total, Atualiza o contador de itens no carrinho , Salva os dados do carrinho no localStorage
        Atualiza o carrinho ao carregar a página*/
        const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;

        const itemCount = cartData.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = itemCount;

        localStorage.setItem('cartData', JSON.stringify(cartData));
    }

    updateCart();
});

/*Adiciona o efeito no header*/
    window.addEventListener('scroll', function() {
    var header = document.getElementById('main-header');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
    header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
    header.style.boxShadow = 'none';
    }
});
