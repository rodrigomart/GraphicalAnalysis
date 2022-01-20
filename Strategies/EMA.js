module.exports = EMA;




/**
 * Exponential moving average
 * @param {Options} Options
 */
function EMA(options){
    /** Options */
    this.options = options || {
        period: 14
    };


    /** Average */
    this.average = [];


    /** Value */
    this.value = 0.0;
};

/**
 * Calculate
 * @param   {double} value 
 * @returns {double}
 */
EMA.prototype.calc = function(value){
    // If there are not enough periods
    if(this.average.length < this.options.period){
        // Add to end of array
        this.average.push(value);

        // Sum of all array elements
        let sum = this.average.reduce((prev, next) => prev + next);

        // Simple moving average
        this.value = sum / this.average.length;

        // Return SMA
        return this.value;
    }

    // Multiplier for smoothing
    const k = 2 / (this.options.period + 1);

    // Calculate the current EMA
    this.value = value * k + this.value * (1 - k);

    // Return EMA
    return this.value;
};