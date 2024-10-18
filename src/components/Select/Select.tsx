type SelectProps = {
  options: { value: string; label: string }[];
  type: string;
  onChangeFun: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

const Select = ({
  options = [],
  type = "",
  value = "",
  onChangeFun,
}: SelectProps) => {
  return (
    <select onChange={onChangeFun} data-type={type} value={value}>
      {options.map((optionItem) => (
        <option key={optionItem.value} value={optionItem.value}>
          {optionItem.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
