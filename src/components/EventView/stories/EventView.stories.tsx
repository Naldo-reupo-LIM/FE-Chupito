import { Story, Meta } from '@storybook/react/types-6-0'

import EventView, { EventViewProps } from '../EventView'

export default {
  title: 'Container/EventView',
  component: EventView,
} as Meta

const Template: Story<EventViewProps> = (args) => <EventView {...args} />

export const Empty = Template.bind({})
Empty.args = {
  eventType: '',
  eventName: '',
  eventDate: '',
  address: '',
  phoneNumber: '',
  headquarters: [
    { _id: '1', name: 'Piura' },
    { _id: '2', name: 'Lima' },
  ],
  headquarter: '',
  isLoading: false,
  validation: {
    name: { error: false, message: '' },
    date: { error: false, message: '' },
  },
  onChangeEventName: () => {},
  onChangeEventDate: () => {},
  onChangeAddress: () => {},
  onChangePhoneNumber: () => {},
}
