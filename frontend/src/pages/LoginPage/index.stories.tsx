import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginPage from '@/pages/LoginPage';

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template = () => <LoginPage />;

export const LoginPageTemplate: ComponentStory<typeof LoginPage> = Template.bind({});
LoginPageTemplate.args = {};
