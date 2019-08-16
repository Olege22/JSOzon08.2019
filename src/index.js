'use strict';
//console.log("H ello frends!");
//xheckbox
//          querySelectorAll
//let checkbox = document.querySelector('#discount-checkbox');

//const checkbox = document.getElementById('discount-checkbox');
function toggleCheckbox(){

    const checkbox = document.querySelectorAll('.filter-check_checkbox');

    /*checkbox.forEach(element => {
        console.log('eleelement')    
    });*/

    for (let i=0; i < checkbox.length; i++) {

        checkbox[i].addEventListener ('change',function() {
            if (this.checked === true) {
                this.nextElementSibling.classList.add('checked');
                //classname -заменяет все классы   
            //console.log('галочка стоит');
            }    else {
                this.nextElementSibling.classList.remove('checked');    
                //console.log('галочки нет');
            }

        });
    }
}

/*
checkbox.addEventListener ('change',function() {
    if (this.checked === true) {
        this.nextElementSibling.classList.add('checked');
        //classname -заменяет все классы   
    //console.log('галочка стоит');
    }    else {
        this.nextElementSibling.classList.remove('checked');    
        //console.log('галочки нет');
    }
    //togle - может ошибаться если галочки в противофазе.
    //console.log(this.checked);
})

/*checkbox.onchange = function() {
    console.log("галочка");
}*/
//let checkbox1 = document.querySelector('.card');
 
//console.log(checkbox,checkbox1);
//console.dir(checkbox);


//end xheckbox

//basket

function toggleCart() {

const btnCart = document.getElementById('cart');
const modelCart = document.querySelector('.cart');
const closebtn = document.querySelector('.cart-close');

btnCart.addEventListener ('click', () => {
    modelCart.style.display='flex';
    document.body.style.overflow = 'hidden';
});

closebtn.addEventListener ('click', () => {
    modelCart.style.display = 'none';
    document.body.style.overflow = '';
});

}

//end basket

//добавление - удаление товара

function addCart() {

    const cards = document.querySelectorAll('.goods .card'),
        cardwrapper = document.querySelector ('.cart-wrapper'),
        cartEmpty = document.getElementById ('cart-empty'),
        countGoods = document.querySelector ('.counter');


    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', () => {
            const cardClone = card.cloneNode(true);
            cardwrapper.appendChild (cardClone);
            //cartEmpty.remove();
            showData ();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                showData();
            }); 

        });
    });

    function showData () {
        const cardsCount = cardwrapper.querySelectorAll ('.card'),
            cardsPrice = cardwrapper.querySelectorAll('.card-price'),
            cardTotal = document.querySelector('.cart-total span');
        let cardsSum = 0;
        
        countGoods.textContent = cardsCount.length;

        cardsPrice.forEach((cardPrice) => {
            let price = parseFloat(cardPrice.textContent);
            //console.log(parseFloat(cardPrice.textContent));
            cardsSum += price;

        });

        //console.log(cardsSum);
        cardTotal.textContent = cardsSum;
        if (cardsCount.length !== 0) {
            cartEmpty.remove();
        } else {
            cardwrapper.appendChild(cartEmpty);
        }
        //console.log('')

        //удаление товара
    }
}


function actionPage(){
    
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');
    
    //let crdPrnNdStDisp = card.parentNode.style.display;
    

// выбор акционных товаров

    discountCheckbox.addEventListener('click', filter );

// фильтр по цене

    function filter () {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent),
                discount = card.querySelector('.card-sale');
                //console.log(price);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
                //card.parentNode.remove();
            } else if (discountCheckbox.checked && !discount) {
                card.parentNode.style.display = 'none';
                //goods.appendChild(card.parentNode);
            } else {
                card.parentNode.style.display = '';
                //goods.appendChild(card.parentNode);
            }
        });
    }

    function searchEventListener() {
        //console.log(event.keyCode);
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach ((card) => {
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)) {
                card.parentNode.style.display='none';
            } else {
                card.parentNode.style.display='';
            }
        })
    }

    min.addEventListener('change', filter);
    max.addEventListener('change', filter);

// поиск
    search.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            searchEventListener();
        }
        });
    searchBtn.addEventListener('click', searchEventListener); 
}


// получение данных с сервера

function getData() {
    const goodsWrapper = document.querySelector('.goods');
    return fetch('../db/db.json')
        .then((response)=>{
            if (response.ok){
            return response.json();
            } else {
                throw new Error ('Даные не были получены, ошибка: ' + response.status);
            }
        })
        .then((data) => {return data})
        .catch(err => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div style="color:red; font-size:20px"> Упс, что-то пошло не так!'
    });
}
//вывод карточки товара

function renderCards(data) {
    //console.log(data.goods);
    const goodsWrapper = document.querySelector ('.goods');
    data.goods.forEach((good)=> {
        const card = document.createElement('div');
        card.className = 'col-12 col-md-6 col-lg-4 col-xl-3'
        card.innerHTML = `
            <div class="card" data-category='${good.category}'>
                ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : ''}
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${good.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price" style="${good.sale ? 'color:red' : ''}">${good.price} ₽</div>
                    <h5 class="card-title">${good.title}</h5>
                    <button class="btn btn-primary">В корзину</button>
                </div>
            </div>
        `;
        goodsWrapper.appendChild(card);
    });
}
//-------- end ----------- получение данных с сервера

function renderCatalog(){
    const cards = document.querySelectorAll('.goods .card');
    const catalogList = document.querySelector('.catalog-list')
    const categories = new Set();
    const catalogBtn = document.querySelector('.catalog-button')
    const catalogWrapper = document.querySelector('.catalog')
    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });
    categories.forEach((item) =>{
        const li=document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
    });
    catalogBtn.addEventListener('click', () => {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = ''  ;  
        } else {
            catalogWrapper.style.display = 'block';
        }
        if(event.target.tagName === 'LI') {
            cards.forEach((card) => {
                if(card.dataset.category === event.target.textContent) {
                    card.parentNode.style.display = '';
                } else {
                    card.parentNode.style.display = 'none';
                }
            })
        }
    })
    console.log(categories);
}


getData().then((data)=> {
    renderCards(data);
    toggleCheckbox();
    toggleCart();
    addCart();
    actionPage();
    renderCatalog();
});
