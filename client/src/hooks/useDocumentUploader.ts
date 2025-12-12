'use client';

import {useState, useCallback} from 'react';
import type {DocumentKind, UploadedDoc} from '../utils/types/documents';
import {uploadDocument} from '../services/patientServices';

type Status = 'idle' | 'uploading' | 'success' | 'error';

export const useDocumentUploader = (kind: DocumentKind) => {
  const [status, setStatus] = useState<Status>('idle');
  const [docs, setDocs] = useState<UploadedDoc[]>([]);
  const [page, setPage] = useState(1);

  const add = useCallback(
    async (asset: {uri: string; name: string; type: string}) => {
      const tempId = Date.now().toString();

      const temp: UploadedDoc = {
        id: tempId,
        name: asset.name,
        url: '',
        kind,
        progress: 0,
      };

      setDocs(prev => [temp, ...prev]);
      setStatus('uploading');

      try {
        const response = await uploadDocument(asset, kind, (event: any) => {
          if (event.total) {
            const prog = event.loaded / event.total;
            setDocs(prev =>
              prev.map(d => (d.id === tempId ? {...d, progress: prog} : d)),
            );
          }
        });

        const payload = response.data?.data;

        setDocs(prev =>
          prev.map(d =>
            d.id === tempId
              ? {
                  ...d,
                  id: payload?._id ?? tempId,
                  url: payload?.documentUrl ?? '',
                  progress: 1,
                }
              : d,
          ),
        );

        setStatus('success');
      } catch (err) {
        console.error('Upload error:', err);
        setStatus('error');
        setDocs(prev => prev.filter(d => d.id !== tempId));
      }
    },
    [kind],
  );

  const remove = useCallback((id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  }, []);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return {docs, add, remove, status, page, loadMore};
};
