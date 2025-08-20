import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getOS } from "@/utils/common";
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
  onEnter,
  onClose,
}: DocumentPIPProps) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  // Effects
  useEffect(() => {
    return () => {
      togglePictureInPicture(false);
    };
  }, []);

  useEffect(() => {
    togglePictureInPicture(isPipOpen);
  }, [isPipOpen]);

  useEffect(() => {
    pipWindow?.addEventListener("pagehide", onClosePIPWindow);
    pipWindow?.addEventListener("keydown", handleKeyDown);

    return () => {
      pipWindow?.removeEventListener("pagehide", onClosePIPWindow);
      pipWindow?.removeEventListener("keydown", handleKeyDown);
    };
  }, [pipWindow]);

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
    window.documentPictureInPicture.addEventListener(
      "enter",
      onEnterPIPWindow as EventListener,
      { once: true }
    );

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

    setPipWindow(pip);
  };

  const closePIPWindow = () => {
    pipWindow?.close();
    setPipWindow(null);
  };

  const onClosePIPWindow = () => {
    setPipWindow(null);
    onClose();
  };

  const onEnterPIPWindow = (e: DocumentPictureInPictureEvent) => {
    onEnter?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key, metaKey, ctrlKey } = e;

    const isMac = getOS() === "macOS";
    const lowerCaseKey = key.toLowerCase();

    if (
      (isMac && metaKey && lowerCaseKey === "w") ||
      (!isMac && ctrlKey && lowerCaseKey === "w")
    ) {
      closePIPWindow();
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
