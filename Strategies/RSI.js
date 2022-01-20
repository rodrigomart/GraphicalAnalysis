const EMA = require('./EMA');



module.exports = RSI;




/**
 * Relative strength index
 * @param {Options} Options
 */
function RSI(options){
    /** Options */
    this.options = options || {
        period: 14
    };


    /** Average Loss */
    this.averageLoss = new EMA({period: this.options.period});

    /** Average Gain */
    this.averageGain = new EMA({period: this.options.period});


    /** Value */
    this.value = 0.0;
};

/**
 * Calculate
 * @param   {double} value 
 * @returns {double}
 */
RSI.prototype.calc = function(value){
    // Variables
    let diff, loss, gain, emaLoss, emaGain;


    // Calculate the diference
    diff = value - this.value;

    // The value
    this.value = value;

    // Prevent error
    if(diff == value) return 0.0;

    // Set the gain and loss
    if(diff >= 0){gain = diff; loss = 0.0;}
    else {gain = 0.0; loss = -diff;}


    // Exponential moving average
    emaGain = this.averageGain.calc(gain);
    emaLoss = this.averageLoss.calc(loss);


    // If you are not ready to calculate
    if(emaGain == 0 || emaLoss == 0) return 0.0;


    // Relative Strenght Index
    return 100 - 100 / (1 + emaGain / emaLoss);
};