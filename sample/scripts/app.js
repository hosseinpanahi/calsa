var run = function(){
	var year = document.getElementById("year").value;
	var month = document.getElementById("month").value;
	var day = document.getElementById("day").value;

	var converted = new calsa.gregorianToSolarHijri(year, month, day);

	var toShow = '<p>Year:&nbsp;' + converted.year + '</p>';
	toShow += '<p>Month:&nbsp;' + converted.month + '</p>';
	toShow += '<p>Day:&nbsp;' + converted.day + '</p>';
	toShow += '<p>Is Leap:&nbsp;' + converted.isLeapYear + '</p>';
	toShow += '<p>Month Name:&nbsp;' + converted.monthName + '</p>';
	toShow += '<p>Day in Week:&nbsp;' + converted.dayInWeek + '</p>';
	toShow += '<p>Original Date:&nbsp;' + converted.originalDate.toDateString() + '</p>';
	
	document.getElementById("converted").innerHTML = toShow;
	
	var convertBack = new calsa.solarHijriToGregorian(converted.year, converted.month, converted.day);

	toShow = '<span class="text-danger">Year:&nbsp;</span>' + convertBack.year;
	toShow += ', <span class="text-danger">Month:&nbsp;</span>' + convertBack.month;
	toShow += ', <span class="text-danger">Day:&nbsp;</span>' + convertBack.day;
	toShow += ', <span class="text-danger">Is Leap:&nbsp;</span>' + convertBack.isLeapYear;
	toShow += ', <span class="text-danger">Month Name:&nbsp;</span>' + convertBack.monthName;
	toShow += ', <span class="text-danger">Day in Week:&nbsp;</span>' + convertBack.dayInWeek;
	toShow += ', <span class="text-danger">Original Date:&nbsp;</span>' + convertBack.originalDate;

	document.getElementById("convertedBack").innerHTML = toShow;
}