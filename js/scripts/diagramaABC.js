//arreglo global
var arr_global=[];
$(document).ready(function(){
});

$(window).load(function () {
});

//function del boton mostrar--> muestra el grafico
function mostrar(){
    var selectedVal = "";
    var selected = $("input[type='radio'][name='optradio']:checked");
    if (selected.length > 0) {
        selectedVal = selected.val();
    }
    if(arr_global==''){
        arr_global=arrRandom();
        GraphicColumnAndLine(arrShow(arr_global));
    }else{
        if(selectedVal=="1"){
            GraphicColumnAndLine(arrShow(arr_global));
        }else if(selectedVal=="2"){
            graphicBarras3D(arrShow(arr_global));
        }else if(selectedVal=="3"){
            graphic3DDonuts(arrShow(arr_global));
        }
    }

    $('.mediaText').text("Media: "+media(arr_global));
    $('.modaText').text("Moda: "+moda(arr_global));
    $('.medianaText').text("Mediana: "+mediana(arr_global));
}

//funcion del boton reiniciar
function reiniciar(){
    arr_global=arrRandom();
}


//funcion para elordenar el arreglo para mostrar
function arrShow(arr){
    var arreglo=arr;
    var n_arreglo=[];
    for(var i=0;i<10;i++){
        var cont=0;
        for(var j=0;j<arreglo.length;j++){
            if(i==arreglo[j]){
                cont++;
            }
        }
        n_arreglo[i]=cont;
    }
    return n_arreglo;

}


//generar un arreglo de 20 numeros randon de 0-9
function arrRandom(){
    var arr=[];
    var num;
    for(var i=0;i<20;i++){
         num= Math.floor((Math.random()* 10));
        arr[i]=num;
    }
    return arr; 
}


//funcion para obetenr la media de un arreglo
function media(arr){
    var sum=0;
    var media;
    for(var i=0;i<arr.length;i++){
        sum=arr[i]+sum;
    }
    media=(sum/arr.length);
    return media;
}


//funcion para obetenr la mediana de un arreglo
function mediana(arr){
    var mediana;
    var aux;
    
    for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr.length-1;j++){
            if(arr[j+1]<arr[j]){
                aux=arr[j+1];
                arr[j+1]=arr[j];
                arr[j]=aux;
            }
        }  
    }
    if(arr.length%2===0){
        var num1=(arr.length/2)-1;
        var num2=(arr.length/2);
        mediana=(arr[num1]+arr[num2])/2;
        
    }else{
        mediana=arr[arr.length-1/2];
    }
    return mediana;
    
}


//funcion para obetenr la moda de un arreglo
function moda(arr){
var moda;
var maxrep=0;
for(var i=0;i<arr.length;i++){
    var rep=0;
    for(var j=0;j<arr.length;j++){
        if(arr[i]===arr[j]){
            rep++;
        }
    }
    if(rep>maxrep){
        moda=arr[i];
        maxrep=rep;
    }
}
return moda;
}

