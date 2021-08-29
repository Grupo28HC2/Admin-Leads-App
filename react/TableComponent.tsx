/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable max-params */
import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'vtex.styleguide'

interface Customer {
  id: string
  email: string
  name: string
  telephone: string
  prospect_date: string
  customer_date: string
}

const TableComponent: FC<{ listToShow: number }> = (props: {
  listToShow: number
}): JSX.Element => {
  const [leads, setLeads] = useState<Customer[]>([])
  const [tableLength, setTableLength] = useState<number>(leads.length)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsLength, setItemsLength] = useState<number>(tableLength)

  /*   const [slicedData, setSlicedData] = useState(
    Object.keys(leads).slice(0, tableLength)
  ) */

  const [currentItemFrom, setCurrentItemFrom] = useState<number>(1)
  const [currentItemTo, setCurrentItemTo] = useState<number>(10)

  const jsonSchema = {
    properties: {
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

  async function getLeads() {
    await api.get('/leads').then((response) => {
      setLeads(response.data.prospectos)
    })
  }

  useEffect(() => {
    getLeads()
    setItemsLength(leads.length)
  }, [])

  function handleNextClick() {
    const newPage = currentPage + 1
    const itemFrom = currentItemTo + 1
    const itemTo = tableLength * newPage
    const data = leads.slice(itemFrom - 1, itemTo)

    // console.log(`next data:${data}`)

    goToPage(newPage, itemFrom, itemTo, data)
  }

  function handlePrevClick() {
    if (currentPage === 0) return
    const newPage = currentPage - 1
    const itemFrom = currentItemFrom - tableLength
    const itemTo = currentItemFrom - 1
    const data = leads.slice(itemFrom - 1, itemTo)

    // console.log(`prev data: ${data}`)
    goToPage(newPage, itemFrom, itemTo, data)
  }

  function goToPage(
    currentPageInfo: number,
    currentItemFromInfo: number,
    currentItemToInfo: number,
    slicedData: Customer[]
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

  useEffect(() => {
    if (props.listToShow === 1) {
      setLeads(leads)
    }

    if (props.listToShow === 2) {
      setLeads(leads.filter((item: Customer) => !item.customer_date))
    }

    if (props.listToShow === 3) {
      setLeads(leads.filter((item: Customer) => item.customer_date))
    }
  }, [props.listToShow])

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
