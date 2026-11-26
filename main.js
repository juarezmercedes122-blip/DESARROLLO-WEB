$("h1").hide();

$(function() {

    $("p").css({"background-color": "red"});

    // Párrafo de Mercedes sin fondo rojo
    $("#tercero").css({"background-color": "transparent"});

    // Ocultar al principio
    $("#tercero").hide();

    // Mostrar
    $("#Mostrar").click(function() {
        $("#tercero").show();
    });

    // Ocultar
    $("#Ocultar").click(function() {
        $("#tercero").hide();
    });

    // Dialogo
    $("#Dialogo").click(function() {
        alert("aqui no es");
    });

    // Modo oscuro
    $("#Oscuro").click(function() {
        $("body").css({
            "background-color": "black",
            "color": "white"
        });
    });

    // Modo normal
    $("#Normal").click(function() {
        $("body").css({
            "background-color": "white",
            "color": "black"
        });
    });

    // Tamaño inicial de las letras
    var tamaño = 16;

    // Botón para aumentar las letras
    $("#Mas").click(function() {
            tamaño = tamaño + 2;
            $("body").css("font-size", tamaño + "px");
    });

        
    // Botón para disminuir las letras
        $("#Menos").click(function() {
            tamaño = tamaño - 2;
            $("body").css("font-size", tamaño + "px");
        });

});