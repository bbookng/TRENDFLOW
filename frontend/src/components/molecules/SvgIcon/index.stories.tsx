import { ComponentMeta, ComponentStory } from '@storybook/react';
import SvgIcon, { SvgIconProps } from '@/components/molecules/SvgIcon';
import { Like } from '@/assets';
import ThemeComponent from '@/components/@shared/Storybook/ThemeComponent';

export default {
  title: 'molecules/SvgIcon',
  component: SvgIcon,
  argTypes: {
    size: {
      control: { type: 'number', min: 10, max: 200, step: 10 },
    },
  },
} as ComponentMeta<typeof SvgIcon>;

const Template: ComponentStory<typeof SvgIcon> = ({ size }: SvgIconProps) => (
  <ThemeComponent>
    <SvgIcon size={size}>
      <Like />
    </SvgIcon>
  </ThemeComponent>
);

export const Primary = Template.bind({});
Primary.args = {
  size: 96,
};
