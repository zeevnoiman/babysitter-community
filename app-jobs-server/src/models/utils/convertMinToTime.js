module.exports = function convertTimeToMin(time){
    var min = time % 60;
    const hour = Math.floor(time / 60);
    
    if(min < 10){
        min = `0${min}`;
    }
    const minInTime = `${hour}:${min}:00`;

    return minInTime;
}