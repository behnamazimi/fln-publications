import styled from "@emotion/styled";
import PropTypes from "prop-types";

const StyledPublicationItem = styled.div(props => ({
  background: "#fefefe",
  borderRadius: 5,
  padding: "1rem",
  cursor: "pointer",
  transition: "all .3s",
  boxShadow: "0px 0px 2px 0px rgba(145,158,171,.2), 0px 12px 24px -4px rgba(145,158,171,.12)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  "&:hover": {
    boxShadow: "0px 0px 2px 0px rgba(145,158,171,.4), 0px 12px 24px -4px rgba(145,158,171,.2)",
  },
  "h3": {
    margin: "0 0 .5rem 0",
    fontSize: 16,
    opacity: .8
  },
  "span.category, span.status": {
    background: "#1ABC9C",
    color: "#fff",
    padding: "0.2rem 0.25rem",
    lineHeight: 1,
    borderRadius: 3,
    display: "inline-block",
    fontSize: 14,
    marginRight: 6
  },
  "span.status": {
    background: "#e9b04d",
  }
}))

export default function PublicationItem({title, category, status}) {
  return (
      <StyledPublicationItem>
        <h3>{title}</h3>
        <div className="meta">
          {!!category &&
          <span className={"category"}>{category}</span>}
          <span className={"status"}>{status}</span>
        </div>
      </StyledPublicationItem>
  )
}

PublicationItem.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  status: PropTypes.string,
}