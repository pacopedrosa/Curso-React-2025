import { createContext, useContext, useState } from "react";
import { Toaster, toast } from "sonner";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast debe ser usado dentro de un ToastProvider');
    }
    return context;
}

export const ToastProvider = ({ children }) => {
    const showToast = (message, type = "default") => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "warning":
                toast.warning(message);
                break;
            default:
                toast(message);
        }
    };

    const contextValue = {
        showToast
    };

    return (
        <ToastContext.Provider value={contextValue}>
            <Toaster position="top-right" richColors />
            {children}
        </ToastContext.Provider>
    );
};


