import React, { SVGAttributes } from 'react'

import { Story } from '@storybook/react'

import * as icons from './'

export default {
  component: icons.IconAlbum,
  title: 'Foundations/Icons'
}

const exclusions = new Set(['BgWaveSmall', 'BgWaveLarge'])

const Template: Story<SVGAttributes<SVGElement>> = args => {
  return (
    <>
      <p>
        Icons are <code>svg</code> elements and can accept any <code>svg</code>{' '}
        attributes.
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {Object.entries(icons).map(([name, exported]) => {
          if (exclusions.has(name)) return null
          const Icon = exported
          return (
            <div key={name} style={{ margin: 24 }}>
              <div>
                <b>{name}</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ background: 'white', padding: 8 }}>
                  <Icon height={50} width={50} {...args} />
                </div>
                <div style={{ background: 'black', padding: 8 }}>
                  <Icon height={50} width={50} {...args} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export const All = Template.bind({})
