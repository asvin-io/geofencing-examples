const geocode = require('./geocoding')
const distance = require('./calculatedistance')
const yargs = require('yargs')




yargs.version('0.0.1')
yargs.command({
    command: "set",
    describe: "Location of Geofence",
    builder : {
        location: {
            describe: "location",
            demandOption: true,
            type: 'string'
        },
        radius: {
            describe: "Geofence radius in KMs",
            demandOption: true,
            type: 'int'
        },
        devicelat: {
            describe: "Latitude of the device",
            demandOption: true,
            type: 'int'
        },
        devicelong: {
            describe: "Longitude of the device",
            demandOption: true,
            type: 'int'
        }

    },
    handler: function(argv){
        // console.log("address", yargs.argv.location);
        geocode(yargs.argv.location, (error, {latitude, longitude , location}) => {
            if (error){
                return console.log("Error setting up geofence")
            }
            
            console.log("Geofence location: ", location);
            console.log("Setting up geofence with Latitude: " + latitude + " and Longitude: "+ longitude)

            if (distance(latitude, longitude, yargs.argv.devicelat, yargs.argv.devicelong) > yargs.argv.radius){
                console.log("Device Outside Geofence");
            } else {
                console.log("Device Inside Geofence");
            }
        });
    }
})




yargs.parse();



