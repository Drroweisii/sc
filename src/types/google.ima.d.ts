declare namespace google {
  namespace ima {
    class AdDisplayContainer {
      constructor(container: HTMLElement);
      initialize(): void;
      destroy(): void;
    }

    class AdsLoader {
      constructor(container: AdDisplayContainer);
      requestAds(request: AdsRequest): void;
      addEventListener(type: string, callback: (event: any) => void): void;
      contentComplete(): void;
      destroy(): void;
    }

    class AdsRequest {
      adTagUrl: string;
      linearAdSlotWidth: number;
      linearAdSlotHeight: number;
    }

    class AdsRenderingSettings {
      restoreCustomPlaybackStateOnAdBreakComplete?: boolean;
      uiElements?: string[];
    }

    class AdsManager {
      init(width: number, height: number, viewMode: ViewMode): void;
      start(): void;
      destroy(): void;
      addEventListener(type: string, callback: (event: AdEvent | AdErrorEvent) => void): void;
      removeEventListener(type: string, callback: (event: AdEvent | AdErrorEvent) => void): void;
      resume(): void;
      pause(): void;
    }

    enum ViewMode {
      NORMAL = 'NORMAL',
      FULLSCREEN = 'FULLSCREEN'
    }

    class AdEvent {
      type: string;
      getAd(): Ad;
      static Type: {
        CONTENT_PAUSE_REQUESTED: string;
        CONTENT_RESUME_REQUESTED: string;
        AD_BREAK_READY: string;
        ALL_ADS_COMPLETED: string;
        CLICK: string;
        COMPLETE: string;
        FIRST_QUARTILE: string;
        LOADED: string;
        MIDPOINT: string;
        PAUSED: string;
        RESUMED: string;
        STARTED: string;
        THIRD_QUARTILE: string;
        USER_CLOSE: string;
        LINEAR_CHANGED: string;
        LOG: string;
        AD_BUFFERING: string;
        AD_PROGRESS: string;
        AD_BREAK_STARTED: string;
        AD_BREAK_ENDED: string;
        IMPRESSION: string;
        DURATION_CHANGE: string;
        VOLUME_CHANGED: string;
        VOLUME_MUTED: string;
        SKIPPED: string;
        VIDEO_CLICKED: string;
        VIDEO_ICON_CLICKED: string;
        SKIPPABLE_STATE_CHANGED: string;
        INTERACTION: string;
      };
    }

    class AdErrorEvent {
      static Type: {
        AD_ERROR: string;
      };
      getError(): AdError;
    }

    interface Ad {
      getAdId(): string;
      getAdSystem(): string;
      getContentType(): string;
      getTitle(): string;
      getDuration(): number;
      isLinear(): boolean;
    }

    interface AdError {
      getErrorCode(): number;
      getMessage(): string;
      getType(): string;
      getVastErrorCode(): number;
    }

    class AdsManagerLoadedEvent {
      static Type: {
        ADS_MANAGER_LOADED: string;
      };
      getAdsManager(
        videoContent: any,
        adsRenderingSettings: AdsRenderingSettings
      ): AdsManager;
    }
  }
}