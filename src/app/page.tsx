'use client';

import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';
import { IncidentWithCamera } from './types';

export default function Home() {
  const [incidents, setIncidents] = useState<IncidentWithCamera[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithCamera | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch('/api/incidents?resolved=false');
        const data:any = await response.json();
        setIncidents(data);
        if (data.length > 0 && !selectedIncident) {
          setSelectedIncident(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching incidents:', error);
        setLoading(false);
      }
    };

    fetchIncidents();
  }, [selectedIncident]);

  const handleIncidentResolve = async (id: number) => {
    try {
      
      const response = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
      });
      await response.json();

      setIncidents(incidents.filter((inc) => inc.id !== id));
      setSelectedIncident((current) => 
        current?.id === id ? null : current
      );
    } catch (error) {
      console.error('Error resolving incident:', error);
    }
  };

  const handleIncidentSelect = (incident: IncidentWithCamera) => {
    setSelectedIncident(incident);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <IncidentPlayer
              incident={selectedIncident}
              relatedIncidents={incidents.filter(inc => inc.id !== selectedIncident.id)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <p>No incident selected</p>
            </div>
          )}
        </div>
        <div className="lg:col-span-1">
          <IncidentList
            incidents={incidents}
            onIncidentResolve={handleIncidentResolve}
            onIncidentSelect={handleIncidentSelect}
          />
        </div>
      </div>
    </Layout>
  );
}