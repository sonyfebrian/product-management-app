import { ChangeEvent } from "react";

export const CustomInput = ({
    name,
    value,
    inputChange,
    placeholder,
    title,
    showValidation,
    type,
    isRequired,
}: {
    name: string;
    value: string | number;
    inputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    title: string;
    showValidation?: boolean;
    type: "text" | "number";
    isRequired?: boolean;
}) => {
    const showValidationUi = value === "" && showValidation;
    return (
        <>
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">{title}</label>
                <div>
                    <input
                        type={type}
                        name={name}
                        onChange={inputChange}
                        value={value}
                        className={
                            showValidationUi ? "mt-1 p-2 w-full text-red-400 border rounded-md focus:border-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 transition-colors duration-300" : "mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                        }
                        placeholder={placeholder}
                    />
                </div>
                {showValidationUi ? (
                    isRequired ? (
                        <span className="text-sm text-red-500 mt-2">
                            {title} is required.
                        </span>
                    ) : null
                ) : null}
            </div>
        </>
    );
};
