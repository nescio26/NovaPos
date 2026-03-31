import { useState, useEffect } from "react";

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [waitingSW, setWaitingSW] = useState(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        if (reg.waiting) {
          setWaitingSW(reg.waiting);
          setNeedsUpdate(true);
        }

        reg.addEventListener("updatefound", () => {
          const newSW = reg.installing;
          if (!newSW) return;
          newSW.addEventListener("statechange", () => {
            if (
              newSW.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingSW(newSW);
              setNeedsUpdate(true);
            }
          });
        });

        setInterval(() => reg.update(), 60 * 60 * 1000);
      })
      .catch((err) => console.error("SW registration failed:", err));
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!installPrompt) return false;
    const { outcome } = await installPrompt.prompt();
    if (outcome === "accepted") {
      setInstallPrompt(null);
      setCanInstall(false);
    }
    return outcome === "accepted";
  };

  const updateNow = () => {
    if (waitingSW) {
      waitingSW.postMessage({ type: "SKIP_WAITING" });
    }
  };

  return { canInstall, install, needsUpdate, updateNow };
}
