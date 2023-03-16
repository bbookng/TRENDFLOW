import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainPage from '@/pages/MainPage';
import BaseLayout from '@/Layout/BaseLayout';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as ComponentMeta<typeof MainPage>;

const Template = () => (
  <BaseLayout>
    <MainPage />;
  </BaseLayout>
);

export const MainPageTemplate: ComponentStory<typeof MainPage> = Template.bind({});
MainPageTemplate.args = {};
