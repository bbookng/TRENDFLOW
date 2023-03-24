import styled from '@emotion/styled';
import Typography from '@/components/atoms/Typography';
import { BadgePropsInterface } from '@/components/atoms/Badge';
import { badgeColorList } from '@/components/atoms/Badge/index.styles';

export const CountText = styled(Typography)<Partial<BadgePropsInterface>>`
  ${({ type }) => type && badgeColorList[type]}
`;
