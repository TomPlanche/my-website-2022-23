/**
 * @file src/assets/utils.ts
 * @date Functions that I often need.
 * @author Tom Planche
 */
import {T_RecentTracksTrackAll} from "./LastFM_Handler/LasfFM_handler";

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
type TCalcCssVarCallback = (variableWithoutUnit: number) => number;


// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
/**
 * @function calcCssVar
 * @description Allows to make calculations with css variables.
 * @example
 * const padding = '5rem';
 * const paddingCalc = calcCssVar(padding, (variableWithoutUnit) => variableWithoutUnit * 2);
 * console.log(paddingCalc); // 10rem
 *
 * @param variable
 * @param func
 */
const calcCssVar = (variable: string, func: TCalcCssVarCallback): string => {
	// if the variable starts with a point, add a zero before it.
	variable = variable.startsWith('.') ? `0${variable}` : variable;

	// get the variable without the unit, e.g. '5rem' => '5'.
	// I don't want to list all the units, so I use a regex.
	const variableWithoutUnit = variable.replace(/[^0-9.]/g, '');
	// get the unit, e.g. '5rem' => 'rem'.
	const unit = variable.replace(variableWithoutUnit, '');

	return `${func(+variableWithoutUnit)}${unit}`;
}

/**
 * @function calcWinSize
 * @description Calculates the window size
 *
 * @returns {{width: number, height: number}}
 */
const calcWinSize = () => {
    return {width: window.innerWidth, height: window.innerHeight};
};

/**
 * @function getMousePos
 * @description Get the mouse position.
 *
 * @param e - The mouse event.
 *
 * @returns {{x: number, y: number}}
 */
const getMousePos = (e: any) => {
	let mouseX, mouseY;

	if (e.pageX || e.pageY) 	{
			mouseX = e.pageX;
			mouseY = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : mouseX, y : mouseY }
};

/**
 * @function distanceBetweenPoints
 * @description Returns the distance between two points.
 *
 * @param x1 {number} The x coordinate of the first point.
 * @param y1 {number} The y coordinate of the first point.
 * @param x2 {number} The x coordinate of the second point.
 * @param y2 {number} The y coordinate of the second point.
 *
 * @returns {number} The distance between the two points rounded to 2 decimals.
 */
const distanceBetweenPoints = (
	x1: number, y1: number,
	x2: number, y2: number
): number => {
	const a = x1 - x2;
	const b = y1 - y2;

	return +Math.floor(Math.hypot(a, b)).toFixed(2);
};

const compareTracks = (track1: T_RecentTracksTrackAll, track2: T_RecentTracksTrackAll | null) => {
	if (!track2) {
		console.log("track2 is null");
		return false;
	}

	if (track1.mbid !== "" && track2.mbid !== "") {
		return track1.mbid === track2.mbid;
	}

	return track1.name === track2.name && track1.artist["#text"] === track2.artist["#text"];
}
/**
 * @function lineEq
 * @description Returns the equation of a line (y = ax + b).
 *
 * @param y2 {number} The y coordinate of the second point.
 * @param y1 {number} The y coordinate of the first point.
 * @param x2 {number} The x coordinate of the second point.
 * @param x1 {number} The x coordinate of the first point.
 * @param currentVal {number} The current value.
 *
 * @returns {number} The value of the line equation.
 */
const lineEq = (
	y2: number,
	y1: number,
	x2: number,
	x1: number,
	currentVal: number
): number => {
	const
		a = (y2 - y1) / (x2 - x1),
		b = y1 - a * x1;
	return a * currentVal + b;
};

/**
 * @function lineEq0to100
 * @description Returns the equation of a line (y = ax + b) between 0 and 100 for percentage.
 *
 * @param y2 {number} The y coordinate of the second point.
 * @param y1 {number} The y coordinate of the first point.
 * @param x2 {number} The x coordinate of the second point.
 * @param x1 {number} The x coordinate of the first point.
 * @param currentVal {number} The current value.
 *
 * @returns {number} The value of the line equation between 0 and 100.
 */
const lineEq0to100 = (
	y2: number,
	y1: number,
	x2: number,
	x1: number,
	currentVal: number
): number => {
	return lineEq(y2, y1, x2, x1, currentVal) < 0 ? 0 : lineEq(y2, y1, x2, x1, currentVal) > 100 ? 100 : lineEq(y2, y1, x2, x1, currentVal);
};

/**
 * @function lerp
 * @description Returns the linear interpolation of two values.
 *
 * @param a {number} The first value.
 * @param b {number} The second value.
 * @param n {number} The interpolation value.
 *
 * @returns {number} The linear interpolation.
 */
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;


/**
 * @function random
 * @description Returns a random number. If only one argument is passed, it will return a random number between 0 and the passed argument.
 * If two arguments are passed, it will return a random number between the first and the second argument.
 * If three arguments are passed, it will return a random number between the first and the second argument, rounded to the third argument.
 * @param min {number} The minimum value.
 * @param max {number} The maximum value.
 * @param round {number} The number of decimals.
 */
const random = (
  min: number,
  max: number,
  round: number = 1
): number => {
    if (max === undefined) {
        max = min;
        min = 0;
    }

    if (round === undefined) {
        round = 0;
    }

    const rnd = Math.random() * (max - min) + min;

    if (round === 0) {
        return rnd;
    }

    return +rnd.toFixed(round);
}

/**
 * @function verifyIsInBounds
 * @description Verify if the mouse is in the bounds.
 *
 * @param mousepos - {x: number, y: number} - The mouse position.
 * @param rect - {left: number, top: number, width: number, height: number} - The bounds.
 * @param boundsExtention - {number} - The bounds extention.
 *
 * @returns {boolean} - True if the mouse is in the bounds.
 */
const verifyIsInBounds = (
    mousepos: {x: number, y: number},
    rect: {left: number, top: number, right: number, bottom: number, width: number, height: number},
    boundsExtention: number = 1
): boolean => {
    return mousepos.x >= rect.right - (rect.width * boundsExtention) &&
        mousepos.x <= rect.left + (rect.width * boundsExtention)     &&
        mousepos.y >= rect.bottom - (rect.height * boundsExtention)  &&
        mousepos.y <= rect.top + (rect.height * boundsExtention);
}
// END FUNCTIONS ================================================ END FUNCTIONS

export {
	calcCssVar,
	calcWinSize,
	compareTracks,
	distanceBetweenPoints,
	getMousePos,
	lineEq,
	lineEq0to100,
	lerp,
  random,
	verifyIsInBounds
}

/**
 * End of file src/assets/utils.js
 */
