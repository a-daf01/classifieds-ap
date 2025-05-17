// frontend/hooks/useDeleteListing.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation<
    { id: number },    // returned data
    Error,             // error type
    number             // variable type (id)
  >({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:3001/listings/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      return { id };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}
