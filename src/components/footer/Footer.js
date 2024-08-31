import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #00796b;
  color: #fff;
  text-align: center;
  padding: 1rem;
  position: sticky;
  bottom: 0;
  width: 100%;
  margin-top: auto;
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; 2024 Cuisinothèque - Tous droits réservés
    </FooterContainer>
  );
};

export default Footer;

