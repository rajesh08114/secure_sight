import React from 'react';
import { IncidentWithCamera } from '../types';
import Image from 'next/image';


type IncidentPlayerProps = {
  incident: IncidentWithCamera;
  relatedIncidents: IncidentWithCamera[];
};

const IncidentPlayer = ({ incident, relatedIncidents }: IncidentPlayerProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">
          {incident.camera.location} - {incident.type}
        </h2>
        <div className="relative pt-[56.25%] bg-black rounded-md overflow-hidden">
          <img
            src={incident.thumbnailUrl} // Placeholder, replace with actual video URL
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt={`Incident video for ${incident.type}`}
          />
        </div>
      </div>
      
      <div className="flex space-x-2">
        {relatedIncidents.slice(0, 2).map((inc) => (
        
          <div key={inc.id} className="w-1/2  p-2 bg-gray-100 rounded-md shadow-sm">
            
              <h3 className="text-lg font-medium">{inc.type}</h3>
            <Image

              width={200}
              height={100}
              src={inc.thumbnailUrl} // Placeholder, replace with actual thumbnail URL
              alt={`Thumbnail for ${inc.type}`}
              className="w-full h-24 object-cover rounded-md"
            />
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentPlayer;