import { ComponentMeta, ComponentStory } from '@storybook/react';
import ContentList from './index';

export default {
  title: 'Organisms/ContentList',
  component: ContentList,
} as ComponentMeta<typeof ContentList>;

const Template: ComponentStory<typeof ContentList> = () => <ContentList></ContentList>;

export const ContentItemTemplate = Template.bind({});
ContentItemTemplate.args = {};
