// Preload all calculation functions
import {calculateRound} from './caratToMM/Round.js';
import {calculatePrincess} from './caratToMM/Princess.js';
import {calculateCushion} from './caratToMM/Cushion.js';
import {calculateOval} from './caratToMM/Oval.js';
import {calculateRadiant} from './caratToMM/Radiant.js';
import {calculateEmerald} from './caratToMM/Emerald.js';
import {calculatePear} from './caratToMM/Pear.js';
import {calculateHeart} from './caratToMM/Heart.js';
import {calculateMarquise} from './caratToMM/Marquise.js';
import {calculateTriangle} from './caratToMM/Triangle.js';
import {calculateTrillion} from './caratToMM/Trillion.js';
import {calculateBaguette} from './caratToMM/Baguette.js';
import {calculateTaperedBaguette} from './caratToMM/TaperedBaguette.js';

document.getElementById("converterForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const shape = document.getElementById("shape").value;
    const unit = document.getElementById("unit").value;
    const value = parseFloat(document.getElementById("value").value);

    let resultText = "";
    let calculateFunction;

    // Choose the appropriate calculation function based on the selected shape
    switch (shape) {
        case "Round":
            calculateFunction = calculateRound;
            break;
        case "Princess":
            calculateFunction = calculatePrincess;
            break;
        case "cushion":
            calculateFunction = calculateCushion;
            break;
        case "oval":
            calculateFunction = calculateOval;
            break;
        case "radiant":
            calculateFunction = calculateRadiant;
            break;
        case "emerald":
            calculateFunction = calculateEmerald;
            break;
        case "pear":
            calculateFunction = calculatePear;
            break;
        case "heart":
            calculateFunction = calculateHeart;
            break;
        case "marquise":
            calculateFunction = calculateMarquise;
            break;
        case "triangle":
            calculateFunction = calculateTriangle;
            break;
        case "trillion":
            calculateFunction = calculateTrillion;
            break;
        case "baguette":
            calculateFunction = calculateBaguette;
            break;
        case "taperedBaguette":
            calculateFunction = calculateTaperedBaguette;
            break;
        default:
            resultText = "Invalid shape.";
            break;
    }

    // Calculate the result using the chosen function
    if (calculateFunction) {
        const result = calculateFunction(value, unit);
        if (result !== null) {
            resultText = `Result: ${result}`;
        } else {
            resultText = "Invalid input.";
        }
    }

    document.getElementById("result").innerText = resultText;
});
