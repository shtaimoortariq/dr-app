import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './Edit-enroll.scss'
import EnrollNavigation from '../Enroll-navigation/EnrollNavigation'
import PersonalInfo from '../Enroll-components/PersonalInfo/PersonalInfo'
import BillingInfo from '../Enroll-components/BillingInfo/BillingInfo'
import HealthIdentification from '../Enroll-components/HealthIdentification/HealthIdentification'
import HealthAllergy from '../Enroll-components/HealthAllergy/HealthAllergy'
import HealthDiseases from '../Enroll-components/HealthDiseases/HealthDiseases'
import HealthTreatments from '../Enroll-components/HealthTreatments/HealthTreatments'
import HealthTrends from '../Enroll-components/HealthTrends/HealthTrends'
import HealthRiskFactors from '../Enroll-components/HealthRiskFactors/HealthRiskFactors'
import HealthImaging from '../Enroll-components/HealthImaging/HealthImaging'
import HealthFamilyDoctor from '../Enroll-components/HealthFamilyDoctor/HealthFamilyDoctor'
import Header from '../../../layout/Header/Header'
import { useSelector, useDispatch } from 'react-redux'
import { getPatientHealthInfo, setPatientHealthInfo } from '../../../../store/actions/enroll'

const EditEnroll = () => {
  const initialState = {
    patientHealthInfo: {},
    isLoading: false,
    errorMessage: null,
    isEdit: false,
    isSubmit: false,
    isPatientHistoryLoading:false
  }

  let { editEnrollId } = useParams()

  useEffect(() => {
    dispatch(getPatientHealthInfo({ id: editEnrollId }));
    setData({
      ...data,
      isPatientHistoryLoading: true
    })
  }, [])



  const [data, setData] = useState(initialState)
  const history = useHistory()
  const [currentTab, setCurrentTab] = useState('PersonalInfo')
  const [currentTabNumber, setCurrentTabNumber] = useState(10)
  const dispatch = useDispatch()

  const setTabNumber = val => {
    setCurrentTabNumber(val)
  }

  const setTab = val => {
    setCurrentTab(val)
  }

  const billingInformation = val => {
    let temp = data.patientHealthInfo;
    temp['billing'] = val;
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthIdentification')
  }

  const HealthIdentificationInformation = val => {
    let temp = data.patientHealthInfo
    temp['identification'] = val
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthAllergy')
  }

  const HealthAllergyInformation = val => {
    let temp = data.patientHealthInfo
    temp['allergy'] = val
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthDiseases')
  }

  const HealthDiseasesInformation = val => {
    let temp = data.patientHealthInfo
    temp['active_past_diseases'] = val ? val : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthTreatments')
  }
  const HealthTreatmentsInformation = val => {
    let temp = data.patientHealthInfo
    temp['active_discontinued_treatments'] = val ? val : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthTrends')
  }

  const HealthTrendsInformation = val => {
    let temp = data.patientHealthInfo
    temp['health_trends'] = val ? val.health_trends : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthRiskFactors')
  }

  const HealthRiskFactorsInformation = val => {
    let temp = data.patientHealthInfo
    temp['risk_factors'] = val ? val : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthImaging')
  }

  const HealthImagingInformation = val => {
    let temp = data.patientHealthInfo
    temp['imaging'] = val ? val.imaging : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
    setCurrentTab('HealthFamilyDoctor')
  }

  const FamilyDoctorInformation = val => {
    let temp = data.patientHealthInfo
    temp['family_doctor'] = val ? val.family_doctor : {}
    setData({
      ...data,
      patientHealthInfo: temp,
      isLoading: true,
      isSubmit: true
    })
    dispatch(setPatientHealthInfo(data.patientHealthInfo))
  }

  const goPreviousPage = (tabNumber, tabName) => {
    setTabNumber(tabNumber)
    setCurrentTab(tabName)
  }

  useSelector(state => {
    if (state && state.enroll.getPatientHealthInfo.data && !data.isEdit) {
      let temp = state.enroll.getPatientHealthInfo.data.health_record;
      temp['user_info'] = state.enroll.getPatientHealthInfo.data.user_info;
      temp['billing'] = state.enroll.getPatientHealthInfo.data.billing;
      temp['identification'] = state.enroll.getPatientHealthInfo.data.identification;
      setData({
        ...data,
        isEdit: true,
        patientHealthInfo: temp
      })
    }

    if (state && state.enroll.addPatientHealthInfo.data && data.isSubmit) {
      history.push(`/patient`)
    }

    if (
      state &&
      state.enroll.addPatientHealthInfo.error &&
      data.isLoading
    ) {
      if(state.enroll.addPatientHealthInfo.error && state.enroll.addPatientHealthInfo.error.message) Notification('error', 'Error', state.enroll.addPatientHealthInfo.error.message )
      setData({
        ...data,
        isLoading: false,
      })
    }

    if(state && state.enroll.getPatientHealthInfo.error && data.isPatientHistoryLoading ){
      if(state.enroll.addPatientHealthInfo.error && state.enroll.addPatientHealthInfo.error.message) Notification('error', 'Error',state.enroll.getPatientHealthInfo.error.message )
      
      setData({
        ...data,
        isPatientHistoryLoading: false,
      })
    }

  })

  const setUserInfo = val => {
    let temp = data.patientHealthInfo
    temp['user_info'] = val ? val : {}
    setData({
      ...data,
      patientHealthInfo: temp
    })
  }

  return (
    <div className='main'>
      <Header />
      <div className="container-fluid">
        <Row>
          <Col md={4} className="enroll-left">
            <EnrollNavigation
              changeTab={setTab}
              currentTabNumber={currentTabNumber}
              isEdit={data.isEdit}
              currentTab={currentTab}
            />
          </Col>
          <Col md={8} className="enroll-right">
            {(() => {
              switch (currentTab) {
                case 'PersonalInfo':
                  return (
                    <PersonalInfo
                      changeTab={setTab}
                      user_info={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.user_info
                          ? data.patientHealthInfo.user_info
                          : {}
                      }
                      userInfo={setUserInfo}
                      changeCurrentTabNumber={setTabNumber}
                    />
                  )
                case 'BillingInfo':
                  return (
                    <BillingInfo
                      billingInformation={billingInformation}
                      setBillingInfo={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.billing
                          ? data.patientHealthInfo.billing
                          : {}
                      }
                    />
                  )
                case 'HealthIdentification':
                  return (
                    <HealthIdentification
                      healthIdentificationInformation={
                        HealthIdentificationInformation
                      }
                      setHealthIdentificationInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.identification
                          ? data.patientHealthInfo.identification
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'BillingInfo')
                      }
                    />
                  )
                case 'HealthAllergy':
                  return (
                    <HealthAllergy
                      healthAllergyInformation={HealthAllergyInformation}
                      setHealthAllergyInformation={
                        data.patientHealthInfo && data.patientHealthInfo.allergy
                          ? data.patientHealthInfo.allergy
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(
                          currentTabNumber - 1,
                          'HealthIdentification'
                        )
                      }
                    />
                  )
                case 'HealthDiseases':
                  return (
                    <HealthDiseases
                      healthDiseasesInformation={HealthDiseasesInformation}
                      setHealthDiseasesInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.active_past_diseases
                          ? data.patientHealthInfo.active_past_diseases
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'HealthAllergy')
                      }
                    />
                  )
                case 'HealthTreatments':
                  return (
                    <HealthTreatments
                      healthTreatmentsInformation={HealthTreatmentsInformation}
                      setHealthTreatmentsInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.active_discontinued_treatments
                          ? data.patientHealthInfo
                            .active_discontinued_treatments
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'HealthDiseases')
                      }
                    />
                  )
                case 'HealthTrends':
                  return (
                    <HealthTrends
                      healthTrendsInformation={HealthTrendsInformation}
                      setHealthTrendsInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo
                          ? data.patientHealthInfo
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'HealthTreatments')
                      }
                    />
                  )
                case 'HealthRiskFactors':
                  return (
                    <HealthRiskFactors
                      healthRiskFactorsInformation={
                        HealthRiskFactorsInformation
                      }
                      setHealthRiskFactorsInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo.risk_factors
                          ? data.patientHealthInfo.risk_factors
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'HealthTrends')
                      }
                    />
                  )
                case 'HealthImaging':
                  return (
                    <HealthImaging
                      healthImagingInformation={HealthImagingInformation}
                      setHealthImagingInformation={
                        data.patientHealthInfo && data.patientHealthInfo
                          ? data.patientHealthInfo
                          : {}
                      }
                      goBack={() =>
                        goPreviousPage(
                          currentTabNumber - 1,
                          'HealthRiskFactors'
                        )
                      }
                    />
                  )
                case 'HealthFamilyDoctor':
                  return (
                    <HealthFamilyDoctor
                      familyDoctorInformation={FamilyDoctorInformation}
                      setFamilyDoctorInformation={
                        data.patientHealthInfo &&
                          data.patientHealthInfo
                          ? data.patientHealthInfo
                          : {}
                      }
                      loader={data.isLoading}
                      goBack={() =>
                        goPreviousPage(currentTabNumber - 1, 'HealthImaging')
                      }
                    />
                  )
                default:
                  return <PersonalInfo />
              }
            })()}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EditEnroll
