'use client'

import { useEffect } from 'react';
import { useSelectionStore } from '@/store/selectionStore';
import Section from '@/components/Section'
import { Accordion, AccordionItem } from '@/components/Accordion'
import { Checkbox, CheckboxItem } from '@/components/Checkbox'
import { Radio, RadioItem } from '@/components/Radio'


export default function subDashBoard(){
//   ├─ store/
// │  ├─ selectionStore.ts     ← 지금 우리가 만든 체크박스/라디오 상태 관리용
// │  ├─ userStore.ts          ← 로그인/유저정보
// │  ├─ uiStore.ts            ← 모달, 다크모드 등 UI 상태
// │  └─ ...
const setGroup = useSelectionStore(s => s.setGroup);
const reset    = useSelectionStore(s => s.reset);

useEffect(() => {
    setGroup('chk-group1', ['check1-2']);
    setGroup('chk-group2', ['check2-2']);
    setGroup('radio-group1', ['radio1-1']);
    setGroup('radio-group2', ['radio2-1']);
    return () => reset();
  }, [setGroup, reset]);

  return (
    <div className="conts-container">
      <div className="contents row-1 col-1">
        <div className="cont-box">
          <Section title="아코디언" className=''>
            <Accordion>
              <AccordionItem title="FAQ1" defaultOpen>content 1</AccordionItem>
              <AccordionItem title="FAQ2"></AccordionItem>
              <AccordionItem title="FAQ3">content 3</AccordionItem>
            </Accordion>
          </Section>
          <Section title="체크박스" className=''>
            <Checkbox className='flex-chk-area'>
                <CheckboxItem group="chk-group1" value="check1-1" label="체크1-1" />
                <CheckboxItem group="chk-group1" value="check1-2" label="체크1-2" />
                <CheckboxItem group="chk-group1" value="check1-3" label="체크1-3" />
            </Checkbox>
            <div style={{marginTop:'10px'}}>
              <Checkbox className='flex-chk-area'>
                <CheckboxItem group="chk-group2" value="check2-1" label="체크2-1" />
                <CheckboxItem group="chk-group2" value="check2-2" label="체크2-2" />
                <CheckboxItem group="chk-group2" value="check2-3" label="체크2-3" />
              </Checkbox>
            </div>
          </Section>
          <Section title="라디오 버튼" className=''>
            <Radio>
              <RadioItem group="radio-group1" value="radio1-1" label="라디오1-1" />
              <RadioItem group="radio-group1" value="radio1-2" label="라디오1-2" />
              <RadioItem group="radio-group1" value="radio1-3" label="라디오1-3" />
            </Radio>
            <Radio>
              <RadioItem group="radio-group2" value="radio2-1" label="라디오2-1" />
              <RadioItem group="radio-group2" value="radio2-2" label="라디오2-2" />
              <RadioItem group="radio-group2" value="radio2-3" label="라디오2-3" />
            </Radio>
          </Section>
        </div>
        {/* <div className="cont-box">2</div>
        <div className="cont-box">3</div> */}
      </div>
    </div>
  )
}