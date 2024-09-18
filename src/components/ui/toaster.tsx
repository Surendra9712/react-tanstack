import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast"
import {useToast} from "@/components/ui/use-toast"
import {Icons} from "@/components/icons";
import {titleCase} from "@/lib/utils";

export function Toaster() {
    const {toasts} = useToast();

    const toastIcon = (type: string) => {
        switch (type) {
            case 'error':
                return Icons.errorCircle(12, 12);
            default:
                return Icons.checkmark(12, 12);
        }
    }

    return (
        <ToastProvider duration={4000}>
            {toasts.map(function ({
                                      id,
                                      title,
                                      message = "",
                                      toastType = "success",
                                      action,
                                      ...props
                                  }) {
                const color = (type: string) => type === 'error' ? 'danger' : type
                return (
                    <Toast key={id} {...props} className={`border-l-4 border-${color(toastType)}`}>
                        <div className="flex items-center gap-2">
                            <div>
                                <div
                                    className={`flex justify-center items-center rounded-full p-0 w-4 h-4 bg-${color(toastType)} text-white`}>{toastIcon(toastType)}</div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <ToastTitle
                                        className={'text-' + color(toastType)}>{title ?? titleCase(toastType)}</ToastTitle>
                                    {action}
                                    <ToastClose/>
                                </div>
                                {message && (
                                    <ToastDescription className="mr-4">{message}</ToastDescription>
                                )}
                            </div>
                        </div>
                    </Toast>
                )
            })}
            <ToastViewport/>
        </ToastProvider>
    )
}
