"use client";
import GlobalStyles from '@/styles/GlobalStyles';
import styled from 'styled-components';
const Container = styled.div`
  overflow-x: hidden;
`;

export default function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <GlobalStyles />
      {children}
    </Container>
  );
};
