const Select = ({ onChange, validation, title, list, value }) => {
  return (
    <div>
      <select
        className={`w-full shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                   p-2 outline-none h-10`}
        onChange={onChange}
        value={value}
      >
        <option value="">{title}</option>
        {list.map((item) => (
          <option value={item.id} key={item.id}>
            {item.menu}
          </option>
        ))}
      </select>
      <p className={"mt-2 text-sm text-red-600 "}>
        {validation?.isSubmit ? validation?.message : ""}
      </p>
    </div>
  );
};

export default Select;
