'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface SettingsProps {
  onClose: () => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  geminiApiKey: string;
  onApiKeyChange: (key: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  onClose,
  isDark,
  onThemeChange,
  geminiApiKey,
  onApiKeyChange,
}) => {
  const [localApiKey, setLocalApiKey] = useState(geminiApiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onApiKeyChange(localApiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleThemeToggle = () => {
    onThemeChange(!isDark);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-xl shadow-2xl p-6 bg-gray-900 text-white border border-gray-800">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            ⚙️ Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-200">
              🌓 Theme
            </label>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700">
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Currently using <strong>{isDark ? 'Dark' : 'Dark'}</strong> theme
                </p>
              </div>
              <button
                onClick={handleThemeToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors opacity-50 cursor-not-allowed"
                disabled
                title="Dark mode is enforced"
              >
                🌙 Dark
              </button>
            </div>
          </div>

          {/* Gemini API Key */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-200">
              🔑 Gemini API Key
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Get your API key from <a
                href="https://makersuite.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                Google AI Studio
              </a>
            </p>
            <input
              type="password"
              value={localApiKey}
              onChange={(e) => setLocalApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full px-4 py-2 rounded-lg border transition-colors bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            {localApiKey && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                ✓ API key configured
              </p>
            )}
            {!localApiKey && (
              <p className="text-xs text-yellow-500 flex items-center gap-1">
                ⚠ AI chat will use mock responses without API key
              </p>
            )}
          </div>

          {/* Info Section */}
          <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
            <p className="text-xs text-blue-200">
              <strong>💡 Note:</strong> Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>

          {/* Save Button */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                transition-colors flex items-center justify-center gap-2 font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg transition-colors font-semibold bg-gray-800 text-gray-200 hover:bg-gray-700"
            >
              Close
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="p-3 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
              ✓ Settings saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
