import { Story, Meta } from '@storybook/react/types-6-0'
import AppBarMobile from '../../AppBarMobile/AppBarMobile'
import { AppBarMobileProps } from '../../../types/types'

export default {
  version: '14.1',
  component: AppBarMobile,
} as Meta

const Template: Story<AppBarMobileProps> = (args) => <AppBarMobile {...args} />

export const Empty = Template.bind({})
Empty.args = {
  version: '14.1',
}
