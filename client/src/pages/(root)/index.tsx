import { useEffect } from "react";

import { useModalStore } from "@/hooks/use-modal-store";

export const HomeScreen = () => {
  const onOpen = useModalStore((state) => state.onOpen);
  const isOpen = useModalStore((state) => state.isOpen);
  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);
  return null;
};
