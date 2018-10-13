(function () {
    var datePicker = new SimplePicker('.main-content', {zIndex: 2});
    var arriveDateBtn = document.getElementById('arriveDateBtn');
    var departDateBtn = document.getElementById('departDateBtn');
    var arriveDate = document.getElementById('arriveDate');
    var departDate = document.getElementById('departDate');
    var arriveMonth = document.getElementById('arriveMonth');
    var departMonth = document.getElementById('departMonth');
    var checkAvailabilityBtn = document.getElementById('checkBtn');
    var ARRIVE_DATE;
    var DEPART_DATE;
    var currentDate;
    var currentMonth;
    var dateNow = new Date();

    var openArrivePicker = function () {
        currentDate = arriveDate;
        currentMonth = arriveMonth;
        datePicker.open()
    };

    var openDepartPicker = function () {
        currentDate = departDate;
        currentMonth = departMonth;
        datePicker.open();
    };

    var setDateToNode = function(day, node, date) {
        node.innerText = day;
        node.setAttribute('data-fulldate', date.toLocaleDateString("en-US"));
    };

    var initDate = function () {
        var date = dateNow.getDate();
        var nextDate = new Date(dateNow.getFullYear(), dateNow.getMonth(), date + 1);

        setDateToNode(date, arriveDate, dateNow);
        setDateToNode(date + 1, departDate, nextDate);

        arriveMonth.innerText = dateNow.toDateString().split(' ')[1];
        departMonth.innerText = dateNow.toDateString().split(' ')[1];
    };

    var checkAvailability = function () {
        ARRIVE_DATE = arriveDate.getAttribute('data-fulldate');
        DEPART_DATE = departDate.getAttribute('data-fulldate');

        location.href = '#/booking/step-1?arrive=' + ARRIVE_DATE + '&depart=' + DEPART_DATE;
    };

    arriveDateBtn.addEventListener('click', openArrivePicker, true);
    departDateBtn.addEventListener('click', openDepartPicker, true);
    checkAvailabilityBtn.addEventListener('click', checkAvailability, true);

    datePicker.on('submit', function(date, readableDate){
        setDateToNode(date.getDate(), currentDate, date);
        currentMonth.innerText = date.toDateString().split(' ')[1];
    });

    initDate();
})();