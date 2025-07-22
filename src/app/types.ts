// types.ts
export type Camera = {
  id: number;
  name: string;
  location: string;
};

export type Incident = {
  id: number;
  cameraId: number;
  type: string;
  tsStart: Date;
  tsEnd: Date;
  thumbnailUrl: string;
  resolved: boolean;
  camera?: Camera; // Optional relation
};

export type IncidentWithCamera = Incident & {
  camera: Camera;
};