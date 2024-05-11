// Importing arrays for each stone shape
import  RoundArray  from './caratToMM/Round.js';
import  PrincessArray  from './caratToMM/Princess.js';
import  CushionArray  from './caratToMM/Cushion.js';
import OvalArray  from './caratToMM/Oval.js';
import  RadiantArray  from './caratToMM/Radiant.js';
import  EmeraldArray  from './caratToMM/Emerald.js';
import  PearArray  from './caratToMM/Pear.js';
import  HeartArray  from './caratToMM/Heart.js';
import  MarquiseArray  from './caratToMM/Marquise.js';
import  TriangleArray  from './caratToMM/Triangle.js';
import  TrillionArray  from './caratToMM/Trillion.js';
import  BaguetteArray  from './caratToMM/Baguette.js';
import  TaperedBaguetteArray from './caratToMM/TaperedBaguette.js';

// Define a function to convert mm to carat and vice versa
function convert(shape, unit, value) {
    let dataArray;

    // Choose the appropriate array based on the selected shape
    switch (shape) {
        case "Round":
            dataArray = RoundArray;
            break;
        case "Princess":
            dataArray = PrincessArray;
            break;
        case "Cushion":
            dataArray = CushionArray;
            break;
        case "Oval":
            dataArray = OvalArray;
            break;
        case "Radiant":
            dataArray = RadiantArray;
            break;
        case "Emerald":
            dataArray = EmeraldArray;
            break;
        case "Pear":
            dataArray = PearArray;
            break;
        case "Heart":
            dataArray = HeartArray;
            break;
        case "Marquise":
            dataArray = MarquiseArray;
            break;
        case "Triangle":
            dataArray = TriangleArray;
            break;
        case "Trillion":
            dataArray = TrillionArray;
            break;
        case "Baguette":



            dataArray = BaguetteArray;
            break;
        case "TaperedBaguette":
            dataArray = TaperedBaguetteArray;
            break;
        default:
            return "Invalid shape";
    }


    if (unit === "mm") {
        var lenOfValue = value.split(',');
        switch (lenOfValue.length) {
            case 1:
                return mmToCarat(dataArray, parseFloat(lenOfValue[0]));
            case 2:
                return mmToCarat(dataArray, parseFloat(lenOfValue[0]), parseFloat(lenOfValue[1]));
            case 3:
                return mmToCarat(dataArray, parseFloat(lenOfValue[0]), parseFloat(lenOfValue[1]), parseFloat(lenOfValue[2]));
            default:
                console.error("Invalid number of values:", lenOfValue.length);
                return "Invalid number of values";
        }
    }
    
    
// Convert carat to mm
else if (unit === "carat") {
    return caratToMM(value, dataArray, "carat");
} else {
    console.error("Invalid unit:", unit);
    return "Invalid unit";
}
}

function caratToMM(num, dataArray) {
    let arr = parseFloat(num); // Convert string values to numbers

    // Function to calculate the absolute difference between two numbers
    function absoluteDifference(a, b) {
        return Math.abs(a - b);
    }

    // Initialize variables to store closest values
    let minDiff = Infinity;
    let closestCaratValue = null;
    let closestLen = null;
    let closestWid = null;
    let closestDepth = null;

    // Loop through the dataArray to find the closest dimensions for the given carat value
    for (let i = 0; i < dataArray.length; i++) {
        const dimensions = dataArray[i][0];
        const carat = dataArray[i][1];
        let diff = absoluteDifference(carat, arr);

        if (diff < minDiff) {
            minDiff = diff;
            closestCaratValue = carat;
            closestLen = dimensions[0];
            closestWid = dimensions[1];
            closestDepth = dimensions.length === 3 ? dimensions[2] : null;
        }
    }

    // Check if closest dimensions are found
    if (closestLen !== null) {
        let closestDimensions = '' + closestLen;
        if (closestWid !== null) {
            closestDimensions += " X " + closestWid;
            if (closestDepth !== null) {
                closestDimensions += " X " + closestDepth;
            }
        }
        return { carat: closestCaratValue, dimensions: closestDimensions };
    } else {
        return null; // Return null if no closest dimensions are found
    }
}


function mmToCarat(arrayData, Len, Wid, depth) {
    let minDiff = Infinity;
    let closestCaratValue = null;
    let closestLen = null;
    let closestWid = null;
    let closestDepth = null;

    for (let i = 0; i < arrayData.length; i++) {
        const dimensions = arrayData[i][0];
        const carat = arrayData[i][1];
        let diff;

        if (dimensions.length === 1) {
            diff = Math.abs(dimensions[0] - Len);
        } else if (dimensions.length === 2) {
            diff = Math.abs(dimensions[0] - Len) + Math.abs(dimensions[1] - Wid);
        } else if (dimensions.length === 3) {
            diff = Math.abs(dimensions[0] - Len) + Math.abs(dimensions[1] - Wid) + Math.abs(dimensions[2] - depth);
        }

        if (diff < minDiff) {
            minDiff = diff;
            closestCaratValue = carat;
            closestLen = dimensions[0];
            closestWid = dimensions[1];
            if (dimensions.length === 3) {
                closestDepth = dimensions[2];
            } else {
                closestDepth = null;
            }
        }
    }

if (closestLen !== null) {
    let closestDimensions = '' + closestLen;
    if (closestWid !== null && closestWid!=undefined) {
        closestDimensions += " X " + closestWid;
        if (closestDepth !== null && closestWid!=undefined) {
            closestDimensions += " X " + closestDepth;
        }
    }
    return { carat: closestCaratValue, dimensions: closestDimensions };
} else {
    return null;
}

}



// Get form element references
let form = document.getElementById("converterForm");
let resultDiv = document.getElementById("result");

// Add event listener for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get selected values from the form
    let shape = document.getElementById("shape").value;
    let unit = document.getElementById("unit").value;
    let value = document.getElementById("value").value;

    // Call the convert function and display the result
    let result = convert(shape, unit, value);
    
    // Check if the result is an object
    if (typeof result === 'object') {
        resultDiv.innerText = `Closest Carat: ${result.carat}, Closest MM: ${result.dimensions}`;
    } else {
        resultDiv.innerText = result;
    }
});
