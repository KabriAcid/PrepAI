import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  const getIcon = (variant?: string) => {
    switch (variant) {
      case "destructive":
        return (
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-destructive" />
        );
      case "success":
        return (
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500" />
        );
      default:
        return <Info className="h-5 w-5 flex-shrink-0 text-primary" />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="flex items-start gap-3 flex-1">
              {getIcon(props.variant)}
              <div className="grid gap-1 flex-1">
                {title && (
                  <ToastTitle className="font-semibold text-foreground">
                    {title}
                  </ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-sm text-muted-foreground">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
