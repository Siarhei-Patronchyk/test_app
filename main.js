(function () {
    var arriveDateBtn = document.getElementById('arriveDateBtn');
    var departDateBtn = document.getElementById('departDateBtn');
    var arriveDate = document.getElementById('arriveDate');
    var departDate = document.getElementById('departDate');
    var arriveMonth = document.getElementById('arriveMonth');
    var departMonth = document.getElementById('departMonth');
    var checkAvailabilityBtn = document.getElementById('checkBtn');
    var calendarOverlay = document.querySelector('.calendar-overlay');
    var ARRIVE_DATE;
    var DEPART_DATE;
    var currentDate;
    var currentMonth;
    var dateNow = new Date();

    var setDateToNode = function(day, node) {
        node.innerText = day;
    };

    var setMonthToNode = function(date, node) {
        console.log(date);
        node.innerText = date.toDateString().split(' ')[1];
    };

    var getFullDate = function (date) {
        return new Date(date[2], date[0], date[1]);
    };

    var initDate = function () {
        var dateArriveArray = arriveDateBtn.value.split('/');
        var dateDepartArray = departDateBtn.value.split('/');
        var initArriveDay = dateArriveArray[1];
        var initDepartDay = dateDepartArray[1];
        var arriveFullDate = getFullDate(dateArriveArray);
        var departFullDate = getFullDate(dateDepartArray);

        setDateToNode(initArriveDay, arriveDate);
        setDateToNode(initDepartDay, departDate);
        setMonthToNode(arriveFullDate, arriveMonth);
        setMonthToNode(departFullDate, departMonth);
    };

    var checkAvailability = function () {
        if (!ARRIVE_DATE) {
            ARRIVE_DATE = arriveDateBtn.value;
        }
        if (!DEPART_DATE) {
            DEPART_DATE = departDateBtn.value;
        }

        location.href = '#/booking/step-1?arrive=' + ARRIVE_DATE + '&depart=' + DEPART_DATE;
    };

    var openCalendarOvelay = function (event) {
        event.stopPropagation();
        setTimeout(function () {
            calendarOverlay.style.display = 'block';
            }, 0);
    };

    var closeCalendarOverlay = function () {
        calendarOverlay.style.display = 'none';
    };

    var calendar_from = new SalsaCalendar({
        inputId: 'arriveDateBtn',
        lang: 'en',
        range: {
            min: 'today'
        },
        calendarPosition: 'bottom',
        fixed: false,
        connectCalendar: true,
        onSelect: function (input) {
            ARRIVE_DATE = input.value;
            setDateToNode(input.value.split('/')[1], arriveDate);
            setMonthToNode(getFullDate(input.value.split('/')), arriveMonth);
            calendarOverlay.style.display = 'none';
        }
    });

    var calendar_to = new SalsaCalendar({
        inputId: 'departDateBtn',
        lang: 'en',
        range: {
            min: 'today'
        },
        calendarPosition: 'bottom',
        fixed: false,
        connectCalendar: true,
        onSelect: function (input) {
            DEPART_DATE = input.value;
            setDateToNode(input.value.split('/')[1], departDate);
            setMonthToNode(getFullDate(input.value.split('/')), departMonth);
            calendarOverlay.style.display = 'none';
        }
    });

    new SalsaCalendar.Connector({
        from: calendar_from,
        to: calendar_to,
        minimumInterval: 1
    });

    arriveDateBtn.addEventListener('click', openCalendarOvelay, true);
    departDateBtn.addEventListener('click', openCalendarOvelay, true);
    calendarOverlay.addEventListener('click', closeCalendarOverlay, true);
    checkAvailabilityBtn.addEventListener('click', checkAvailability, true);

    initDate();
})();