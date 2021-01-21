import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { RecoilRoot } from 'recoil'

import StoryListComponent, { StoryListProps } from '../components/features/stories/storyList'

export default {
  title: 'StoryList',
  component: StoryListComponent,
  argTypes: {},
} as Meta

const Template: Story = args => (
  <RecoilRoot>
    <div className="max-w-full sm:max-w-3xl">
      <StoryListComponent {...(args as StoryListProps)} />
    </div>
  </RecoilRoot>
)

export const Default = Template
Default.args = {
  type: 'top',
  stories: {
    state: 'hasValue',
    contents: [
      {
        title: 'Lorem ipsum dolor sit amet',
        score: 84,
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        id: '123',
        url: 'https://www.example.com',
        imageUrls: [
          'https://www.tagesspiegel.de/images/grosser-panda-meng-meng_zoo-berlin/24195486/2-format43.jpg',
        ],
        descendants: 4,
      },
      {
        title: 'Lorem ipsum dolor sit amet',
        score: 84,
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        id: '123',
        url: 'https://www.example.com',
        imageUrls: [
          'https://www.tagesspiegel.de/images/grosser-panda-meng-meng_zoo-berlin/24195486/2-format43.jpg',
        ],
        descendants: 4,
      },
      {
        title: 'Lorem ipsum dolor sit amet',
        score: 84,
        text:
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
        id: '123',
        url: 'https://www.example.com',
        descendants: 4,
      },
    ],
  },
}

export const loading = Template.bind({})
loading.args = {
  type: 'top',
  stories: {
    state: 'loading',
  },
}

export const error = Template.bind({})
error.args = {
  type: 'top',
  stories: {
    state: 'hasError',
  },
}
