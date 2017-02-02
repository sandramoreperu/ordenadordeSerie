(function(){
  var dom = {};
  var st = {
    arreglo: [6, 5, 3, 1, 8, 7, 2, 4],
    borderAnimate: ".numeros",
    i : 0,
    j : 0,
    time : '',
    positions:[]
  };

  var catchDom = function() {
    dom.borderAnimate = $(st.borderAnimate);
  };

  var afterCatchDom = function() {
    functions.mostrarNumeros();
    st.time = setInterval(functions.ordenarNumeros, 3000);
  };
  var functions={};

  //Mostrando el array inicial
  functions.mostrarNumeros=()=>{
    st.arreglo.forEach(function(item, index, array) {
      $(".numeros").append('<div class="numberItem">' + item + '</div>');
    });
  };

  //Método burbuja para el recorrido del array
  functions.ordenarNumeros=()=>{
    functions.emptyNum();
    if (st.i < st.arreglo.length) {
      if (st.j < st.arreglo.length - st.i) {
        functions.compareNumPrevToNext()
        st.j++;
      } else{
        st.j = 0;
        st.i++;
      }
    }else{
      clearInterval(st.time);
    }
  };

  //Limpiando los números para sacar las nuevas posiciones
  functions.emptyNum=()=>{
    $('.numeros').empty();
    functions.mostrarNumeros();
  };

  //Comparando número con número para utilizarlo en el método burbuja
  functions.compareNumPrevToNext=()=>{
    if (st.arreglo[st.j] > st.arreglo[st.j + 1]) {
      functions.animation();
      var aux = st.arreglo[st.j];
      st.arreglo[st.j] = st.arreglo[st.j + 1];
      st.arreglo[st.j + 1] = aux;
    }else{
      console.log('no se hace la animacion pero se tiene que eliminar el tiempo');
    }
  };
  // Animando los dos números que se están comparando
  functions.animation = () => {
    var indexofPrevNumber =  st.arreglo.indexOf(st.arreglo[st.j]);
    var indexofNextNumber =  st.arreglo.indexOf(st.arreglo[st.j+1]);
    var nextNumber = $('.numberItem').eq(indexofNextNumber);
    var prevNumber = $('.numberItem').eq(indexofPrevNumber);

    var positionNext = nextNumber.position().left;
    var positionPrev = prevNumber.position().left;
    var resta = positionNext-positionPrev;

    nextNumber.animate({
     'top': '-80px'
   }, 1000, function(){
     prevNumber.animate({
       "left" : resta
     }, 1000, function(){
       nextNumber.animate({
          "right": resta,
          "top": '+=80'
        }, 1000);
     });
   });

   nextNumber.css('border', '5px solid red');
   prevNumber.css('border', '5px solid black');

  };

  var initialize = function() {
    catchDom();
    afterCatchDom();
  };
  return {
    init: initialize
  };
})().init();
