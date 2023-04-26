/**
 * @file src/assets/utils.ts
 * @date Functions that I often need.
 * @author Tom Planche
 */
import {distanceBetweenPoints, getMousePos} from "./utils";

// VARIABLES ================================================================================================ VARIABLES
interface IOptions {
  domElement: HTMLElement | HTMLDivElement | null;
  onProgress?: (distance: number) => void;
}

export default class ProxySensor {
  private domElement: HTMLElement | HTMLDivElement | null;
  private readonly onProgress?: (distance: number) => void;

  private mousemoveFn: ((ev: MouseEvent) => void) = () => {
    console.log('mousemoveFn not initialized');
  };

  constructor(options: IOptions) {
    this.domElement = options.domElement;
    this.onProgress = options.onProgress;
    this.init();
  }

  private init() {
    this.mousemoveFn = (ev) => requestAnimationFrame(() => {
        const mousepos = getMousePos(ev);
        const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
        const elRect = this.domElement?.getBoundingClientRect();

        if ( !elRect ) {
            throw new Error('No element found');
        }

        const elCoords = {
            x1: elRect.left + docScrolls.left, x2: elRect.width + elRect.left + docScrolls.left,
            y1: elRect.top + docScrolls.top, y2: elRect.height + elRect.top + docScrolls.top
        };
        const closestPoint = {x: mousepos.x, y: mousepos.y};

        if ( mousepos.x < elCoords.x1 ) {
            closestPoint.x = elCoords.x1;
        } else if ( mousepos.x > elCoords.x2 ) {
            closestPoint.x = elCoords.x2;
        }

        if ( mousepos.y < elCoords.y1 ) {
            closestPoint.y = elCoords.y1;
        }
        else if ( mousepos.y > elCoords.y2 ) {
            closestPoint.y = elCoords.y2;
        }

        if ( this.onProgress ) {
            this.onProgress(distanceBetweenPoints(mousepos.x, mousepos.y, closestPoint.x, closestPoint.y))
        }
    });

    window.addEventListener('mousemove', this.mousemoveFn);
  }

  public destroy() {
    window.removeEventListener('mousemove', this.mousemoveFn);
  }
}
