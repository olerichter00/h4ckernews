import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'

import Spinner from '../components/elements/spinner'

export default {
  title: 'Spinner',
  component: Spinner,
  argTypes: {},
} as Meta

const Template: Story = args => <Spinner {...args} />

export const Default = Template.bind({})
Default.args = {}
