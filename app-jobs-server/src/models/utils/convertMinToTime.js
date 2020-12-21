module.exports = function convertTimeToMin(time){
    var min = time % 60;
    const hour = time / 60;
    
    if(min < 10){
        min = `${min}0`;
    }
    const minInTime = `${hour}:${min}:00`;

    return minInTime;
}