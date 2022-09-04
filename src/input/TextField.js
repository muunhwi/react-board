export const TextField = () => {
  return (
    <div className="w-full mt-2">
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Your ID
      </label>
      <input
        type=""
        id=""
        className="shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900
                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full
                   p-2.5 outline-none h-10"
        placeholder=""
        required
      />
    </div>
  );
};
