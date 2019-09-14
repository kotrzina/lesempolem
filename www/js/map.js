jQuery(document).ready(function () {
    var center = SMap.Coords.fromWGS84(16.7083328, 49.3926389);


    var m = new SMap(JAK.gel("m"), center, 15);
    m.addDefaultLayer(SMap.DEF_BASE).enable();
    m.addDefaultControls();

    var layer = new SMap.Layer.Marker();
    m.addLayer(layer);
    layer.enable();

    /* Hlavni */
    var card = new SMap.Card();
    card.getHeader().innerHTML = "<strong>LESEMPOLEM</strong>";
    card.getBody().innerHTML = "Hřiště ve Veselici, kde budou umístěny registrace, start závodu, občerstvení, živá kapela a mnoho dalšího.";

    /* Rozhledna */
    var rozhledna = SMap.Coords.fromWGS84(16.7038214, 49.3891403);
    var card2 = new SMap.Card();
    card2.getHeader().innerHTML = "<strong>ROZHLEDNA VESELICE</strong>";
    card2.getBody().innerHTML = "Rozhledna, kolem které poběžíte.";


    var marker1 = new SMap.Marker(center, "myMarker1", {url: '/images/start_here_gnome_green.png'});
    marker1.decorate(SMap.Marker.Feature.Card, card);
    layer.addMarker(marker1);

    var marker2 = new SMap.Marker(rozhledna, "myMarker2", {url: '/images/tower.png'});
    marker2.decorate(SMap.Marker.Feature.Card, card2);
    layer.addMarker(marker2);

});