module.exports = SMA;




/**
 * Simple moving average
 * @param {Options} Options
 */
function SMA(options){
    /** Options */
    this.options = options || {
        period: 14
    };


    /** Average */
    this.average = [];
};

/**
 * Calculate
 * @param   {double} value 
 * @returns {double}
 */
SMA.prototype.calc = function(value){
    // Add to end of array
    this.average.push(value);

    // Removes the first element
    if(this.average.length > this.options.period)
    this.average.shift();

    // Sum of all array elements
    let sum = this.average.reduce((prev, next) => prev + next);

    // Simple moving average
    return sum / this.average.length;
};