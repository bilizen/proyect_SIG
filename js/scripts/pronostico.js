//arreglo global
var arr_global=[];
var a=0;
$(document).ready(function(){

});

$(window).load(function () {

    $('.btnGuardar').click(function(){
        var valueY= $('.valueY').val();
        if(valueY!=""){
            arr_global[a]=parseInt(valueY);
            tableWrite(arr_global);           
            a++;
            $('.valueY').val("");
        }else{
            Materialize.toast('Completa el valor', 800);
        }
    });

    
    $('.btnGraficar').click(function(){
        if(arr_global.length>0){
            $('.resultGeneral').show();
            var resultEquation=(valueEcuation(valueN())).toFixed(3);
            var equationFunction="F("+valueN().toString()+")="+valueA().toFixed(3).toString()+"+"
                            +valueB().toFixed(3).toString()+"("+valueN().toString()+")";
            $('.valueA').text("a="+valueA().toFixed(3).toString());
            $('.valueB').text("b="+valueB().toFixed(3).toString());
            $('.fX').text(equationFunction);
            $('.result').text("F("+valueN()+")="+resultEquation);
            $('.desvEst').text(desviacion());
            graphicValueAxis();
        }else{
            Materialize.toast('Ingresar un valor', 800);
        }
        
    });
});

function tableWrite(arr_global){
    $('.bodyTable').empty();
    for(var i=0;i<arr_global.length;i++){
            $('.bodyTable').append("<tr>"+
            "<td>"+i+"</td>"+
            "<td>"+arr_global[i]+"</td>"+
            "<td>"+i*i+"</td>"+
            "<td>"+i*arr_global[i]+"</td>"+
            "<td>"+(i+1)+"</td>"+
            "<td>"+((i+1)-prom(arr_global))+"</td>"+
            "<td>"+Math.pow((i+1)-prom(arr_global),2)+"</td>"+
            "</tr>");
    } 
}

function prom(arr_global){
    var sum=arr_global.length*(arr_global.length+1)/2;
    var prom=sum/arr_global.length;
    return prom;
}

function valueEcuation(position){
    var valueEcuation=valueA()+valueB()*position;
    return valueEcuation;
}

function valueB(){
    var b=(valueN()*sumXY()-sumXsumY())/(valueN()*sumX2()-Math.pow(sumX(),2));
    return b;
}

function valueA(){
    var a=(sumY()/valueN())-(valueB()*sumXn()/valueN());
    return a;
}

function valueN(){
    return arr_global.length;
}

function sumXn(){
    var sumXn=(arr_global.length)*(arr_global.length+1)/2;
    return sumXn;
}

function sumXY(){
    var sum=0;
    for(var i=0;i<arr_global.length;i++){
        sum=sum+(i)*(arr_global[i]);
    }
    return sum;
}

function sumXsumY(){
    return sumX()*sumY();
}

function sumX(){
    var sumX=(arr_global.length-1)*(arr_global.length)/2;
    return sumX;
}

function sumY(){
    var sumY=0;
    for(var i=0;i<arr_global.length;i++){
        sumY=sumY+(arr_global[i]);
    }
    return sumY;
}

function sumX2(){
    var sum=(arr_global.length-1)*(arr_global.length)*(2*(arr_global.length-1)+1)/6
    return sum;
}

function desviacion(){
    var sum=0;
    for(var i=0;i<arr_global.length;i++){
        sum+=Math.pow(((i+1)-averageXn()),2)
    }
    var desv=Math.sqrt(sum/(arr_global.length-2)).toFixed(3);
    return desv;
}

function averageXn(){
    var average=(arr_global.length*(arr_global.length+1)/2)/arr_global.length;
    return average;
}

function graphicValueAxis(){
  var chartData=[];
  function paintGraph(){
    for(var i=0;i<arr_global.length;i++){
      chartData.push({
        "year": (i+1),
        "valuesY":arr_global[i],
        "fx":valueEcuation(i).toFixed(3),
      });
    }
    return chartData;
  }
    
    var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "none",
    "legend": {
        "useGraphSettings": true
    },
    "dataProvider": paintGraph(),
    "valueAxes": [{
        "axisAlpha": 0,
        "position": "left",
        "title": "Pronóstico"
    }],
    "startDuration": 0.5,
    "graphs": [{
        "balloonText": "Y: [[value]]",
        "bullet": "round",
        "title": "Valores Y",
        "valueField": "valuesY",
        "fillAlphas": 0
    }, {
        "balloonText": "F(x): [[value]]",
        "bullet": "round",
        "title": "F(x)",
        "valueField": "fx",
        "fillAlphas": 0
    }],
    "chartCursor": {
        "cursorAlpha": 0,
        "zoomable": false
    },
    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
    },
    "export": {
        "enabled": true,
        "position": "bottom-right"
     }
    });
}