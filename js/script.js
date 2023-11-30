// CREO UNA VARIABILE A CUI ASSOCIO UN ELEMENTO NELL HTML 
const button_play = document.getElementById('play');

// CREO UNA FUNZIONE CHE MI GENERI LA SINGOLA CASELLA DELLA GRIGLIA E LA GRIGLIA STESSA 
function createGrid(x, y){
    // dove x ed y, in questo caso, rappresentano corrispettivamente il numero di quadrati e quadrati per lato

    // CREO LA SINGOLA CASELLA 
    const cell = document.createElement('div');
    cell.classList.add('square') 

    // STABILISCO LA LUNGHEZZA DI UN LATO DELLA CELLA IN BASE ALL 100 DELLA VIEWPORT DIVISO IL NUMERO DI CELLE CHE VOGLIO SU UN LATO 
    let z = `calc(100vw / ${y} - 10px)`
    // imposto altezza e larghezza dello square utilizzando la z 
    cell.style.width = z
    cell.style.height = z
    
    // imposto altezza e larghezza della griglia utilizzando la lunghezza di un lato e     moltiplicandola per il numero di quadrati (y)    
    grid.style.height = z * y 
    grid.style.width = z * y 

    // INSERISCO IL NUMERO ALL'INTERNO DELLA CELLA 
    cell.innerText = x
    
    return cell;
}
  
// RECUPERO LA GRIGLIA CREANDO UNA VARIABILE 
let grid = document.getElementById('grid');

//FACCIO IN MODO CHE QUANDO CLICCO SUL BUTTON NEL HTML LA MIA FUNZIONE VENGA MESSA IN ATTO 
button_play.addEventListener('click', function(){

    //  LIVELLO DI DIFFICOLTA' 
    let level = document.getElementById('difficulty').value 

    // dove x ed y rappresentano corrispettivamente il numero di quadrati e quadrati per lato  
    let x;
    let y;
    if(level == 1){
        x = 100
        y = 10
    }
    else if(level == 2){
        x = 81
        y = 9
    }
    else if(level == 3){
        x = 49
        y = 7
    }
    else{
        x = 0
        y = 0
    }

    // IMPOSTO LA MIA GRIGLIA VUOTA PRIMA DEL CICLO FOR COSI' QUANDO VADO A CAMBIARE IL LIVELLO DI DIFFICOLTA ED A CLICCARE NUOVAMENTE IL BUTTON PLAY E' VUOTA E NON SI AGGIUNGIE A QUELLA VECCHIA 
    grid.innerText = ''

    //CREO UN CICLO FOR
    for (let i=0; i<x; i++){

        // CREO LO SQUARE 
        let square = createGrid(i+1, y);

        // APPENDO LO SQUARE ALLA GRID 
        grid.appendChild(square)

        // QUANDO L'UTENTE CLICCA SULLO SQUARE QUELLO CAMBIA COLORE 
        square.addEventListener('click', function(){
            this.classList.toggle('clicked')
            console.log(i+1)
        })
    } 
})
