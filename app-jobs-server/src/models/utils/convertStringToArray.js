module.exports = function convertStringToArray(str){
    const arr = str.split(',').map(word => word.trim());
    return arr;
}