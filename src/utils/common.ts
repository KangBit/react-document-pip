type OS = "macOS" | "Windows" | "";

export const getOS = (): OS => {
  if (navigator.userAgentData) {
    return getOSFromUserAgentData();
  } else {
    // fallback
    return getOSFromUserAgent();
  }
};

const getOSFromUserAgentData = () => {
  const platform = navigator.userAgentData.platform;
  if (platform === "macOS" || platform === "Windows") {
    return platform;
  } else {
    return "";
  }
};

const getOSFromUserAgent = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("mac")) {
    return "macOS";
  } else if (userAgent.includes("win")) {
    return "Windows";
  } else {
    return "";
  }
};
