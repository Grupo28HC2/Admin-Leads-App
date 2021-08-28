/* eslint-disable max-params */
import React, { FC, useState } from 'react'
import { Layout, PageHeader, Tab, Tabs, PageBlock } from 'vtex.styleguide'

import TableComponent from './TableComponent'

const LeadsViewer: FC = () => {
  const [currentTab, setCurrentTab] = useState(1)

  return (
    <Layout fullWidth pageHeader={<PageHeader title="Leads List" />}>
      <PageBlock
        variation="full"
        title="Results"
        subtitle="Prospect and Customer data from AWS API"
      >
        <div>
          <div>
            <div className="mb5">
              <Tabs fullWidth>
                <Tab
                  label="All"
                  active={currentTab === 1}
                  onClick={() => setCurrentTab(1)}
                >
                  <TableComponent />
                </Tab>
                <Tab
                  label="Prospects"
                  active={currentTab === 2}
                  onClick={() => setCurrentTab(2)}
                >
                  <TableComponent />
                </Tab>
                <Tab
                  label="Customers"
                  active={currentTab === 3}
                  onClick={() => setCurrentTab(3)}
                >
                  <TableComponent />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </PageBlock>
    </Layout>
  )
}

export default LeadsViewer
