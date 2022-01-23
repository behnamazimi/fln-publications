import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledLoading = styled.span`
  display: ${props => props.active ? "inline-block" : "none"};
  position: absolute;
  right: 1rem;
  top: 1.5rem;
  z-index: 2;
`

export default function Loading({active}) {
  return (
      <StyledLoading active={active}>
        Loading...
      </StyledLoading>
  )
}


Loading.propTypes = {
  active: PropTypes.bool
}