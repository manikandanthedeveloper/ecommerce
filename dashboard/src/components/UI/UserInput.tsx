import type { UserInputProps } from "../../models/UserInputProps"

const UserInput: React.FC<UserInputProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    value,
    error,
    onChange,
    inputRef
}) => {

    if (type === 'checkbox') {
        const checked = Boolean(value);

        return (
            <div className="mb-3">
                <div className="flex items-center w-full gap-3">
                    <input
                        className="w-4 h-4 text-blue-600 overflow-hidden border border-blue-400 rounded focus:ring-amber-50"
                        type="checkbox"
                        name={name}
                        id={name}
                        checked={checked}
                        onChange={onChange}
                        ref={inputRef}
                    />
                    <label htmlFor={name} className="block">
                        {label}
                    </label>
                </div>
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-1 mb-3">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value as string}
                ref={inputRef}
                onChange={onChange}
                className={`px-3 py-2 outline-none border bg-transparent rounded-md ${error ? "border-red-600" : "border-blue-400"
                    }`}
                autoComplete="off"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
}

export default UserInput