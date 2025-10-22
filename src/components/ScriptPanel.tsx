'use client'

import React, { useEffect } from 'react'
import { useScriptStore, ScriptItem, getDefaultScriptTexts } from '../store/scriptStore'
import Button from './Button'
import './ScriptPanel.scss'

const ScriptPanel: React.FC = () => {
  const { scripts, toggleScript, initializeScripts } = useScriptStore()

  useEffect(() => {
    if (scripts.length === 0) {
      const defaultTexts = getDefaultScriptTexts()
      initializeScripts(defaultTexts)
    }
  }, [scripts.length, initializeScripts])

  return (
    <aside className="script-panel">
      <div className="script-content">
        <h3 className="cont-title">간편한 가족사랑 간병 치매보험 스크립트</h3>
        <div className="script-list">
          {scripts.map((script: ScriptItem) => (
            <div key={script.id} className="script-item">
              <span className="script-text">{script.text}</span>
              <Button
                className={`play-btn ${script.isPlaying ? 'paused' : ''}`}
                onClick={() => toggleScript(script.id)}
                icon={script.isPlaying ? '/images/pause-icon.png' : '/images/play-icon.png'}
              >
              </Button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

export default ScriptPanel