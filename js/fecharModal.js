const ql = (el)=>document.querySelector(el)
//Fechar Modal
export function fecharModal(){
        ql('.pizzaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            ql('.pizzaWindowArea').style.display = 'none';
        },500);
};