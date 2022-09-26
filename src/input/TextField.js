export const TextField = ({ input, onChange, validation, value }) => {
  return (
    <div className="w-full mt-2">
      <label
        htmlFor={input.id}
        className={`block mb-2 text-sm font-medium text-gray-900 `}
      >
        {input.label}
      </label>
      <input
        type={input.type}
        id={input.id}
        className={`shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                   p-2.5 outline-none h-10`}
        placeholder={input.placeholder}
        onChange={onChange}
        value={value}
      />
      <p className={"mt-2 text-sm text-red-600 "}>
        {validation?.isSubmit ? validation?.message : ""}
      </p>
    </div>
  );
};
