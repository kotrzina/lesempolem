function fixFooter() {
    var margin = 50;
    var el = $('#sponsors');
    var window_height = $(document).height();
    if ((parseInt(el.position().top) + el.height() + margin) < window_height) {
        var position_top = parseInt(el.position().top);
        var height = window_height - position_top - margin;
        el.css("height", height + "px");
    }
}

$(window).load(function () {

    fixFooter();

    $(window).resize(function () {
        fixFooter();
    });

});
