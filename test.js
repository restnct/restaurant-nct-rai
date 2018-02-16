var gerechten = [
    ['0','',''],
    ['1','义燒飯','10,00'],
    ['2','火腩飯','10,00'],
    ['3','双拼','12,00'],
    ['4','燒汁豬扒飯','10,00'],
    ['5','辣汁豬扒飯','10,00'],
    ['6','燒汁雞肶飯','10,00'],
    ['7','辣汁雞肶飯','10,00'],
    ['8','白切雞肶飯','10,00'],
    ['9','口水雞肶飯','10,00'],
    ['10','雞肉炒飯','10,00'],
    ['11','义燒炒飯','10,00'],
    ['12','牛肉炒飯','12,00'],
    ['13','雞肉炒麵','10,00'],
    ['14','义燒炒麵','10,00'],
    ['15','牛肉炒麵','12,00'],
    ['16','時菜雞肉飯','10,00'],
    ['17','時菜牛肉飯','12,00'],
    ['18','時菜肉片飯','10,00'],
    ['19','蒜蓉炒雜菜飯','10,00'],
    ['20','麻婆豆腐飯','12,00'],
    ['21','梅菜茄子飯','10,00'],
    ['22','梅菜茄子碎肉','12,00'],
    ['23','蕃茄炒疍飯','10,00'],
    ['24','喼汁燴猪肉飯','10,00'],
    ['25','咖哩牛腩飯','12,00']
];

$(document).ready(function() {
    var MyDate = new Date();
    var MyDateString;
    MyDateString = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);

    $('#date').val(MyDateString);

    for (var i = 1; i < gerechten.length; i++) {
        $('#total').append("    <div class=\"form-group row\">\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-1 col-form-label\">" + gerechten[i][0] + ". </label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-3 col-form-label\">" + gerechten[i][1] + "</label>\n\
    <label for=\"gerecht_" + gerechten[i][0] + "\" class=\"col-2 col-form-label\">&euro; " + gerechten[i][2] + "</label>\n\
    <label class=\"col-1 col-form-label\"> x </label>\n\
    <div class=\"col-3\">\n\
        <input type=\"number\" class=\"form-control\" placeholder=\"0\" id=\"gerecht_" + gerechten[i][0] + "\">\n\
    </div>\n\
    <label class=\"col-1 col-form-label subtotal\"> = &euro; </label>\n\
</div>");
    }

    $('#totalmath').click(function addTotal() {
        var totalPrice = 0;

        for (var i = 0; i < gerechten.length; i++) {
            var dishtotal = $('#gerecht_' + i).val();
            if (dishtotal > 0) {
                var price = dishtotal * parseInt(gerechten[i][2]);
                totalPrice = totalPrice + price;
            } else {
                $('#gerecht_' + i).parent().parent().hide();
            }
        }
        
        $('#totalamount').html('&euro; ' + totalPrice + ',00');
        window.print();
    });

    $('#showall').click(function addTotal() {
        $('.form-group.row').show();
    });

    $('label[for*="gerecht_"]').click(function addTotal(e) {
        var target = e.target;
        var targetId = target.htmlFor;
        $('#' + targetId).val(Number($('#' + targetId).val()) + 1);
        
        var totalPrice = 0;
        for (var i = 0; i < gerechten.length; i++) {
            var dishtotal = $('#gerecht_' + i).val();
            if (dishtotal > 0) {
                var price = dishtotal * parseInt(gerechten[i][2]);
                totalPrice = totalPrice + price;
            }
        }
        
        $('#totalamount').html('&euro; ' + totalPrice + ',00');
    });

    $('input[type="number"]').change(function(e) {
        var totalPrice = 0;
        for (var i = 0; i < gerechten.length; i++) {
            var dishtotal = $('#gerecht_' + i).val();
            if (dishtotal > 0) {
                var price = dishtotal * parseInt(gerechten[i][2]);
                totalPrice = totalPrice + price;
            }
        }
        
        $('#totalamount').html('&euro; ' + totalPrice + ',00');
    });
});

function calc (input) {

}