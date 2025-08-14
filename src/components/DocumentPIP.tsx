import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import copyStyles from "@/utils/copyStyles";

import type { DocumentPIPProps } from "@/types/pip";

const isPIPSupported =
  typeof window !== "undefined" && "documentPictureInPicture" in window;

export default function DocumentPIP({
  children,
  isPipOpen,
  size,
  mode = "transfer",
  copyAllStyles = true,
  disallowReturnToOpener = false,
  preferInitialWindowPlacement = false,
  onClose,
}: DocumentPIPProps) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  // Effects
  useEffect(() => {
    togglePictureInPicture(isPipOpen);

    return () => {
      togglePictureInPicture(false);
    };
  }, [isPipOpen]);

  // Methods
  const togglePictureInPicture = (open: boolean) => {
    if (!isPIPSupported) {
      console.warn(
        "Document Picture-in-Picture API is not supported in this browser"
      );
      return;
    }

    if (open) {
      openPIPWindow();
    } else {
      closePIPWindow();
    }
  };

  const openPIPWindow = async () => {
    const pip = await window.documentPictureInPicture.requestWindow({
      width: size?.width || 0,
      height: size?.height || 0,
      disallowReturnToOpener,
      preferInitialWindowPlacement,
    });

    if (copyAllStyles) {
      copyStyles(pip);
    }

    const root = pip.document.createElement("div");
    root.id = "pip-root";
    pip.document.body.appendChild(root);

    pip.addEventListener("pagehide", onClosePIPWindow, { once: true });

    setPipWindow(pip);
  };

  const closePIPWindow = () => {
    if (!pipWindow) {
      return;
    }

    pipWindow.close();
    setPipWindow(null);
  };

  const onClosePIPWindow = () => {
    closePIPWindow();

    if (isPipOpen) {
      onClose();
    }
  };

  const pipContent = () => {
    const pipRoot = pipWindow?.document.getElementById("pip-root");
    if (!pipRoot || !isPipOpen) {
      return mode === "transfer-only" ? null : children;
    }

    return (
      <>
        {mode === "clone" ? children : null}
        {createPortal(children, pipRoot)}
      </>
    );
  };

  return pipContent();
}
