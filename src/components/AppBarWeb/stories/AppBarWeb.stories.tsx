import { Story, Meta } from '@storybook/react/types-6-0'
import AppBarWeb, { AppBarWebProps } from '../AppBarWeb'

export default {
  title: 'AppBarWeb',
  component: AppBarWeb,
} as Meta

const Template: Story<AppBarWebProps> = (args) => <AppBarWeb {...args} />

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
