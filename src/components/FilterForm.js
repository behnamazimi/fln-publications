import styled from "@emotion/styled";
import {useCallback, useState} from "react";
import useDebounce from "../hooks/use-debounce";
import {useData} from "../contexts/data.context";
import PropTypes from "prop-types";
import Loading from "./Loading";

const StyledFilterForm = styled.form(props => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  background: "#f8f8f9",
  marginBottom: "1rem",
  padding: "1rem",
  "input, select": {
    border: "none",
    boxShadow: "0px 0px 2px 0px rgba(145,158,171,.2), 0px 12px 24px -4px rgba(145,158,171,.12)",
    padding: ".5rem .75rem",
    borderRadius: 4,
    transition: "all .3s ease-in-out",
    marginRight: ".5rem",
    "&::placeholder": {
      opacity: .7
    },
    "&:focus": {
      outline: "none",
      boxShadow: "0px 0px 2px 1px rgba(25,188,55,.7), 0px 12px 24px -4px rgba(145,158,171,.12)",
    }
  }
}))


export default function FilterForm({onChange}) {

  const {state} = useData()

  const [fields, setFields] = useState({
    trend: "",
    category: ""
  })

  useDebounce(fields, () => {
    onChange?.(fields)
  }, 300)

  const handleFieldChange = useCallback((key, value) => {
    setFields(s => ({...s, [key]: value}))
  }, [setFields])

  return (
      <StyledFilterForm onSubmit={e => e.preventDefault()}
                        data-testid={"filter-form"}>
        <Loading active={!state.loading}/>
        <input placeholder={"Search by name"}
               onChange={e => handleFieldChange("trend", e.target.value)}
               value={fields.trend}
               data-testid={"trend-input"}/>
        <select name="category" placeholder={"Category"}
                onChange={e => handleFieldChange("category", e.target.value)}
                value={fields.category}>
          <option value="">All</option>
          {!!state.categories.length &&
          state.categories.map(c => (<option key={c} value={c}>{c}</option>))}
        </select>
      </StyledFilterForm>
  )
}

FilterForm.propTypes = {
  onChange: PropTypes.func.isRequired
}