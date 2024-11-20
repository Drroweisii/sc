import React from 'react';
import { FaShare, FaLink } from 'react-icons/fa';

interface ShareButtonsProps {
  referralLink: string;
}

export function ShareButtons({ referralLink }: ShareButtonsProps) {
  const handleShare = () => {
    if (window.Telegram?.WebApp) {
      // Use the correct format for the share message
      const message = `Join my mining team! 🎮\n${referralLink}`;
      
      // Share directly to Telegram chat
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`
      );
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.showPopup({
        title: 'Success',
        message: 'Referral link copied to clipboard!',
        buttons: [{ type: 'ok' }]
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleShare}
        className="btn-primary py-3 flex items-center justify-center gap-2 w-full"
      >
        <FaShare size={16} />
        Share via Telegram
      </button>

      <button
        onClick={handleCopyLink}
        className="glass-card py-3 flex items-center justify-center gap-2 w-full hover:bg-white/5 transition-colors"
      >
        <FaLink size={16} />
        Copy Referral Link
      </button>
    </div>
  );
}