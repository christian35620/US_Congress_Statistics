function puedeSubirse(alturaPersona,vieneConCompania,tieneAfeccionCardiaca){
    return (alturaPersona>=1.5 || (alturaPersona>=1.2 &&  vieneConCompania)) && !tieneAfeccionCardiaca;
}

console.log("puede ?"+puedeSubirse(1.7,false,true));

function imprimirAzul4(){
    for(var i = 0; i < 4; i++) {
       console.log("Azul")
    }
}

function imprimir5veces5(){
    for(var i = 0; i < 5; i++) {
       console.log(5)
    } 
}

function pasitoAPasito(){
    for(var i = 0; i < 5; i++) {
       console.log(i)
    } 
}

function pasandoPorI(){
    for(var i = 0; i < 4; i++) {
       console.log("acá i tiene el valor de "+i)
    } 
}

function pasandoPorLosPares(){
    for(var i = 0; i < 7; i+=2) {
       console.log("acá i tiene el valor de "+i)
    } 
}

function imprimirAzul(cantidadDeVeces) {
    for(var i = 0; i < cantidadDeVeces; i++) {
     console.log("Azul");
    }
}

function sumar5MonedasDe25Centavos(){
    var totalMonedas=0;
    for(var i = 0; i < 5; i++) {
     totalMonedas = totalMonedas + 0.25; 
  }
  return totalMonedas;
  }

  function sumarMonedasDe25(cantidadDeMonedas){
    var totalMonedas=0;
    for(var i = 0; i < cantidadDeMonedas; i++) {
     totalMonedas = totalMonedas + 0.25; 
  }
  return totalMonedas;
  }

function sumaDeLosParesDel0Al(x){
  var total=0;
for(var i = 0; i <= x; i+=2) {
  total += i;
}
  return total;
}

function sumatoriaHasta(x){
  var total=0;
for(var i = 0; i < x; i++) {
  total += i;
}
  return total;
}

function caloriasDeTrote(vueltas){
  var total=0;
for(var i = 1; i <= vueltas; i++) {
  total += 5*i;
}
  return total;
}

//   ARRAYS***************************************************************
function trasladar (array1,array2){
  array2.push(array1.pop(array1.length-1));
}

function contiene(array,number){
  if (array.indexOf(number)!=-1)
  return true;
}

function medallaSegunPuesto(puesto){
  var medalla=["oro","plata","bronce","nada"];
  if(puesto>3 || puesto<1){
    return "nada"
  }
  return medalla[puesto-1];
}

function gananciaTotal4(unPeriodo) {
  var sumatoria = 0;
    for(var i = 0; i < unPeriodo.length ; i++) {
    sumatoria += unPeriodo[i];
  }
    return sumatoria;
}

  console.log(gananciaTotal4([2, 3, 4, 5]));

function cantidadDeMesesConGanancia(unPeriodo) {
  var cantidad = 0;
  for (var i = 0; i < unPeriodo.length;i++) {
    if(unPeriodo[i]>0){
      cantidad += 1;
    }
  }
  return cantidad;
}

function cantidadDeMesesConPerdida(unPeriodo) {
  var cantidad = 0;
  for (var i = 0; i < unPeriodo.length;i++) {
    if(unPeriodo[i]<0){
      cantidad += 1;
    }
  }
  return cantidad;
}

function saldosDeMesesConGanancia(unPeriodo) {
  var saldos = [];
  for (var i = 0; i< unPeriodo.length;i++) {
    if(unPeriodo[i]>0)
    saldos.push(unPeriodo[i]);
  }
  return saldos;
}

function paloDeTruco(palo) {
  var lista = [];
  for (var i = 0; i< 12;i++) {
    if(i!=7 && i!=8)
    lista.push((i+1)+" de "+palo);
  }
  return lista;
}

function productoria(array) {
  var result=1;
  for (var i = 0; i< array.length ;i++) {
    result*=array[i];
  }
  return result;
}

function masMenos(array) {
  var result=[0,0,0];
  var long=array.length;
  for (var i = 0; i< long ;i++) {
    if (Math.sign(array[i])>0) {
      result[0]+=1/long;
    } else if(Math.sign(array[i])<0){
      result[2]+=1/long;
    }else{
      result[1]+=1/long;
    }
  }
  return result;
}

console.log(masMenos([0, 0, 0, 0, -2, -3, -4, -5]))

function escalera(alto){
  var escalera=[];
  var espacio=alto;
  for (let index = 0; index < alto; index++) {
    escalera.push((" ".repeat(espacio-1))+"#".repeat(alto-(espacio-1)));
    espacio-=1;
  }
  return escalera;
}
console.log(escalera(5));

function seAbre(lista,min){
  var temprano=0;
  for (let index = 0; index < lista.length; index++) {
    if (Math.sign(lista[index])!=1) {
      temprano+=1
    }
    if (temprano>=min) {
      return true;
    }
    if ((index==lista.length-1) && temprano<min) {
      return false;
    }
  }
}

function aperturas(lista,min){
  var resultados=[];
  lista.forEach(element => {
    resultados.push(seAbre(element,min));
  });
  return resultados;
}

var ingresosDelLunes = [10, -5, 3, 0];
var ingresosDelMartes = [10, 5, 3, 0];
var ingresosDelMiercoles = [10, 5, 3, 1];
console.log(aperturas([ingresosDelLunes,ingresosDelMartes,ingresosDelMiercoles],2));

function alturaArbolUtopico(N){
  var altura=1;

  for (let index = 1; index <= N; index++) {
    if (index%2 == 0) {
      altura+=1;
    }else{
      altura*=2;
    }
  }
  return altura
}

console.log(alturaArbolUtopico(3));

function factorial(N){
  var factorial=1;

  while (N>0) {
    factorial*=N;
    N-=1;
  }
  return factorial;
}
console.log(factorial(4));