import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './enroll-navigation.scss';

const EnrollNavigation = (props) => {

  const { pathname } = props.location;

  const setNewTab = val =>{
    props.changeTab(val)
  }


  return (
    <div className="Enroll-navigation">
      <ul>
        <li className="first current">
          <div disabled={props.currentTabNumber === 1 || props.isEdit ? false : true} onClick={()=>setNewTab('PersonalInfo')}>
            <span className="current-info audible"> </span>
            <div className="title">
              <span className={props.currentTab === 'PersonalInfo' ? 'current-number' : 'step-number'}>1</span>
              <span className={props.currentTab === 'PersonalInfo' ? 'current-text' : 'step-text'}>
                Personal info
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber >= 2 ? false : true} onClick={()=>setNewTab('BillingInfo')}>
            <div className="title">
              <span className={props.currentTab === 'BillingInfo' ? 'current-number' : 'step-number'}>2</span>
              <span className={props.currentTab === 'BillingInfo' ? 'current-text' : 'step-text'}>
                Billing Info
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber >= 3 ? false : true}  onClick={()=>setNewTab('HealthIdentification')}>
            <div className="title">
              <span
                className={
                  props.currentTab === 'HealthIdentification' ? 'current-number' : 'step-number'
                }
              >
                3
              </span>
              <span
                className={
                  props.currentTab === 'HealthIdentification' ? 'current-text' : 'step-text'
                }
              >
                Health ( Identification )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 4 ? false : true} onClick={()=>setNewTab('HealthAllergy')}>
            <div className="title">
              <span
                className={props.currentTab === 'HealthAllergy' ? 'current-number' : 'step-number'}
              >
                4
              </span>
              <span className={props.currentTab === 'HealthAllergy' ? 'current-text' : 'step-text'}>
                Health ( Allergy )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 5 ? false : true} onClick={()=>setNewTab('HealthDiseases')}>
            <div className="title">
              <span
                className={props.currentTab === 'HealthDiseases' ? 'current-number' : 'step-number'}
              >
                5
              </span>
              <span
                className={props.currentTab === 'HealthDiseases' ? 'current-text' : 'step-text'}
              >
                Health ( Diseases )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 6 ? false : true} onClick={()=>setNewTab('HealthTreatments')}>
            <div className="title">
              <span
                className={
                  props.currentTab === 'HealthTreatments' ? 'current-number' : 'step-number'
                }
              >
                6
              </span>
              <span
                className={props.currentTab === 'HealthTreatments' ? 'current-text' : 'step-text'}
              >
                Health ( Treatments )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 7 ? false : true} onClick={()=>setNewTab('HealthTrends')}>
            <div className="title">
              <span
                className={props.currentTab === 'HealthTrends' ? 'current-number' : 'step-number'}
              >
                7
              </span>
              <span className={props.currentTab === 'HealthTrends' ? 'current-text' : 'step-text'}>
                Health ( Trends )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 8 ? false : true} onClick={()=>setNewTab('HealthRiskFactors')}>
            <div className="title">
              <span
                className={
                  props.currentTab === 'HealthRiskFactors' ? 'current-number' : 'step-number'
                }
              >
                8
              </span>
              <span
                className={props.currentTab === 'HealthRiskFactors' ? 'current-text' : 'step-text'}
              >
                Health ( Risk Factors )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled">
          <div disabled={props.currentTabNumber  >= 9 ? false : true} onClick={()=>setNewTab('HealthImaging')}>
            <div className="title">
              <span
                className={props.currentTab === 'HealthImaging' ? 'current-number' : 'step-number'}
              >
                9
              </span>
              <span className={props.currentTab === 'HealthImaging' ? 'current-text' : 'step-text'}>
                Health ( Imaging )
              </span>
            </div>
          </div>
        </li>
        <li className="disabled last">
          <div disabled={props.currentTabNumber  >= 10 ? false : true} onClick={()=>setNewTab('HealthFamilyDoctor')}>
            <div className="title">
              <span
                className={
                  props.currentTab === 'HealthFamilyDoctor' ? 'current-number' : 'step-number'
                }
              >
                10
              </span>
              <span
                className={props.currentTab === 'HealthFamilyDoctor' ? 'current-text' : 'step-text'}
              >
                Health ( Family Doctor )
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(EnrollNavigation);
