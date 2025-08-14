interface Window {
  documentPictureInPicture: {
    requestWindow: (options: {
      width: number;
      height: number;
      disallowReturnToOpener?: boolean;
      preferInitialWindowPlacement?: boolean;
    }) => Promise<Window>;
    addEventListener: (
      type: string,
      listener: EventListener,
      options?: boolean | AddEventListenerOptions
    ) => void;
  };
}

interface DocumentPictureInPictureEvent extends Event {
  window: Window;
}
