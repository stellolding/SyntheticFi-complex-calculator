import svgPaths from "./svg-p6hlablyo7";
import imgScreenshot202508122308471 from "figma:asset/dfe3a2e4eca6c76ed150633cc345397cdd0b776c.png";
import imgScreenshot20250812230839 from "figma:asset/a6b8289c1d6b0f009dec3f676a0d135a73958b7b.png";

function TagToggle() {
  return (
    <div className="bg-[#2c2c2c] box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[20.696px] shrink-0" data-name="Tag Toggle">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[43.979px] text-neutral-100 text-nowrap">
        <p className="leading-none whitespace-pre">Net savings</p>
      </div>
    </div>
  );
}

function TagToggle1() {
  return (
    <div className="bg-neutral-100 box-border content-stretch flex gap-2 items-center justify-center p-[8px] relative rounded-[20.696px] shrink-0" data-name="Tag Toggle">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#757575] text-[43.979px] text-nowrap">
        <p className="leading-none whitespace-pre">Monthly payment</p>
      </div>
    </div>
  );
}

function TagToggleGroup() {
  return (
    <div className="content-stretch flex gap-2 items-start justify-start relative shrink-0" data-name="Tag Toggle Group">
      <TagToggle />
      <TagToggle1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[11.728px] items-start justify-start left-[1075px] p-[11.728px] rounded-[18.764px] top-[549px]">
      <div aria-hidden="true" className="absolute border-[#bababa] border-[1.173px] border-solid inset-0 pointer-events-none rounded-[18.764px]" />
      <TagToggleGroup />
    </div>
  );
}

function InputTextContainer() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$1,000,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Home value</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer />
      <LabelTextContainer />
    </div>
  );
}

function StateLayer() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content />
        </div>
      </div>
    </div>
  );
}

function TextField() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer />
    </div>
  );
}

function TextField1() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="Text field">
      <TextField />
    </div>
  );
}

function InputTextContainer1() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$200,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Down payment</p>
      </div>
    </div>
  );
}

function Content1() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer1 />
      <LabelTextContainer1 />
    </div>
  );
}

function StateLayer1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content1 />
        </div>
      </div>
    </div>
  );
}

function TextField2() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-bl-[8.914px] rounded-tl-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px_0px_2.229px_2.229px] border-solid inset-0 pointer-events-none rounded-bl-[8.914px] rounded-tl-[8.914px]" />
      <StateLayer1 />
    </div>
  );
}

function TextField3() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[521px]" data-name="Text field">
      <TextField2 />
    </div>
  );
}

function InputTextContainer2() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">20%</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer2 />
    </div>
  );
}

function StateLayer2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content2 />
        </div>
      </div>
    </div>
  );
}

function TextField4() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow h-[124.8px] items-start justify-start min-h-px min-w-px relative rounded-br-[8.914px] rounded-tr-[8.914px] shrink-0" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-br-[8.914px] rounded-tr-[8.914px]" />
      <StateLayer2 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-start justify-start relative shrink-0 w-[708px]">
      <TextField3 />
      <TextField4 />
    </div>
  );
}

function InputTextContainer3() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$360,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer2() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Portfolio amount</p>
      </div>
    </div>
  );
}

function Content3() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer3 />
      <LabelTextContainer2 />
    </div>
  );
}

function StateLayer3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content3 />
        </div>
      </div>
    </div>
  );
}

function TextField5() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer3 />
    </div>
  );
}

function TextField6() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[706px]" data-name="Text field">
      <TextField5 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <TextField1 />
      <Frame23 />
      <TextField6 />
    </div>
  );
}

function InputTextContainer4() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-[485.343px]" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$180,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Portfolio amount used to borrow</p>
      </div>
    </div>
  );
}

function Content4() {
  return (
    <div className="box-border content-stretch flex flex-col h-[106.971px] items-start justify-center px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer4 />
      <LabelTextContainer3 />
    </div>
  );
}

function StateLayer4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content4 />
        </div>
      </div>
    </div>
  );
}

function TextField7() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-bl-[8.914px] rounded-tl-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px_0px_2.229px_2.229px] border-solid inset-0 pointer-events-none rounded-bl-[8.914px] rounded-tl-[8.914px]" />
      <StateLayer4 />
    </div>
  );
}

function TextField8() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[521px]" data-name="Text field">
      <TextField7 />
    </div>
  );
}

function InputTextContainer5() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">50%</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer5 />
    </div>
  );
}

function StateLayer5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content5 />
        </div>
      </div>
    </div>
  );
}

function TextField9() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow h-[124.8px] items-start justify-start min-h-px min-w-px relative rounded-br-[8.914px] rounded-tr-[8.914px] shrink-0" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-br-[8.914px] rounded-tr-[8.914px]" />
      <StateLayer5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-start justify-start relative shrink-0 w-[708px]">
      <TextField8 />
      <TextField9 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0">
      <Frame29 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <Frame30 />
      <Frame36 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <Frame39 />
    </div>
  );
}

function Radio() {
  return (
    <div className="relative shrink-0 size-[33.188px]" data-name="Radio">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
        <g id="Radio">
          <mask fill="white" id="path-1-inside-1_3_7402">
            <path d={svgPaths.p1e260c70} />
          </mask>
          <path d={svgPaths.p1e260c70} fill="var(--fill-0, #E6E6E6)" />
          <path d={svgPaths.p2129b200} fill="var(--stroke-0, #2C2C2C)" mask="url(#path-1-inside-1_3_7402)" />
          <circle cx="16.5941" cy="16.5943" fill="var(--fill-0, #1E1E1E)" id="Radio_2" r="10.3713" />
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
          <mask fill="white" id="path-1-inside-1_3_7400">
            <path d={svgPaths.p1e260c70} />
          </mask>
          <path d={svgPaths.p1e260c70} fill="var(--fill-0, white)" />
          <path d={svgPaths.p2129b200} fill="var(--stroke-0, #757575)" mask="url(#path-1-inside-1_3_7400)" />
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

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-9 items-start justify-start relative shrink-0 w-[708px]">
      <Frame26 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <Frame33 />
      <Frame28 />
    </div>
  );
}

function InputTextContainer6() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px opacity-[0.38] relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$180,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer4() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] opacity-[0.38] relative shrink-0 text-[#1d1b20] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Down payment from box spread</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer6 />
      <LabelTextContainer4 />
    </div>
  );
}

function StateLayer6() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div aria-hidden="true" className="absolute border-[2.229px] border-[rgba(29,27,32,0.1)] border-solid inset-[-1.114px] pointer-events-none rounded-[10.028px]" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content6 />
        </div>
      </div>
    </div>
  );
}

function TextField10() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="Text field">
      <StateLayer6 />
    </div>
  );
}

function TextField11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <div className="absolute bottom-[-0.2px] left-0 opacity-[0.04] right-0 rounded-[8.914px] top-0" data-name="disabled-state-color">
        <div aria-hidden="true" className="absolute border-[#1d1b20] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      </div>
      <TextField10 />
    </div>
  );
}

function InputTextContainer7() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px opacity-[0.38] relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$800,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer5() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] opacity-[0.38] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Mortgage from bank loan</p>
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer7 />
      <LabelTextContainer5 />
    </div>
  );
}

function StateLayer7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div aria-hidden="true" className="absolute border-[2.229px] border-[rgba(29,27,32,0.1)] border-solid inset-[-1.114px] pointer-events-none rounded-[10.028px]" />
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content7 />
        </div>
      </div>
    </div>
  );
}

function TextField12() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="Text field">
      <StateLayer7 />
    </div>
  );
}

function TextField13() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <div className="absolute bottom-[-0.2px] left-0 opacity-[0.04] right-0 rounded-[8.914px] top-0" data-name="disabled-state-color">
        <div aria-hidden="true" className="absolute border-[#1d1b20] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      </div>
      <TextField12 />
    </div>
  );
}

function InputTextContainer8() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">4%</p>
      </div>
    </div>
  );
}

function LabelTextContainer6() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Box spread interest rate</p>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer8 />
      <LabelTextContainer6 />
    </div>
  );
}

function StateLayer8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content8 />
        </div>
      </div>
    </div>
  );
}

function TextField14() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer8 />
    </div>
  );
}

function TextField15() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField14 />
    </div>
  );
}

function InputTextContainer9() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">7%</p>
      </div>
    </div>
  );
}

function LabelTextContainer7() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Bank mortgage interest rate</p>
      </div>
    </div>
  );
}

function Content9() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer9 />
      <LabelTextContainer7 />
    </div>
  );
}

function StateLayer9() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content9 />
        </div>
      </div>
    </div>
  );
}

function TextField16() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer9 />
    </div>
  );
}

function TextField17() {
  return (
    <div className="content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField16 />
    </div>
  );
}

function InputTextContainer10() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">30 years</p>
      </div>
    </div>
  );
}

function LabelTextContainer8() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Loan term</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer10 />
      <LabelTextContainer8 />
    </div>
  );
}

function StateLayer10() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content10 />
        </div>
      </div>
    </div>
  );
}

function TextField18() {
  return (
    <div className="content-stretch flex flex-col gap-[22.286px] h-[124.8px] items-start justify-start relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer10 />
    </div>
  );
}

function TextField19() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="Text field">
      <TextField18 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <TextField11 />
      <TextField13 />
      <TextField15 />
      <TextField17 />
      <TextField19 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[100px] items-start justify-start relative shrink-0 w-full">
      <Frame34 />
      <Frame31 />
    </div>
  );
}

function ChevronUp() {
  return (
    <div className="relative shrink-0 size-12" data-name="Chevron up">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Chevron down">
          <path d="M12 18L24 30L36 18" id="Icon" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-3 items-start justify-start relative shrink-0">
      <div className="flex flex-col font-['Roboto:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[35.657px] text-black text-nowrap tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px] whitespace-pre">Hide tax, insurance, HOA</p>
      </div>
      <ChevronUp />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-col gap-12 items-start justify-start relative shrink-0 w-full">
      <Frame32 />
      <Frame40 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col gap-16 items-start justify-start relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-col gap-16 items-end justify-start relative shrink-0 w-full">
      <Frame20 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-16 items-end justify-start relative shrink-0 w-full">
      <Frame22 />
    </div>
  );
}

function InputTextContainer11() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">6%</p>
      </div>
    </div>
  );
}

function LabelTextContainer9() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Portfolio return rate</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer11 />
      <LabelTextContainer9 />
    </div>
  );
}

function StateLayer11() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content11 />
        </div>
      </div>
    </div>
  );
}

function TextField20() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer11 />
    </div>
  );
}

function TextField21() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField20 />
    </div>
  );
}

function InputTextContainer12() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$15,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer10() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Property tax per year</p>
      </div>
    </div>
  );
}

function Content12() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer12 />
      <LabelTextContainer10 />
    </div>
  );
}

function StateLayer12() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content12 />
        </div>
      </div>
    </div>
  );
}

function TextField22() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer12 />
    </div>
  );
}

function TextField23() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField22 />
    </div>
  );
}

function InputTextContainer13() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$2,000</p>
      </div>
    </div>
  );
}

function LabelTextContainer11() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">Home owners’ insurance per year</p>
      </div>
    </div>
  );
}

function Content13() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer13 />
      <LabelTextContainer11 />
    </div>
  );
}

function StateLayer13() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content13 />
        </div>
      </div>
    </div>
  );
}

function TextField24() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer13 />
    </div>
  );
}

function TextField25() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField24 />
    </div>
  );
}

function InputTextContainer14() {
  return (
    <div className="content-stretch flex items-center justify-start relative shrink-0 w-full" data-name="Input text container">
      <div className="basis-0 flex flex-col font-['Roboto:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#1d1b20] text-[35.657px] tracking-[1.1143px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[53.486px]">$0</p>
      </div>
    </div>
  );
}

function LabelTextContainer12() {
  return (
    <div className="absolute bg-white box-border content-stretch flex items-center justify-start left-[-8.91px] px-[8.914px] py-0 top-[-26.74px]" data-name="Label text container">
      <div className="font-['Roboto:Regular',_sans-serif] font-normal leading-[0] relative shrink-0 text-[#49454f] text-[26.743px] text-nowrap tracking-[0.8914px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[35.657px] whitespace-pre">HOA fee per month</p>
      </div>
    </div>
  );
}

function Content14() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow h-[106.971px] items-start justify-center min-h-px min-w-px px-0 py-[8.914px] relative shrink-0" data-name="Content">
      <InputTextContainer14 />
      <LabelTextContainer12 />
    </div>
  );
}

function StateLayer14() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-full" data-name="State-layer">
      <div className="relative size-full">
        <div className="box-border content-stretch flex gap-[8.914px] items-start justify-start pl-[35.657px] pr-0 py-[8.914px] relative size-full">
          <Content14 />
        </div>
      </div>
    </div>
  );
}

function TextField26() {
  return (
    <div className="basis-0 content-stretch flex flex-col gap-[22.286px] grow items-start justify-start min-h-px min-w-px relative rounded-[8.914px] shrink-0 w-full" data-name="Text field">
      <div aria-hidden="true" className="absolute border-[#79747e] border-[2.229px] border-solid inset-0 pointer-events-none rounded-[8.914px]" />
      <StateLayer14 />
    </div>
  );
}

function TextField27() {
  return (
    <div className="content-stretch flex flex-col h-[125px] items-start justify-start relative rounded-tl-[8.914px] rounded-tr-[8.914px] shrink-0 w-[707px]" data-name="Text field">
      <TextField26 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#2c2c2c] h-[114px] relative rounded-[17.386px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-2 h-[114px] items-center justify-center p-[12px] relative w-full">
          <div className="font-['Inter:Regular',_sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[32px] text-neutral-100 text-nowrap">
            <p className="leading-none whitespace-pre">Update</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2c2c2c] border-solid inset-0 pointer-events-none rounded-[17.386px]" />
    </div>
  );
}

function Frame35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-16 items-end justify-start left-[165px] top-[549px] w-[708px]">
      <Frame27 />
      <TextField21 />
      <TextField23 />
      <TextField25 />
      <TextField27 />
      <Button />
    </div>
  );
}

export default function Component6() {
  return (
    <div className="bg-white relative size-full" data-name="6">
      <div className="absolute font-['Inter:Bold',_sans-serif] font-bold leading-[0] left-[165px] not-italic text-[120px] text-black text-nowrap top-[155px]">
        <p className="leading-[normal] whitespace-pre">Hybrid mortgage calculator</p>
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[165px] not-italic text-[48px] text-black top-[355px] w-[2374px]">
        <p className="leading-[normal]">Help you be more confident in borrowing from box spread as a mortgage option</p>
      </div>
      <Frame16 />
      <div className="absolute bg-center bg-cover bg-no-repeat h-[253px] left-[1563px] top-[757px] w-[1612px]" data-name="Screenshot 2025-08-12 230847 1" style={{ backgroundImage: `url('${imgScreenshot202508122308471}')` }} />
      <div className="absolute bg-center bg-cover bg-no-repeat h-[1549px] left-[1075px] top-[1122px] w-[2555px]" data-name="Screenshot 2025-08-12 230839" style={{ backgroundImage: `url('${imgScreenshot20250812230839}')` }} />
      <Frame35 />
    </div>
  );
}