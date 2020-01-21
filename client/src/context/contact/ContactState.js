import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContex';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Graham Norton',
        email: 'norton@mail.ru',
        phone: '234-673-123-689',
        type: 'personal'
      },      
      {
        id: 2,
        name: 'Julia Doe',
        email: 'doejuliadoe@aol.com',
        phone: '888-222-555-111',
        type: 'professional'
      },      
      {
        id: 3,
        name: 'Beepo Meepo',
        email: 'meepo@gmail.com',
        phone: '999-222-111-000',
        type: 'professional'
      }
    ],
    current: null
  }
  const [state, dispatch] = useReducer(contactReducer, initialState);
  
  const addContact = contact => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact })
  }  

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }
  
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
}

export default ContactState;