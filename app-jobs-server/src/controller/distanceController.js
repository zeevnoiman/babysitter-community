
function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

module.exports = {
    distance (req, res) {

        const {lat1, lat2, lon1, lon2} = req.query;

        var R = 6371e3; // metres
        var φ1 = degrees_to_radians(lat1);
        var φ2 = degrees_to_radians(lat2);
        var Δφ = degrees_to_radians(lat2-lat1);
        var Δλ = degrees_to_radians(lon2-lon1);
        
        var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        
        var distanceInMeters = R * c;

        var distanceInKM = distanceInMeters / 1000;
        
        res.send({'distance' : distanceInKM});
    }
}