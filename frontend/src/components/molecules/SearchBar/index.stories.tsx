import { ComponentMeta, ComponentStory } from '@storybook/react';
import SearchBar from '@/components/molecules/SearchBar';

export default {
  title: 'Molecules/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = () => <SearchBar />;

export const SearchBarTemplate = Template.bind({});
