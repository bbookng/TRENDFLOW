import { ComponentStory, ComponentMeta } from '@storybook/react';
import YoutubeMainPage from '@/pages/YoutubeMainPage';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';
import BaseLayout from '@/layouts/BaseLayout';

export default {
  title: 'Pages/YoutubeMainPage',
  component: YoutubeMainPage,
} as ComponentMeta<typeof YoutubeMainPage>;

const Template = () => (
  <ThemeComponent>
    <BaseLayout>
      <YoutubeMainPage />
    </BaseLayout>
  </ThemeComponent>
);

export const YoutubeMainPageTemplate: ComponentStory<typeof YoutubeMainPage> = Template.bind({});
YoutubeMainPageTemplate.args = {};
