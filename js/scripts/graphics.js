
function GraphicColumnAndLine(arr){
  var arreglo=arr;
  var chartData=[];


  function paintBarra(){
    for(var i=0;i<arreglo.length;i++){
      chartData.push({"year": i,
        "income": arreglo[i],
        "expenses":arreglo[i],
        "dashLengthColumn": 5,
        "alpha": 0.8,
      });
    }
    return chartData;

  }


  var chart = AmCharts.makeChart( "chartdiv", {
    "type": "serial",
    "addClassNames": true,
    "theme": "dark",
    "autoMargins": false,
    "marginLeft": 30,
    "marginRight": 8,
    "marginTop": 10,
    "marginBottom": 26,
    "balloon": {
      "adjustBorderColor": false,
      "horizontalPadding": 10,
      "verticalPadding": 8,
      "color": "#ffffff"
    },

    "dataProvider":paintBarra(),
    "valueAxes": [ {
      "axisAlpha": 0,
      "position": "left"
    } ],
    "startDuration": 1,
    "graphs": [ {
      "alphaField": "alpha",
      "balloonText": "<span style='font-size:14px;'>[[title]]  [[category]]:<br><span style='font-size:14px;'>[[value]] Veces</span> [[additional]]</span>",
      "fillAlphas": 1,
      "title": "Valor",
      "type": "column",
      "valueField": "income",
      "dashLengthField": "dashLengthColumn"
    }, {
      "id": "graph2",
      "balloonText": "<span style='font-size:14px;'>[[title]]  [[category]]:<br><span style='font-size:14px;'>[[value]] Veces</span> [[additional]]</span>",
      "bullet": "round",
      "lineThickness": 3,
      "bulletSize": 7,
      "bulletBorderAlpha": 1,
      "bulletColor": "#FFFFFF",
      "useLineColorForBulletBorder": true,
      "bulletBorderThickness": 3,
      "fillAlphas": 0,
      "lineAlpha": 1,
      "title": "Valor",
      "valueField": "expenses",
      "dashLengthField": "dashLengthLine"
    } ],
    "categoryField": "year",
    "categoryAxis": {
      "gridPosition": "start",
      "axisAlpha": 0,
      "tickLength": 0
    },
    "export": {
      "enabled": true
    }
  } );
}






function graphicBarras3D(arr){

  var arreglo=arr;
  var chartData=[];
  var arrColors=[];
  arrColors[0]="#FF0F00";
  arrColors[1]="#FF6600";
  arrColors[2]="#FF9E01";
  arrColors[3]="#FCD202";
  arrColors[4]="#F8FF01";
  arrColors[5]="#B0DE09";
  arrColors[6]="#04D215";
  arrColors[7]="#0D8ECF";
  arrColors[8]="#2A0CD0";
  arrColors[9]="#8A0CCF";

  function paintBarra3D(){
    for(var i=0;i<arreglo.length;i++){
      chartData.push({"number": "Numero "+i,
                      "reperticiones": arreglo[i],
                      "color": arrColors[i]
      });
    }
    return chartData;

  }



var chart = AmCharts.makeChart("chartdiv", {
    "theme": "dark",
    "type": "serial",
  "startDuration": 2,
    "dataProvider":paintBarra3D() ,
    "graphs": [{
        "balloonText": "[[category]]: <b>[[value]] veces</b>",
        "fillColorsField": "color",
        "fillAlphas": 1,
        "lineAlpha": 0.1,
        "type": "column",
        "valueField": "reperticiones"
    }],
    "depth3D": 20,
  "angle": 30,
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },    
    "categoryField": "number",
    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 90
    },
    "export": {
      "enabled": true
     }

});
jQuery('.chart-input').off().on('input change',function() {
  var property  = jQuery(this).data('property');
  var target    = chart;
  chart.startDuration = 0;

  if ( property == 'topRadius') {
    target = chart.graphs[0];
        if ( this.value == 0 ) {
          this.value = undefined;
        }
  }

  target[property] = this.value;
  chart.validateNow();
});


}



function graphic3DDonuts(arr){
  var arreglo=arr;
  var chartData=[];

  function paintDonuts(){

    for(var i=0;i<arreglo.length;i++){
      chartData.push({"number": "Numero "+i,
        "repeticiones":arreglo[i] 
      });
    }
    return chartData;

  }

  var chart = AmCharts.makeChart( "chartdiv", {
    "type": "pie",
    "theme": "dark",
    "titles": [ {
      "text": "Análisis de encuesta",
      "size": 20
    } ],
    "dataProvider":paintDonuts(),
    "valueField": "repeticiones",
    "titleField": "number",
    "startEffect": "elastic",
    "startDuration": 2,
    "labelRadius": 15,
    "innerRadius": "25%",
    "depth3D": 15,
    "balloonText": "[[title]]<br><span style='font-size:12px'><b>[[value]]</b> veces</span>",
    "angle": 15,
    "export": {
      "enabled": true
    }
  } );
  jQuery( '.chart-input' ).off().on( 'input change', function() {
    var property = jQuery( this ).data( 'property' );
    var target = chart;
    var value = Number( this.value );
    chart.startDuration = 0;

    if ( property == 'innerRadius' ) {
      value += "%";
    }

    target[ property ] = value;
    chart.validateNow();
  } );
}



