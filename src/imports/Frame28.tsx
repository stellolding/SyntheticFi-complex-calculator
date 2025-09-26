import svgPaths from "./svg-5d7dx8p6rl";

function Radio() {
  return (
    <div className="relative shrink-0 size-[33.188px]" data-name="Radio">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Radio">
          <mask fill="white" id="path-1-inside-1_2_2663">
            <path d={svgPaths.p1e260c70} />
          </mask>
          <path d={svgPaths.p1e260c70} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2129b200} fill="var(--stroke-0, #757575)" mask="url(#path-1-inside-1_2_2663)" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxAndLabel() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Checkbox and Label">
      <Radio />
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[33.188px] text-black">
        <p className="leading-[1.4]">Max box spread for down payment</p>
      </div>
    </div>
  );
}

function RadioField() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-[705.25px]" data-name="Radio Field">
      <CheckboxAndLabel />
    </div>
  );
}

function Radio1() {
  return (
    <div className="relative shrink-0 size-[33.188px]" data-name="Radio">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Radio">
          <mask fill="white" id="path-1-inside-1_2_2665">
            <path d={svgPaths.p1e260c70} />
          </mask>
          <path d={svgPaths.p1e260c70} fill="var(--fill-0, #E6E6E6)" />
          <path d={svgPaths.p2129b200} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_2_2665)" />
          <circle cx="16.5941" cy="16.5941" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="10.3713" />
        </g>
      </svg>
    </div>
  );
}

function CheckboxAndLabel1() {
  return (
    <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Checkbox and Label">
      <Radio1 />
      <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[33.188px] text-black">
        <p className="leading-[1.4]">Custom plan</p>
      </div>
    </div>
  );
}

function RadioField1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative shrink-0 w-[705.25px]" data-name="Radio Field">
      <CheckboxAndLabel1 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-col gap-[31px] items-start justify-start relative shrink-0">
      <RadioField />
      <RadioField1 />
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-col gap-16 items-start justify-start relative shrink-0">
      <Frame25 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-6 items-start justify-start relative shrink-0 w-full">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[35.657px] text-black text-nowrap tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px] whitespace-pre">Scenario</p>
      </div>
      <Frame24 />
    </div>
  );
}

export default function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-9 items-start justify-start relative size-full">
      <Frame26 />
    </div>
  );
}