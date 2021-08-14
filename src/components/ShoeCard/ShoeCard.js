import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStr = {
    'new-release': 'Just Released!',
    'on-sale': 'Sale'
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant !== 'default' && <Tag variant={variant}><span>{variantStr[variant]}</span></Tag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
          
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex: 1 1 280px;
  max-width: 320px;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex: 1;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  flex: 1;
`;

const Tag = styled.div`
  position: absolute;
  border-radius: 2px;
  background-color: ${({variant}) => {
    if(variant === 'on-sale') return `${COLORS.primary};`;
    if(variant === 'new-release') return `${COLORS.secondary};`;
  }};
  color: ${COLORS.white};
  font-weight: ${WEIGHTS.bold};
  padding: 10px;
  top: 12px;
  right: -4px;
`

const Price = styled.span`
  align-self: flex-end;
  ${({variant}) => variant === 'on-sale' && `
    text-decoration: line-through;
    color: ${COLORS.gray[500]};
  `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  flex: 1;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
