// Handles all events for the clock and greeting on first page

document.addEventListener("DOMContentLoaded", function () {
    //Function to update time on clock 
    function updateClock() {
        const curr = new Date();
        let dayName = curr.toLocaleString('en-us', { weekday: 'long' });
        let month = curr.toLocaleString('en-us', { month: 'long' });
        let dayNumber = curr.getDate();
        let year = curr.getFullYear();
        let hour = curr.getHours();
        let minute = curr.getMinutes();
        let timeOfDay = hour >= 12 ? 'pm' : 'am';

        //Want 12 hour clock
        hour = hour % 12;
        hour = hour ? hour : 12;

        minute = minute < 10 ? '0' + minute : minute;

        document.getElementById('dayname').textContent = dayName;
        document.getElementById('month').textContent = month;
        document.getElementById('dayNumber').textContent = dayNumber;
        document.getElementById('year').textContent = year;
        document.getElementById('hour').textContent = hour;
        document.getElementById('minute').textContent = minute;
        document.getElementById('timeOfDay').textContent = timeOfDay;

        //Call to update the greeting message
        updateGreeting(curr);
    }

    //Function to update greeting based on clock time

    function updateGreeting(date) {
        let hour = date.getHours();
        let greeting;

        if (hour < 12) {
            greeting = "Good Morning, Jason.";
        } else if (hour < 17) {
            greeting = "Good Afternoon, Jason.";
        } else {
            greeting = "Good Evening, Jason.";
        }
        document.getElementById('greet').textContent = greeting;
    }

    //Call to update clock every minute since we dont have seconds
    setInterval(updateClock, 60000);
    updateClock();
})