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

    discountCheckbox.addEventListener('click', () => {
        cards.forEach((card) => {
            if (discountCheckbox.checked) {
                if(!card.querySelector('.card-sale')) {
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });

// фильтр по цене

    function filterPrice () {
        cards.forEach((card) => {
            const cardPrice = card.querySelector('.card-price'),
                price = parseFloat(cardPrice.textContent);
                //console.log(price);
            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = 'none';
                //card.parentNode.remove();
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

    min.addEventListener('change', filterPrice);
    max.addEventListener('change', filterPrice);

// поиск
    search.addEventListener('keyup', (event) => {
        if (event.keyCode == 13) {
            searchEventListener();
        }
        });
    searchBtn.addEventListener('click', searchEventListener); /*() => {
        const searchText = new RegExp(search.value.trim(), 'i');
        cards.forEach ((card) => {
            const title = card.querySelector('.card-title');
            if(!searchText.test(title.textContent)) {
                card.parentNode.style.display='none';
            } else {
                card.parentNode.style.display='';
            }
        })

    });*/
}


toggleCheckbox();
toggleCart();
addCart();
actionPage();

//end добавление - удаление товара

//summ creating



//end summ creating

//фильтр акции



//end фильтр акции