import PropTypes from 'prop-types'

function Input1({ type = "text", id, name, readOnly = false, spellCheck = false, autoComplete = "off", label = "", labelClassName = "", className = "", value = "", onChange }) {
  return (
    <label htmlFor={id} className={`flex flex-col gap-1 ${labelClassName}`}>
      {label && <span>{label}</span>}
      <input
        type={type}
        name={name}
        id={id}
        spellCheck={spellCheck}
        autoComplete={autoComplete}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        className={`border outline-none py-1.5 px-3 rounded-md sm:text-lg ${className}`}
      />
    </label>
  )
}

Input1.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  spellCheck: PropTypes.bool,
  readOnly: PropTypes.bool,
  autoComplete: PropTypes.oneOf(["off", "on"]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
}

export default Input1
