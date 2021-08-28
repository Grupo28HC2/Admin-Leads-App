/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable max-params */
import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'vtex.styleguide'

const TableComponent: FC = () => {
  const [leads, setLeads] = useState({})
  const [tableLength, setTableLength] = useState(10)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsLength /* , setItemsLength */] = useState(
    Object.keys(leads).length
  )
  /*   const [slicedData, setSlicedData] = useState(
    Object.keys(leads).slice(0, tableLength)
  ) */

  const [currentItemFrom, setCurrentItemFrom] = useState(1)
  const [currentItemTo, setCurrentItemTo] = useState(tableLength)

  const jsonSchema = {
    properties: {
      id: {
        type: 'number',
        title: 'Id',
        width: 50,
      },
      name: {
        type: 'string',
        title: 'Name',
        width: 300,
      },
      email: {
        type: 'string',
        title: 'Email',
        width: 250,
      },
      telephone: {
        type: 'string',
        title: 'Telephone',
        width: 150,
      },
      prospect_date: {
        type: 'string',
        title: 'Prospect Date',
        width: 120,
      },
      customer_date: {
        type: 'string',
        title: 'Customer Date',
        width: 120,
      },
    },
  }

  const api = axios.create({
    baseURL: 'https://yomcu4f1tc.execute-api.us-east-2.amazonaws.com/default',
  })

  useEffect(() => {
    async function getLeads() {
      await api.get('/leads').then((response) => {
        setLeads(response.data.prospectos)
      })
    }

    getLeads()
  }, [api])

  function handleNextClick() {
    const newPage = currentPage + 1
    const itemFrom = currentItemTo + 1
    const itemTo = tableLength * newPage
    const data = Object.keys(leads).slice(itemFrom - 1, itemTo)

    goToPage(newPage, itemFrom, itemTo, data)
  }

  function handlePrevClick() {
    if (currentPage === 0) return
    const newPage = currentPage - 1
    const itemFrom = currentItemFrom - tableLength
    const itemTo = currentItemFrom - 1
    const data = Object.keys(leads).slice(itemFrom - 1, itemTo)

    goToPage(newPage, itemFrom, itemTo, data)
  }

  function goToPage(
    currentPageInfo: React.SetStateAction<number>,
    currentItemFromInfo: React.SetStateAction<number>,
    currentItemToInfo: React.SetStateAction<number>,
    // eslint-disable-next-line @typescript-eslint/ban-types
    slicedData: React.SetStateAction<Object>
  ) {
    setCurrentPage(currentPageInfo)
    setCurrentItemFrom(currentItemFromInfo)
    setCurrentItemTo(currentItemToInfo)
    setLeads(slicedData)
  }

  function handleRowsChange(value: string) {
    setTableLength(parseInt(value))
    setCurrentItemTo(parseInt(value))
  }

  return (
    <Table
      fullWidth
      schema={jsonSchema}
      pagination={{
        onNextClick: handleNextClick,
        onPrevClick: handlePrevClick,
        currentItemFrom,
        currentItemTo,
        onRowsChange: handleRowsChange,
        totalItems: itemsLength,
        textShowRows: 'Show rows',
        textOf: 'of',
        rowsOptions: [10, 50, 100],
      }}
      items={leads}
      emptyStateLabel="Attention!"
      emptyStateChildren={
        <React.Fragment>
          <p>No leads to show.</p>
          <div className="pt5">
            <Button variation="secondary" size="small">
              <span className="flex align-baseline">
                Wait for new prospects to register through the storefront form.
              </span>
            </Button>
          </div>
        </React.Fragment>
      }
    />
  )
}

export default TableComponent
