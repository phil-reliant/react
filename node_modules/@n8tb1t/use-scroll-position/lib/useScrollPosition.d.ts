import { DependencyList, MutableRefObject } from 'react';
interface IPosition {
    x: number;
    y: number;
}
interface IScrollProps {
    prevPos: IPosition;
    currPos: IPosition;
}
export declare const useScrollPosition: {
    (effect: (props: IScrollProps) => void, deps?: DependencyList | undefined, element?: MutableRefObject<HTMLElement> | undefined, useWindow?: boolean | undefined, wait?: number | undefined, boundingElement?: MutableRefObject<HTMLElement> | undefined): void;
    defaultProps: {
        deps: never[];
        element: boolean;
        useWindow: boolean;
        wait: null;
        boundingElement: boolean;
    };
};
export {};
