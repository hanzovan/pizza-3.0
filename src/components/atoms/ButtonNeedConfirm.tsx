"use client";

import { ButtonNeedConfirmProps } from "@/types";
import { useState } from "react";

export function ButtonNeedConfirm({ label, className, onProceed }: ButtonNeedConfirmProps) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
        onProceed(event);
        setShowConfirm(false);
    }
    
    if (showConfirm) {
        return (
            <div className="fixed bg-black/60 inset-0 flex items-center justify-center">
                <div className="bg-gray-200 px-16 py-8 rounded-lg shadow-lg">
                    <h4 className="max-w-xs mt-4 text-red-700 mb-4 text-lg">
                        Are you sure? This action can not be reversed
                    </h4>
                    <div className="flex gap-4 max-w-xs">
                        <button className="bg-gray-300 rounded" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button className="bg-primary text-white rounded" type="button" onClick={handleConfirm}>
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <button type="button" className={`max-w-xs ml-auto ${className || ""}`} onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    )
}