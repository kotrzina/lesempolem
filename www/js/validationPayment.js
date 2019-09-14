function validatePayment() {
    var status = true;
    var val;

    /* Name */
    var el_name = $("input[name='name']");
    val = el_name.val();
    status = (status && val.length > 2);
    inputValidationStyle(el_name, val.length > 2);

    /* Email */
    var el_email = $("input[name='email']");
    val = el_email.val();
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    status = (status && (re.test(val)));
    inputValidationStyle(el_email, (re.test(val)));

    return status;
}

$(document).ready(function () {
    if ($("#frm-paymentForm").length) {
        validatePayment();
        $("#frm-paymentForm input").keyup(function () {
            validatePayment();
        });
        $("#frm-paymentForm select").change(function () {
            validatePayment();
        });

        $("#frm-paymentForm").submit(function () {
            var status = validatePayment();
            if (!status) {
                alert("Musíte vyplnit všechny pole. (jméno a email)")
            } else {
                $('.hiddenSpinner').show();
            }
            return status;
        });
    }
});