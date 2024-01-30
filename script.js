var participante = [];
var cantidad = 0;
var ranking = [];
//Declaro las variables que voy a usar

$(document).ready(function() {
    $(".desp1").change(function() {
        cantidad = parseInt($(".desp1").val());
        participante = [];
        //Cuando el despegable cambie guarda el número y el valor lo convierte a entero
        for (var i = 1; i <= cantidad; i++) {
            participante.push("img/flor" + i + ".png");
        }
        //Recorro el bucle for y cambio el número y así selecciono todas las imágenes que hagan falta
        $(".invernadero").empty();
        //Vacio .invernadero por si estaba lleno de flores anteriores

        for (var i = 0; i < participante.length; i++) {
            var imagen = $("<img>").attr("src", participante[i]).attr("alt", "flor" + (i + 1)).addClass("flor");
            $(".invernadero").append(imagen);
            //Coge las imágenes del array y las va colocando dentro de .invernadero
        }
    });

    $(".boton1").click(function(){
        let primera = false;
        ranking = [];
        //Declaro las variables. La variable "primera" es local así que la declaro con let. El array es para guardar el orden de llegada y mostrarlo en la página
        $(".flor").each(function(index) {
            let vel = Math.random(1-10) * 10000;
            let florActual = $(this);
            //Declaro más variables locales. La primera me guarda la velocidad de cada flor y la segunda las separa como objetos únicos
            florActual.animate({"bottom": "700px"}, vel, function() {
            //Le doy a cada flor la dirección adonde tiene que moverse, la distancia y su velocidad única
                ranking.push(florActual.attr("alt"));

                actualizarRanking();

                if (!primera) {
                    florActual.addClass("preferida");
                    primera = true;
                    //Cuando una flor termina la animación se le pone el borde amarillo representando que es la favorita 
                    //se cambia la variable a "true" para que ya no ponga bordes a las demás flores
                }
            });
        });

        $(".boton1").hide();
        $(".boton2").show();
        //Oculta el botón de "Plantar" y muestra el de "Replantar"
    });

    $(".boton2").click(function(){
        $(".flor").stop().removeClass("preferida").css("bottom", "0");
        //Para la animación de las flores, elimina el borde amarillo del que la tenga y los recoloca a su posición original
        $(".ranking ol").empty();
        //Vacío las etiquetas <ol> para que el orden de llegada se muestre vacío
        $(".boton1").show();
        $(".boton2").hide();
        //Oculta el botón de "Replantar" y muestra el de "Plantar"
    });

    function actualizarRanking() {
        $(".ranking ol").each(function(index) {
            if (ranking[index] !== undefined) {
                $(this).text(`${ranking[index]}`);
                //Recorro los <ol> del html y voy añadiendo el nombre de la imágen a la lista.
            } else {
                $(this).text("");
                //Este "else" es para que cuando los campos <ol> aparezcan vacíos y no ponga "undefined" cuando no tienen nada dentro.
            }
        });
    }
});