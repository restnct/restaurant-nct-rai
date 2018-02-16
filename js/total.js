var gerechten = [
    ['0','',''],
    ['1','义燒飯','10,00','义燒'],
    ['2','火腩飯','10,00','火腩'],
    ['3','双拼','12,00','双拼'],
    ['4','燒汁豬扒飯','10,00','燒汁豬'],
    ['5','辣汁豬扒飯','10,00','辣汁豬'],
    ['6','燒汁雞肶飯','10,00','燒汁雞'],
    ['7','辣汁雞肶飯','10,00','辣汁雞'],
    ['8','白切雞肶飯','10,00','白切雞'],
    ['9','口水雞肶飯','10,00','口水雞'],
    ['10','雞肉炒飯','10,00','雞飯'],
    ['11','义燒炒飯','10,00','义飯'],
    ['12','牛肉炒飯','12,00','牛飯'],
    ['13','雞肉炒麵','10,00','雞麵'],
    ['14','义燒炒麵','10,00','义麵'],
    ['15','牛肉炒麵','12,00','牛麵'],
    ['16','時菜雞肉飯','10,00','時菜雞'],
    ['17','時菜牛肉飯','12,00','時菜牛'],
    ['18','時菜肉片飯','10,00','時菜肉'],
    ['19','蒜蓉炒雜菜飯','10,00','蒜蓉雜菜'],
    ['20','麻婆豆腐飯','12,00','麻婆豆腐'],
    ['21','梅菜茄子飯','10,00','梅菜茄子'],
    ['22','梅菜茄子碎肉','12,00','梅菜碎肉'],
    ['23','蕃茄炒疍飯','10,00','蕃茄疍'],
    ['24','喼汁燴猪肉飯','10,00','甜肉'],
    ['25','咖哩牛腩飯','12,00','咖哩牛']
];

$(document).ready(function() {
    var MyDate = new Date();
    var MyDateString;
    var MyTime;
    MyDateString2 = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + "-" + MyDate.getFullYear();
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);
    MyTime =  MyDate.getHours() + ':' + ('0' + (MyDate.getMinutes()+1)).slice(-2);

    $('#date').val(MyDateString);
    $('#time').val(MyTime);
    //$('#date').datepicker({ dateFormat: 'dd-mm-yy' }).val();

    for (var i = 1; i < gerechten.length; i++) {
        $('#total').append("    <div class=\"form-group row\">\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-1 offset-1 col-form-label\">" + gerechten[i][0] + ". </label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-2 col-form-label\">" + gerechten[i][1] + "</label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-2 col-form-label\">&euro; " + gerechten[i][2] + "</label>\n\
    <label class=\"col-1 col-form-label\"> x </label>\n\
    <div class=\"col-2\">\n\
        <input type=\"number\" class=\"form-control\" placeholder=\"0\" min=\"0\" id=\"gerecht_" + gerechten[i][0] + "\">\n\
    </div>\n\
    <div class=\"col-2 col-form-label\">\n\
        <p class=\"floatleft\">&euro; </p>\n\
        <p class=\" subtotalgerecht_" + gerechten[i][0] + " floatright\">0,00</p>\n\
    </div>\n\
</div>");
    }
    $('#total').append("<div class=\"form-group row textbox\">\n\
    <label for=\"notes\" class=\"col-3 offset-1 notes col-form-label\">Notes:</label>\n\
    <div class=\"col-6 notes\">\n\
    <textarea class=\"form-control notes\" name=\"message\" id=\"contact-message\" placeholder=\"Your message\" ></textarea>\n\
    </div>\n\
    </div>");
    $('#totalmath').click(function addTotal() {
        calcTotal(true);
    });

    $('#showall').click(function addTotal() {
        $('.form-group.row').show();
        $('.notes').show();
    });

    $('label[for*="gerecht_"]').click(function addTotal(e) {
        var target = e.target;
        var targetId = target.htmlFor.slice(8);

        $('#gerecht_' + targetId).val(Number($('#gerecht_' + targetId).val()) + 1);

        var count = Number($('#gerecht_' + targetId).val());
        var price = parseInt(gerechten[targetId][2]);
        var subtotal = count * price;
        $('.subtotalgerecht_' + targetId).html(subtotal + ',00');

        calcTotal();
    });

    $('label[for*="gerecht_"]').contextmenu(function(e) {
        e.preventDefault();
        var target = e.target;
        var targetId = target.htmlFor.slice(8);

        if (Number($('#gerecht_' + targetId).val()) > 0) {
            $('#gerecht_' + targetId).val(Number($('#gerecht_' + targetId).val()) - 1);

            var count = Number($('#gerecht_' + targetId).val());
            var price = parseInt(gerechten[targetId][2]);
            var subtotal = count * price;
            $('.subtotalgerecht_' + targetId).html('&euro; ' + subtotal + ',00');

            calcTotal();
        } else {
            return false;
        }
    });

    $('input[type="number"]').change(function(e) {
        var target = e.target;
        var targetId = target.id.slice(8);

        var count = Number($('#gerecht_' + targetId).val());
        var price = parseInt(gerechten[targetId][2]);
        var subtotal = count * price;
        $('.subtotalgerecht_' + targetId).html('&euro; ' + subtotal + ',00');

        calcTotal();
    });
});

function calcTotal(print) {
    $( "#keuken" ).empty();
    var totalPrice = 0;
    var totalCount = 0;
    var vat = 0;

    var MyDate = new Date();
    var MyDateString;
    var MyDateString2;
    MyDateString2 = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + "-" + MyDate.getFullYear();
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);

    $('#keuken').append(
"<div class=\"form-group row\">\n\
    <div class=\"col-4\">\n\
        <p class=\"dishamount\">" + MyDateString2 + "</p>\n\
    </div>\n\
    <div class=\"col-2\">\n\
        <p class=\"dishamount\">" + $('#time').val() + "</p>\n\
    </div>\n\
</div><hr>");

    for (var i = 0; i < gerechten.length; i++) {
        var dishtotal = $('#gerecht_' + i).val();
        if (parseInt(dishtotal) > 0) {
            var price = parseInt(dishtotal) * parseInt(gerechten[i][2]);
            totalCount = parseInt(totalCount) + parseInt(dishtotal);
            totalPrice = totalPrice + price;

            vat = totalPrice - (totalPrice * (100/106));

            $('#keuken').append(
"<div class=\"form-group big-letter row\">\n\
    <div class=\"col-1\">\n\
        <p class=\"dishamount\">" + dishtotal + "</p>\n\
    </div>\n\
    <label class=\"col-1 col-form-label\"> x </label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-5 col-form-label\">" + gerechten[i][3] + "</label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-2 col-form-label price text-right\">(#" + gerechten[i][0] + ")</label>\n\
    <label class=\"col-3 col-form-label subtotalgerecht_" + gerechten[i][0] + " price\"> &euro; "+ $('.subtotalgerecht_' + i).html() +"</label>\n\
</div><hr>");

        } else {
            if (print) {
                $('#gerecht_' + i).parent().parent().hide();
                $('.textbox').hide();
            }
        }
    }
    $('#keuken').append(
"<div class=\"form-group row\">\n\
    <label for=\"Hal\" class=\"col-4 col-form-label\">Hall + stand:</label>\n\
    <div class=\"col-4\">\n\
        <p class=\"dishamount\">" + $('#hal').val() + "</p>\n\
    </div>\n\
    <div class=\"col-4\">\n\
        <p class=\"dishamount total\"> &euro; " + $('#totalamount').html() + "</p>\n\
    </div>\n\
    <label for=\"company\" class=\"col-4 col-form-label\">Company:</label>\n\
    <div class=\"col-7\">\n\
        <p class=\"dishamount\">" + $('#company').val() + "</p>\n\
    </div>\n\
    <label for=\"notes\" class=\"col-4 col-form-label\">Notes:</label>\n\
    <div class=\"col-8\">\n\
        <p class=\"dishamount\">" + $('#contact-message').val() + "</p>\n\
    </div>\n\
</div>");


    $('#countamount').html(totalCount);
    $('#totalamount').html(totalPrice + ',00');
    $('#vat').html(roundTo(vat, 2, totalPrice));

    if ($('.big-letter').length >= 13) {
        $('.big-letter').css('font-size', '33px');
    } else if ($('.big-letter').length >= 12) {
        $('.big-letter').css('font-size', '35px');
    } else if ($('.big-letter').length >= 11) {
        $('.big-letter').css('font-size', '40px');
    } else if ($('.big-letter').length >= 10) {
        $('.big-letter').css('font-size', '45px');
    }

    if (print) {
        window.print();
    }
}

function roundTo(n, digits, total) {
    var negative = false;

    if (digits === undefined) {
        digits = 0;
    }

    if (n < 0) {
        negative = true;
        n = n * -1;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);

    if (negative) {
        n = (n * -1).toFixed(2);
    }

    return n.replace(".", ",");
}