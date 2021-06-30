import React, { useRef, useState } from 'react'

import { Story } from '@storybook/react'

import { Button } from 'components/Button'

import { Popup } from './Popup'
import { PopupProps } from './types'

export default {
  component: Popup,
  title: 'Components/Popup'
}

const Template: Story<PopupProps> = args => {
  const anchorRef = useRef<HTMLButtonElement>()
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Button
        text='Click me'
        ref={anchorRef}
        onClick={() => setIsVisible(true)}
      />
      <Popup
        {...args}
        anchorRef={anchorRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      >
        Popup content
      </Popup>
    </>
  )
}

// Primary
export const Primary = Template.bind({})
const primaryProps: Omit<
  PopupProps,
  'children' | 'anchorRef' | 'isVisible'
> = {}

Primary.args = primaryProps

// With Header
export const WithHeader = Template.bind({})
const withHeaderProps: Omit<
  PopupProps,
  'children' | 'anchorRef' | 'isVisible'
> = {
  title: 'My Title'
}

WithHeader.args = withHeaderProps
