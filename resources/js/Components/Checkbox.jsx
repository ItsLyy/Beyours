export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-beyours-500 text-beyours-900 bg-beyours-550 shadow-sm focus:ring-beyours-800 ' +
                className
            }
        />
    );
}
