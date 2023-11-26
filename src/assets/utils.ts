/**
 * @file src/assets/utils.ts
 * @date Functions that I often need.
 * @author Tom Planche
 */

// IMPORTS ===================================================================================================  IMPORTS

// END IMPORTS ==========================================================================================   END IMPORTS

// VARIABLES ================================================================================================ VARIABLES
// Types
// Arguments types
type CSSVariable = string | string[];

type CallbackFunction<V> = (arg: V) => number;
type T_NoArgsCallbackNoReturn = () => void;
// Function types

type calcCSSVar<
  T extends string | string[]
> = (
  variable: T,
  callback: CallbackFunction<
    T extends string ? number : number[]
  >
) => string;

type T_calcWinSize = () => { width: number, height: number };

type T_capitalize = (str: string, lower?: boolean) => string;

type T_determinateOnHoverFromWhere = (
  e: MouseEvent,
  ifFromLeft: T_NoArgsCallbackNoReturn,
  ifFromTop: T_NoArgsCallbackNoReturn,
  ifFromRight: T_NoArgsCallbackNoReturn,
  ifFromBottom: T_NoArgsCallbackNoReturn,
  unknown: T_NoArgsCallbackNoReturn,
) => void;

type T_getMousePos = (e: MouseEvent) => { x: number, y: number };

type T_distanceBetweenPoints = (
  x1: number, y1: number,
  x2: number, y2: number
) => number;

type T_lineEq = (
  y2: number, y1: number,
  x2: number, x1: number,
  currentVal: number
) => number;

type T_lerp = (a: number, b: number, n: number) => number;
type T_random = (min: number, max: number, round: number) => number;
type T_stripCssVar = (cssVar: string) => number;

type T_verifyIsInBounds = (
  mousepos: { x: number, y: number },
  rect: { left: number, top: number, right: number, bottom: number, width: number, height: number },
  boundsExtention: number
) => boolean;

type T_limitNumberInBounds = (
  num: number,
  lowBound?: number,
  highBound?: number
) => number;
// END VARIABLES ======================================================================================= END VARIABLES

// FUNCTIONS ================================================================================================ FUNCTIONS
const parseVariable = (variable: string): [number, string] => {
  const match = variable.match(/(\d+)(\w+)/);
  if (match && match[1] && match[2]) {
    const strippedVar = parseInt(match[1], 10);
    const unit = match[2];
    return [strippedVar, unit];
  }
  throw new Error('Invalid CSS variable format');
};

/**
 * @function calcCSSVar
 * @param variable {string | string[]} The CSS variable(s).
 * @param callback {CallbackFunction<number | number[]>} The callback function.
 *
 * @example
 * calcCSSVar('1rem', (varWithoutUnit) => (varWithoutUnit as number) * 2); // 2rem
 * calcCSSVar(
 *   ['3rem', '4rem'],
 *   (varsWithoutUnit) => {
 *     return (varsWithoutUnit as number[]).reduce((acc, curr) => acc + curr);
 *   }
 * );
 *
 * @returns {string} The CSS variable(s) with the callback applied.
 */
const calcCssVar: calcCSSVar<CSSVariable> = (variable: string | string[], callback: CallbackFunction<number | number[]>): string => {
  if (typeof variable === 'string') {
    const [strippedVar, unit] = parseVariable(variable);
    return `${callback(strippedVar)}${unit}`;
  }

  if (Array.isArray(variable) && variable[0]) {
    const [, unit] = parseVariable(variable[0]);
    const mappedVars = variable.map((varString) => parseVariable(varString)[0]);

    return `${callback(mappedVars)}${unit}`;
  }

  throw new Error('Invalid CSS variable format');
};

/**
 * @function calcWinSize
 * @description Calculates the window size
 *
 * @returns {{width: number, height: number}}
 */
const calcWinSize: T_calcWinSize = (): { width: number; height: number; } => {
  return {width: window.innerWidth, height: window.innerHeight};
};

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
const capitalize: T_capitalize = (str: string, lower = true): string => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
}


/**
 * @function determinateOnHoverFromWhere
 * @description Determines from where the cursor is coming from or leaving to.
 *
 * @param e {MouseEvent} The mouse event.
 * @param ifFromLeft {T_NoArgsCallbackNoReturn} The callback if the cursor is coming from the left.
 * @param ifFromTop {T_NoArgsCallbackNoReturn} The callback if the cursor is coming from the top.
 * @param ifFromRight {T_NoArgsCallbackNoReturn} The callback if the cursor is coming from the right.
 * @param ifFromBottom {T_NoArgsCallbackNoReturn} The callback if the cursor is coming from the bottom.
 * @param unknown {T_NoArgsCallbackNoReturn} The callback if the cursor is coming from an unknown direction.
 *
 * @returns {void}
 */
const determinateOnHoverFromWhere: T_determinateOnHoverFromWhere = (
  e: MouseEvent,
  ifFromLeft: T_NoArgsCallbackNoReturn,
  ifFromTop: T_NoArgsCallbackNoReturn,
  ifFromRight: T_NoArgsCallbackNoReturn,
  ifFromBottom: T_NoArgsCallbackNoReturn,
  unknown: T_NoArgsCallbackNoReturn,
): void => {
  const target = e.target as HTMLElement;

  // Find from where the cursor is coming from
  const {x, y} = target.getBoundingClientRect();
  const {clientX, clientY} = e;

  const fromLeft = clientX - x;
  const fromTop = clientY - y;
  const fromRight = target.offsetWidth - fromLeft;
  const fromBottom = target.offsetHeight - fromTop;

  const min = Math.min(fromLeft, fromTop, fromRight, fromBottom);

  switch (min) {
    case fromLeft:
      ifFromLeft();
      break
    case fromTop:
      ifFromTop();
      break
    case fromRight:
      ifFromRight();
      break
    case fromBottom:
      ifFromBottom();
      break
    default:
      unknown();
  }
}

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
const distanceBetweenPoints: T_distanceBetweenPoints = (
  x1: number, y1: number,
  x2: number, y2: number
): number => {
  const a = x1 - x2;
  const b = y1 - y2;

  return +Math.floor(Math.hypot(a, b)).toFixed(2);
};

/**
 * @function getMousePos
 * @description Get the mouse position.
 *
 * @param e - The mouse event.
 *
 * @returns {{x: number, y: number}}
 */
const getMousePos: T_getMousePos = (e): { x: number; y: number; } => {

  if (e.pageX || e.pageY) {
    return {x: e.pageX, y: e.pageY};
  } else if (e.clientX || e.clientY) {
    return {
      x: e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
      y: e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
  }

  return {x: -1, y: -1}
};


/**
 * @function limitNumberInBounds
 * @description Limit a number between two bounds.
 * @example
 * limitNumberInBounds(5, 0, 10); // 5
 * limitNumberInBounds(5, 10, 20); // 10
 * limitNumberInBounds(5, 0, 4); // 4
 *
 * @param num {number} The number to limit.
 * @param lowBound {number} The lower bound.
 * @param highBound {number} The higher bound.
 */
const limitNumberInBounds: T_limitNumberInBounds = (
  num: number,
  lowBound: number | undefined,
  highBound: number | undefined
) => {
  const
    lowB = lowBound === undefined ? 0 : lowBound,
    highB = highBound === undefined ? 1 : highBound;

  return Math.max(Math.min(num, highB), lowB);
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
const lineEq: T_lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number): number => {
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
const lineEq0to100: T_lineEq = (y2: number, y1: number, x2: number, x1: number, currentVal: number): number => {
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
const lerp: T_lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;


/**
 * @function random
 * @description Returns a random number. If only one argument is passed, it will return a random number between 0 and the passed argument.
 * If two arguments are passed, it will return a random number between the first and the second argument.
 * If three arguments are passed, it will return a random number between the first and the second argument, rounded to the third argument.
 * @param min {number} The minimum value.
 * @param max {number} The maximum value.
 * @param round {number} The number of decimals.
 */
const random: T_random = (min: number, max: number, round: number) => {
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
 * @function stripCssVar
 * @description Strip the css variable to get the number.
 * @example
 * stripCssVar('5rem'); // 5
 * stripCssVar('5'); // 5
 * stripCssVar('5px'); // 5
 * stripCssVar('5.5rem'); // 5.5
 *
 * @param cssVar {string} The css variable.
 *
 * @returns {number} The number.
 */
const stripCssVar: T_stripCssVar = (cssVar: string): number => {
  const regex = new RegExp(/(\d+)/);
  const match = regex.exec(cssVar);

  return match ? +match[0] : 0;
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
const verifyIsInBounds: T_verifyIsInBounds = (
  mousepos,
  rect,
  boundsExtention = 1
): boolean => {
  return mousepos.x >= rect.right - (rect.width * boundsExtention) &&
    mousepos.x <= rect.left + (rect.width * boundsExtention) &&
    mousepos.y >= rect.bottom - (rect.height * boundsExtention) &&
    mousepos.y <= rect.top + (rect.height * boundsExtention);
}
// END FUNCTIONS ================================================ END FUNCTIONS

export {
  calcCssVar,
  calcWinSize,
  capitalize,
  determinateOnHoverFromWhere,
  distanceBetweenPoints,
  getMousePos,
  limitNumberInBounds,
  lineEq,
  lineEq0to100,
  lerp,
  random,
  stripCssVar,
  verifyIsInBounds
}

/**
 * End of file src/assets/utils.js
 */
