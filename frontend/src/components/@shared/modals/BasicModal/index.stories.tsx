import { ComponentStory, ComponentMeta } from '@storybook/react';

import BasicModal from './index';

export default {
  title: 'Modals/BasicModal',
  component: BasicModal,
} as ComponentMeta<typeof BasicModal>;

const Template: ComponentStory<typeof BasicModal> = () => <BasicModal />;

export const Primary = Template.bind({});
Primary.args = {};
