/**
 * A wrapper used to enable breakpoints for React Native.
 * @example
 * const BreakpointContext = createBreakpointContext(new NativeResizeEventSource(Dimensions), ...);
 */
export class NativeResizeEventSource {
    constructor(source) {
        this.source = source;
    }
    /**
     * Add an event listener
     * @param event The event to subscribe to.
     * @param listener A callback called when the event fires.
     */
    addEventListener(event, listener) {
        this.source.addEventListener("change", listener);
    }
    /**
     * Remove an event listener
     * @param event The event to unsubscribe from.
     * @param listener  A callback called when the event fires.
     */
    removeEventListener(event, listener) {
        this.source.removeEventListener("change", listener);
    }
}
//# sourceMappingURL=NativeResizeEventSource.js.map