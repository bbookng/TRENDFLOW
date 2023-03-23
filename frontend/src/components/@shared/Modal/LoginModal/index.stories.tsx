import { ComponentMeta, ComponentStory } from '@storybook/react';
import LoginModal from '@/components/@shared/Modal/LoginModal';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: '@shared/Modal/LoginModal',
  component: LoginModal,
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = () => (
  <ThemeComponent>
    <LoginModal width="400px" height="360px" handleClickModalClose={() => {}} />
  </ThemeComponent>
);

export const DarkMode = Template.bind({});
DarkMode.args = {};
