import React, { useEffect, useState } from 'react'
import './Health.scss'
import healthImage from './../../../assets/img/health.svg'
import allergyPic from './../../../assets/img/allergy.svg'
import treatment from './../../../assets/img/treatment.svg'
import disease from './../../../assets/img/disease.svg'
import family from './../../../assets/img/family.svg'
import lifestyle from './../../../assets/img/lifestyle.svg'
import { getHealth } from './../../../store/actions/health'
import Header from '../../layout/Header/Header'
import { useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../shared/Notification/Notification'

export const Health = () => {
  const dispatch = useDispatch()

  const [isFamilyHistoryMore, setisFamilyHistoryMore] = useState(false)
  const [Lifestyle, setLifestyle] = useState(false)
  const [Health, setHealth] = useState(false)
  let { id } = useParams()

  useEffect(() => {
    dispatch(getHealth({ id: id }))
  }, [])

  const health = useSelector(state => {
    if (state && state.health.health.data) {
      return state.health.health.data
    }
  })

  const patientInfo = useSelector(state => {
    if (state && state.health.health.data) {
      return state.health.health.data.user_info
    }
  })

  const identification = useSelector(state => {
    if (state && state.health.health.data) {
      return state.health.health.data.identification
    }
  })

  const healthRecord = useSelector(state => {
    if (
      state &&
      state.health.health.data &&
      state.health.health.data.health_record.active_past_diseases
    ) {
      return state.health.health.data.health_record.active_past_diseases
    }
  })

  useSelector(state => {
    if (
      state &&
      state.health.health.error !== null &&
      state.health.health.error !== undefined
    ) {
      Notification(
        'error',
        'Error!',
        state.health.health.error.message
          ? state.health.health.error.message
          : ''
      )
    }
  })

  const {
    health_trends,
    allergy,
    active_discontinued_treatments,
    risk_factors
  } = health && health.health_record ? health.health_record : {}

  return (
    <div className='Health'>
      <Header />
      <Container className='container-height'>
        <section className='health-section'>
          <div className='card shadow py-3 px-5 my-3'>
            <div className='row my-auto'>
              <div className='col-lg-8 content-box'>
                <h3 className='heading'>Patient Information</h3>
                <div className='content-box'>
                  <div className='d-flex'>
                    <p className='patient-content mr-1'>Patient name : </p>
                    <p className='patient-content mr-1'>
                      {patientInfo && patientInfo.firstname
                        ? patientInfo.firstname
                        : ''}
                    </p>
                    <p className='patient-content'>
                      {patientInfo && patientInfo.lastname
                        ? patientInfo.lastname
                        : ''}
                    </p>
                  </div>
                  <p className='patient-content'>
                    Date of birth :{' '}
                    <span>
                      {patientInfo && patientInfo.date_of_birth
                        ? patientInfo.date_of_birth
                        : ''}
                    </span>
                  </p>
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='content-box right-content-box'>
                  <p className='patient-content'>
                    Age :{' '}
                    <span>
                      {identification && identification.age
                        ? identification.age
                        : ''}
                    </span>
                  </p>
                  <p className='patient-content'>
                    Sex :{' '}
                    <span>
                      {identification && identification.sex
                        ? identification.sex
                        : ''}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Row>
          <Col md={6}>
            <section className='pt-3'>
              <div className='card shadow py-3 px-5 '>
                <div className='row'>
                  <div className='col-lg-8 content-box'>
                    <h3 className='heading '>Allergy Information</h3>
                    <div className='content'>
                      {allergy && allergy.medicinal
                        ? allergy.medicinal
                        : 'No Active Medicinal'}
                    </div>
                    <div className='content '>
                      {allergy && allergy.food
                        ? allergy.food
                        : 'No Active Food'}
                    </div>
                    <div className='content '>
                      {allergy && allergy.sensitivity
                        ? allergy.sensitivity
                        : 'No Active Sensitivity'}
                    </div>
                    <div className=''>
                      {/* <button type='button' className=' btn btn-primary btn-set-3'>
                  More
                </button> */}
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='imgBox shadow ml-auto my-3  w-100'>
                      <img src={allergyPic} alt='' className='img-fluid' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
          <Col md={6}>
            <section className='pt-3'>
              <div className='card shadow py-3 px-5'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <div className='imgBox shadow my-3 w-100'>
                      <img src={lifestyle} alt='' className='img-fluid' />
                    </div>
                  </div>
                  <div className='col-lg-8 content-box'>
                    <h3 className='heading'>Health Treands</h3>
                    {health_trends && health_trends.length < 200 ? (
                      <div className='content'>
                        {health_trends && health_trends
                          ? health_trends
                          : 'No Active Health Trends'}
                      </div>
                    ) : (
                      <div>
                        {Health === false ? (
                          <div className='content '>
                            {health_trends
                              ? health_trends.slice(0, 200)
                              : 'No Active Health Trends'}
                          </div>
                        ) : (
                          <div className='content'>
                            {health_trends
                              ? health_trends
                              : 'No Active Health Trends'}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>

        <section className='pt-3'>
          <div className='card shadow py-3 px-5 my-3'>
            <div className='row'>
              <div className='col-lg-4'>
                <div className='imgBox shadow my-3'>
                  <img
                    src={treatment}
                    width='40%'
                    alt=''
                    className='img-fluid'
                  />
                </div>
              </div>
              <div className='col-lg-8 content-box'>
                <h3 className='heading'>Active and past treatments</h3>
                <div className='content'>
                  {active_discontinued_treatments &&
                  active_discontinued_treatments.active
                    ? active_discontinued_treatments.active
                    : 'No Active treatments'}
                </div>
                <div className='content '>
                  {active_discontinued_treatments &&
                  active_discontinued_treatments.past
                    ? active_discontinued_treatments.past
                    : 'No past treatments'}
                </div>
                <div className='content '>
                  {active_discontinued_treatments &&
                  active_discontinued_treatments.repeat_prescription
                    ? active_discontinued_treatments.repeat_prescription
                    : 'No past repeat prescription'}
                </div>
                <div className='content '>
                  {active_discontinued_treatments &&
                  active_discontinued_treatments.change_of_drug
                    ? active_discontinued_treatments.change_of_drug
                    : 'No past drug'}
                </div>
                <div className='content '>
                  {active_discontinued_treatments &&
                  active_discontinued_treatments.other
                    ? active_discontinued_treatments.other
                    : 'No other treatment'}
                </div>
                <div className=''>
                  {/* <button type='button' className=' btn btn-primary btn-set-3'>
                  More
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='pt-3'>
          <div className='card shadow py-3 px-5 my-3'>
            <div className='row'>
              <div className='col-lg-8 content-box'>
                <h3 className='heading'>Active and past diseases</h3>
                <div className='content '>
                  {healthRecord && healthRecord.active
                    ? healthRecord.active
                    : 'No Active imaging'}
                </div>
                <div className='content '>
                  {healthRecord && healthRecord.past
                    ? healthRecord.past
                    : 'No past imaging'}
                </div>
                <div className='content'>
                  {healthRecord && healthRecord.event
                    ? healthRecord.event
                    : 'No Active event'}
                </div>
                <div className='content'>
                  {healthRecord && healthRecord.deformity
                    ? healthRecord.deformity
                    : 'No Active deformity'}
                </div>
                <div className=''>
                  {/* <button type='button' className='btn btn-primary btn-set-3'>
                  More
                </button> */}
                </div>
              </div>
              <div className='col-lg-4'>
                <div className='imgBox shadow ml-auto my-3'>
                  <img src={disease} alt='' className='img-fluid' />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Row>
          <Col md={6}>
            <section className='pt-3'>
              <div className='card shadow py-3 px-5 '>
                <div className='row'>
                  <div className='col-lg-4'>
                    <div className='imgBox shadow my-3 w-100'>
                      <img src={family} alt='' className='imf=g-fluid' />
                    </div>
                  </div>
                  <div className='col-lg-8 content-box'>
                    <h3 className='heading'>Family History</h3>
                    {risk_factors &&
                    risk_factors.family_history &&
                    risk_factors.family_history.length < 250 ? (
                      <div className='content '>
                        {risk_factors && risk_factors.family_history
                          ? risk_factors.family_history
                          : 'No Active Family History'}
                      </div>
                    ) : (
                      <div>
                        {isFamilyHistoryMore === false ? (
                          <div className='content '>
                            {risk_factors && risk_factors.family_history
                              ? risk_factors.family_history.slice(0, 2)
                              : 'No Active Family History'}
                          </div>
                        ) : (
                          <div className='content '>
                            {risk_factors && risk_factors.family_history
                              ? risk_factors.family_history
                              : 'No Active Family History'}
                          </div>
                        )}

                        <div className='pt-3'></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </Col>
          <Col md={6}>
            <section className='pt-3'>
              <div className='card shadow py-3 px-5 '>
                <div className='row'>
                  <div className='col-lg-8 content-box'>
                    <h3 className='heading'>Lifestyle</h3>
                    <div className='content '>
                      {risk_factors &&
                      risk_factors.lifestyle &&
                      risk_factors.lifestyle.length < 200 ? (
                        <div className='content '>
                          {risk_factors && risk_factors.lifestyle
                            ? risk_factors.lifestyle
                            : 'No Active lifestyle'}
                        </div>
                      ) : (
                        <div>
                          {Lifestyle === false ? (
                            <div className='content '>
                              {risk_factors && risk_factors.lifestyle
                                ? risk_factors.lifestyle.slice(0, 200)
                                : 'No Active lifestyle'}
                            </div>
                          ) : (
                            <div className='content '>
                              {risk_factors && risk_factors.lifestyle
                                ? risk_factors.lifestyle
                                : 'No Active lifestyle'}
                            </div>
                          )}

                          <div className=''></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='imgBox shadow ml-auto my-3 w-100'>
                      <img src={healthImage} alt='' className='img-fluid' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Health
