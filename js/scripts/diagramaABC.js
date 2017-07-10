//arreglo global
var arr_global=[];
var a=0;
$(document).ready(function(){

});

$(window).load(function () {

    $('.btnGuardar').click(function(){
        var description= $('.description').val();
        var unity= $('.unity').val();
        var cost= $('.cost').val();

        if(description!="" && unity!="" && cost!=""){
            tableWrite(description,unity,cost);
            // var objpart= new Object(); 
            // objpart.desc=description;
            // objpart.unity=unity;
            // objpart.cost=cost;
            arr_global[a]= {desc:description,
                            unity:parseInt(unity),
                            cost:parseFloat(cost),
                            costTotal:(parseInt(unity)*parseFloat(cost))};  
            a++
            $('.description').val("");
            $('.unity').val("");
            $('.cost').val("");
        }else{
            Materialize.toast('Ingresar los valores', 800);
        }

    });

    
    $('.btnGraficar').click(function(){
        $('.resultGeneral').show();
        tableWriteResult();
    });
});

function tableWrite(description,unity,cost){
    $('.bodyTable').append("<tr>"+
    "<td>"+(a+1)+"</td>"+
    "<td>"+description+"</td>"+
    "<td>"+unity+"</td>"+
    "<td>"+cost+"</td>"+
    "</tr>");
}

function orderByCostTotal(){
    var cop_arr_global=arr_global;
    var cop_obj;
    for(var i=0;i<arr_global.length-1;i++){
        for(var j=0;j<arr_global.length-1;j++){
            if(arr_global[j]>arr_global[j+1]){
            cop_obj=arr_global[j];
            arr_global[j]=arr_global[j+1];
            arr_global[j+1]=cop_obj;
            }
        }
    }
}

function tableWriteResult(){
    $('.bodyTableResult').empty();
    for(var i=0;i<arr_global.length;i++){
        $('.bodyTableResult').append("<tr>"+
            "<td>"+(i+1)+"</td>"+
            "<td>"+arr_global[i].desc+"</td>"+
            "<td>"+arr_global[i].unity+"</td>"+
            "<td>"+porcentUnity(arr_global[i].unity).toFixed(3)+"</td>"+
            "<td>"+arr_global[i].cost+"</td>"+
            "<td>"+"%"+"</td>"+
            "<td>"+"costo total"+"</td>"+
            "<td>"+"clase"+"</td>"+
            "</tr>");
    }
}

function porcentUnity(unity){
    return (unity*100/sumUnity());
}

function sumUnity(){
    var sum=0;
    for(var i=0;i<arr_global.length;i++){
        sum+=arr_global[i].unity;        
    }
    return sum;
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
    
}