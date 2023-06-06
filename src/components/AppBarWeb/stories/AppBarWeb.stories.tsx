import { Story, Meta } from '@storybook/react/types-6-0'
import AppBarWeb from '../AppBarWeb'
import { AppBarWebProps } from '../../../types/types'

export default {
  title: 'AppBarWeb',
  component: AppBarWeb,
} as Meta

const Template: Story<AppBarWebProps> = (args) => <AppBarWeb {...args} />

export const Empty = Template.bind({})
Empty.args = {
  title: '14.1',
}
