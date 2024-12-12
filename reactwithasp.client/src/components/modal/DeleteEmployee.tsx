import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import axios from "@/lib/axios";

interface Props {
    employeeId: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function DeleteEmployee({ employeeId, onClose, isOpen }: Props) {
    const { toast } = useToast();
    const onSubmit = async () => {
      try {
        const res = await axios.delete(`/employees/${employeeId}`);
        toast({
          title: 'Employee Deleted Successfully',
        });

        if (res.status === 200 || res.status === 204) {
         window.location.reload();
        }

      }catch(error) {
        toast({
          title: `Employee Cannot be deleted at this time`,
          variant: `destructive`,
          description: (error as any)?.response?.data ?? ''
        })
      }
      onClose();
    }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogOverlay className="bg-black/20"/>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            employee and remove their data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={`destructive`} onClick={onSubmit}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
