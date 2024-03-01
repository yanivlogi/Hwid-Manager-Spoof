function calculateJewelryPrice(goldWeight, mainGemstoneCarat, caratForAllSideGemstones, sideGemstonesAmount) {
    // קביעת מחיר זהב לגרם
    const goldPricePerGram = 137;
    
    // חישוב מחיר יהלום ראשי
    const mainGemstonePrice = gemsCaratCalculator(mainGemstoneCarat)*mainGemstoneCarat;
    
    // חישוב מחיר יהלום צד
    function gemsCaratCalculator(carat)  {
        if (carat >= 0.01 && carat <= 0.14) {
            return 500;
        } else if (carat >= 0.15 && carat <= 0.60) {
            return 800;
        } else if (carat >= 0.61 && carat <= 1.00) {
            return 1000;
        } else if (carat >= 1.01 && carat <= 1.50) {
            return 1200;
        } else if (carat >= 1.51 && carat <= 2.00) {
            return 1400;
        } else if (carat >= 2.01 && carat <= 3.00) {
            return 1800;
        } else if (carat >= 3.01 && carat <= 3.50) {
            return 2200;
        } else if (carat >= 3.51 && carat <= 4.00) {
            return 2600;
        } else if (carat >= 4.01 && carat <= 5.00) {
            return 2800;
        } else {
            return 0;
        }
    };
    
    // חישוב מחיר הזהב
    const goldPrice = goldWeight * goldPricePerGram;
    
    const calculateSingleStoneSide = caratForAllSideGemstones/sideGemstonesAmount;

    const calculateAllStoneSidePrice = calculateSingleStoneSide * gemsCaratCalculator(calculateSingleStoneSide) * sideGemstonesAmount;
  

    // חישוב סך הכל
    const totalPrice = mainGemstonePrice + calculateAllStoneSidePrice + goldPrice;
    
    return totalPrice;
}

// דוגמה לשימוש באלגוריתם:
const goldWeight = 3.26; // גרם
const mainGemstoneCarat = 0.5; // קראט
const caratForAllSideGemstones = 0.42; // קראט
const sideGemstonesAmount = 14; // כמות
const totalPrice = calculateJewelryPrice(goldWeight, mainGemstoneCarat, caratForAllSideGemstones, sideGemstonesAmount);
console.log("מחיר התכשיט הוא: " + totalPrice.toFixed(2) + "$");
