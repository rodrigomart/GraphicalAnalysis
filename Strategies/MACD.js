const EMA = require('./EMA');
const SMA = require('./SMA');




module.exports = MACD;




/**
 * MACD
 * @param {Options} Options
 */
function MACD(options){
    /** Options */
    this.options = options || {
        slow: 16,
        fast: 9
    };


    /** Average Slow */
    this.averageSlow = new EMA({period: this.options.slow});

    /** Average Fast */
    this.averageFast = new EMA({period: this.options.fast});

    /** Average */
    this.average     = new SMA({period: this.options.fast});
};

/**
 * Calculate
 * @param   {double} value 
 * @returns {double}
 */
MACD.prototype.calc = function(value){
    // Exponential moving average
    let slow = this.averageSlow.calc(value);
    var fast = this.averageFast.calc(value);

    // Return MACD
    return this.average.calc(fast - slow);
};