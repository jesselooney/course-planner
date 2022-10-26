import objstr from 'obj-str'
import { useContext } from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import AlertList from '../../components/AlertList'
import { toggleIgnored } from '../../utils/toggleIgnored'
import { DataContext } from '../App'
import CourseSearch from '../CourseSearch'
import { GraduationOptionsSelect } from '../GraduationOptionsSelect'

import './style.css'

function TabMenu() {
  const [data, setData] = useContext(DataContext)

  function toggleIgnoredGradReqs(id: number) {
    const newData = {
      ...data,
      graduationRequirementErrors: toggleIgnored(data.graduationRequirementErrors, id),
    }
    setData(newData)
  }

  function toggleIgnoredCourseReqs(id: number) {
    const newData = {
      ...data,
      courseRequirementErrors: toggleIgnored(data.courseRequirementErrors, id),
    }
    setData(newData)
  }

  const gradReqErrorCount = data.graduationRequirementErrors.filter(
    (e) => e.ignored === false,
  ).length

  const courseReqErrorCount = data.courseRequirementErrors.filter((e) => e.ignored === false).length

  return (
    <Tabs className="TabMenu">
      <TabList className="TabMenu__Tabs">
        <Tab className="TabMenu__Tabs__Tab">Courses</Tab>
        <Tab className="TabMenu__Tabs__Tab">
          Prerequisites
          <span
            className={objstr({
              TabMenu__Tabs__Tab__Badge: true,
              'TabMenu__Tabs__Tab__Badge--hidden': courseReqErrorCount === 0,
            })}
          >
            {courseReqErrorCount}
          </span>
        </Tab>
        <Tab className="TabMenu__Tabs__Tab">
          Graduation Requirements
          <span
            className={objstr({
              TabMenu__Tabs__Tab__Badge: true,
              'TabMenu__Tabs__Tab__Badge--hidden': gradReqErrorCount === 0,
            })}
          >
            {gradReqErrorCount}
          </span>
        </Tab>
      </TabList>

      <TabPanel>
        <CourseSearch />
      </TabPanel>
      <TabPanel>
        <AlertList alerts={data.courseRequirementErrors} toggleIgnored={toggleIgnoredCourseReqs} />
      </TabPanel>
      <TabPanel>
        <AlertList
          alerts={data.graduationRequirementErrors}
          toggleIgnored={toggleIgnoredGradReqs}
        />
        <GraduationOptionsSelect />
      </TabPanel>
    </Tabs>
  )
}

export default TabMenu
