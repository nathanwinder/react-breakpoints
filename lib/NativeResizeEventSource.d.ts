import { IResizeEventSource } from "./types";
/**
 * Interface for the native Dimensions resize event source.
 * Not intended for use by anything other than the NativeResizeEventSource.
 */
interface INativeResizeEventSource {
    addEventListener: (event: "change", listener: () => void) => void;
    removeEventListener: (event: "change", listener: () => void) => void;
}
/**
 * A wrapper used to enable breakpoints for React Native.
 * @example
 * const BreakpointContext = createBreakpointContext(new NativeResizeEventSource(Dimensions), ...);
 */
export declare class NativeResizeEventSource implements IResizeEventSource {
    private readonly source;
    constructor(source: INativeResizeEventSource);
    /**
     * Add an event listener
     * @param event The event to subscribe to.
     * @param listener A callback called when the event fires.
     */
    addEventListener(event: "resize", listener: () => void): void;
    /**
     * Remove an event listener
     * @param event The event to unsubscribe from.
     * @param listener  A callback called when the event fires.
     */
    removeEventListener(event: "resize", listener: () => void): void;
}
export {};
