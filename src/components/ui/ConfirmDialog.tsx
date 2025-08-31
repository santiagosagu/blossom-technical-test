import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  characterName: string;
  onConfirm: () => void;
}

export function ConfirmDeleteDialog({
  trigger,
  open,
  onOpenChange,
  characterName,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {trigger}
          </div>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md bg-background border shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle>Delete Character</DialogTitle>
          <DialogDescription>
            Are you sure you want to soft delete <b>{characterName}</b>? <br />
            It will be saved in localStorage and can be restored later.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onConfirm();
              onOpenChange?.(false);
            }}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
