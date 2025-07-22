import React, { useState } from 'react';
import { IncidentWithCamera } from '../types';
import ThreatIcons from './icons/ThreatIcons';

type IncidentListProps = {
  incidents: IncidentWithCamera[];
  onIncidentResolve: (id: number) => Promise<void>;
  onIncidentSelect: (incident: IncidentWithCamera) => void;
};

const IncidentList = ({ incidents, onIncidentResolve, onIncidentSelect }: IncidentListProps) => {
  const [resolvingId, setResolvingId] = useState<number | null>(null);

  const handleResolve = async (id: number) => {
    setResolvingId(id);
    await onIncidentResolve(id);
    setResolvingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
      <div className="space-y-3 overflow-scroll h-[700px]">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className={`p-3 border rounded-md hover:bg-gray-50 transition-colors ${
              resolvingId === incident.id ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <ThreatIcons type={incident.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium text-gray-900 truncate cursor-pointer"
                  onClick={() => onIncidentSelect(incident)}
                >
                  {incident.type}
                </p>
                <p className="text-sm text-gray-500">{incident.camera.location}</p>
                <p className="text-xs text-gray-400">
                  {new Date(incident.tsStart).toLocaleTimeString()} -{' '}
                  {new Date(incident.tsEnd).toLocaleTimeString()}
                </p>
              </div>
              <div>
                {!incident.resolved && (
                  <button
                    onClick={() => handleResolve(incident.id)}
                    disabled={resolvingId === incident.id}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentList;