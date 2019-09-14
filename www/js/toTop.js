$(document).ready(function () {
    $(".toTop").click(function (e) {
        $('html,body').animate({scrollTop: 0}, 'slow');
        e.preventDefault();
        return false;
    });
});