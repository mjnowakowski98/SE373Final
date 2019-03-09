class Util {
    // Generate a random number inclusive of high/low
    static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }

    // Generate a random key string
    static generateKey(keyGenOptions) {
        let tmpString = ""; // Start empty

        // Append 1 char at a time
        for(let i = 0; i < keyGenOptions.length; i++) {
            // Generate a random character code (use config to define keycode ranges)
            let tmpRange = Util.randomBetween(0, keyGenOptions.charRanges.length - 1);
            let low = keyGenOptions.charRanges[tmpRange].low;
            let high = keyGenOptions.charRanges[tmpRange].high;
            tmpString += String.fromCharCode(Util.randomBetween(low, high)); // Convert keycode to char and append
        }
        return tmpString; // Return completed key
    }
}

module.exports = Util;