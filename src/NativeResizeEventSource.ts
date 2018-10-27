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
export class NativeResizeEventSource implements IResizeEventSource {
  constructor(private readonly source: INativeResizeEventSource) {}

  /**
   * Add an event listener
   * @param event The event to subscribe to.
   * @param listener A callback called when the event fires.
   */
  public addEventListener(event: "resize", listener: () => void): void {
    this.source.addEventListener("change", listener);
  }

  /**
   * Remove an event listener
   * @param event The event to unsubscribe from.
   * @param listener  A callback called when the event fires.
   */
  public removeEventListener(event: "resize", listener: () => void): void {
    this.source.removeEventListener("change", listener);
  }
}
