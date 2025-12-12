export type DocumentKind = 'REPORT' | 'PRESCRIPTION';

export interface UploadedDoc {
  id: string;
  name: string;
  url: string;
  kind: DocumentKind;
  progress?: number;
}
