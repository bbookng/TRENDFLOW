import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainPage from '@/pages/MainPage';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as ComponentMeta<typeof MainPage>;

const Template = () => <MainPage />;

export const MainPageTemplate: ComponentStory<typeof MainPage> = Template.bind({});
MainPageTemplate.args = {};
