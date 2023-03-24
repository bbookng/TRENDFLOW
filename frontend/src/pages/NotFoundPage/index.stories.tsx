import { ComponentStory, ComponentMeta } from '@storybook/react';
import NotFoundPage from '@/pages/NotFoundPage';

export default {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
} as ComponentMeta<typeof NotFoundPage>;

const Template = () => <NotFoundPage />;

export const NotFoundPageTemplate: ComponentStory<typeof NotFoundPage> = Template.bind({});
NotFoundPageTemplate.args = {};
