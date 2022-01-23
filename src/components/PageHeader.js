import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledPageHeader = styled.header(props => ({
  background: "#f0f0f0",
  padding: "4rem 2rem",
  textAlign: "center",
  "h2": {
    marginBottom: ".5rem"
  },
  "p": {
    margin: ".5rem",
    opacity: .7
  },
}))

export default function PageHeader({title, subtitle}) {
  return (
      <StyledPageHeader>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </StyledPageHeader>)
}

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}