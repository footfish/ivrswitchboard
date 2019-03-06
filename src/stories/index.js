import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DayTimes from '../components/DayTimes'
import TimesSectionOpeningOptions from '../components/TimesSectionOpeningOptions'
import MainMenu from '../components/MainMenu'
import MenuActionWaitDTMF from '../components/MenuActionWaitDTMF'
import MenuActionPlayback from '../components/MenuActionPlayback'
import MenuActionNotifyEmail from '../components/MenuActionNotifyEmail'
import MenuActionSelect from '../components/MenuActionSelect'
import MenuActionAddAction from '../components/MenuActionAddAction'
import MenuActionSequence from '../components/MenuActionSequence'
import MenuSectionDigitPressed from '../components/MenuSectionDigitPressed'
import MenuSectionCallRx from '../components/MenuSectionCallRx'
import TimesSectionWeek from '../components/TimesSectionWeek';
import AccountHeader from '../components/AccountHeader'


const WrapCol = ({ children }) => (
  <div class="container pt-5"><div class="row"><div class="col-sm-2 border">
    {children}
  </div></div></div>
);

const Container = ({ children }) => (
  <div class="container pt-5">
    {children}
  </div>
);


storiesOf('1. Main Menu', module)
  .add("Times", () => <Container><MainMenu tab="times" onClick={action('clicked')} /></Container>)
  .add("Open", () => <Container><MainMenu tab="open" onClick={action('clicked')} /></Container>)
  .add("Closed", () => <Container><MainMenu tab="closed" onClick={action('clicked')} /></Container>)
  .add("Recordings", () => <Container><MainMenu tab="recordings" onClick={action('clicked')} /></Container>)


storiesOf('2. Times Page', module)
  .add("Scheduled Option", () => <Container><TimesSectionOpeningOptions selected="scheduled" onChange={action('changed')} /></Container>)
  .add("AlwaysOpen Option", () => <Container><TimesSectionOpeningOptions selected="alwaysOpen" onChange={action('changed')} /></Container>)
  .add("AlwaysClosed Option", () => <Container><TimesSectionOpeningOptions selected="alwaysClosed" onChange={action('changed')} /></Container>)
  .add("Monday Active", () => {
    const dayData = { day: "mon", active: true, begin: "09:00", end: "17:00" }
    return (
      <WrapCol>
        <DayTimes id="work" settings={dayData} onChange={action('clicked')} />
      </WrapCol>
    )
  })
  .add("Tuesday Inactive", () => {
    const dayData = { day: "tue", active: false, begin: "10:00", end: "18:00" }
    return (
      <WrapCol>
        <DayTimes id="work" settings={dayData} onChange={action('clicked')} />
      </WrapCol>
    )
  })
  .add("Week Mon-Fri", () => {
    const schedule = {
      openHours: [{ day: "mon", active: true, begin: "09:00", end: "17:00" },
      { day: "tue", active: true, begin: "09:00", end: "17:00" },
      { day: "wed", active: true, begin: "09:00", end: "17:00" },
      { day: "thu", active: true, begin: "09:00", end: "17:00" },
      { day: "fri", active: true, begin: "09:00", end: "13:00" },
      { day: "sat", active: false, begin: "09:00", end: "17:00" },
      { day: "sun", active: false, begin: "09:00", end: "17:00" }],
      lunchHours: [{ day: "mon", active: true, begin: "13:00", end: "14:00" },
      { day: "tue", active: true, begin: "13:00", end: "14:00" },
      { day: "wed", active: true, begin: "13:00", end: "14:00" },
      { day: "thu", active: true, begin: "13:00", end: "14:00" },
      { day: "fri", active: false, begin: "13:00", end: "13:00" },
      { day: "sat", active: false, begin: "09:00", end: "17:00" },
      { day: "sun", active: false, begin: "09:00", end: "17:00" }]
    }
    return (<TimesSectionWeek schedule={schedule} onChange={action('changed')} />)
  })

storiesOf('3. Open-Closed Page', module)
  .add("DTMF odd", () => <Container><MenuActionWaitDTMF activeDigits={["1", "3", "5", "7", "9", "*"]} onClick={action('clicked')} /></Container>)
  .add("DTMF even", () => <Container><MenuActionWaitDTMF activeDigits={["0", "2", "4", "6", "8", "#"]} onClick={action('clicked')} /></Container>)
  .add("1st recording 1 time", () => {
    const recordings = ["recording1.wav", "recording2.wav", "recording3.wav"]
    const playbackData = { recording: recordings[0], times: 1 }
    return (<Container>
      <MenuActionPlayback settings={playbackData} recordings={recordings} onChange={action('changed')} />
    </Container>)
  })
  .add("2nd recording 3 times", () => {
    const recordings = ["recording1.wav", "recording2.wav", "recording3.wav"]
    const playbackData = { recording: recordings[1], times: 3 }
    return (<Container>
      <MenuActionPlayback settings={playbackData} recordings={recordings} onChange={action('changed')} />
    </Container>)
  })
  .add("email ON", () => <Container><MenuActionNotifyEmail notifyState={true} onClick={action('clicked')} /></Container>)
  .add("email OFF", () => <Container><MenuActionNotifyEmail notifyState={false} onClick={action('clicked')} /></Container>)
  .add("Add Action", () => <Container><MenuActionAddAction onAddClick={action('add')} /></Container>)
  .add("PlayRecording", () => {
    const recordings = ["recording1.wav", "recording2.wav", "recording3.wav"]
    const menuActionSelectData = { action: "playRecording", recording: recordings[1], recordingOptions: recordings }
    return (<Container><MenuActionSelect index={0} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("ForwardToNumber-empty", () => {
    const menuActionSelectData = { action: "forwardToNumber", number: "", ringTimer: 30 }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("ForwardToNumber-valid", () => {
    const menuActionSelectData = { action: "forwardToNumber", number: "0861217464", ringTimer: 30 }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("ForwardToNumber-invalid", () => {
    const menuActionSelectData = { action: "forwardToNumber", number: "086124", ringTimer: 30 }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("ForwardToNumberWhisper-invalid", () => {
    const menuActionSelectData = { action: "forwardToNumberWhisper", number: "086124", ringTimer: 50 }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("ForwardToNumberConfirm-valid", () => {
    const menuActionSelectData = { action: "forwardToNumberConfirm", number: "0861217464", ringTimer: 10 }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("VoicemailToEmail-empty", () => {
    const menuActionSelectData = { action: "voicemailToEmail", email: "" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("VoicemailToEmail-valid", () => {
    const menuActionSelectData = { action: "voicemailToEmail", email: "here@where.com" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("VoicemailToEmail-invalid", () => {
    const menuActionSelectData = { action: "voicemailToEmail", email: "here-where.com" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("NotifyEmail-empty", () => {
    const menuActionSelectData = { action: "notifyEmail", email: "", label: "" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("NotifyEmail-valid", () => {
    const menuActionSelectData = { action: "notifyEmail", email: "valid@domain.co.uk", label: "this-is_a_valid-label" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("NotifyEmail-invalid", () => {
    const menuActionSelectData = { action: "notifyEmail", email: "invalid@domain@.co.uk", label: "this-is_not a_valid-label" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("Analytics-invalid", () => {
    const menuActionSelectData = { action: "analytics", label: "this-is_not a_valid-label" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("backToMenu", () => {
    const menuActionSelectData = { action: "backToMenu" }
    return (<Container><MenuActionSelect index={1} settings={menuActionSelectData} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("Action Sequence", () => {
    const pressed1 = [
      { action: "notifyEmail", email: "valid@domain.co.uk", label: "this-is_a_valid-label" },
      { action: "forwardToNumber", number: "0861217464", ringTimer: 30 },
      { action: "analytics", label: "my-label" },
      { action: "backToMenu" }
    ]
    return (<Container><MenuActionSequence actionSettingsArray={pressed1} onChange={action('changed')} onDeleteClick={action('delete')} /></Container>)
  })
  .add("Call Received Section", () => {
    const recordings = ["recording1.wav", "recording2.wav", "recording3.wav"]
    const playbackData = { recording: recordings[0], times: 1 }
    return (<Container><MenuSectionCallRx playbackSettings={playbackData} playbackRecordings={recordings} notifyState={true} onChange={action('changed')} onNotifyClick={action('clicked')} activeDigits={["0", "2", "4", "6", "8", "#"]} onDigitClick={action('clicked')} /></Container>)
  })
  .add("Digit Pressed Section", () => {
    const digitSection = [{
      digitPressed: "zero",
      actions: [{ action: "notifyEmail", email: "valid@domain.co.uk", label: "this-is_a_valid-label" },
      { action: "forwardToNumber", number: "0861217464", ringTimer: 30 },
      { action: "analytics", label: "my-label" },
      { action: "backToMenu" }]
    },
    {
      digitPressed: "one",
      actions: [{ action: "notifyEmail", email: "valid@dom@ain.co.uk", label: "this-is_an invalid-label" },
      { action: "forwardToNumber", number: "", ringTimer: 30 },
      { action: "analytics", label: "my-label" }]
    }]
    return (<Container>
      <MenuSectionDigitPressed digitSectionArray={digitSection} onChange={action('changed')} onDeleteClick={action('delete')} onAddClick={action('add')} />
    </Container>)
  })


storiesOf('Full Pages', module)
  .add("Open", () => {
    const recordings = ["recording1.wav", "recording2.wav", "recording3.wav"]
    const playbackData = { recording: recordings[0], times: 1 }
    const activeDigits = ["0", "1"]
    const digitSection = [{
      digitPressed: "zero",
      actions: [{ action: "notifyEmail", email: "valid@domain.co.uk", label: "this-is_a_valid-label" },
      { action: "forwardToNumber", number: "0861217464", ringTimer: 30 },
      { action: "analytics", label: "my-label" },
      { action: "backToMenu" }]
    },
    {
      digitPressed: "one",
      actions: [{ action: "notifyEmail", email: "valid@dom@ain.co.uk", label: "this-is_an invalid-label" },
      { action: "forwardToNumber", number: "", ringTimer: 30 },
      { action: "analytics", label: "my-label" }]
    }]
    return (<Container>
      <AccountHeader swithboardNumber="084412423535"/>
      <MainMenu tab="open" onClick={action('clicked')} />
      <MenuSectionCallRx playbackSettings={playbackData} playbackRecordings={recordings} notifyState={true} onChange={action('changed')} onNotifyClick={action('clicked')} activeDigits={activeDigits} onDigitClick={action('clicked')} />
      <MenuSectionDigitPressed digitSectionArray={digitSection} onChange={action('changed')} onDeleteClick={action('delete')} onAddClick={action('add')} />
    </Container>)
  })
  .add("Times (scheduled)", () => {
    const schedule = {
      openHours: [{ day: "mon", active: true, begin: "09:00", end: "17:00" },
      { day: "tue", active: true, begin: "09:00", end: "17:00" },
      { day: "wed", active: true, begin: "09:00", end: "17:00" },
      { day: "thu", active: true, begin: "09:00", end: "17:00" },
      { day: "fri", active: true, begin: "09:00", end: "13:00" },
      { day: "sat", active: false, begin: "09:00", end: "17:00" },
      { day: "sun", active: false, begin: "09:00", end: "17:00" }],
      lunchHours: [{ day: "mon", active: true, begin: "13:00", end: "14:00" },
      { day: "tue", active: true, begin: "13:00", end: "14:00" },
      { day: "wed", active: true, begin: "13:00", end: "14:00" },
      { day: "thu", active: true, begin: "13:00", end: "14:00" },
      { day: "fri", active: false, begin: "13:00", end: "13:00" },
      { day: "sat", active: false, begin: "09:00", end: "17:00" },
      { day: "sun", active: false, begin: "09:00", end: "17:00" }]
    }

    return (<Container>
      <AccountHeader swithboardNumber="084412423535"/>
      <MainMenu tab="times" onClick={action('clicked')} />
      <TimesSectionOpeningOptions selected="scheduled" onChange={action('changed')} />
      <TimesSectionWeek schedule={schedule} onChange={action('changed')} />
    </Container>)
  })
  .add("Times (open)", () => <Container>
      <AccountHeader swithboardNumber="084412423535"/><MainMenu tab="times" onClick={action('clicked')} />
      <TimesSectionOpeningOptions selected="alwaysOpen" onChange={action('changed')} />
      </Container>)

