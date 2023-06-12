// Function to update battery information
function updateBatteryInfo() {
    // Check if the Battery API is supported
    if ('getBattery' in navigator) {
        navigator.getBattery()
            .then(function(battery) {
                // Update battery level
                document.getElementById('battery-level').innerHTML = Math.floor(battery.level * 100) + "%";

                // Update battery status
                var status = battery.charging ? 'Charging' : 'Discharging';
                document.getElementById('battery-status').innerHTML = status;

                // Update battery charging
                var charging = battery.charging ? 'Yes' : 'No';
                document.getElementById('battery-charging').innerHTML = charging;

                // Update battery discharging
                var discharging = battery.dischargingTime === Infinity ? 'No' : 'Yes';
                document.getElementById('battery-discharging').innerHTML = discharging;

                // Update battery charging time
                var chargingTime = battery.chargingTime === Infinity ? 'Unknown' : formatTime(battery.chargingTime);
                document.getElementById('battery-charging-time').innerHTML = chargingTime;

                // Update battery remaining time
                var remainingTime = battery.dischargingTime === Infinity ? 'Unknown' : formatTime(battery.dischargingTime);
                document.getElementById('battery-remaining-time').innerHTML = remainingTime;

                // Update battery capacity
                document.getElementById('battery-capacity').innerHTML = battery.capacity + " mWh";

                // Update battery health
                document.getElementById('battery-health').innerHTML = battery.health;

                // Update battery temperature
                document.getElementById('battery-temperature').innerHTML = battery.temperature + " °C";

                // Update battery charging rate
                document.getElementById('battery-charging-rate').innerHTML = battery.chargingCurrent + " W";

                // Update battery discharging rate
                document.getElementById('battery-discharging-rate').innerHTML = battery.dischargingCurrent + " W";
            });
    } else {
        // Battery API not supported
        document.getElementById('battery-status').innerHTML = 'Not supported';
    }
}

// Format time in HH:MM:SS format
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);
    return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
}

// Add leading zero to numbers less than 10
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}

// Call the updateBatteryInfo function initially
updateBatteryInfo();

// Update battery information every second
setInterval(updateBatteryInfo, 1000);

// Add an event listener to update battery information when the battery status changes
navigator.getBattery().then(function(battery) {
    battery.addEventListener('chargingchange', updateBatteryInfo);
    battery.addEventListener('levelchange', updateBatteryInfo);
    battery.addEventListener('dischargingtimechange', updateBatteryInfo);
});
