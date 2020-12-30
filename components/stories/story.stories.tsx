import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { RecoilRoot } from 'recoil'

import StoryComponent from './story'

export default {
  title: 'Story',
  component: StoryComponent,
  argTypes: {},
} as Meta

const Template: Story = args => (
  <RecoilRoot>
    <div className="max-w-3xl">
      <StoryComponent {...args} />
    </div>
  </RecoilRoot>
)

export const Loading = Template.bind({})
Loading.args = {
  show: true,
  story: {
    state: 'loading',
    contents: {},
  },
}

export const withContent = Template.bind({})
withContent.args = {
  show: true,
  story: {
    state: 'hasValue',
    contents: {
      title: 'Lorem ipsum dolor sit amet',
      score: 84,
      text:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
      id: '123',
      url: 'https://www.example.com',
    },
  },
}
