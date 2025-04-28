function ReusableForm({
  label,
  id,
  type = "text",
  name,
  value,
  onChange,
  options,
  ...props
}) {
  if (type === "select") {
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}:</label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default ReusableForm;
