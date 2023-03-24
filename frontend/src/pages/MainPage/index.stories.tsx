import { ComponentStory, ComponentMeta } from '@storybook/react';
import MainPage from '@/pages/MainPage';
import BaseLayout from '@/Layout/BaseLayout';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as ComponentMeta<typeof MainPage>;

const Template = () => (
  <ThemeComponent>
    <BaseLayout>
      <MainPage />
    </BaseLayout>
  </ThemeComponent>
);

export const MainPageTemplate: ComponentStory<typeof MainPage> = Template.bind({});
MainPageTemplate.args = {};
