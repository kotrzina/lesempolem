function validate() {
    var status = true;
    var val;

    /* Name */
    var el_name = $("input[name='name']");
    val = el_name.val();
    status = (status && val.length > 2);
    inputValidationStyle(el_name, val.length > 2);

    /* Surname */
    var el_surname = $("input[name='surname']");
    val = el_surname.val();
    status = (status && val.length > 2);
    inputValidationStyle(el_surname, val.length > 2);

    /* Club */
    var el_club = $("input[name='club']");
    val = el_club.val();
    status = (status && val.length > 2);
    inputValidationStyle(el_club, val.length > 2);

    /* Rok narození */
    var el_year = $("input[name='year']");
    val = parseInt(el_year.val());
    status = (status && (val > 1900 && val < 2016));
    inputValidationStyle(el_year, val > 1900 && val < 2016);

    /* Pohlaví */
    var el_sex = $("select[name='sex']");
    val = el_sex.val();
    status = (status && val);
    inputValidationStyle(el_sex, val);

    /* Category */
    var el_category = $("select[name='category']");
    val = el_category.val();
    status = (status && val);
    inputValidationStyle(el_category, val);

    return status;
}

function setCategory() {
    var submitBtn = $('#ok-button');
    submitBtn.prop('disabled', true);
    $("#frm-registrationForm select[name='category'] option").each(function () {
        $(this).attr('disabled', 'disabled');
    });
    var gender = $("#frm-registrationForm select[name='sex']").val();
    var year = $("#frm-registrationForm input[name='year']").val();

    if ((gender == 0 || gender == 1)
        && (year > 1900 && year < 2017)) {
        $.ajax({
            dataType: "json",
            url: "/validate-category?year=" + year + "&gender=" + gender,
            success: function (payload) {
                for (var categoryKey in payload.possible) {
                    var category = payload.possible[categoryKey];
                    $("#frm-registrationForm select[name='category'] option").each(function () {
                        if (category == $(this).attr('value')) {
                            $(this).removeAttr('disabled');
                        }
                    });
                }
                $("#frm-registrationForm select[name='category']").val(payload.suggest);
                validate();
                submitBtn.prop('disabled', false);
            }
        });
    }
}

function inputValidationStyle(el, status) {
    if (status) {
        el.parent().addClass('has-success');
    } else {
        el.parent().removeClass('has-success');
    }
}

$(document).ready(function () {
    if ($("#frm-registrationForm").length) {

        $("#frm-registrationForm select[name='category'] option").each(function () {
            $(this).attr('disabled', 'disabled');
        });

        $("#frm-registrationForm input").keyup(function () {
            validate();
        });
        $("#frm-registrationForm select").change(function () {
            validate();
        });
        $("#frm-registrationForm select[name='category']").change(function () {
            validate();
        });

        $("#frm-registrationForm input[name='surname']").change(function () {
            var val = $(this).val();
            if (val.slice(-3) == "ová" || val.slice(-3) == "ova" || val.slice(-1) == "á") {
                $("select[name='sex']").val('1');
            } else {
                $("select[name='sex']").val('0');
            }
        });

        $("#frm-registrationForm select[name='sex']").change(function () {
            setCategory();
        });

        var el_year = $("#frm-registrationForm input[name='year']");
        el_year.on('keyup', function() {
           if (parseInt(el_year.val()) > 1900) {
               setCategory();
           }
        });

        $("#frm-registrationForm").submit(function () {
            var status = validate();
            if (!status) {
                alert("Musíte vyplnit všechny pole.")
            }
            return status;
        });
    }
});