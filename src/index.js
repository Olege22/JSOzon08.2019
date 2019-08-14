'use strict';
//console.log("H ello frends!");
//xheckbox
//          querySelectorAll
//let checkbox = document.querySelector('#discount-checkbox');

//const checkbox = document.getElementById('discount-checkbox');
const checkbox = document.querySelectorAll('.filter-check_checkbox');

checkbox.forEach(element => {
    console.log('eleelement')    
});

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

//end basket

//добавление - удаление товара

const cards = document.querySelectorAll('.goods .card'),
    cardwrapper = document.querySelector ('.cart-wrapper'),
    cartEmpty = document.getElementById ('cart-empty'),
    countGoods = document.querySelector ('.counter');


cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cardwrapper.appendChild (cardClone);
        cartEmpty.remove();
        showData ();
    });
});

function showData () {
    const cardsCount = cardwrapper.querySelectorAll ('.card');
    countGoods.textContent = cardsCount.length;
}



//end добавление - удаление товара