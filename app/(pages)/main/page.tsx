'use client'

import React, { useState } from 'react'

import ScriptPanel from '@/components/ScriptPanel'
import Section from '@/components/Section'
import Checkbox from '@/components/Checkbox'
import Select from '@/components/Select'
import Button from '@/components/Button'
import '@/pages/InterpreterBot.scss'

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('러시아어')
  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguage(language)
    } else {
      setSelectedLanguage('')
    }
  }

  return (
      <div className="main-container">
        {/* 왼쪽 사이드바 */}
        <aside className="sidebar">
          <div className="sidebar-content">
            {/* 언어 선택 */}
            <Section title="언어선택">
              <div className="language-selection gray-box">
                <div className="flex-chk-area">
                  <Checkbox
                    label="영어123"
                    checked={selectedLanguage === '영어'}
                    onChange={(checked) => handleLanguageChange('영어', checked)}
                  />
                  <Checkbox
                    label="러시아어"
                    checked={selectedLanguage === '러시아어'}
                    onChange={(checked) => handleLanguageChange('러시아어', checked)}
                  />
                  <Checkbox
                    label="일본어"
                    checked={selectedLanguage === '일본어'}
                    onChange={(checked) => handleLanguageChange('일본어', checked)}
                  />
                  <Checkbox
                    label="베트남어"
                    checked={selectedLanguage === '베트남어'}
                    onChange={(checked) => handleLanguageChange('베트남어', checked)}
                  />
                  <Checkbox
                    label="중국어"
                    checked={selectedLanguage === '중국어'}
                    onChange={(checked) => handleLanguageChange('중국어', checked)}
                  />
                </div>
              </div>
            </Section>

            {/* 내선 번호 */}
            <Section title="내선 번호">
              <div className="extension-number gray-box">
                <span>1234</span>
              </div>
            </Section>

            {/* 가입 상품명 */}
            <Section title="가입 상품명">
              <div className="product-select gray-box">
                <Select options={['참좋은 운전자 상해보험', '가족사랑 간병 치매보험', '실버건강보험']}/>
              </div>
            </Section>

            {/* 통역시작 버튼 */}
            <div className="btn-wrap">
              <Button icon="/images/btn-icon.png">통역시작</Button>
            </div>
          </div>
        </aside>

        {/* 중앙 대화 영역 */}
        <main className="chat-area">
          <div className="chat-container">
            {/* 대화 헤더 */}
            <div className="chat-header">
              <div className="language-badge">
                <span>러시아어</span>
              </div>
              <div className="chat-time">
                <span>2025-08-14 10:31:20</span>
              </div>
            </div>

            {/* 대화 내용 */}
            <div className="chat-messages">
              <div className="chat-messages-inner">
                {/* 봇 메시지 */}
                <div className="message-group bot-message">
                  <div className="message-bubble bot-bubble">
                    <div className="message-text">
                      계약체결시 자필서명 미이행한 경우 위법 계약으로<br/>
                      향후 불이익이 발생할 수 있는데요.<br/>
                      피보험자께서 계약체결시 직접 서명(본인인증 포함) 하셨습니까?
                    </div>
                  </div>
                  <div className="message-bubble translation-bubble">
                    <div className="message-text">
                      В случае неисполнения подписи во время заключения контракта,<br/>
                      незаконный контракт может привести к убыткам.<br/>
                      Подписал ли страхователь лично (включая самосертификацию) при заключении договора?
                    </div>
                  </div>
                  <div className="message-time">오후 16:14</div>
                </div>

                {/* 사용자 메시지 */}
                <div className="message-group user-message">
                  <div className="user-avatar">
                    <span>Л</span>
                  </div>
                  <div className="user-message-content">
                    <div className="user-name">Ли Мин Хо</div>
                    <div className="message-bubble user-bubble">
                      <div className="message-text">Да, верно.</div>
                    </div>
                    <div className="message-bubble translation-bubble">
                      <div className="message-text">네, 맞습니다.</div>
                    </div>
                    <div className="message-time">오후 16:20</div>
                  </div>
                </div>

                {/* 봇 메시지 */}
                <div className="message-group bot-message">
                  <div className="message-bubble bot-bubble">
                    <div className="message-text">
                      계약자와 피보험자가 다른 계약에서 피보험자의 사망을 보장하는 보험은<br/>
                      피보험자의 서면 동의를 반드시 받으셔야 합니다.<br/>
                      미동의시 무효계약에 해당되는데요 피보험자 본인께서 직접 서명(본인인증 포함)하셨습니까?
                    </div>
                  </div>
                  <div className="message-bubble translation-bubble">
                    <div className="message-text">
                      Страхование, гарантирующее смерть страхователя по другому договору между Стороной и страхователем,<br/>
                      обязательно должно получить письменное согласие страхователя. Это относится к недействительному договору<br/>
                      в случае несогласия. Подписал ли страхователь сам (включая самосертификацию)?
                    </div>
                  </div>
                  <div className="message-time">오후 16:21</div>
                </div>

                {/* 사용자 메시지 */}
                <div className="message-group user-message">
                  <div className="user-avatar">
                    <span>Л</span>
                  </div>
                  <div className="user-message-content">
                    <div className="user-name">Ли Мин Хо</div>
                    <div className="message-bubble user-bubble">
                      <div className="message-text">Я не понимаю.</div>
                    </div>
                    <div className="message-bubble translation-bubble">
                      <div className="message-text">무슨 말인지 잘 모르겠어요. 천천히 다시 알려주세요무슨 말인지 잘 모르겠어요. 천천히 다시 알려주세요</div>
                    </div>
                    <div className="message-time">오후 16:26</div>
                  </div>
                </div>

                {/* 봇 메시지 */}
                <div className="message-group bot-message">
                  <div className="message-bubble bot-bubble">
                    <div className="message-text">이해가 안되시는군요. 쉽게 설명해 드리겠습니다.</div>
                  </div>
                  <div className="message-bubble translation-bubble">
                    <div className="message-text">Вы не понимаете. Я просто объясню.</div>
                  </div>
                  <div className="message-time">오후 16:27</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 오른쪽 스크립트 패널 */}
        <ScriptPanel />
      </div>
  )
}
