class Utils {
    static getTopThreeFromArray(arrayData) {
        let returnArray = [];
        for (let i=0; i<3; i++){
            returnArray.push(arrayData[i])
        }
        return returnArray;
    }
}

module.exports = Utils;