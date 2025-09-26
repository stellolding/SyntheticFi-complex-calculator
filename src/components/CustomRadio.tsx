import svgPaths from "../imports/svg-5d7dx8p6rl";

interface CustomRadioProps {
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  id: string;
}

export function CustomRadio({ value, checked, onChange, label, id }: CustomRadioProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(value)}
        className="relative shrink-0"
        style={{ width: '20px', height: '20px' }}
        id={id}
      >
        <svg 
          className="block size-full" 
          fill="none" 
          preserveAspectRatio="none" 
          viewBox="0 0 34 34"
        >
          <g>
            <mask fill="white" id={`path-1-inside-1_${id}`}>
              <path d={svgPaths.p1e260c70} />
            </mask>
            <path 
              d={svgPaths.p1e260c70} 
              fill={checked ? "#f8f9fa" : "white"} 
            />
            <path 
              d={svgPaths.p2129b200} 
              fill={checked ? "#00233A" : "#757575"} 
              mask={`url(#path-1-inside-1_${id})`} 
            />
            {checked && (
              <circle 
                cx="16.5941" 
                cy="16.5941" 
                fill="#00233A" 
                r="6" 
              />
            )}
          </g>
        </svg>
      </button>
      <label 
        htmlFor={id} 
        className="text-base leading-relaxed cursor-pointer"
        onClick={() => onChange(value)}
      >
        {label}
      </label>
    </div>
  );
}