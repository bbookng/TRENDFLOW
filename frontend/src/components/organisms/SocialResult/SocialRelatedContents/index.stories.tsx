import { ComponentMeta, ComponentStory } from '@storybook/react';
import SocialRelatedContents, {
  SocialRelatedContentsInterface,
} from '@/components/organisms/SocialResult/SocialRelatedContents';
import { handlers } from '@/mocks/handlers';

export default {
  title: 'organisms/SocialResult/SocialRelatedContents',
  component: SocialRelatedContents,
  argTypes: {
    keyword: {
      name: 'keyword',
      type: { name: 'string' },
      defaultValue: '삼성전자',
      control: {
        type: 'text',
      },
    },
    startDate: {
      name: 'startDate',
      type: { name: 'string' },
      defaultValue: '2023-04-01',
      control: {
        type: 'text',
      },
    },
    endDate: {
      name: 'endDate',
      type: { name: 'string' },
      defaultValue: '2023-04-04',
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<typeof SocialRelatedContents>;

const Template: ComponentStory<typeof SocialRelatedContents> = ({
  isSocialAnalysisDataLoading,
  isWordCloudKeywordsSuccess,
  keyword,
  startDate,
  endDate,
}: SocialRelatedContentsInterface) => (
  <SocialRelatedContents
    isSocialAnalysisDataLoading={isSocialAnalysisDataLoading}
    isWordCloudKeywordsSuccess={isWordCloudKeywordsSuccess}
    keyword={keyword}
    startDate={startDate}
    endDate={endDate}
  />
);

export const Primary = Template.bind({});
Primary.args = {};
Primary.parameters = {
  msw: {
    handlers: [...handlers],
  },
};
