import styled from "@emotion/styled";
import PublicationItem from "./PublicationItem";
import FilterForm from "./FilterForm";
import {useCallback, useEffect, useMemo, useState} from "react";
import useFetchEditions from "../hooks/use-fetch-editions";
import Loading from "./Loading";
import PageHeader from "./PageHeader";

const StyledPublicationsPage = styled.div`
  position: relative;
  background: #f9f9f9;

  .grid-container {
    padding: 0 1rem 1rem;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas: "col";
    grid-gap: 1rem;
    transition: all .3s ease-in-out;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "col col";
    }
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: "col col col";
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-template-areas: "col col col col";
    }
  }
`

const NoContent = styled.p`
  font-size: 14px;
  opacity: .7;
  margin-top: 0;
`

const LoadMoreButton = styled.button`
  margin: 2rem auto;
  width: 150px;
  display: block;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  opacity: .8;
  padding: 1rem;
  border-radius: 4px;

  &:hover {
    background: #e9e9e9;
  }

  span {
    display: block;
    text-align: center;
    font-size: 12px;
    opacity: .5;
  }
`

export default function PublicationsPage() {

  const {editions, loading, fetchEditions} = useFetchEditions({page: 1, limit: 20})
  const [filterFields, setFilterFields] = useState(null)
  useEffect(() => {

    if (!filterFields) return

    const params = generateParams(1, filterFields)
    fetchEditions(params)
  }, [filterFields, fetchEditions])

  const handleLoadMore = useCallback(() => {
    const params = generateParams(editions.page + 1, filterFields)
    fetchEditions(params, true)
  }, [fetchEditions, editions?.page, filterFields])

  const publications = useMemo(() => editions?._embedded?.edition || [], [editions])

  return (
      <StyledPublicationsPage>
        <PageHeader title={"Publications"}
                    subtitle={"Search for what you made using our platform"}/>

        <FilterForm onChange={ff => setFilterFields(ff)}/>

        <div className="grid-container">
          {!!publications.length &&
          // p.ids are not unique
          publications.map((p, k) => (
              <PublicationItem key={p.id + "-" + k}
                               title={p.name}
                               category={p.category}
                               status={p.status}/>
          ))}

          {(!publications.length && !loading) &&
          <NoContent>Items not found.</NoContent>}
        </div>

        {editions?.page < editions?.page_count &&
        <LoadMoreButton onClick={handleLoadMore}>
          {loading ? "Loading..." : "Load More"}
          <span>{editions?.page}/{editions?.page_count}</span>
        </LoadMoreButton>}

      </StyledPublicationsPage>
  )
}

function generateParams(page, fields) {
  let params = {
    page,
    limit: 20,
    query: [
      {
        field: "name",
        type: "like",
        value: `%${fields?.trend || ""}%`
      },
    ]
  }

  if (fields?.category) {
    params.query.push({
      field: "category",
      type: "eq",
      value: fields.category
    })
  }

  return params
}
