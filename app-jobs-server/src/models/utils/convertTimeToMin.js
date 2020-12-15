module.exports = function convertTimeToMin(time){
    const [hour, min] = time.split(':').map(Number);

    const timeInMin = (hour*60)+min;

    return timeInMin;
}