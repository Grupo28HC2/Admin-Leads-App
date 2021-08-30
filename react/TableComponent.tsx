/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'vtex.styleguide'
import { format, parse } from 'date-fns'

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
  const [items, setItems] = useState<Customer[]>([])

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
      setLeads(formatDates(response.data.prospectos))
    })
  }

  function formatDates(data: Customer[]) {
    data.forEach((element: Customer) => {
      if (
        element.customer_date !== null &&
        element.customer_date !== undefined &&
        element.customer_date !== ''
      ) {
        const treatedDate = parse(
          element.customer_date,
          'yyyy/MM/dd',
          new Date()
        )

        element.customer_date = format(treatedDate, 'dd/MM/yyyy').toString()
      }

      if (
        element.prospect_date !== null &&
        element.prospect_date !== undefined &&
        element.prospect_date !== ''
      ) {
        const treatedDate = parse(
          element.prospect_date,
          'yyyy/MM/dd',
          new Date()
        )

        element.prospect_date = format(treatedDate, 'dd/MM/yyyy').toString()
      }
    })

    return data
  }

  useEffect(() => {
    getLeads()
  }, [])

  useEffect(() => {
    if (props.listToShow === 1) {
      setItems(leads)
    }

    if (props.listToShow === 2) {
      setItems(leads?.filter((item: Customer) => !item.customer_date))
    }

    if (props.listToShow === 3) {
      setItems(leads?.filter((item: Customer) => item.customer_date))
    }
  }, [props.listToShow, leads])

  return (
    <Table
      fullWidth
      schema={jsonSchema}
      items={items}
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
