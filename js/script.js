
// CREO UNA FUNZIONE CHE MI GENERI NUMERI CASUALI DA 1 A X(dove x è il numero delle celle presenti nel livello) 
function generate_numbers(x){
    // dove x, in questo caso, è il numero di celle e quindi di valore massimo che questi numeri potranno avere
    return Math.floor(Math.random()*x)+1;
}

// CREO UNA FUNZIONE CHE MI GENERI UN ARRAY DI BOMBS 
function generate_bombs(b, x){
    //  dove b & x sono corrispettivamente il numero di bombe ed x la quantità di celle 
    
    // DEFINISCO UN ARRAY VUOTO 
    let array = [];
    
    // CREO UN CICLO FOR CHE SI RIPETA TANTE VOLTE QUANTE SONO LE BOMBE  
    for(let i=0; i<b; i++){
        
        // MI CREO UNA VARIABILE CHE ABBIA COME VALORE LA FUNZIONE generate_bombs 
        let random_number = generate_numbers(x)
        
        //    CREO UN CICLO WHILE PER GENERARE NUMERI TUTTI DIVERSI DA LORO 
        //    finche l'array include numeri random allora continua a generare 
        while(array.includes(random_number)){
            random_number = generate_numbers(x)
        }
        //    sennò me li pusha nell'array 
        array.push(random_number)
    }
    
    return array
}

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

// RECUPERO IL BUTTON CREANDO UNA VARIABILE 
const button_play = document.getElementById('play');

// RECUPERO LA GRIGLIA CREANDO UNA VARIABILE 
let grid = document.getElementById('grid');

//FACCIO IN MODO CHE QUANDO CLICCO SUL BUTTON NEL HTML LA MIA FUNZIONE VENGA MESSA IN ATTO 
button_play.addEventListener('click', function(){ 

    // IMPOSTO LA MIA GRIGLIA VUOTA PRIMA DEL CICLO FOR COSI' QUANDO VADO A CAMBIARE IL LIVELLO DI DIFFICOLTA ED A CLICCARE NUOVAMENTE IL BUTTON PLAY E' VUOTA E NON SI AGGIUNGIE A QUELLA VECCHIA 
    grid.innerText = ''

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

    //UNA VARIABILE CHE CORRISPONDE AL NUMERO DI BOMBE 
    let number_bombs = 16;

    // DEFINISCO UNA COSTANTE CON I NUMERI DELLE BOMBE 
    const bombs = generate_bombs(number_bombs, x)
    console.log(bombs)
    
    // CREO UNA VARIABILE POINTS 
    let points = 0;

    
    
    // CREO UNA FLAG GAME OVER 
    let game_over = false;
    
    //CREO UN CICLO FOR
    for (let i=0; i<x; i++){
        
        // CREO LO SQUARE 
        let square = createGrid(i+1, y);
       

        
        // APPENDO LO SQUARE ALLA GRID 
        grid.appendChild(square);

        
        // QUANDO L'UTENTE CLICCA SULLO SQUARE QUELLO CAMBIA COLORE 
        square.addEventListener('click', function(){

            if(!game_over){

                if(!bombs.includes(i+1)){
                    if(!this.classList.contains('clicked')){
                        
                        this.classList.add('clicked')
                        points ++
                        document.getElementById('points').innerText = `IL TUO PUNTEGGIO E': ${points}`
                    }
                }
                else{

                   let cell = document.getElementById('grid').children;
                   
                   

                    for(i=0; i<bombs.length; i++){

                        cell[bombs[i]-1].classList.add('bomb-clicked')
                    }
                    
                    this.classList.add('bomb-clicked')
                    setTimeout(function(){
                        
                        document.getElementById('points').innerText = ''
                        return grid.innerHTML = `<h1> HAI PERSO! <br>IL TUO PUNTEGGIO E': ${points}`
                        
                    }, 2000)
                    
                    game_over = true 
                }
                
            }
            
                
        })
    } 
    
})
