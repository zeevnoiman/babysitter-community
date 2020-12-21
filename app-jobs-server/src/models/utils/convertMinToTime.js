module.exports = function convertTimeToMin(time){
    const min = time % 60;
    const hour = time / 60;
    
    const minInTime = `${hour}:${min}:00`;

    return minInTime;
}