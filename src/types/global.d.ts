interface Window {
  documentPictureInPicture: {
    requestWindow: (options: {
      width: number;
      height: number;
      disallowReturnToOpener?: boolean;
      preferInitialWindowPlacement?: boolean;
    }) => Promise<Window>;
  };
}
