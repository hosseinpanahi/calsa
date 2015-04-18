// License: MIT
// Milad Hosseinpanahi
// RAYASA @ 2014

'use strict';

var calsa = {};

calsa.dif = 226899;

calsa.gregorianMonths = {
    1: { days: 31, name: 'January' },
    2: { days: 28, name: 'February' },
    3: { days: 31, name: 'March' },
    4: { days: 30, name: 'April' },
    5: { days: 31, name: 'May' },
    6: { days: 30, name: 'June' },
    7: { days: 31, name: 'July' },
    8: { days: 31, name: 'August' },
    9: { days: 30, name: 'September' },
    10: { days: 31, name: 'October' },
    11: { days: 30, name: 'November' },
    12: { days: 31, name: 'December' }
};
calsa.solarHijriMonths = {
    1: { days: 31, name: 'فروردین' },
    2: { days: 31, name: 'اردیبهشت' },
    3: { days: 31, name: 'خرداد' },
    4: { days: 31, name: 'تیر' },
    5: { days: 31, name: 'مرداد' },
    6: { days: 31, name: 'شهریور' },
    7: { days: 30, name: 'مهر' },
    8: { days: 30, name: 'آبان' },
    9: { days: 30, name: 'آذر' },
    10: { days: 30, name: 'دی' },
    11: { days: 30, name: 'بهمن' },
    12: { days: 29, name: 'اسفند' }
};
calsa.solarHijriDaysOfWeek = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];
calsa.gregorianDaysOfWeek = ['Sunday', 'Mondey', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

calsa.dateViewModel = function () {
    return {
        year: 1,
        month: 1,
        day: 1
    };
};

calsa.checkForNotValidDate = function (datevm) {
    var isValid = true;

    if (datevm.year < 1 || datevm.month < 1 || datevm.day < 1) {
        isValid = false;
    }
    if (isNaN(datevm.year) || isNaN(datevm.month) || isNaN(datevm.day)) {
        isValid = false;
    }
    if (!isValid) {
        throw new EventException();
    }
};

calsa.defaultConstructor = function (y, m, d) {
    var returnal = new calsa.dateViewModel();

    returnal.year = parseInt(y, 10);
    returnal.month = parseInt(m, 10);
    returnal.day = parseInt(d, 10);

    calsa.checkForNotValidDate(returnal);

    return returnal;
};

calsa.getYearFromGregorianDate = function (datevm) {
    var year = 0;

    if (datevm.month === 3 && datevm.day < 21) {
        year = datevm.year - 622;
    } else if (datevm.month < 3) {
        year = datevm.year - 622;
    } else {
        year = datevm.year - 621;
    }

    return year;
};

calsa.getYearFromSolarHijriDate = function (datevm) {
    var year = 0;

    if (datevm.month === 10 && datevm.day < 11) {
        year = datevm.year + 621;
    } else if (datevm.month < 10) {
        year = datevm.year + 621;
    } else {
        year = datevm.year + 622;
    }

    return year;
};

calsa.isThisGregorianYearLeap = function (year) {
    return (year % 4 === 0);
};

calsa.isThisSolarHijriYearLeap = function (year) {
    var matches = [1, 5, 9, 13, 17, 22, 26, 30];
    var tester = year % 33;
    return (matches.indexOf(tester) > 0);
};

calsa.getMonthsInDays = function (date, months, isLeap) {
    var completeMonths = date.month - 1;

    var days = 0;
    for (var i = 1; i <= completeMonths; i++) {
        days += months[i].days;
        if (months === calsa.gregorianMonths) {
            if (i === 2) {
                if (isLeap === true) {
                    days++;
                }
            }
        }
    }

    return days;
};

calsa.getYearsInDays = function (year) {
    return (year - 1) * 365;
};

calsa.countOfPassedLeapYears = function (year) {
    return year / 4;
};

calsa.getDateInDays = function (date, isLeap) {
    return calsa.getYearsInDays(date.year) + calsa.getMonthsInDays(date, calsa.gregorianMonths, isLeap) + date.day + calsa.countOfPassedLeapYears(date.year);
};

calsa.getSolarHijriDateInDays = function (date) {
    return calsa.getYearsInDays(date.year) + calsa.getMonthsInDays(date, calsa.solarHijriMonths) + date.day + calsa.countOfPassedLeapYears(date.year);
};

calsa.correctMonthAndDays = function (month, day, calendarMonths) {
    if (day < 1) {
        month--;
        day = calendarMonths[month].days;
    }

    return {
        month: month,
        day: day
    };
};

calsa.getMonthsFromGregorianDateForSolarHijriDate = function (days, isLeap) {
    var months = 1;
    while (true) {
        if (days < calsa.solarHijriMonths[months].days) {
            break;
        }
        if (months === 12) {
            if (days > 29) {
                if (!isLeap) {
                    months = 1;
                    days = 1;
                }
            }
            break;
        }
        days -= calsa.solarHijriMonths[months++].days;
    }

    var temp = calsa.correctMonthAndDays(months, days, calsa.solarHijriMonths);

    return {
        month: temp.month,
        day: temp.day
    };
};

calsa.getMonthsFromSolarHijriDateForGregorianDate = function (days, isLeap) {
    var months = 1;

    if (isLeap) {
        calsa.gregorianMonths[2].days = 29;
    }

    while (true) {
        if (days < calsa.gregorianMonths[months].days) {
            break;
        }
        if (months === 12) {
            break;
        }
        days -= calsa.gregorianMonths[months++].days;
    }

    calsa.gregorianMonths[2].days = 28;

    var temp = calsa.correctMonthAndDays(months, days, calsa.gregorianMonths);

    return {
        month: temp.month,
        day: temp.day
    };
};

calsa.getDateForSolarHijri = function (passedDays, date, convertedYear, isConvertedYearLeap) {
    var result = new calsa.dateViewModel();
    result.year = convertedYear;

    var solarHijriRemainingDays = passedDays - calsa.dif;
    if (solarHijriRemainingDays < 1) {
        throw new RangeException();
    }

    var solarHijriPassedYearsInDays = ((convertedYear - 1) * 365) + calsa.countOfPassedLeapYears(convertedYear);
    var remainingDays = solarHijriRemainingDays - solarHijriPassedYearsInDays;
    var temp = calsa.getMonthsFromGregorianDateForSolarHijriDate(remainingDays, isConvertedYearLeap);
    result.month = temp.month;
    result.day = parseInt(temp.day, 10);

    return result;
};

calsa.getDateForGregorian = function (passedDays, date, convertedYear, isConvertedYearLeap) {
    var result = new calsa.dateViewModel();
    result.year = convertedYear;

    var gregorianRemainingDays = passedDays + calsa.dif;

    var gregorianPassedYearsInDays = ((convertedYear - 1) * 365) + calsa.countOfPassedLeapYears(convertedYear);

    var remainingDays = gregorianRemainingDays - gregorianPassedYearsInDays + 1;
    var temp = calsa.getMonthsFromSolarHijriDateForGregorianDate(remainingDays, isConvertedYearLeap);
    result.month = temp.month;
    result.day = parseInt(temp.day, 10);

    return result;
};

calsa.gregorianToSolarHijri = function (year, month, day) {
    var date = calsa.defaultConstructor(year, month, day);
    var convertedYear = calsa.getYearFromGregorianDate(date);
    var isLeapYear = calsa.isThisSolarHijriYearLeap(convertedYear);
    var passedDays = calsa.getDateInDays(date, isLeapYear);
    var convertedDate = calsa.getDateForSolarHijri(passedDays, date, convertedYear, isLeapYear);
    var originalDate = new Date(date.year, date.month - 1, date.day);

    return {
        year: convertedDate.year,
        month: convertedDate.month,
        day: convertedDate.day,
        isLeapYear: isLeapYear,
        monthName: calsa.solarHijriMonths[convertedDate.month].name,
        dayInWeek: calsa.solarHijriDaysOfWeek[originalDate.getDay()],
        originalDate: originalDate
    };
};

calsa.solarHijriToGregorian = function (year, month, day) {
    var date = calsa.defaultConstructor(year, month, day);
    var convertedYear = calsa.getYearFromSolarHijriDate(date);
    var passedDays = calsa.getSolarHijriDateInDays(date);
    var isLeapYear = calsa.isThisGregorianYearLeap(convertedYear);
    var convertedDate = calsa.getDateForGregorian(passedDays, date, convertedYear, isLeapYear);
    var realConvertedDate = new Date(convertedDate.year, convertedDate.month, convertedDate.day);
    var originalDate = year + "/" + month + "/" + day;

    return {
        year: convertedDate.year,
        month: convertedDate.month,
        day: convertedDate.day,
        isLeapYear: isLeapYear,
        monthName: calsa.gregorianMonths[convertedDate.month].name,
        dayInWeek: calsa.gregorianDaysOfWeek[realConvertedDate.getDay()],
        originalDate: originalDate
    };
};