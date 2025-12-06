"use client";

import React from "react";
import { Calendar, Layers, Box, X } from "lucide-react";
import { useAppStore } from "@/app/store";

const Integrations: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const integrations = useAppStore((s) => s.integrations);
  const connect = useAppStore((s) => s.connectIntegration);
  const disconnect = useAppStore((s) => s.disconnectIntegration);

  const items = [
    { id: "google-calendar", name: "Google Calendar", icon: <Calendar className="w-5 h-5" /> },
    { id: "figma", name: "Figma", icon: <Layers className="w-5 h-5" /> },
    { id: "framer", name: "Framer", icon: <Box className="w-5 h-5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-slideIn">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
        <h3 className="text-lg font-semibold mb-4 text-white">Connect Trackers & Integrations</h3>
        <p className="text-sm text-gray-400 mb-4">Connect your favorite tools to get smart scheduling, event sync and insights.</p>
        <div className="space-y-3">
          {items.map((it) => {
            const connected = integrations.connected.includes(it.id);
            return (
              <div key={it.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-800 bg-gray-900/50 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-300">{it.icon}</div>
                  <div>
                    <div className="font-medium text-white">{it.name}</div>
                    <div className="text-xs text-gray-500">{connected ? 'Connected' : 'Not connected'}</div>
                  </div>
                </div>
                <div>
                  {connected ? (
                    <button
                      className="btn btn-secondary text-xs"
                      onClick={() => disconnect(it.id)}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary text-xs"
                      onClick={() => connect(it.id)}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
