"use strict";

$(function () {
    // Onload

    var socket = io.connect();
    socket.on('playerstatus', function (data) {
        if (data === "play") {
            $(".radio-on").show();
            $(".radio-off").hide();

            $(".toggle-radio").parent().addClass("active");
        }
        else {
            $(".radio-on").hide();
            $(".radio-off").show();

            $(".toggle-radio").parent().removeClass("active");
        }
    });
    socket.on('newSong', function (data) {
        $(".item-stream").text(data.Name);

        // Sofern sich der Titel geändern hat: updaten
        if ($(".item-titel").text() !== data.Title) {
            $(".item-titel").text(data.Title);

            // Marquee starten/aktualisieren
            $('.marquee').marquee({
                duplicated: true,
                duration: 5000
            });
        }
        console.log(data.Title);
    });


    $(".toggle-radio").add(".radio-icon img").click(function () {
        // Toggle radio
        socket.emit("toggleRadio");
    });
});