import { Story, Meta } from '@storybook/react/types-6-0'
import AppBarMobile, {
  AppBarMobileProps,
} from '../../AppBarMobile/AppBarMobile'

export default {
  version: '14.1',
  component: AppBarMobile,
} as Meta

const Template: Story<AppBarMobileProps> = (args) => <AppBarMobile {...args} />

export const Authenticated = Template.bind({})
Authenticated.args = {
  version: '14.1',
  isAuthenticated: true,
  username: 'usertest@chupito.com',
  onLogin: () => {},
  onLogout: () => {},
}

export const NoAuthenticated = Template.bind({})
NoAuthenticated.args = {
  version: '14.1',
  isAuthenticated: false,
  username: '',
  onLogin: () => {},
  onLogout: () => {},
}
