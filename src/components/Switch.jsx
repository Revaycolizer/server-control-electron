const Switch = ({ type,checked, onChange }) => (
    <label htmlFor={`switch-${type}`} className={`relative inline-flex items-center cursor-pointer ${checked ? "bg-blue-900" : "bg-neutral-400"} rounded-full w-14 h-8 transition-colors duration-300`}>
      <span htmlFor={`switch-${type}`} className={`transform ${checked ? "translate-x-6" : "translate-x-1"} inline-block w-6 h-6 bg-white rounded-full transition-transform duration-300`} />
      <input
        id={`switch-${type}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 w-0 h-0"
      />
    </label>
);

export default Switch