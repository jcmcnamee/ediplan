import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditAsset } from "../../services/assetsApi";
import toast from "react-hot-toast";

export function useCreateAsset(category) {
  const queryClient = useQueryClient();

const { mutate: createAsset, isLoading: isCreating } = useMutation({
  mutationFn: createEditAsset,
  onSuccess: () => {
    toast.success('New asset successfully created.');
    queryClient.invalidateQueries({ queryKey: [category] });
  },
  onError: err => {
    toast.error(err.message);
  },
});

return {isCreating, createAsset};
}