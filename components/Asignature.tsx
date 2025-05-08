export type AsignatureType = {
  id: number;
  name: string;
  teacher_name: string;
  color: string;
};

export interface AsignatureProps {
  id: number;
  name: string;
  teacher_name: string;
  color: string;
  reloadAsignatures?: () => void;
}
