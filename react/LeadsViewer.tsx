import React, { FC, useState, useEffect } from 'react'
import { Layout, PageHeader, Tab, Tabs, PageBlock } from 'vtex.styleguide'

import TableComponent from './TableComponent'

const LeadsViewer: FC = () => {
  const [currentTab, setCurrentTab] = useState(1)

  useEffect(() => {
    setCurrentTab(currentTab)
  }, [currentTab])

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
                  <TableComponent listToShow={1} />
                </Tab>
                <Tab
                  label="Prospects"
                  active={currentTab === 2}
                  onClick={() => setCurrentTab(2)}
                >
                  <TableComponent listToShow={2} />
                </Tab>
                <Tab
                  label="Customers"
                  active={currentTab === 3}
                  onClick={() => setCurrentTab(3)}
                >
                  <TableComponent listToShow={3} />
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
