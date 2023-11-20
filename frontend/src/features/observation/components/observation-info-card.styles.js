import styled from "styled-components";
import { Text } from "../../../components/typography/text.components";
import { Card } from "react-native-paper";

export const ObservationCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ObservationCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ObservationDate = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const ObservationComment = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const ObservationName = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.ui.secondary};
`;

export const Info = styled.View`
  padding-left: ${(props) => props.theme.space[3]};
  padding-right: ${(props) => props.theme.space[3]};
  padding-bottom: ${(props) => props.theme.space[3]};
`;

export const Section = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[5]};
  justify-content: space-between;
`;
