import { useContext } from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import AlertList from '../../components/AlertList'
import { toggleIgnored } from '../../utils'
import { DataContext } from '../App'
import CourseSearch from '../CourseSearch'

import './style.css'

function TabMenu() {
  const [data, setData] = useContext(DataContext)

  const toggleIgnoredGradReqs = (id: number) => {
    data.graduationRequirementErrors = toggleIgnored(data.graduationRequirementErrors, id)
    setData(data)
  }

  return (
    <Tabs className="TabMenu">
      <TabList className="TabMenu__Tabs">
        <Tab className="TabMenu__Tabs__Tab">Courses</Tab>
        <Tab className="TabMenu__Tabs__Tab">Course Requirements</Tab>
        <Tab className="TabMenu__Tabs__Tab">Graduation Requirements</Tab>
      </TabList>

      <TabPanel>
        <CourseSearch />
      </TabPanel>
      <TabPanel>Course reqs</TabPanel>
      <TabPanel>
        <AlertList
          alerts={data.graduationRequirementErrors}
          toggleIgnored={toggleIgnoredGradReqs}
        />
      </TabPanel>
    </Tabs>
  )
}

export default TabMenu
