import  {pizzaJson} from "./js/pizzas.js";
import {fecharModal}  from "./js/fecharModal.js";




var cart = [];
let modalQt = 1; //Quantidade de pizzas selecinadas no modal;
let modalpizzaClicada = 0;
let pizzaClicada;
let pizzaNameSize = '';
let pizzaName = '';
let desconto = 0;
let total = 0;

const ql = (el)=>document.querySelector(el)
const qlol = (el)=>document.querySelectorAll(el);
ql("header h2").style.display = 'none';
ql("header h4").style.display = 'none';



pizzaJson.map((item, index)=>{
    // Clonando o pizza-item e colocando as info em pizza-area
    let pizzaItem = ql('.models .pizza-item').cloneNode(true); 

    //O 'data-key' é utilizado p/ identificar a pizza clicada//
    pizzaItem.setAttribute('data-key', index)


    //Clonado a pizza-item como referencia e inserindo na pizza-area
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name; 
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = item.price[2].toFixed(2);
    pizzaItem.querySelector('a').addEventListener('click', (e)=>  {//clicando na pizza (a)
     e.preventDefault(); 
     pizzaClicada = e.target.closest('.pizza-item').getAttribute('data-key');
     modalQt = 1; 
     modalpizzaClicada = pizzaClicada;
      //PizzaClicada utiliza o closest para sair do 'a' e achar o item mais proximo que eu pessei como parametro no ('.pizza-item')//



   //item do model espandido na tela
   ql('.pizzaBig img').src = pizzaJson[pizzaClicada].img;
   ql('.pizzaInfo h1').innerHTML = pizzaJson[pizzaClicada].name;
   ql('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaClicada].description;
   ql('.pizzaInfo--actualPrice').innerHTML = pizzaJson[pizzaClicada].price[2];
   ql('.pizzaInfo--size.selected').classList.remove('selected');

   //Selecionando o selected no utimo tamanho da pizza que é a 2 ( a maior)
    qlol('.pizzaInfo--size').forEach((size, indexdoTamanho)=>{
        if(indexdoTamanho === 2){
            size.classList.add('selected');
        }

        //Nessa função o size pega todos os .pizzaInfo--size 
        //Nessa função o indexdoTamanho pegas todas as posições do size
        size.querySelector('.pizzaInfo--size span').innerHTML = pizzaJson[pizzaClicada].sizes[indexdoTamanho];
    });

   //Quantidade de pizzas do modal
   ql('.pizzaInfo--qt').innerHTML = modalQt;



    //Ao clicar em alguma pizza o modal vai abrir com o codigo a baixo
    ql('.pizzaWindowArea').style.opacity = '0';
    ql('.pizzaWindowArea').style.display = 'flex';
    setTimeout(()=>{
        ql('.pizzaWindowArea').style.opacity = '1';
    },200)
    
});

    

//Aqui sera inserido os item do pizzaJson da pasta pizza.js
ql('.pizza-area').append(pizzaItem);

});//Final do clone

//Adicionando o clique nos botões para fechar o model
qlol('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((e)=>{
    e.addEventListener('click', fecharModal);
});


   



//Diminui quantidade de pizza no modal
ql('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        ql('.pizzaInfo--qt').innerHTML = modalQt;
    }else{
        ql('.pizzaWindowArea').style.display = 'none';
    }
});

//Adiciona quantidade de pizza no modal
ql('.pizzaInfo--qtmais').addEventListener('click', ()=>{
     modalQt++;    
    ql('.pizzaInfo--qt').innerHTML = modalQt ;

});




pizzaJson.map((item)=>{
    //Selecionando o tamanho da pizza
    qlol('.pizzaInfo--size').forEach((size, indexdoTamanho)=>{
        size.addEventListener('click', (i)=>{
            ql('.pizzaInfo--size.selected').classList.remove('selected');
            size.classList.add('selected')

            if(indexdoTamanho === 0){
                size.classList.add('selected');
                ql('.pizzaInfo--actualPrice').innerHTML = pizzaJson[pizzaClicada].price[0];
            }else if(indexdoTamanho === 1){
                size.classList.add('selected');
                ql('.pizzaInfo--actualPrice').innerHTML = pizzaJson[pizzaClicada].price[1];
            }else if(indexdoTamanho === 2){
                size.classList.add('selected');
                ql('.pizzaInfo--actualPrice').innerHTML = pizzaJson[pizzaClicada].price[2];
            }
    
             
        });  
    });
});

ql('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(ql('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identificador = pizzaJson[modalpizzaClicada].id + '@' + size;
    let chave = cart.findIndex((item)=> item.identificador == identificador);
        if(chave > -1){
            cart[chave].qt += modalQt;
        }else{
         
            cart.push({
                identificador,//Qual a Pizza
                id:pizzaJson[modalpizzaClicada].id, //id da pizza
                size,//Qual o tamanho da Pizza
                qt:modalQt,//Qunantas Pizzas
                price:pizzaJson[modalpizzaClicada].price[size],
                name:pizzaJson[pizzaClicada].name,
            }); 
        };

        updateCart();
        fecharModal();
});

ql('.menu-openner').addEventListener('click', ()=>{
    if(cart.length > 0){
        ql('aside').style.left = '0';
    };
});

ql('.menu-closer').addEventListener('click', ()=>{
    ql('aside').style.left = '100vw';
});


function updateCart(){
    ql('.menu-openner span').innerHTML = cart.length;
    ql('.cart').innerHTML = '';
    if(cart.length > 0){
        ql("header h2").style.display = 'block';
        ql("header h4").style.display = 'block';
        ql('aside').classList.add('show')

        
        let subtotal = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item)=>{
               return item.id == cart[i].id;
            });
            
            subtotal += cart[i].price * cart[i].qt;
            
            let carItem = ql('.models .cart--item').cloneNode(true);

            
           
            switch(cart[i].size){
                case 0:
                    pizzaName = '&nbsp;&nbsp; P';
                    break
                case 1:
                    pizzaName = '&nbsp;&nbsp; M';
                    break
                case 2:
                    pizzaName = '&nbsp;&nbsp; G';
    
            };

             pizzaNameSize = ` ${pizzaItem.name} ${pizzaName}`

            carItem.querySelector('img').src = pizzaItem.img;
            carItem.querySelector('.cart--item-nome').innerHTML = pizzaNameSize;
            carItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            carItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                   cart.splice(i, 1);
                }
                updateCart();
            });

            carItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });


            ql('.cart').append(carItem)  
        };

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

         ql('.subtotal span:last-child').innerHTML = subtotal.toFixed(2); 
         ql('.desconto span:last-child').innerHTML = desconto.toFixed(2);
         ql('.total span:last-child').innerHTML = total.toFixed(2) ;

       
    }else{
        ql("header h2").style.display = 'none';
        ql("header h4").style.display = 'none';
        ql('aside').classList.remove('show')
        ql('aside').style.left = '100vw';
    };
};




    ql('.cart--finalizar').addEventListener('click',(link)=>{
        let wp = ``
        let init = 'Oii, Quero fazer um pedido: '
        let whatsappUrl
        cart.map((el)=>{        
            wp += ` 
Lanche: ${el.name } 
Tamanho: ${el.size}
Quantidade: ${el.qt}
            `

        });
        let d = `Você teve um desconto de ${desconto.toFixed(2)} Reais`
        let valorTotal = ` Valor Total R$  ${total.toFixed(2)} Reais`
        

        
        let encode = encodeURI(wp)
        whatsappUrl = `http://api.whatsapp.com/send?phone=5544997576872&text=${init}%0A${encode}%0A${d}}%0A${valorTotal}`;

        setTimeout(()=>window.open(whatsappUrl, "_blank"), 200);
    });
        
