/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let nBad = n;
        let nGood = 0;
        
        while(nBad-nGood>1){
            let nCurr = Math.round((nBad+nGood)/2);
            if(isBadVersion(nCurr)){
                nBad=nCurr
            } else nGood = nCurr
        }
         return nBad;
    };

};