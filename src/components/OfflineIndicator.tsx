import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 dark:bg-amber-700 px-3.5 py-2 text-xs font-bold text-white shadow-xl animate-in fade-in duration-200">
      <WifiOff className="w-4 h-4 animate-pulse" />
      <span>Offline Mode Active — 100% Local Conversion Enabled</span>
    </div>
  );
};
