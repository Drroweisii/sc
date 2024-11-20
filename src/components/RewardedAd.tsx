import React, { useEffect, useState } from 'react';

// Extend the Window interface to include show_8540285 property
declare global {
  interface Window {
    show_8540285?: () => Promise<void>;
  }
}

interface RewardedAdProps {
  onRewarded: () => void;
  onClose: () => void;
}

export function RewardedAd({ onRewarded, onClose }: RewardedAdProps) {
  const [adError, setAdError] = useState<string | null>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [isAdShown, setIsAdShown] = useState(false);

  useEffect(() => {
    // Load the ad script only if it has not been loaded yet
    const loadAdScript = () => {
      if (window.show_8540285) {
        setIsAdLoaded(true); // Script is already loaded
        return;
      }

      const tag = document.createElement('script');
      tag.src = '//jagnaimsee.net/vignette.min.js';
      tag.dataset.zone = '8540285';
      tag.dataset.sdk = 'show_8540285';

      tag.onload = () => {
        setIsAdLoaded(true);
      };

      document.body.appendChild(tag);
    };

    if (!isAdLoaded) {
      loadAdScript();
    }

    // Cleanup the script when the component unmounts or reloads
    return () => {
      const scriptTag = document.querySelector('script[src="//jagnaimsee.net/vignette.min.js"]');
      scriptTag?.remove();
    };
  }, [isAdLoaded]);

  const showAd = () => {
    if (!isAdLoaded) {
      setAdError('Ad script not loaded yet');
      return;
    }

    // Show the ad and set the state after it completes
    window.show_8540285!() // Use the non-null assertion operator to tell TypeScript that show_8540285 will exist.
      .then(() => {
        setIsAdShown(true);
        onRewarded();
      })
      .catch((error: Error) => {  // Explicitly define the error type
        console.error('Error showing ad:', error);
        setAdError('Error showing the ad');
      });
  };

  const resetAd = () => {
    // Reset the ad state to show it again
    setIsAdLoaded(false); // Unload the ad script
    setIsAdShown(false);  // Reset ad showing state
    setAdError(null);     // Reset any errors
  };

  useEffect(() => {
    if (isAdShown) {
      // If the ad has been shown, you can reset and reload it after a while
      setTimeout(() => {
        resetAd();
      }, 1000); // Give some time before allowing the ad to be loaded again
    }
  }, [isAdShown]);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-[640px]">
        {adError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
            <p>{adError}</p>
          </div>
        )}

        <div className="absolute top-0 right-0 text-white px-4 py-2">
          <button onClick={onClose}>Close</button>
        </div>

        {/* Show button to watch ad again if it's shown */}
        {!isAdShown && (
          <div className="absolute bottom-0 left-0 w-full text-center">
            <button
              onClick={showAd}
              className="bg-white text-black px-4 py-2 rounded"
              disabled={!isAdLoaded}
            >
              Watch Ad
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
