# calsa
Calsa is a javascript small library to convert Solar Hijri Dates to Gregorian Dates and the other way around.

#####Super lightweight less than 5kb (min version)
#####No jquery dependency


##How to use calsa

#####1. Add link to calsa javascript file 

for example:
&lt;script src="scripts/libs/calsa.min.js"&gt;&lt;/script&gt;

#####2. Create a new instance of calsa.gregorianToSolarHijri or calsa.solarHijriToGregorian and then use it!

for example:
var converted = new calsa.gregorianToSolarHijri(1989, 10, 6);

##How to get calsa

####bower
bower install calsa


####nuget package manager
install-package Calsa

####download calsa repo from GitHub

##Properties
converted.year :> Year

converted.month :> Month

converted.day :> Day

converted.isLeapYear :> Is a leap year

converted.dayInWeek :> Day of the week

converted.originalDate :> Passed date to be converted