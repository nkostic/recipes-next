import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ onCancel, onConfirm }) => {
  const cancel = () => {
    console.log("Cancel event in Alert");
    if (onCancel) {
      onCancel();
    }
  };
  const confirm = () => {
    console.log("confirm event in Alert");
    if (onConfirm) {
      onConfirm();
    }
  };
  return (
    <AlertDialog defaultOpen={true} open={true}>
      <AlertDialogTrigger asChild={true}>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
